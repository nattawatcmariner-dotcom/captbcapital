
import React, { useState } from 'react';
import { Download, Save, CheckCircle2, AlertTriangle, XCircle, ChevronDown, ChevronUp } from 'lucide-react';
import { SireQuestion, SireQuestionnaire } from '../../data/sireData';

interface QuestionnaireViewProps {
    questions: SireQuestion[];
    onReset: () => void;
}

export function QuestionnaireView({ questions, onReset }: QuestionnaireViewProps) {
    const [answers, setAnswers] = useState<Record<string, 'yes' | 'no' | 'na' | undefined>>({});
    const [observations, setObservations] = useState<Record<string, string>>({});
    const [expandedQuestion, setExpandedQuestion] = useState<string | null>(null);

    const handleAnswer = (id: string, value: 'yes' | 'no' | 'na') => {
        setAnswers(prev => ({ ...prev, [id]: value }));
    };

    const handleObservation = (id: string, value: string) => {
        setObservations(prev => ({ ...prev, [id]: value }));
    };

    const progress = Math.round((Object.keys(answers).length / questions.length) * 100);

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 flex justify-between items-center">
                <div>
                    <h2 className="text-2xl font-bold text-slate-900">Pre-SIRE Inspection</h2>
                    <p className="text-slate-500">Generated on {new Date().toLocaleDateString()}</p>
                </div>
                <div className="flex gap-3">
                    <button
                        onClick={onReset}
                        className="px-4 py-2 text-slate-600 hover:bg-slate-50 rounded-lg border border-slate-200"
                    >
                        Start New
                    </button>
                    <button className="flex items-center gap-2 px-4 py-2 bg-slate-900 text-white rounded-lg hover:bg-slate-800">
                        <Save className="h-4 w-4" />
                        Save Draft
                    </button>
                    <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                        <Download className="h-4 w-4" />
                        Export PDF
                    </button>
                </div>
            </div>

            {/* Progress */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4">
                <div className="flex justify-between text-sm font-medium mb-2">
                    <span>Progress: {Object.keys(answers).length} / {questions.length} Completed</span>
                    <span>{progress}%</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-2.5">
                    <div className="bg-blue-600 h-2.5 rounded-full transition-all duration-300" style={{ width: `${progress}%` }}></div>
                </div>
            </div>

            {/* Questions List */}
            <div className="space-y-4">
                {questions.map((q, index) => (
                    <div key={q.id} className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                        <div
                            className={`p-4 flex items-start gap-4 cursor-pointer ${answers[q.id] ? 'bg-slate-50' : ''}`}
                            onClick={() => setExpandedQuestion(expandedQuestion === q.id ? null : q.id)}
                        >
                            <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full bg-slate-100 text-slate-500 text-sm font-bold">
                                {index + 1}
                            </div>

                            <div className="flex-1">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-2 py-1 rounded inline-block mb-1">
                                            {q.code}
                                        </span>
                                        <p className="font-medium text-slate-900">{q.text}</p>
                                    </div>
                                    {expandedQuestion === q.id ? <ChevronUp className="h-5 w-5 text-slate-400" /> : <ChevronDown className="h-5 w-5 text-slate-400" />}
                                </div>

                                {/* Status Indicator (Collapsed) */}
                                {expandedQuestion !== q.id && answers[q.id] && (
                                    <div className="mt-2 text-sm">
                                        {answers[q.id] === 'yes' && <span className="text-green-600 flex items-center gap-1"><CheckCircle2 className="h-3 w-3" /> Compliant</span>}
                                        {answers[q.id] === 'no' && <span className="text-red-600 flex items-center gap-1"><XCircle className="h-3 w-3" /> Non-Compliant</span>}
                                        {answers[q.id] === 'na' && <span className="text-slate-500 flex items-center gap-1"><AlertTriangle className="h-3 w-3" /> N/A</span>}
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Expanded Content */}
                        {expandedQuestion === q.id && (
                            <div className="p-4 pt-0 border-t border-slate-100 ml-[3.25rem]">
                                <div className="mt-3 mb-4 p-3 bg-blue-50/50 rounded-lg text-sm text-blue-800">
                                    <strong>Guidance:</strong> {q.guidance || "No specific guidance available."}
                                </div>

                                <div className="flex gap-4 mb-4">
                                    <button
                                        onClick={(e) => { e.stopPropagation(); handleAnswer(q.id, 'yes'); }}
                                        className={`flex-1 py-2 rounded-lg border font-medium transition-colors ${answers[q.id] === 'yes'
                                            ? 'bg-green-50 border-green-200 text-green-700'
                                            : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                                            }`}
                                    >
                                        Yes
                                    </button>
                                    <button
                                        onClick={(e) => { e.stopPropagation(); handleAnswer(q.id, 'no'); }}
                                        className={`flex-1 py-2 rounded-lg border font-medium transition-colors ${answers[q.id] === 'no'
                                            ? 'bg-red-50 border-red-200 text-red-700'
                                            : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                                            }`}
                                    >
                                        No
                                    </button>
                                    <button
                                        onClick={(e) => { e.stopPropagation(); handleAnswer(q.id, 'na'); }}
                                        className={`flex-1 py-2 rounded-lg border font-medium transition-colors ${answers[q.id] === 'na'
                                            ? 'bg-slate-100 border-slate-200 text-slate-700'
                                            : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                                            }`}
                                    >
                                        N/A
                                    </button>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">Observations / Remarks</label>
                                    <textarea
                                        value={observations[q.id] || ''}
                                        onChange={(e) => handleObservation(q.id, e.target.value)}
                                        className="w-full rounded-lg border-slate-200 text-sm focus:ring-blue-500 focus:border-blue-500"
                                        rows={2}
                                        placeholder="Enter any observation notes here..."
                                    />
                                </div>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}
