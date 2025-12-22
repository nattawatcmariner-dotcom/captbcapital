
import React, { useState } from 'react';
import { Play, RotateCcw, FileCheck, AlertCircle } from 'lucide-react';
import { SireQuestion, sireChapters, sireQuestions } from '../../data/sireData';

interface PreSireGeneratorProps {
    onGenerate: (questions: SireQuestion[]) => void;
}

export function PreSireGenerator({ onGenerate }: PreSireGeneratorProps) {
    const [questionCount, setQuestionCount] = useState(20);
    const [selectedChapters, setSelectedChapters] = useState<string[]>([]);

    const handleGenerate = () => {
        let pool = sireQuestions;

        if (selectedChapters.length > 0) {
            pool = pool.filter(q => selectedChapters.includes(q.chapterId));
        }

        // Shuffle and slice
        const shuffled = [...pool].sort(() => 0.5 - Math.random());
        const selected = shuffled.slice(0, questionCount);
        onGenerate(selected);
    };

    const toggleChapter = (chapterId: string) => {
        setSelectedChapters(prev =>
            prev.includes(chapterId)
                ? prev.filter(c => c !== chapterId)
                : [...prev, chapterId]
        );
    };

    return (
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 mb-6">
            <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-blue-50 text-blue-600 rounded-lg">
                    <Play className="h-6 w-6" />
                </div>
                <div>
                    <h2 className="text-lg font-semibold text-slate-900">Generate Pre-SIRE Questionnaire</h2>
                    <p className="text-slate-500 text-sm">Create a randomized inspection checklist for internal use.</p>
                </div>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Number of Questions</label>
                    <div className="flex items-center gap-4">
                        <input
                            type="range"
                            min="10"
                            max="100"
                            step="10"
                            value={questionCount}
                            onChange={(e) => setQuestionCount(Number(e.target.value))}
                            className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                        />
                        <span className="text-slate-900 font-bold w-12 text-center">{questionCount}</span>
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Filter by Chapter (Optional)</label>
                    <div className="h-48 overflow-y-auto border border-slate-200 rounded-lg p-2 space-y-1">
                        {sireChapters.map(chapter => (
                            <label key={chapter.id} className="flex items-center gap-2 p-2 hover:bg-slate-50 rounded cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={selectedChapters.includes(chapter.id)}
                                    onChange={() => toggleChapter(chapter.id)}
                                    className="rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                                />
                                <span className="text-sm text-slate-600">
                                    <span className="font-semibold text-slate-900">{chapter.code}</span> - {chapter.title}
                                </span>
                            </label>
                        ))}
                    </div>
                </div>
            </div>

            <div className="mt-8 flex justify-end gap-3">
                <button
                    onClick={() => {
                        setQuestionCount(20);
                        setSelectedChapters([]);
                    }}
                    className="flex items-center gap-2 px-4 py-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors"
                >
                    <RotateCcw className="h-4 w-4" />
                    Reset
                </button>
                <button
                    onClick={handleGenerate}
                    className="flex items-center gap-2 px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg shadow-sm shadow-blue-200 transition-colors"
                >
                    <FileCheck className="h-4 w-4" />
                    Generate Questionnaire
                </button>
            </div>
        </div>
    );
}
