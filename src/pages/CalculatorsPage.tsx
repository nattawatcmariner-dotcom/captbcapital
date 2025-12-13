import React from 'react';
import { FreightCalculator } from '../components/calculators/FreightCalculator';
import { DemurrageCalculator } from '../components/calculators/DemurrageCalculator';

export function CalculatorsPage() {
    return (
        <div className="space-y-8 animate-in">
            <div>
                <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Commercial Calculators</h1>
                <p className="mt-2 text-slate-600">Tools for quick freight and demurrage estimations</p>
            </div>

            <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
                <div className="animate-slide-up" style={{ animationDelay: '100ms' }}>
                    <FreightCalculator />
                </div>
                <div className="animate-slide-up" style={{ animationDelay: '200ms' }}>
                    <DemurrageCalculator />
                </div>
            </div>
        </div>
    );
}
