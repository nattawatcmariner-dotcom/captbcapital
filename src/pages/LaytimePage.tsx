import React, { useState, useEffect } from 'react';
import { CharterTermsForm } from '../components/laytime/CharterTermsForm';
import { TimeSheetEditor } from '../components/laytime/TimeSheetEditor';
import { LaytimeResult as ResultDisplay } from '../components/laytime/LaytimeResult';
import { CharterPartyTerms, TimeSheetEvent, LaytimeResult } from '../types/laytime';
import { laytimeService } from '../services/laytimeService';
import { Calculator } from 'lucide-react';

const DEFAULT_TERMS: CharterPartyTerms = {
    charterType: 'SHELLVOY6',
    vesselName: 'MT DEMO VESSEL',
    voyageNo: 'V.001',
    port: 'Singapore',
    activity: 'LOADING',
    allowedLaytimeHours: 72,
    demurrageRatePerDay: 45000,
    isShinc: true,
    reversible: false,
    alwaysAccessible: false,
    norTenderedWaitTime: 6
};

export function LaytimePage() {
    const [terms, setTerms] = useState<CharterPartyTerms>(DEFAULT_TERMS);
    const [events, setEvents] = useState<TimeSheetEvent[]>([]);
    const [result, setResult] = useState<LaytimeResult | null>(null);

    // Auto-calculate when inputs change
    useEffect(() => {
        if (events.length > 0) {
            const res = laytimeService.calculate(terms, events);
            setResult(res);
        } else {
            setResult(null);
        }
    }, [terms, events]);

    const handleUploadFile = async (file: File) => {
        // Here we simulate parsing the specific file
        console.log("Analyzing file:", file.name);
        const sampleEvents = await laytimeService.mockParse(file);
        setEvents(sampleEvents);
    };

    return (
        <div className="space-y-8 animate-in pb-20">
            <div>
                <h1 className="text-3xl font-bold text-slate-900 tracking-tight flex items-center gap-3">
                    <Calculator className="h-8 w-8 text-accent" />
                    Laytime Calculator
                </h1>
                <p className="mt-2 text-slate-600">
                    Commercial Laytime & Demurrage Engine (SHELLVOY 6 / ASBATANKVOY Compatible)
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Left Column: Inputs */}
                <div className="lg:col-span-2 space-y-6">
                    <CharterTermsForm terms={terms} onChange={setTerms} />
                    <TimeSheetEditor
                        events={events}
                        onEventsChange={setEvents}
                        onUploadFile={handleUploadFile}
                    />
                </div>

                {/* Right Column: Result */}
                <div className="lg:col-span-1">
                    <div className="sticky top-6">
                        <ResultDisplay result={result} />
                    </div>
                </div>
            </div>
        </div>
    );
}
