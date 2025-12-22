import React from 'react';
import { LaytimeResult as LaytimeResultModel } from '../../types/laytime';
import { Calculator, DollarSign, Clock, AlertCircle, Sparkles, Loader2 } from 'lucide-react';

interface Props {
    result: LaytimeResultModel | null;
}

export function LaytimeResult({ result }: Props) {
    if (!result) {
        return (
            <div className="bg-white rounded-xl border border-slate-200 p-8 text-center h-full flex flex-col items-center justify-center">
                <div className="bg-slate-50 p-4 rounded-full mb-4">
                    <Calculator className="h-8 w-8 text-slate-300" />
                </div>
                <h3 className="text-lg font-medium text-slate-900">Ready to Calculate</h3>
                <p className="text-slate-500 mt-1">Configure terms and add events to see the result.</p>
            </div>
        );
    }

    const [analysis, setAnalysis] = React.useState<string | null>(null);
    const [isAnalyzing, setIsAnalyzing] = React.useState(false);

    // Reset analysis when result changes
    React.useEffect(() => {
        setAnalysis(null);
    }, [result]);

    const handleAnalyze = async () => {
        if (!result) return;
        try {
            setIsAnalyzing(true);
            const { analyzeLaytimeResult } = await import('../../services/geminiService');
            const feedback = await analyzeLaytimeResult(result);
            setAnalysis(feedback);
        } catch (error) {
            console.error("Analysis failed:", error);
            setAnalysis("Sorry, I couldn't analyze the results right now. Please check your connection or API Key.");
        } finally {
            setIsAnalyzing(false);
        }
    };

    const isDemurrage = result.demurrageDue > 0;

    return (
        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
            <div className={`p-6 ${isDemurrage ? 'bg-rose-50 border-b border-rose-100' : 'bg-emerald-50 border-b border-emerald-100'}`}>
                <div className="flex items-center justify-between mb-2">
                    <h3 className={`text-sm font-bold uppercase tracking-wider ${isDemurrage ? 'text-rose-700' : 'text-emerald-700'}`}>
                        {isDemurrage ? 'Demurrage Due' : 'Despatch / Time Saved'}
                    </h3>
                    {isDemurrage ? <AlertCircle className="h-5 w-5 text-rose-500" /> : <DollarSign className="h-5 w-5 text-emerald-500" />}
                </div>
                <div className="flex items-baseline gap-1">
                    <span className={`text-4xl font-bold ${isDemurrage ? 'text-rose-900' : 'text-emerald-900'}`}>
                        ${(isDemurrage ? result.demurrageDue : result.despatchDue || 0).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </span>
                    <span className={`text-sm ${isDemurrage ? 'text-rose-600' : 'text-emerald-600'}`}>USD</span>
                </div>
            </div>

            <div className="p-6 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                    <div className="p-3 bg-slate-50 rounded-lg">
                        <span className="text-xs text-slate-500 block mb-1">Time Allowed</span>
                        <span className="font-semibold text-slate-900">{result.allowedLaytimeHours.toFixed(2)} hrs</span>
                    </div>
                    <div className="p-3 bg-slate-50 rounded-lg">
                        <span className="text-xs text-slate-500 block mb-1">Time Used</span>
                        <span className={`font-semibold ${result.totalLaytimeUsedHours > result.allowedLaytimeHours ? 'text-rose-600' : 'text-emerald-600'}`}>
                            {result.totalLaytimeUsedHours.toFixed(2)} hrs
                        </span>
                    </div>
                </div>

                <div className="pt-4 border-t border-slate-100">
                    <h4 className="text-sm font-medium text-slate-900 mb-3 flex items-center gap-2">
                        <Clock className="h-4 w-4 text-slate-400" />
                        Calculation Breakdown
                    </h4>
                    <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                            <span className="text-slate-600">Total Duration</span>
                            <span className="font-mono">{result.totalDurationHours.toFixed(2)} hrs</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-slate-600 pl-4 border-l-2 border-slate-200">Time on Demurrage</span>
                            <span className="font-mono font-medium text-rose-600">
                                {result.timeOnDemurrageHours > 0 ? `+${result.timeOnDemurrageHours.toFixed(2)}` : '-'}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="p-6 border-t border-slate-100 bg-slate-50/50">
                <div className="flex items-center justify-between mb-3">
                    <h4 className="text-sm font-medium text-slate-900 flex items-center gap-2">
                        <Sparkles className="h-4 w-4 text-purple-500" />
                        AI Insights
                    </h4>
                    {!analysis && (
                        <button
                            onClick={handleAnalyze}
                            disabled={isAnalyzing}
                            className="text-xs px-3 py-1.5 bg-purple-100 text-purple-700 rounded-lg hover:bg-purple-200 transition-colors disabled:opacity-50 flex items-center gap-1"
                        >
                            {isAnalyzing && <Loader2 className="h-3 w-3 animate-spin" />}
                            {isAnalyzing ? 'Analyzing...' : 'Ask AI'}
                        </button>
                    )}
                </div>

                {analysis && (
                    <div className="text-sm text-slate-600 bg-white p-3 rounded-lg border border-purple-100 shadow-sm animate-in fade-in">
                        <p className="leading-relaxed">{analysis}</p>
                    </div>
                )}
            </div>
        </div>
    );
}
