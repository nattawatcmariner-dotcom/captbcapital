
import React from 'react';
import { Construction } from 'lucide-react';

export function StandardPlaceholder() {
    return (
        <div className="flex flex-col items-center justify-center h-[50vh] text-center p-6">
            <div className="bg-slate-100 p-4 rounded-full mb-4">
                <Construction className="h-10 w-10 text-slate-400" />
            </div>
            <h2 className="text-xl font-semibold text-slate-900 mb-2">Under Development</h2>
            <p className="text-slate-500 max-w-md">
                This module is part of the Standard feature set and will be implemented soon.
                Please check back later.
            </p>
        </div>
    );
}
