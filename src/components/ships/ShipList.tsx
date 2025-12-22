import React from 'react';
import { Ship } from '../../types/models';
import { MoreHorizontal, Trash2, MapPin, Anchor, Edit } from 'lucide-react';

interface ShipListProps {
    ships: Ship[];
    onDelete: (id: string) => void;
    onEdit: (ship: Ship) => void;
    viewMode: 'grid' | 'list';
}

export function ShipList({ ships, onDelete, onEdit, viewMode }: ShipListProps) {
    if (viewMode === 'list') {
        return (
            <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm overflow-x-auto">
                <table className="w-full text-left border-collapse min-w-[800px]">
                    <thead>
                        <tr className="bg-slate-50 border-b border-slate-200 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                            <th className="px-6 py-4">Vessel Name</th>
                            <th className="px-6 py-4">Type</th>
                            <th className="px-6 py-4">Status</th>
                            <th className="px-6 py-4">Destination</th>
                            <th className="px-6 py-4 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                        {ships.map((ship) => (
                            <tr key={ship.id} className="hover:bg-slate-50 group transition-colors">
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-3">
                                        <div className="h-8 w-8 rounded-lg bg-indigo-50 flex items-center justify-center">
                                            <Anchor className="h-4 w-4 text-indigo-600" />
                                        </div>
                                        <span className="font-medium text-slate-900">{ship.name}</span>
                                    </div>
                                </td>
                                <td className="px-6 py-4 text-sm text-slate-600">{ship.type}</td>
                                <td className="px-6 py-4">
                                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${ship.status === 'In Transit' ? 'bg-blue-50 text-blue-700' :
                                        ship.status === 'Loading' ? 'bg-amber-50 text-amber-700' :
                                            ship.status === 'Discharging' ? 'bg-orange-50 text-orange-700' :
                                                'bg-slate-100 text-slate-700'
                                        }`}>
                                        {ship.status}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-sm text-slate-600">
                                    <div className="flex items-center gap-1.5">
                                        <MapPin className="h-3 w-3 text-slate-400" />
                                        {ship.destination || '-'}
                                    </div>
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <button
                                            onClick={() => onEdit(ship)}
                                            className="p-1.5 text-slate-400 hover:text-accent hover:bg-accent/10 rounded-lg transition-colors"
                                        >
                                            <Edit className="h-4 w-4" />
                                        </button>
                                        <button
                                            onClick={() => onDelete(ship.id)}
                                            className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                                        >
                                            <Trash2 className="h-4 w-4" />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {ships.map((ship) => (
                <div key={ship.id} className="group bg-white rounded-xl border border-slate-200 p-5 hover:border-accent hover:shadow-md transition-all duration-200">
                    <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-3">
                            <div className="h-10 w-10 rounded-lg bg-indigo-50 flex items-center justify-center">
                                <Anchor className="h-5 w-5 text-indigo-600" />
                            </div>
                            <div>
                                <h3 className="font-bold text-slate-900">{ship.name}</h3>
                                <p className="text-xs text-slate-500">{ship.type}</p>
                            </div>
                        </div>
                        <div className="relative flex gap-2">
                            <button
                                onClick={() => onEdit(ship)}
                                className="p-2 text-slate-400 hover:text-accent hover:bg-accent/10 rounded-lg transition-colors opacity-0 group-hover:opacity-100"
                                title="Edit Vessel"
                            >
                                <Edit className="h-4 w-4" />
                            </button>
                            <button
                                onClick={() => onDelete(ship.id)}
                                className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors opacity-0 group-hover:opacity-100"
                                title="Delete Vessel"
                            >
                                <Trash2 className="h-4 w-4" />
                            </button>
                        </div>
                    </div>

                    <div className="space-y-3">
                        <div className="flex items-center justify-between text-sm">
                            <span className="text-slate-500">Status</span>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${ship.status === 'In Transit' ? 'bg-blue-50 text-blue-700' :
                                ship.status === 'Loading' ? 'bg-amber-50 text-amber-700' :
                                    ship.status === 'Discharging' ? 'bg-orange-50 text-orange-700' :
                                        ship.status === 'Waiting' ? 'bg-slate-100 text-slate-700' :
                                            'bg-slate-100 text-slate-700'
                                }`}>
                                {ship.status}
                            </span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                            <span className="text-slate-500 flex items-center gap-1">
                                <MapPin className="h-3 w-3" /> Destination
                            </span>
                            <span className="font-medium text-slate-900">{ship.destination}</span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                            <span className="text-slate-500">Cargo</span>
                            <span className="font-medium text-slate-900">{ship.cargo || 'N/A'}</span>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}
