import React, { useState, useEffect } from 'react';
import { ShipMap } from '../components/dashboard/ShipMap';
import { Search, Filter, Ship as ShipIcon, Navigation, Anchor, AlertTriangle, RefreshCw, Plus, Trash2 } from 'lucide-react';
import { shipService } from '../services/shipService';
import { Ship } from '../types/models';
import { AddShipModal } from '../components/ships/AddShipModal';

export function MonitorPage() {
    const [ships, setShips] = useState<Ship[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('All Status');
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);

    const fetchShips = async () => {
        setLoading(true);
        setError(null);
        try {
            const data = await shipService.getAllShips();
            setShips(data);
        } catch (err) {
            setError('Failed to load fleet data. Please try again.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteShip = async (e: React.MouseEvent, id: string) => {
        e.stopPropagation();
        if (window.confirm('Are you sure you want to delete this vessel?')) {
            try {
                await shipService.deleteShip(id);
                fetchShips(); // Refresh list
            } catch (err) {
                console.error('Failed to delete ship', err);
            }
        }
    };

    useEffect(() => {
        fetchShips();
    }, []);

    const filteredShips = ships.filter(ship => {
        const matchesSearch = ship.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            ship.location.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = statusFilter === 'All Status' || ship.status === statusFilter;
        return matchesSearch && matchesStatus;
    });

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'In Transit': return 'bg-emerald-50 text-emerald-700 ring-emerald-200';
            case 'Loading': return 'bg-sky-50 text-sky-700 ring-sky-200';
            case 'Discharging': return 'bg-indigo-50 text-indigo-700 ring-indigo-200';
            case 'Waiting': return 'bg-amber-50 text-amber-700 ring-amber-200';
            default: return 'bg-slate-50 text-slate-700 ring-slate-200';
        }
    };

    return (
        <div className="space-y-6 animate-in">
            <AddShipModal
                isOpen={isAddModalOpen}
                onClose={() => setIsAddModalOpen(false)}
                onShipAdded={fetchShips}
            />

            {/* Header Stats */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                <div className="card p-4 flex items-center gap-4">
                    <div className="p-3 bg-sky-50 rounded-xl text-sky-600">
                        <ShipIcon className="h-6 w-6" />
                    </div>
                    <div>
                        <p className="text-sm font-medium text-slate-500">Total Fleet</p>
                        <h3 className="text-2xl font-bold text-slate-900">{ships.length}</h3>
                    </div>
                </div>
                <div className="card p-4 flex items-center gap-4">
                    <div className="p-3 bg-emerald-50 rounded-xl text-emerald-600">
                        <Navigation className="h-6 w-6" />
                    </div>
                    <div>
                        <p className="text-sm font-medium text-slate-500">In Transit</p>
                        <h3 className="text-2xl font-bold text-slate-900">
                            {ships.filter(s => s.status === 'In Transit').length}
                        </h3>
                    </div>
                </div>
                <div className="card p-4 flex items-center gap-4">
                    <div className="p-3 bg-amber-50 rounded-xl text-amber-600">
                        <Anchor className="h-6 w-6" />
                    </div>
                    <div>
                        <p className="text-sm font-medium text-slate-500">At Port</p>
                        <h3 className="text-2xl font-bold text-slate-900">
                            {ships.filter(s => ['Loading', 'Discharging', 'Waiting'].includes(s.status)).length}
                        </h3>
                    </div>
                </div>
                <div className="card p-4 flex items-center gap-4">
                    <div className="p-3 bg-rose-50 rounded-xl text-rose-600">
                        <AlertTriangle className="h-6 w-6" />
                    </div>
                    <div>
                        <p className="text-sm font-medium text-slate-500">Issues</p>
                        <h3 className="text-2xl font-bold text-slate-900">0</h3>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Map Section */}
                <div className="lg:col-span-2 h-[500px]">
                    <ShipMap />
                </div>

                {/* Fleet List Section */}
                <div className="card flex flex-col h-[500px]">
                    <div className="p-4 border-b border-slate-100 space-y-4">
                        <div className="flex items-center justify-between">
                            <h2 className="font-bold text-slate-900">Fleet Status</h2>
                            <div className="flex gap-2">
                                <button
                                    onClick={() => setIsAddModalOpen(true)}
                                    className="p-2 bg-accent text-white rounded-lg hover:bg-accent-dark transition-colors flex items-center gap-2 text-xs font-medium"
                                >
                                    <Plus className="h-4 w-4" />
                                    Add Ship
                                </button>
                                <button
                                    onClick={fetchShips}
                                    className="p-2 text-slate-400 hover:text-accent hover:bg-slate-50 rounded-lg transition-colors"
                                    title="Refresh Data"
                                >
                                    <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
                                </button>
                            </div>
                        </div>

                        <div className="flex gap-2">
                            <div className="relative flex-1">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                                <input
                                    type="text"
                                    placeholder="Search vessel..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="input pl-9 py-2 text-sm"
                                />
                            </div>
                            <div className="relative">
                                <Filter className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                                <select
                                    value={statusFilter}
                                    onChange={(e) => setStatusFilter(e.target.value)}
                                    className="input pl-9 py-2 text-sm appearance-none pr-8"
                                >
                                    <option>All Status</option>
                                    <option>In Transit</option>
                                    <option>Loading</option>
                                    <option>Discharging</option>
                                    <option>Waiting</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    <div className="flex-1 overflow-auto p-2">
                        {loading ? (
                            <div className="flex flex-col items-center justify-center h-full text-slate-400 space-y-3">
                                <RefreshCw className="h-8 w-8 animate-spin text-accent" />
                                <p className="text-sm">Loading fleet data...</p>
                            </div>
                        ) : error ? (
                            <div className="flex flex-col items-center justify-center h-full text-rose-500 space-y-3">
                                <AlertTriangle className="h-8 w-8" />
                                <p className="text-sm">{error}</p>
                                <button onClick={fetchShips} className="btn btn-secondary text-xs">Try Again</button>
                            </div>
                        ) : (
                            <div className="space-y-2">
                                {filteredShips.map((ship) => (
                                    <div key={ship.id} className="group p-3 rounded-xl border border-slate-100 hover:border-accent/50 hover:bg-slate-50 transition-all cursor-pointer relative">
                                        <div className="flex justify-between items-start mb-2">
                                            <div>
                                                <h3 className="font-semibold text-slate-900 group-hover:text-accent transition-colors">{ship.name}</h3>
                                                <p className="text-xs text-slate-500">{ship.type}</p>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <span className={`badge ${getStatusColor(ship.status)}`}>
                                                    {ship.status}
                                                </span>
                                                <button
                                                    onClick={(e) => handleDeleteShip(e, ship.id)}
                                                    className="p-1.5 text-slate-300 hover:text-rose-500 hover:bg-rose-50 rounded-lg transition-colors opacity-0 group-hover:opacity-100"
                                                    title="Delete Ship"
                                                >
                                                    <Trash2 className="h-3.5 w-3.5" />
                                                </button>
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-2 gap-2 text-xs text-slate-600">
                                            <div>
                                                <span className="text-slate-400">Loc:</span> {ship.location}
                                            </div>
                                            <div className="text-right">
                                                <span className="text-slate-400">Dest:</span> {ship.destination}
                                            </div>
                                            <div>
                                                <span className="text-slate-400">Cargo:</span> {ship.cargo}
                                            </div>
                                            <div className="text-right">
                                                <span className="text-slate-400">ETA:</span> {ship.eta}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
