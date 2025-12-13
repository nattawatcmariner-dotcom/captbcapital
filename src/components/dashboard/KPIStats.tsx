import React from 'react';
import { kpiData } from '../../services/mockData';
import { cn } from '../../lib/utils';

export function KPIStats() {
    return (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {kpiData.map((item, index) => (
                <div
                    key={item.title}
                    className="card card-hover p-6 relative overflow-hidden group animate-in"
                    style={{ animationDelay: `${index * 100}ms` }}
                >
                    <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                        <item.icon className={cn("h-24 w-24", item.color)} />
                    </div>
                    <div className="relative z-10">
                        <div className="flex items-center justify-between mb-4">
                            <div className={cn("rounded-xl p-3 ring-1 ring-inset", item.bgColor, item.color.replace('text-', 'ring-').replace('500', '200'))}>
                                <item.icon className={cn("h-6 w-6", item.color)} />
                            </div>
                            <span className={cn("text-xs font-bold px-2.5 py-1 rounded-full",
                                item.change.startsWith('+')
                                    ? 'bg-emerald-50 text-emerald-700 ring-1 ring-emerald-600/20'
                                    : 'bg-rose-50 text-rose-700 ring-1 ring-rose-600/20'
                            )}>
                                {item.change}
                            </span>
                        </div>
                        <div>
                            <p className="text-sm font-medium text-slate-500">{item.title}</p>
                            <h3 className="mt-1 text-3xl font-bold tracking-tight text-slate-900">{item.value}</h3>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}
