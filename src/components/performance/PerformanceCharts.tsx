import React from 'react';
import { BarChart2 } from 'lucide-react';

export function PerformanceCharts() {
    const data = [
        { name: 'Day 1', speed: 12.5, consumption: 38 },
        { name: 'Day 2', speed: 12.8, consumption: 40 },
        { name: 'Day 3', speed: 13.0, consumption: 42 },
        { name: 'Day 4', speed: 12.6, consumption: 39 },
        { name: 'Day 5', speed: 12.2, consumption: 37 },
        { name: 'Day 6', speed: 11.8, consumption: 35 },
        { name: 'Day 7', speed: 12.0, consumption: 36 },
    ];

    const maxSpeed = Math.max(...data.map(d => d.speed));
    const maxConsumption = Math.max(...data.map(d => d.consumption));

    return (
        <div className="card p-6">
            <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-slate-100 rounded-lg">
                        <BarChart2 className="h-5 w-5 text-slate-600" />
                    </div>
                    <div>
                        <h3 className="text-lg font-bold text-slate-900">Speed vs Consumption</h3>
                        <p className="text-sm text-slate-500">Last 7 days performance analysis</p>
                    </div>
                </div>
                <div className="flex gap-4 text-sm">
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-sky-500"></div>
                        <span className="text-slate-600">Speed</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-amber-500"></div>
                        <span className="text-slate-600">Consumption</span>
                    </div>
                </div>
            </div>

            <div className="space-y-6">
                {data.map((item, index) => (
                    <div key={index} className="group">
                        <div className="flex items-center gap-4 mb-2">
                            <div className="w-16 text-sm font-medium text-slate-500">{item.name}</div>
                            <div className="flex-1 space-y-2">
                                {/* Speed Bar */}
                                <div className="flex items-center gap-3">
                                    <div className="flex-1 h-2.5 bg-slate-100 rounded-full overflow-hidden">
                                        <div
                                            className="h-full bg-sky-500 rounded-full transition-all duration-500 ease-out group-hover:bg-sky-400"
                                            style={{ width: `${(item.speed / maxSpeed) * 100}%` }}
                                        />
                                    </div>
                                    <div className="w-16 text-xs font-semibold text-slate-700 text-right">{item.speed} kts</div>
                                </div>
                                {/* Consumption Bar */}
                                <div className="flex items-center gap-3">
                                    <div className="flex-1 h-2.5 bg-slate-100 rounded-full overflow-hidden">
                                        <div
                                            className="h-full bg-amber-500 rounded-full transition-all duration-500 ease-out group-hover:bg-amber-400"
                                            style={{ width: `${(item.consumption / maxConsumption) * 100}%` }}
                                        />
                                    </div>
                                    <div className="w-16 text-xs font-semibold text-slate-700 text-right">{item.consumption} MT</div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
