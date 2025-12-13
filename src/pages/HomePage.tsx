import React from 'react';
import { KPIStats } from '../components/dashboard/KPIStats';
import { ShipMap } from '../components/dashboard/ShipMap';
import { AlertTriangle, Info, Clock } from 'lucide-react';

export function HomePage() {
    const alerts = [
        {
            title: 'Demurrage Warning',
            desc: 'MT Ocean Queen at Ningbo',
            time: '2h ago',
            type: 'warning',
            icon: AlertTriangle
        },
        {
            title: 'New Fixture',
            desc: 'MT Pacific Star - Ras Tanura',
            time: '5h ago',
            type: 'info',
            icon: Info
        },
        {
            title: 'ETA Update',
            desc: 'MT Atlantic Rose delayed 12h',
            time: '1d ago',
            type: 'alert',
            icon: Clock
        },
    ];

    const getAlertColor = (type: string) => {
        switch (type) {
            case 'warning':
                return 'bg-amber-50 text-amber-700 border-amber-200';
            case 'alert':
                return 'bg-rose-50 text-rose-700 border-rose-200';
            default:
                return 'bg-sky-50 text-sky-700 border-sky-200';
        }
    };

    const getIconColor = (type: string) => {
        switch (type) {
            case 'warning':
                return 'text-amber-600';
            case 'alert':
                return 'text-rose-600';
            default:
                return 'text-sky-600';
        }
    };

    return (
        <div className="space-y-8 animate-in">
            {/* Page Header */}
            <div>
                <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Dashboard</h1>
                <p className="mt-2 text-slate-600">Overview of fleet performance and commercial operations</p>
            </div>

            {/* KPI Stats */}
            <KPIStats />

            {/* Map and Alerts Grid */}
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                {/* Fleet Map */}
                <div className="lg:col-span-2 animate-slide-up">
                    <div className="mb-4">
                        <h3 className="text-lg font-semibold text-slate-900">Live Fleet Map</h3>
                        <p className="text-sm text-slate-600">Real-time vessel positions</p>
                    </div>
                    <ShipMap />
                </div>

                {/* Recent Alerts */}
                <div className="card p-6">
                    <h3 className="mb-6 text-lg font-semibold text-slate-900">Recent Alerts</h3>
                    <div className="space-y-4">
                        {alerts.map((alert, i) => {
                            const Icon = alert.icon;
                            return (
                                <div
                                    key={i}
                                    className={`flex items-start gap-3 rounded-lg border p-4 transition-all duration-200 hover:shadow-md ${getAlertColor(alert.type)}`}
                                    style={{ animationDelay: `${i * 100}ms` }}
                                >
                                    <div className={`mt-0.5 rounded-lg bg-white p-2 ${getIconColor(alert.type)}`}>
                                        <Icon className="h-4 w-4" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="font-semibold text-slate-900">{alert.title}</p>
                                        <p className="mt-1 text-sm text-slate-600">{alert.desc}</p>
                                        <p className="mt-2 text-xs text-slate-500">{alert.time}</p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
}
