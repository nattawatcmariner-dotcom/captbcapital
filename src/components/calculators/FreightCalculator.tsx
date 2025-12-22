import React, { useState } from 'react';
import { Calculator, DollarSign, Percent, Scale } from 'lucide-react';

export function FreightCalculator() {
    const [qty, setQty] = useState('');
    const [rate, setRate] = useState('');
    const [commission, setCommission] = useState('1.25');

    const quantity = parseFloat(qty) || 0;
    const freightRate = parseFloat(rate) || 0;
    const commPercent = parseFloat(commission) || 0;

    const totalFreight = quantity * freightRate;
    const commAmount = (totalFreight * commPercent) / 100;
    const netFreight = totalFreight - commAmount;

    return (
        <div className="card p-8 h-full">
            <div className="mb-8 flex items-center gap-4">
                <div className="rounded-xl bg-sky-50 p-3 ring-1 ring-sky-100">
                    <Calculator className="h-6 w-6 text-sky-600" />
                </div>
                <div>
                    <h3 className="text-xl font-bold text-slate-900 tracking-tight">Freight Calculator</h3>
                    <p className="text-sm text-slate-500">Calculate net freight earnings</p>
                </div>
            </div>

            <div className="space-y-6">
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1.5">Quantity (MT)</label>
                        <div className="relative">
                            <Scale className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                            <input
                                type="number"
                                value={qty}
                                onChange={(e) => setQty(e.target.value)}
                                className="input pl-10"
                                placeholder="e.g. 270000"
                            />
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1.5">Rate (WS / USD)</label>
                        <div className="relative">
                            <DollarSign className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                            <input
                                type="number"
                                value={rate}
                                onChange={(e) => setRate(e.target.value)}
                                className="input pl-10"
                                placeholder="e.g. 85.50"
                            />
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1.5">Commission (%)</label>
                        <div className="relative">
                            <Percent className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                            <input
                                type="number"
                                value={commission}
                                onChange={(e) => setCommission(e.target.value)}
                                className="input pl-10"
                            />
                        </div>
                    </div>
                </div>

                <div className="mt-8 rounded-xl bg-slate-50 p-6 space-y-4 ring-1 ring-slate-200">
                    <div className="flex justify-between text-sm">
                        <span className="text-slate-600 font-medium">Total Freight</span>
                        <span className="font-semibold text-slate-900">${totalFreight.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                        <span className="text-slate-600 font-medium">Commission</span>
                        <span className="font-semibold text-rose-600">-${commAmount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                    </div>
                    <div className="border-t border-slate-200 pt-4 flex justify-between items-end">
                        <span className="font-bold text-slate-900">Net Freight</span>
                        <span className="text-2xl font-bold text-emerald-600 tracking-tight">
                            ${netFreight.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}
