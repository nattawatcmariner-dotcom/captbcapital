import React from 'react';
import { Ship } from '../../types';
import { MoreHorizontal, Trash2, MapPin, Anchor } from 'lucide-react';

interface ShipListProps {
    ships: Ship[];
    onDelete: (id: string) => void;
}

export function ShipList({ ships, onDelete }: ShipListProps) {
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
                        <div className="relative">
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
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${ship.status === 'Laden' ? 'bg-emerald-50 text-emerald-700' :
                                    ship.status === 'Ballast' ? 'bg-blue-50 text-blue-700' :
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
                            <span className="font-medium text-slate-900">{ship.cargo}</span>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}
