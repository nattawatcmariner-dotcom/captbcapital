import React, { useState } from 'react';
import { Plus, Trash2, FileText, Save } from 'lucide-react';

interface SOFEvent {
    id: string;
    date: string;
    time: string;
    description: string;
    percentage: number;
    remarks: string;
}

export function LaytimeStatement() {
    const [events, setEvents] = useState<SOFEvent[]>([
        { id: '1', date: '2025-12-01', time: '08:00', description: 'NOR Tendered', percentage: 0, remarks: '' },
        { id: '2', date: '2025-12-01', time: '14:00', description: 'All Fast', percentage: 0, remarks: '' },
        { id: '3', date: '2025-12-01', time: '15:30', description: 'Hose Connected', percentage: 0, remarks: '' },
        { id: '4', date: '2025-12-01', time: '16:00', description: 'Commenced Loading', percentage: 100, remarks: '' },
    ]);

    const addEvent = () => {
        const newEvent: SOFEvent = {
            id: Math.random().toString(36).substr(2, 9),
            date: '',
            time: '',
            description: '',
            percentage: 100,
            remarks: '',
        };
        setEvents([...events, newEvent]);
    };

    const removeEvent = (id: string) => {
        setEvents(events.filter((e) => e.id !== id));
    };

    const updateEvent = (id: string, field: keyof SOFEvent, value: string | number) => {
        setEvents(
            events.map((e) => (e.id === id ? { ...e, [field]: value } : e))
        );
    };

    return (
        <div className="card overflow-hidden animate-in">
            <div className="flex items-center justify-between border-b border-slate-200 bg-white px-6 py-5">
                <div className="flex items-center space-x-3">
                    <div className="rounded-xl bg-indigo-50 p-2.5 text-indigo-600 ring-1 ring-indigo-100">
                        <FileText className="h-5 w-5" />
                    </div>
                    <div>
                        <h3 className="text-lg font-bold text-slate-900 tracking-tight">Statement of Facts</h3>
                        <p className="text-sm text-slate-500">Record of events for laytime calculation</p>
                    </div>
                </div>
                <div className="flex space-x-3">
                    <button
                        onClick={addEvent}
                        className="btn btn-secondary flex items-center"
                    >
                        <Plus className="mr-2 h-4 w-4" />
                        Add Event
                    </button>
                    <button className="btn btn-primary flex items-center">
                        <Save className="mr-2 h-4 w-4" />
                        Save Statement
                    </button>
                </div>
            </div>

            <div className="overflow-x-auto">
                <table className="table">
                    <thead>
                        <tr>
                            <th className="px-6 py-4">Date</th>
                            <th className="px-6 py-4">Time</th>
                            <th className="px-6 py-4">Description</th>
                            <th className="px-6 py-4">% to Count</th>
                            <th className="px-6 py-4">Remarks</th>
                            <th className="px-6 py-4">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                        {events.map((event) => (
                            <tr key={event.id} className="group hover:bg-slate-50 transition-colors">
                                <td className="px-6 py-3">
                                    <input
                                        type="date"
                                        value={event.date}
                                        onChange={(e) => updateEvent(event.id, 'date', e.target.value)}
                                        className="input py-1.5 text-sm"
                                    />
                                </td>
                                <td className="px-6 py-3">
                                    <input
                                        type="time"
                                        value={event.time}
                                        onChange={(e) => updateEvent(event.id, 'time', e.target.value)}
                                        className="input py-1.5 text-sm"
                                    />
                                </td>
                                <td className="px-6 py-3">
                                    <input
                                        type="text"
                                        value={event.description}
                                        onChange={(e) => updateEvent(event.id, 'description', e.target.value)}
                                        className="input py-1.5 text-sm"
                                        placeholder="Event description"
                                    />
                                </td>
                                <td className="px-6 py-3">
                                    <select
                                        value={event.percentage}
                                        onChange={(e) => updateEvent(event.id, 'percentage', parseInt(e.target.value))}
                                        className="input py-1.5 text-sm"
                                    >
                                        <option value={100}>100%</option>
                                        <option value={50}>50%</option>
                                        <option value={0}>0%</option>
                                    </select>
                                </td>
                                <td className="px-6 py-3">
                                    <input
                                        type="text"
                                        value={event.remarks}
                                        onChange={(e) => updateEvent(event.id, 'remarks', e.target.value)}
                                        className="input py-1.5 text-sm"
                                        placeholder="Optional remarks"
                                    />
                                </td>
                                <td className="px-6 py-3">
                                    <button
                                        onClick={() => removeEvent(event.id)}
                                        className="p-2 rounded-lg text-slate-400 hover:bg-rose-50 hover:text-rose-500 transition-colors"
                                    >
                                        <Trash2 className="h-4 w-4" />
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
