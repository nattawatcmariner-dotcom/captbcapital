import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Car, Users, Zap, Calendar, CheckCircle, SlidersHorizontal, BatteryCharging } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import carImage from '../assets/capt-car-new.jpg'; // Reusing existing asset

// Mock Fleet Data
const FLEET_DATA = [
    {
        id: 1,
        model: 'BYD Dolphin (Standard Range)',
        plate: '1กข-1234',
        color: 'Ski White',
        status: 'Available',
        range: '410 km',
        seats: 5,
        price: '850/day',
        image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/78/2024_BYD_Dolphin_EV_in_Cream_White%2C_front_left%2C_06-22-2024.jpg/960px-2024_BYD_Dolphin_EV_in_Cream_White%2C_front_left%2C_06-22-2024.jpg'
    },
    {
        id: 2,
        model: 'BYD Dolphin (Standard Range)',
        plate: '2กค-5678',
        color: 'Ski White',
        status: 'Available',
        range: '410 km',
        seats: 5,
        price: '850/day',
        image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/78/2024_BYD_Dolphin_EV_in_Cream_White%2C_front_left%2C_06-22-2024.jpg/960px-2024_BYD_Dolphin_EV_in_Cream_White%2C_front_left%2C_06-22-2024.jpg'
    },
    {
        id: 3,
        model: 'BYD Dolphin (Extended Range)',
        plate: '3กง-9012',
        color: 'Urban Grey',
        status: 'With Renter',
        range: '490 km',
        seats: 5,
        price: '950/day',
        image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3d/BYD_Dolphin_facelift_001.jpg/960px-BYD_Dolphin_facelift_001.jpg'
    }
];

export function CaptCarFleetPage() {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
            {/* Header */}
            <div className="bg-white border-b border-slate-200 sticky top-0 z-30">
                <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => navigate('/car')}
                            className="p-2 -ml-2 text-slate-400 hover:text-slate-800 hover:bg-slate-100 rounded-full transition-colors"
                        >
                            <ArrowLeft className="w-6 h-6" />
                        </button>
                        <div>
                            <h1 className="text-xl font-bold text-slate-900">Select Vehicle</h1>
                            <p className="text-xs text-slate-500">Premium Electric Fleet</p>
                        </div>
                    </div>
                    {/* Filter (Visual only) */}
                    <button className="p-2 text-slate-400 hover:text-emerald-600 border border-transparent hover:border-emerald-100 hover:bg-emerald-50 rounded-xl transition-all">
                        <SlidersHorizontal className="w-6 h-6" />
                    </button>
                </div>
            </div>

            {/* List */}
            <div className="max-w-7xl mx-auto px-6 py-8">
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {FLEET_DATA.map((car) => (
                        <div
                            key={car.id}
                            onClick={() => car.status === 'Available' ? navigate(`/car/book/${car.id}`) : alert('This vehicle is currently unavailable.')}
                            className={`group bg-white rounded-2xl border border-slate-200 overflow-hidden cursor-pointer transition-all hover:shadow-xl hover:border-emerald-400/50 ${car.status !== 'Available' ? 'opacity-70 grayscale-[0.5]' : ''}`}
                        >
                            <div className="aspect-[16/10] relative overflow-hidden bg-slate-100">
                                <img src={car.image} alt={car.model} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                                <div className="absolute top-3 right-3">
                                    <span className={`px-3 py-1 rounded-full text-xs font-bold shadow-sm ${car.status === 'Available'
                                        ? 'bg-emerald-500 text-white'
                                        : 'bg-slate-800 text-slate-200'
                                        }`}>
                                        {car.status}
                                    </span>
                                </div>
                                <div className="absolute bottom-3 left-3 px-3 py-1 bg-white/90 backdrop-blur-sm rounded-lg text-xs font-bold text-slate-900 shadow-sm border border-white/50">
                                    {car.plate}
                                </div>
                            </div>

                            <div className="p-5">
                                <h3 className="text-lg font-bold text-slate-900 line-clamp-1">{car.model}</h3>
                                <p className="text-sm text-slate-500 mb-4">{car.color}</p>

                                <div className="grid grid-cols-2 gap-3 mb-4">
                                    <div className="flex items-center gap-2 text-xs font-medium text-slate-600 bg-slate-50 p-2 rounded-lg">
                                        <BatteryCharging className="w-4 h-4 text-emerald-500" />
                                        {car.range}
                                    </div>
                                    <div className="flex items-center gap-2 text-xs font-medium text-slate-600 bg-slate-50 p-2 rounded-lg">
                                        <Users className="w-4 h-4 text-emerald-500" />
                                        {car.seats} Seats
                                    </div>
                                </div>

                                <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                                    <div>
                                        <span className="text-lg font-bold text-emerald-600">฿{car.price}</span>
                                    </div>
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            if (car.status === 'Available') {
                                                navigate(`/car/book/${car.id}`);
                                            } else {
                                                alert('This vehicle is currently unavailable.');
                                            }
                                        }}
                                        className="text-xs font-bold text-emerald-600 hover:text-emerald-700 transition-colors flex items-center gap-1 cursor-pointer z-10"
                                    >
                                        Book Now <ArrowLeft className="w-3 h-3 rotate-180" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
