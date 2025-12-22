import React from 'react';
import { PerformanceCharts } from '../components/performance/PerformanceCharts';
import { VoyageReport } from '../components/performance/VoyageReport';
import { VoyagePerformanceDetail } from '../components/performance/VoyagePerformanceDetail';
import { TrendingUp, Activity, BarChart3 } from 'lucide-react';

export function PerformancePage() {
    return (
        <div className="space-y-8 animate-in">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Vessel Performance</h1>
                    <p className="mt-2 text-slate-600">Analysis of fleet efficiency and commercial results</p>
                </div>
                <div className="flex gap-3">
                    <div className="flex items-center gap-2 px-4 py-2 bg-emerald-50 text-emerald-700 rounded-lg border border-emerald-100">
                        <TrendingUp className="h-4 w-4" />
                        <span className="text-sm font-medium">Efficiency +2.4%</span>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
                <div className="lg:col-span-2 animate-slide-up" style={{ animationDelay: '100ms' }}>
                    <PerformanceCharts />
                </div>
                <div className="animate-slide-up" style={{ animationDelay: '200ms' }}>
                    <div className="card p-6 h-full">
                        <h3 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2">
                            <Activity className="h-5 w-5 text-accent" />
                            Quick Stats
                        </h3>
                        <div className="space-y-6">
                            <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
                                <p className="text-sm text-slate-500 mb-1">Avg. Speed</p>
                                <p className="text-2xl font-bold text-slate-900">12.4 <span className="text-sm font-normal text-slate-500">kts</span></p>
                            </div>
                            <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
                                <p className="text-sm text-slate-500 mb-1">Avg. Consumption</p>
                                <p className="text-2xl font-bold text-slate-900">38.2 <span className="text-sm font-normal text-slate-500">MT/day</span></p>
                            </div>
                            <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
                                <p className="text-sm text-slate-500 mb-1">Fleet Utilization</p>
                                <p className="text-2xl font-bold text-slate-900">94.5 <span className="text-sm font-normal text-slate-500">%</span></p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="animate-slide-up" style={{ animationDelay: '300ms' }}>
                <VoyageReport />
            </div>

            <div className="animate-slide-up" style={{ animationDelay: '400ms' }}>
                <h2 className="text-xl font-bold text-slate-900 mb-4">Detailed Voyage Analysis</h2>
                <VoyagePerformanceDetail />
            </div>
        </div>
    );
}
