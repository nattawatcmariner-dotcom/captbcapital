
import React, { useState } from 'react';
import { PreSireGenerator } from '../components/standard/PreSireGenerator';
import { QuestionnaireView } from '../components/standard/QuestionnaireView';
import { SireQuestion } from '../data/sireData';

export function PreSirePage() {
    const [questions, setQuestions] = useState<SireQuestion[]>([]);
    const [isGenerated, setIsGenerated] = useState(false);

    const handleGenerate = (generatedQuestions: SireQuestion[]) => {
        setQuestions(generatedQuestions);
        setIsGenerated(true);
    };

    const handleReset = () => {
        setQuestions([]);
        setIsGenerated(false);
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-slate-900">Pre-SIRE</h1>
                    <p className="text-slate-500 mt-1">
                        Generate and conduct internal inspections based on SIRE 2.0 standards.
                    </p>
                </div>
            </div>

            <div className="mt-8">
                {!isGenerated ? (
                    <PreSireGenerator onGenerate={handleGenerate} />
                ) : (
                    <QuestionnaireView questions={questions} onReset={handleReset} />
                )}
            </div>
        </div>
    );
}
