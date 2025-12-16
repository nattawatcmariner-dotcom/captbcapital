import { GoogleGenAI } from "@google/genai";
import { TimeSheetEvent } from "../types/laytime";

// Ensure we access the environment variable correctly for Vite
const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

const getAi = () => {
  if (!API_KEY) {
    console.error("VITE_GEMINI_API_KEY is not set in environment variables");
    throw new Error("Gemini API Key is missing. Please add VITE_GEMINI_API_KEY to your .env file.");
  }
  return new GoogleGenAI({ apiKey: API_KEY });
};

const MODELS_TO_TRY = [
  'gemini-2.0-flash-lite-preview-02-05', // Confirmed Available: Lite
  'gemini-2.5-flash',                    // Confirmed Available: Newest
  'gemini-2.0-flash-exp',                // Confirmed Available: Exp
  'gemini-1.5-flash'                     // Fallback
];

const MODEL_NAME = MODELS_TO_TRY[0];

// Debug: Log key status (safe)
if (API_KEY) {
  console.log("Gemini Service Initialized. Key prefix:", API_KEY.substring(0, 5) + "...");
}

export const debugGeminiConnection = async (): Promise<string> => {
  if (!API_KEY) return "No API Key found.";
  try {
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${API_KEY}`);
    if (!response.ok) {
      const err = await response.json();
      return `API Error: ${response.status} - ${JSON.stringify(err)}`;
    }
    const data = await response.json();
    const models = (data.models || [])
      .map((m: any) => m.name.replace('models/', ''))
      .filter((n: string) => n.includes('gemini'));
    return `Available Models: ${models.join(', ')}`;
  } catch (e: any) {
    return `Network Error: ${e.message}`;
  }
};


/**
 * Parses an image of a Statement of Facts / Time Sheet and extracts events.
 */
export const parseTimeSheetImage = async (file: File): Promise<TimeSheetEvent[]> => {
  const ai = getAi();
  const base64Data = await fileToGenerativePart(file);

  let lastError: any;

  for (const modelName of MODELS_TO_TRY) {
    try {
      console.log(`Attempting to parse with model: ${modelName}`);

      const response = await ai.models.generateContent({
        model: modelName,
        contents: {
          parts: [
            { inlineData: { mimeType: file.type, data: base64Data } },
            {
              text: `
              You are an expert Maritime Laytime Analyst.
              Analyze the attached image of a "Statement of Facts" or "Time Sheet".
              
              Extract ALL events found in the document chronologically into a JSON list.
              
              CRITICAL: You must identify the "End of Laytime" events.
              Map the text descriptions to the following strict types:
              - 'NOR_TENDERED': Notice of Readiness, NOR Tendered
              - 'ANCHORED': Anchored, Arrived at Pilot Station
              - 'BERTHTED': All Fast, Berthed, Gangway Down
              - 'COMMENCED_LOADING': Commenced Loading/Discharging, Hose Connected
              - 'COMPLETED_LOADING': Completed Loading/Discharging
              - 'CARGO_HOSES_DISCONNECTED': Hoses Disconnected, Arms Disconnected
              - 'DOCUMENTS_ON_BOARD': Documents on Board, Cargo Docs, Sailing, Cast Off, Unberthed
              - 'RAIN_DELAY': Rain, Bad Weather (Start/Stop pairs if possible, or single events)
              - 'OTHER': Any other event like "Pilot On Board", "Tug Fast"

              For each event object:
              - type: The strict Enum value from above.
              - timestamp: ISO 8601 format (YYYY-MM-DDTHH:mm:ss). Infer year if missing.
              - description: Original text from image.
              
              Return ONLY valid JSON.
              [{"type": "NOR_TENDERED", "timestamp": "...", "description": "..."}]
            ` }
          ]
        }
      });

      const text = response.text || "[]";
      // Sanitize JSON
      const jsonBlock = text.match(/```json\s*([\s\S]*?)\s*```/);
      const jsonString = jsonBlock ? jsonBlock[1] : text;

      const events = JSON.parse(jsonString);

      return events.map((e: any, index: number) => ({
        id: `extracted-${Date.now()}-${index}`,
        type: e.type,
        timestamp: e.timestamp,
        description: e.description,
        remarks: `Extracted by AI (${modelName})`
      }));

    } catch (error: any) {
      console.warn(`Failed with model ${modelName}:`, error.message);
      lastError = error;
      // Continue to next model
      continue;
    }
  }

  // If we get here, all models failed
  console.error("All models failed. Last error:", lastError);
  throw lastError;
};

/**
 * Analyzes the Laytime Calculation Result to provide insights.
 */
export const analyzeLaytimeResult = async (result: any): Promise<string> => {
  const ai = getAi();
  const prompt = `
    Analyze this Laytime Calculation Result:
    ${JSON.stringify(result, null, 2)}
    
    Explain the result in simple maritime terms.
    - Why is there Demurrage or Despatch?
    - Highlight the biggest time loss (if any).
    - Maximum 3 sentences.
    `;

  try {
    const response = await ai.models.generateContent({
      model: MODEL_NAME,
      contents: { parts: [{ text: prompt }] }
    });
    return response.text || "No analysis available.";
  } catch (error) {
    console.error("Error analyzing laytime result:", error);
    return "Unable to generate insights at this time.";
  }
};

// Helper: Convert File to Base64 (strip header for Gemini SDK if needed, 
// usually SDK handles base64 string, but @google/genai inlineData wants raw base64)
async function fileToGenerativePart(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result as string;
      // Remove data url prefix (e.g. "data:image/jpeg;base64,")
      const base64Data = base64String.split(',')[1];
      resolve(base64Data);
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}