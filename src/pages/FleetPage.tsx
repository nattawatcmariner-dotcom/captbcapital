import React, { useState, useEffect } from 'react';
import { ShipList } from '../components/ships/ShipList';
import { AddShipModal } from '../components/ships/AddShipModal';
import { shipService } from '../services/shipService';
import { Ship } from '../types/models';
import { Plus, Ship as ShipIcon, Loader2, LayoutGrid, List } from 'lucide-react';

export function FleetPage() {
    const [ships, setShips] = useState<Ship[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingShip, setEditingShip] = useState<Ship | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

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
        } catch (error: any) {
            console.error('Failed to add ship:', error);
            alert(`Failed to add ship. Error: ${error.message || JSON.stringify(error)}`);
            throw error;
        }
    };

    const handleUpdateShip = async (id: string, updates: Partial<Ship>) => {
        try {
            const updatedShip = await shipService.updateShip(id, updates);
            setShips(prev => prev.map(ship => ship.id === id ? updatedShip : ship));
        } catch (error: any) {
            console.error('Failed to update ship:', error);
            alert(`Failed to update ship. Error: ${error.message}`);
            throw error;
        }
    };

    const handleDeleteShip = async (id: string) => {
        if (window.confirm('Are you sure you want to delete this vessel?')) {
            try {
                // Optimistic Update: Remove immediately from UI
                setShips(prev => prev.filter(ship => ship.id !== id));

                // Then perform actual delete
                await shipService.deleteShip(id);
            } catch (error) {
                console.error('Failed to delete ship:', error);
                // Optional: Revert state if needed, but since we fallback to local, it usually succeeds.
                alert('Failed to delete ship. Please refresh.');
            }
        }
    };

    return (
        <div className="space-y-8 animate-in text-sm md:text-base">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl md:text-3xl font-bold text-slate-900 tracking-tight">Fleet Management</h1>
                    <p className="mt-1 md:mt-2 text-slate-600">Manage your vessel fleet and details</p>
                </div>
                <div className="flex items-center gap-3 self-start md:self-auto">
                    <div className="flex items-center bg-slate-100 rounded-lg p-1 border border-slate-200">
                        <button
                            onClick={() => setViewMode('grid')}
                            className={`p-1.5 rounded-md transition-all ${viewMode === 'grid' ? 'bg-white shadow-sm text-accent' : 'text-slate-400 hover:text-slate-600'}`}
                            title="Grid View"
                        >
                            <LayoutGrid className="h-4 w-4" />
                        </button>
                        <button
                            onClick={() => setViewMode('list')}
                            className={`p-1.5 rounded-md transition-all ${viewMode === 'list' ? 'bg-white shadow-sm text-accent' : 'text-slate-400 hover:text-slate-600'}`}
                            title="List View"
                        >
                            <List className="h-4 w-4" />
                        </button>
                    </div>
                    <button
                        onClick={() => {
                            setEditingShip(null);
                            setIsModalOpen(true);
                        }}
                        className="flex items-center gap-2 px-4 py-2 bg-accent text-white rounded-lg hover:bg-accent-dark transition-colors shadow-sm shadow-accent/20"
                    >
                        <Plus className="h-5 w-5" />
                        <span>Add Vessel</span>
                    </button>
                </div>
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
                <ShipList
                    ships={ships}
                    viewMode={viewMode}
                    onDelete={handleDeleteShip}
                    onEdit={(ship) => {
                        setEditingShip(ship);
                        setIsModalOpen(true);
                    }}
                />
            )}

            <AddShipModal
                isOpen={isModalOpen}
                onClose={() => {
                    setIsModalOpen(false);
                    setEditingShip(null);
                }}
                onAdd={handleAddShip}
                onUpdate={handleUpdateShip}
                initialData={editingShip}
            />
        </div>
    );
}
