import React from 'react';
import { CharterPartyTerms } from '../../types/laytime';
import { Settings, Calculator, DollarSign, Clock } from 'lucide-react';

interface Props {
    terms: CharterPartyTerms;
    onChange: (terms: CharterPartyTerms) => void;
}

export function CharterTermsForm({ terms, onChange }: Props) {
    const handleChange = (field: keyof CharterPartyTerms, value: any) => {
        onChange({ ...terms, [field]: value });
    };

    return (
        <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
                <Settings className="h-5 w-5 text-accent" />
                Charter Party Terms
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Charter Clause</label>
                        <select
                            className="w-full rounded-lg border-slate-300 focus:border-accent focus:ring-accent"
                            value={terms.charterType}
                            onChange={(e) => handleChange('charterType', e.target.value)}
                        >
                            <option value="SHELLVOY6">SHELLVOY 6</option>
                            <option value="ASBATANKVOY">ASBATANKVOY</option>
                            <option value="GENERIC">Generic / CP</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Allowed Laytime (Hours)</label>
                        <div className="relative">
                            <Clock className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                            <input
                                type="number"
                                className="w-full pl-10 rounded-lg border-slate-300 focus:border-accent focus:ring-accent"
                                value={terms.allowedLaytimeHours}
                                onChange={(e) => handleChange('allowedLaytimeHours', Number(e.target.value))}
                            />
                        </div>
                        <p className="text-xs text-slate-500 mt-1">e.g. 72 or 96 hours</p>
                    </div>
                </div>

                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Demurrage Rate (USD/Day)</label>
                        <div className="relative">
                            <DollarSign className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                            <input
                                type="number"
                                className="w-full pl-10 rounded-lg border-slate-300 focus:border-accent focus:ring-accent"
                                value={terms.demurrageRatePerDay}
                                onChange={(e) => handleChange('demurrageRatePerDay', Number(e.target.value))}
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">NOR Waiting Time (Hours)</label>
                        <div className="relative">
                            <input
                                type="number"
                                className="w-full rounded-lg border-slate-300 focus:border-accent focus:ring-accent"
                                value={terms.norTenderedWaitTime}
                                onChange={(e) => handleChange('norTenderedWaitTime', Number(e.target.value))}
                            />
                        </div>
                        <p className="text-xs text-slate-500 mt-1">Usually 6 hours</p>
                    </div>
                </div>
            </div>

            <div className="mt-6 flex gap-4 border-t pt-4">
                <label className="flex items-center gap-2 text-sm text-slate-700">
                    <input
                        type="checkbox"
                        checked={terms.isShinc}
                        onChange={(e) => handleChange('isShinc', e.target.checked)}
                        className="rounded border-slate-300 text-accent focus:ring-accent"
                    />
                    SHINC (Sundays/Holidays Included)
                </label>

                <label className="flex items-center gap-2 text-sm text-slate-700">
                    <input
                        type="checkbox"
                        checked={terms.alwaysAccessible}
                        onChange={(e) => handleChange('alwaysAccessible', e.target.checked)}
                        className="rounded border-slate-300 text-accent focus:ring-accent"
                    />
                    Reachable on Arrival
                </label>
            </div>
        </div>
    );
}
