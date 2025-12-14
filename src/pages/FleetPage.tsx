import React, { useState, useEffect } from 'react';
import { ShipList } from '../components/ships/ShipList';
import { AddShipModal } from '../components/ships/AddShipModal';
import { shipService } from '../services/shipService';
import { Ship } from '../types/models';
import { Plus, Ship as ShipIcon, Loader2 } from 'lucide-react';

export function FleetPage() {
    const [ships, setShips] = useState<Ship[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        loadShips();
    }, []);

    const loadShips = async () => {
        try {
            setIsLoading(true);
            const data = await shipService.getAllShips();
            setShips(data);
        } catch (error) {
            console.error('Failed to load ships:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleAddShip = async (newShipData: Omit<Ship, 'id'>) => {
        try {
            const addedShip = await shipService.addShip(newShipData);
            setShips(prev => [addedShip, ...prev]);
            // If using Supabase, it returns the real object.
            // If using mock, it returns a mock object.
        } catch (error: any) {
            console.error('Failed to add ship:', error);
            alert(`Failed to add ship. Error: ${error.message || JSON.stringify(error)}`);
        }
    };

    const handleDeleteShip = async (id: string) => {
        if (window.confirm('Are you sure you want to delete this vessel?')) {
            try {
                await shipService.deleteShip(id);
                setShips(prev => prev.filter(ship => ship.id !== id));
            } catch (error) {
                console.error('Failed to delete ship:', error);
                alert('Failed to delete ship. Please try again.');
            }
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

            {isLoading ? (
                <div className="flex justify-center items-center py-20">
                    <Loader2 className="h-10 w-10 text-accent animate-spin" />
                </div>
            ) : ships.length === 0 ? (
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
