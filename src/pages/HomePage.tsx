import React, { useEffect, useState } from 'react';
import { KPIStats } from '../components/dashboard/KPIStats';
import { ShipMap } from '../components/dashboard/ShipMap';
import { AlertTriangle, Info, Clock } from 'lucide-react';
import { fetchAlerts, Alert } from '../services/api';

export function HomePage() {
    const [alerts, setAlerts] = useState<any[]>([]);

    useEffect(() => {
        const loadAlerts = async () => {
            try {
                const data = await fetchAlerts();
                const formattedAlerts = data.map(alert => ({
                    ...alert,
                    desc: alert.description, // Map description to desc
                    time: new Date(alert.created_at).toLocaleDateString(), // Simple date formatting
                    icon: alert.type === 'warning' ? AlertTriangle : alert.type === 'alert' ? Clock : Info
                }));
                setAlerts(formattedAlerts);
            } catch (error) {
                console.error("Failed to load alerts", error);
            }
        };
        loadAlerts();
    }, []);

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
                        {alerts.length === 0 ? (
                            <p className="text-slate-500 text-sm">No recent alerts</p>
                        ) : (
                            alerts.map((alert, i) => {
                                const Icon = alert.icon;
                                return (
                                    <div
                                        key={alert.id || i}
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
                            })
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
