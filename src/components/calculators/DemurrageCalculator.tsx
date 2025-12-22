import React, { useState } from 'react';
import { Clock, DollarSign, Calendar } from 'lucide-react';

export function DemurrageCalculator() {
    const [allowedDays, setAllowedDays] = useState('');
    const [usedDays, setUsedDays] = useState('');
    const [demRate, setDemRate] = useState('');

    const allowed = parseFloat(allowedDays) || 0;
    const used = parseFloat(usedDays) || 0;
    const rate = parseFloat(demRate) || 0;

    const demurrageTime = Math.max(0, used - allowed);
    const demurrageAmount = demurrageTime * rate;

    return (
        <div className="card p-8 h-full">
            <div className="mb-8 flex items-center gap-4">
                <div className="rounded-xl bg-amber-50 p-3 ring-1 ring-amber-100">
                    <Clock className="h-6 w-6 text-amber-600" />
                </div>
                <div>
                    <h3 className="text-xl font-bold text-slate-900 tracking-tight">Demurrage Estimator</h3>
                    <p className="text-sm text-slate-500">Calculate potential demurrage costs</p>
                </div>
            </div>

            <div className="space-y-6">
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1.5">Allowed Laytime (Days)</label>
                        <div className="relative">
                            <Calendar className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                            <input
                                type="number"
                                value={allowedDays}
                                onChange={(e) => setAllowedDays(e.target.value)}
                                className="input pl-10 focus:ring-amber-500"
                                placeholder="e.g. 3.5"
                            />
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1.5">Used Laytime (Days)</label>
                        <div className="relative">
                            <Clock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                            <input
                                type="number"
                                value={usedDays}
                                onChange={(e) => setUsedDays(e.target.value)}
                                className="input pl-10 focus:ring-amber-500"
                                placeholder="e.g. 5.2"
                            />
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1.5">Demurrage Rate (USD/Day)</label>
                        <div className="relative">
                            <DollarSign className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                            <input
                                type="number"
                                value={demRate}
                                onChange={(e) => setDemRate(e.target.value)}
                                className="input pl-10 focus:ring-amber-500"
                                placeholder="e.g. 45000"
                            />
                        </div>
                    </div>
                </div>

                <div className="mt-8 rounded-xl bg-slate-50 p-6 space-y-4 ring-1 ring-slate-200">
                    <div className="flex justify-between text-sm">
                        <span className="text-slate-600 font-medium">Time on Demurrage</span>
                        <span className={`font-bold ${demurrageTime > 0 ? 'text-rose-600' : 'text-slate-900'}`}>
                            {demurrageTime.toFixed(4)} Days
                        </span>
                    </div>
                    <div className="border-t border-slate-200 pt-4 flex justify-between items-end">
                        <span className="font-bold text-slate-900">Total Demurrage</span>
                        <span className="text-2xl font-bold text-slate-900 tracking-tight">
                            ${demurrageAmount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}
