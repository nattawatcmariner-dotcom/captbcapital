import React, { useState } from 'react';
import { ShipList } from '../components/ships/ShipList';
import { AddShipModal } from '../components/ships/AddShipModal';
import { fleetData } from '../services/mockData';
import { Ship } from '../types';
import { Plus, Ship as ShipIcon } from 'lucide-react';

export function FleetPage() {
    const [ships, setShips] = useState<Ship[]>(fleetData);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleAddShip = (newShipData: Omit<Ship, 'id'>) => {
        const newShip: Ship = {
            ...newShipData,
            id: Math.random().toString(36).substr(2, 9), // Simple ID generation
        };
        setShips([...ships, newShip]);
    };

    const handleDeleteShip = (id: string) => {
        if (window.confirm('Are you sure you want to delete this vessel?')) {
            setShips(ships.filter(ship => ship.id !== id));
        }
    };

    return (
        <div className="space-y-8 animate-in">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Fleet Management</h1>
                    <p className="mt-2 text-slate-600">Manage your vessel fleet and details</p>
                </div>
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="flex items-center gap-2 px-4 py-2 bg-accent text-white rounded-lg hover:bg-accent-dark transition-colors shadow-sm shadow-accent/20"
                >
                    <Plus className="h-5 w-5" />
                    <span>Add Vessel</span>
                </button>
            </div>

            {ships.length === 0 ? (
                <div className="text-center py-12 bg-white rounded-xl border border-slate-200 border-dashed">
                    <div className="mx-auto h-12 w-12 text-slate-300 mb-4">
                        <ShipIcon className="h-full w-full" />
                    </div>
                    <h3 className="text-lg font-medium text-slate-900">No vessels found</h3>
                    <p className="text-slate-500 mt-1">Get started by adding a new vessel to your fleet.</p>
                </div>
            ) : (
                <ShipList ships={ships} onDelete={handleDeleteShip} />
            )}

            <AddShipModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onAdd={handleAddShip}
            />
        </div>
    );
}
