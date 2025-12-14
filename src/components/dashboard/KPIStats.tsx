import React, { useEffect, useState } from 'react';
import { cn } from '../../lib/utils';
import { Ship, Anchor, AlertTriangle, CheckCircle, Activity, TrendingUp, BarChart3, Clock } from 'lucide-react';
import { fetchKpiMetrics, KpiMetric } from '../../services/api';

const iconMap: Record<string, React.ElementType> = {
    'Ship': Ship,
    'Anchor': Anchor,
    'AlertTriangle': AlertTriangle,
    'CheckCircle': CheckCircle,
    'Activity': Activity,
    'TrendingUp': TrendingUp,
    'BarChart3': BarChart3,
    'Clock': Clock
};

export function KPIStats() {
    const [metrics, setMetrics] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadMetrics = async () => {
            try {
                const data = await fetchKpiMetrics();
                // Map API data to component format
                const formattedData = data.map((item) => ({
                    ...item,
                    icon: iconMap[item.icon_name] || Activity, // Fallback icon
                    color: item.change.startsWith('+') ? 'text-emerald-500' : 'text-rose-500', // Simplified color logic or keep from DB if added
                    // Re-using the mock data logic for colors if needed, or defaults
                    bgColor: item.change.startsWith('+') ? 'bg-emerald-100' : 'bg-rose-100',
                }));
                // Override colors based on specific metrics if needed (like in mockData)
                // For now, let's stick to a simple mapping or just pass color from DB if we added it.
                // Let's refine the color logic to match the visual style of the mock data.
                const refinedData = formattedData.map(m => {
                    if (m.label.includes('Active')) return { ...m, color: 'text-blue-500', bgColor: 'bg-blue-100' };
                    if (m.label.includes('Utilization')) return { ...m, color: 'text-green-500', bgColor: 'bg-green-100' };
                    if (m.label.includes('Risk')) return { ...m, color: 'text-amber-500', bgColor: 'bg-amber-100' };
                    return { ...m, color: 'text-indigo-500', bgColor: 'bg-indigo-100' };
                });

                setMetrics(refinedData);
            } catch (error) {
                console.error("Failed to load KPIs:", error);
            } finally {
                setLoading(false);
            }
        };
        loadMetrics();
    }, []);

    if (loading) {
        return <div className="p-6 text-center text-slate-500">Loading KPIs...</div>;
    }

    return (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {metrics.map((item, index) => (
                <div
                    key={item.id}
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
                            <p className="text-sm font-medium text-slate-500">{item.label}</p>
                            <h3 className="mt-1 text-3xl font-bold tracking-tight text-slate-900">{item.value}</h3>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}
