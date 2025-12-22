import React from 'react';
import { FileText, MoreHorizontal } from 'lucide-react';

const voyages = [
    { id: 'V001', vessel: 'MT Ocean Queen', route: 'Ras Tanura - Ningbo', cargo: 'Crude Oil', tce: '$45,200', result: 'Completed' },
    { id: 'V002', vessel: 'MT Pacific Star', route: 'Fujairah - Singapore', cargo: 'Fuel Oil', tce: '$38,500', result: 'In Progress' },
    { id: 'V003', vessel: 'MT Atlantic Rose', route: 'Rotterdam - New York', cargo: 'Gasoline', tce: '$29,800', result: 'Completed' },
    { id: 'V004', vessel: 'MT Ocean Queen', route: 'Basrah - Cochin', cargo: 'Crude Oil', tce: '$41,000', result: 'Completed' },
];

export function VoyageReport() {
    return (
        <div className="card overflow-hidden">
            <div className="border-b border-slate-200 px-6 py-5 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-indigo-50 rounded-lg">
                        <FileText className="h-5 w-5 text-indigo-600" />
                    </div>
                    <div>
                        <h3 className="text-lg font-bold text-slate-900">Recent Voyages</h3>
                        <p className="text-sm text-slate-500">Commercial results overview</p>
                    </div>
                </div>
                <button className="btn btn-secondary text-xs">View All</button>
            </div>

            <div className="overflow-x-auto">
                <table className="table">
                    <thead>
                        <tr>
                            <th className="px-6 py-4">Voyage ID</th>
                            <th className="px-6 py-4">Vessel</th>
                            <th className="px-6 py-4">Route</th>
                            <th className="px-6 py-4">Cargo</th>
                            <th className="px-6 py-4">TCE (Daily)</th>
                            <th className="px-6 py-4">Status</th>
                            <th className="px-6 py-4"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {voyages.map((voyage) => (
                            <tr key={voyage.id} className="group">
                                <td className="px-6 py-4 font-medium text-slate-900">{voyage.id}</td>
                                <td className="px-6 py-4 font-medium text-slate-700">{voyage.vessel}</td>
                                <td className="px-6 py-4 text-slate-600">{voyage.route}</td>
                                <td className="px-6 py-4 text-slate-600">{voyage.cargo}</td>
                                <td className="px-6 py-4 font-bold text-emerald-600">{voyage.tce}</td>
                                <td className="px-6 py-4">
                                    <span className={`badge ${voyage.result === 'Completed'
                                            ? 'bg-slate-100 text-slate-700 ring-slate-200'
                                            : 'bg-sky-50 text-sky-700 ring-sky-200'
                                        }`}>
                                        {voyage.result}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <button className="p-1 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors">
                                        <MoreHorizontal className="h-4 w-4" />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
