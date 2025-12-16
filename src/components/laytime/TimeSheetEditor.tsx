import React, { useRef, useState } from 'react';
import { TimeSheetEvent } from '../../types/laytime';
import { Calendar, Trash2, Plus, FileText, Upload, Paperclip, X, Loader2 } from 'lucide-react';

interface Props {
    events: TimeSheetEvent[];
    onEventsChange: (events: TimeSheetEvent[]) => void;
    onUploadFile: (file: File) => void;
}

export function TimeSheetEditor({ events, onEventsChange, onUploadFile }: Props) {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [attachedFile, setAttachedFile] = useState<File | null>(null);

    const [isProcessing, setIsProcessing] = useState(false);

    // Import dynamically if needed, or assume it's available at top level.
    // Ideally, we should add the import at the top, but since we are replacing a block, 
    // I will add the logic here and rely on a separate edit to add the import or use a full file replacement if imports are tricky.
    // Actually, let's use replace_file_content for the import first, safely.
    // Wait, I can do it in one go if I include the imports in a larger block or multiple chunks.
    // I'll use multi_replace to handle imports and the handler.

    const handleDelete = (id: string) => {
        onEventsChange(events.filter(e => e.id !== id));
    };

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setAttachedFile(file);
            onUploadFile(file);

            try {
                setIsProcessing(true);
                // Dynamically import to avoid circular dependencies or if strict on top-level imports
                // But better to just assume we add the import at the top. 
                // I will use a multi-replace to add the import.
                const { parseTimeSheetImage } = await import('../../services/geminiService');
                const extractedEvents = await parseTimeSheetImage(file);

                if (extractedEvents.length > 0) {
                    // Merge with existing or replace? Usually modify specific "AI" events or append.
                    // Let's append for now, or maybe the user wants to start fresh? 
                    // Safest is to append.
                    onEventsChange([...events, ...extractedEvents]);
                }
            } catch (error: any) {
                console.error("Failed to parse Time Sheet:", error);

                // Debugging helper
                let debugInfo = "";
                try {
                    const { debugGeminiConnection } = await import('../../services/geminiService');
                    debugInfo = await debugGeminiConnection();
                } catch (e) { console.error("Debug failed", e); }

                alert(`Failed to analyze. Error: ${error.message || error}\n\nDebug Info:\n${debugInfo}`);
            } finally {
                setIsProcessing(false);
            }
        }
    };

    return (
        <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm h-full">
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-slate-800 flex items-center gap-2">
                    <Calendar className="h-5 w-5 text-accent" />
                    Statement of Facts
                </h3>

                <div className="flex gap-2">
                    <input
                        type="file"
                        ref={fileInputRef}
                        className="hidden"
                        accept=".pdf,.png,.jpg,.jpeg"
                        onChange={handleFileChange}
                    />
                    <button
                        onClick={() => fileInputRef.current?.click()}
                        disabled={isProcessing}
                        className="text-xs flex items-center gap-1 px-3 py-1.5 bg-indigo-50 text-indigo-700 rounded-lg hover:bg-indigo-100 transition-colors disabled:opacity-50"
                    >
                        {isProcessing ? <Loader2 className="h-3 w-3 animate-spin" /> : <Upload className="h-3 w-3" />}
                        {isProcessing ? 'Analyzing...' : 'Attach SOF/Time Sheet'}
                    </button>
                    <button className="text-xs flex items-center gap-1 px-3 py-1.5 bg-slate-100 text-slate-700 rounded-lg hover:bg-slate-200 transition-colors">
                        <Plus className="h-3 w-3" />
                        Add Event
                    </button>
                </div>
            </div>

            {attachedFile && (
                <div className="mb-4 flex items-center justify-between p-3 bg-blue-50 border border-blue-100 rounded-lg animate-in fade-in">
                    <div className="flex items-center gap-2 overflow-hidden">
                        <Paperclip className="h-4 w-4 text-blue-500 shrink-0" />
                        <span className="text-sm font-medium text-blue-700 truncate">{attachedFile.name}</span>
                        <span className="text-xs text-blue-400">({(attachedFile.size / 1024).toFixed(1)} KB)</span>
                    </div>
                    <button
                        onClick={() => setAttachedFile(null)}
                        className="p-1 hover:bg-blue-100 rounded-full text-blue-400 hover:text-blue-600 transition-colors"
                    >
                        <X className="h-4 w-4" />
                    </button>
                </div>
            )}

            <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2">
                {events.length === 0 ? (
                    <div className="text-center py-12 text-slate-400 border-2 border-dashed border-slate-100 rounded-xl">
                        <FileText className="h-10 w-10 mx-auto mb-2 opacity-50" />
                        <p>No events yet. Upload a Time Sheet or add manually.</p>
                    </div>
                ) : (
                    events.map((event, index) => (
                        <div key={event.id} className="flex items-start gap-4 p-3 bg-slate-50 rounded-lg border border-slate-100 group">
                            <div className="w-8 h-8 rounded-full bg-white border border-slate-200 flex items-center justify-center shrink-0 text-xs font-bold text-slate-500">
                                {index + 1}
                            </div>
                            <div className="grow">
                                <div className="flex items-baseline justify-between">
                                    <span className="font-medium text-slate-900">{event.type.replace(/_/g, ' ')}</span>
                                    <span className="text-xs text-slate-500 font-mono">
                                        {new Date(event.timestamp).toLocaleString()}
                                    </span>
                                </div>
                                <p className="text-sm text-slate-600 mt-1">{event.description}</p>
                            </div>
                            <button
                                onClick={() => handleDelete(event.id)}
                                className="opacity-0 group-hover:opacity-100 p-1.5 text-slate-400 hover:text-rose-500 transition-all"
                            >
                                <Trash2 className="h-4 w-4" />
                            </button>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}
