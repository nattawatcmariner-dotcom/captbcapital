import React from 'react';
import { LaytimeStatement } from '../components/laytime/LaytimeStatement';

export function LaytimePage() {
    return (
        <div className="space-y-6 animate-in">
            <div>
                <h1 className="text-2xl font-bold text-slate-900">Laytime Management</h1>
                <p className="mt-2 text-slate-600">Create and manage Statement of Facts (SOF) for laytime calculations.</p>
            </div>

            <LaytimeStatement />
        </div>
    );
}
