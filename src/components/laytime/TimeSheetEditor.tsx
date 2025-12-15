import React from 'react';
import { TimeSheetEvent } from '../../types/laytime';
import { Calendar, Trash2, Plus, FileText, Upload } from 'lucide-react';

interface Props {
    events: TimeSheetEvent[];
    onEventsChange: (events: TimeSheetEvent[]) => void;
    onUploadSample: () => void;
}

export function TimeSheetEditor({ events, onEventsChange, onUploadSample }: Props) {
    const handleDelete = (id: string) => {
        onEventsChange(events.filter(e => e.id !== id));
    };

    return (
        <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm h-full">
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-slate-800 flex items-center gap-2">
                    <Calendar className="h-5 w-5 text-accent" />
                    Statement of Facts
                </h3>
                <div className="flex gap-2">
                    <button
                        onClick={onUploadSample}
                        className="text-xs flex items-center gap-1 px-3 py-1.5 bg-indigo-50 text-indigo-700 rounded-lg hover:bg-indigo-100 transition-colors"
                    >
                        <Upload className="h-3 w-3" />
                        Simulate OCR
                    </button>
                    <button className="text-xs flex items-center gap-1 px-3 py-1.5 bg-slate-100 text-slate-700 rounded-lg hover:bg-slate-200 transition-colors">
                        <Plus className="h-3 w-3" />
                        Add Event
                    </button>
                </div>
            </div>

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
