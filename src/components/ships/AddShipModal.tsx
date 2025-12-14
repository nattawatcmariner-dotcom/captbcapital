import React, { useState, useRef } from 'react';
import { X, Upload, Check, Loader2 } from 'lucide-react';
import { Ship, ShipStatus } from '../../types/models';

interface AddShipModalProps {
    isOpen: boolean;
    onClose: () => void;
    onAdd: (ship: Omit<Ship, 'id'>) => void;
}

export function AddShipModal({ isOpen, onClose, onAdd }: AddShipModalProps) {
    const [isDragging, setIsDragging] = useState(false);
    const [isProcessing, setIsProcessing] = useState(false);
    const [uploadSuccess, setUploadSuccess] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const [formData, setFormData] = useState<Omit<Ship, 'id'>>({
        name: '',
        type: 'VLCC',
        status: 'Waiting', // Default status from new model
        location: '',
        destination: '',
        eta: '',
        speed: 0,
        cargo: 'N/A',
        charterer: 'Spot'
    });

    if (!isOpen) return null;

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
        const files = e.dataTransfer.files;
        if (files.length > 0) {
            processFile(files[0]);
        }
    };

    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            processFile(e.target.files[0]);
        }
    };

    const processFile = (file: File) => {
        setIsProcessing(true);
        // Simulate Q88 parsing
        setTimeout(() => {
            setFormData(prev => ({
                ...prev,
                name: file.name.split('.')[0].replace(/_/g, ' '),
                type: 'Aframax', // Mock extracted data
                cargo: 'Crude Oil',
                location: 'Generic Port',
            }));
            setIsProcessing(false);
            setUploadSuccess(true);
        }, 1500);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onAdd(formData);
        onClose();
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
            <div className="w-full max-w-2xl bg-white rounded-2xl shadow-xl overflow-hidden animate-in fade-in zoom-in duration-200">
                <div className="flex items-center justify-between p-6 border-b border-slate-100">
                    <div>
                        <h2 className="text-xl font-bold text-slate-900">Add New Vessel</h2>
                        <p className="text-sm text-slate-500">Enter vessel details or upload Q88</p>
                    </div>
                    <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-full transition-colors">
                        <X className="h-5 w-5 text-slate-400" />
                    </button>
                </div>

                <div className="p-6 space-y-6">
                    {/* Q88 Upload Area */}
                    <div
                        onClick={() => fileInputRef.current?.click()}
                        onDragOver={handleDragOver}
                        onDragLeave={handleDragLeave}
                        onDrop={handleDrop}
                        className={`
                            relative border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all duration-200
                            ${isDragging ? 'border-accent bg-accent/5' : 'border-slate-200 hover:border-accent/50 hover:bg-slate-50'}
                            ${uploadSuccess ? 'bg-emerald-50 border-emerald-200' : ''}
                        `}
                    >
                        <input
                            type="file"
                            ref={fileInputRef}
                            className="hidden"
                            accept=".pdf,.doc,.docx"
                            onChange={handleFileSelect}
                        />

                        {isProcessing ? (
                            <div className="flex flex-col items-center gap-3">
                                <Loader2 className="h-10 w-10 text-accent animate-spin" />
                                <p className="font-medium text-slate-900">Analyzing Q88 document...</p>
                            </div>
                        ) : uploadSuccess ? (
                            <div className="flex flex-col items-center gap-3">
                                <div className="h-10 w-10 rounded-full bg-emerald-100 flex items-center justify-center">
                                    <Check className="h-6 w-6 text-emerald-600" />
                                </div>
                                <div>
                                    <p className="font-medium text-emerald-900">Data Extracted Successfully</p>
                                    <p className="text-sm text-emerald-600">Form has been auto-populated</p>
                                </div>
                            </div>
                        ) : (
                            <div className="flex flex-col items-center gap-3">
                                <div className="h-10 w-10 rounded-full bg-slate-100 flex items-center justify-center">
                                    <Upload className="h-5 w-5 text-slate-600" />
                                </div>
                                <div>
                                    <p className="font-medium text-slate-900">Drop Q88 document here</p>
                                    <p className="text-sm text-slate-500">or click to browse files</p>
                                </div>
                            </div>
                        )}
                    </div>

                    <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-slate-700">Vessel Name</label>
                            <input
                                type="text"
                                required
                                value={formData.name}
                                onChange={e => setFormData({ ...formData, name: e.target.value })}
                                className="w-full rounded-lg border-slate-200 focus:border-accent focus:ring-accent"
                                placeholder="e.g. MT Ocean Queen"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-slate-700">Type</label>
                            <select
                                value={formData.type}
                                onChange={e => setFormData({ ...formData, type: e.target.value })}
                                className="w-full rounded-lg border-slate-200 focus:border-accent focus:ring-accent"
                            >
                                <option value="VLCC">VLCC</option>
                                <option value="Suezmax">Suezmax</option>
                                <option value="Aframax">Aframax</option>
                                <option value="Panamax">Panamax</option>
                            </select>
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-slate-700">Status</label>
                            <select
                                value={formData.status}
                                onChange={e => setFormData({ ...formData, status: e.target.value as ShipStatus })}
                                className="w-full rounded-lg border-slate-200 focus:border-accent focus:ring-accent"
                            >
                                <option value="Waiting">Waiting</option>
                                <option value="In Transit">In Transit</option>
                                <option value="Loading">Loading</option>
                                <option value="Discharging">Discharging</option>
                                <option value="Dry Dock">Dry Dock</option>
                            </select>
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-slate-700">Destination</label>
                            <input
                                type="text"
                                value={formData.destination}
                                onChange={e => setFormData({ ...formData, destination: e.target.value })}
                                className="w-full rounded-lg border-slate-200 focus:border-accent focus:ring-accent"
                                placeholder="e.g. Singapore"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-slate-700">Location</label>
                            <input
                                type="text"
                                value={formData.location}
                                onChange={e => setFormData({ ...formData, location: e.target.value })}
                                className="w-full rounded-lg border-slate-200 focus:border-accent focus:ring-accent"
                                placeholder="e.g. Indian Ocean"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-slate-700">Cargo</label>
                            <input
                                type="text"
                                value={formData.cargo || ''}
                                onChange={e => setFormData({ ...formData, cargo: e.target.value })}
                                className="w-full rounded-lg border-slate-200 focus:border-accent focus:ring-accent"
                                placeholder="e.g. Crude Oil"
                            />
                        </div>
                    </form>
                </div>

                <div className="p-6 border-t border-slate-100 bg-slate-50 flex justify-end gap-3">
                    <button
                        type="button"
                        onClick={onClose}
                        className="px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-200 rounded-lg transition-colors"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleSubmit}
                        className="px-4 py-2 text-sm font-medium text-white bg-accent hover:bg-accent-dark rounded-lg transition-colors shadow-sm shadow-accent/20"
                    >
                        Add Vessel
                    </button>
                </div>
            </div>
        </div>
    );
}
