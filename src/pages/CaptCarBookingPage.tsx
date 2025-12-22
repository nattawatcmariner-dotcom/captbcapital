import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Car, Calendar as CalendarIcon, Clock, ChevronLeft, ChevronRight, Info } from 'lucide-react';
import carImage from '../assets/capt-car-new.jpg'; // Reusing asset

// Helper to get days in month
const getDaysInMonth = (year: number, month: number) => new Date(year, month + 1, 0).getDate();
const getFirstDayOfMonth = (year: number, month: number) => new Date(year, month, 1).getDay();

const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const MOCK_BOOKED_DATES = [5, 6, 7, 20, 21, 22]; // Mock data: booked days in current month

// Mock Fleet Data (Shared)
const FLEET_DATA = [
    {
        id: 1,
        model: 'BYD Dolphin (Standard Range)',
        plate: '1กข-1234',
        color: 'Coastal Blue',
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
        color: 'Coral Pink',
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
        color: 'Atlantis Grey',
        status: 'With Renter',
        range: '490 km',
        seats: 5,
        price: '950/day',
        image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3d/BYD_Dolphin_facelift_001.jpg/960px-BYD_Dolphin_facelift_001.jpg'
    }
];

export function CaptCarBookingPage() {
    const navigate = useNavigate();
    const { id } = useParams();
    const [currentDate, setCurrentDate] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState<number | null>(null);

    const carId = Number(id);
    const selectedCar = FLEET_DATA.find(c => c.id === carId) || FLEET_DATA[0];

    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const daysInMonth = getDaysInMonth(year, month);
    const firstDay = getFirstDayOfMonth(year, month);

    const handlePrevMonth = () => setCurrentDate(new Date(year, month - 1, 1));
    const handleNextMonth = () => setCurrentDate(new Date(year, month + 1, 1));

    return (
        <div className="min-h-screen bg-slate-50 font-sans text-slate-900 pb-20">
            {/* Header */}
            <div className="bg-white border-b border-slate-200 sticky top-0 z-30">
                <div className="max-w-4xl mx-auto px-6 h-20 flex items-center gap-4">
                    <button
                        onClick={() => navigate('/car/fleet')}
                        className="p-2 -ml-2 text-slate-400 hover:text-slate-800 hover:bg-slate-100 rounded-full transition-colors"
                    >
                        <ArrowLeft className="w-6 h-6" />
                    </button>
                    <div>
                        <h1 className="text-xl font-bold text-slate-900">Booking Calendar</h1>
                        <p className="text-xs text-slate-500">Select your preferred dates</p>
                    </div>
                </div>
            </div>

            <div className="max-w-4xl mx-auto px-6 py-8">
                {/* Vehicle Summary Panel */}
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 mb-8 flex flex-col sm:flex-row gap-6 items-center">
                    <div className="w-full sm:w-32 h-24 rounded-xl overflow-hidden bg-slate-100 shrink-0">
                        <img src={selectedCar.image}
                            alt="Car"
                            className="w-full h-full object-cover"
                        />
                    </div>
                    <div className="flex-1 text-center sm:text-left">
                        <h2 className="text-lg font-bold text-slate-900">{selectedCar.model}</h2>
                        <div className="text-sm text-slate-500 mb-2">License Plate: {selectedCar.plate}</div>
                        <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-50 text-emerald-700 text-xs font-bold rounded-full">
                            <span className="w-2 h-2 bg-emerald-500 rounded-full"></span> Available
                        </div>
                    </div>
                </div>

                {/* Calendar Card */}
                <div className="bg-white rounded-3xl shadow-xl border border-slate-200 overflow-hidden">
                    {/* Calendar Header */}
                    <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
                        <h2 className="text-lg font-bold text-slate-900">
                            {currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                        </h2>
                        <div className="flex gap-2">
                            <button onClick={handlePrevMonth} className="p-2 hover:bg-white rounded-xl border border-transparent hover:border-slate-200 transition-all shadow-sm">
                                <ChevronLeft className="w-5 h-5 text-slate-600" />
                            </button>
                            <button onClick={handleNextMonth} className="p-2 hover:bg-white rounded-xl border border-transparent hover:border-slate-200 transition-all shadow-sm">
                                <ChevronRight className="w-5 h-5 text-slate-600" />
                            </button>
                        </div>
                    </div>

                    {/* Calendar Grid */}
                    <div className="p-6">
                        <div className="grid grid-cols-7 mb-4 text-center">
                            {DAYS.map(day => (
                                <div key={day} className="text-xs font-bold text-slate-400 uppercase tracking-wider py-2">
                                    {day}
                                </div>
                            ))}
                        </div>
                        <div className="grid grid-cols-7 gap-2">
                            {/* Empty cells for start padding */}
                            {Array.from({ length: firstDay }).map((_, i) => (
                                <div key={`empty-${i}`} className="aspect-square"></div>
                            ))}

                            {/* Date cells */}
                            {Array.from({ length: daysInMonth }).map((_, i) => {
                                const date = i + 1;
                                const isBooked = MOCK_BOOKED_DATES.includes(date);
                                const isSelected = selectedDate === date;
                                const isPast = false; // Add real logic if needed

                                return (
                                    <button
                                        key={date}
                                        disabled={isBooked}
                                        onClick={() => setSelectedDate(date)}
                                        className={`
                                            aspect-square rounded-xl flex flex-col items-center justify-center relative transition-all border-2
                                            ${isSelected
                                                ? 'border-emerald-500 bg-emerald-500 text-emerald-700 shadow-lg shadow-emerald-500/30 scale-105 z-10'
                                                : isBooked
                                                    ? 'border-transparent bg-slate-100 text-slate-300 cursor-not-allowed'
                                                    : 'border-transparent hover:border-emerald-200 hover:bg-emerald-50 text-slate-700'
                                            }
                                        `}
                                    >
                                        <span className={`text-sm font-bold ${isBooked && 'line-through'}`}>{date}</span>
                                        {isBooked ? <span className="text-[10px] lowercase">booked</span> : null}
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    {/* Footer Info */}
                    <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center gap-6 text-xs text-slate-500 justify-center">
                        <div className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded-full border-2 border-slate-200"></div>
                            Available
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded-full bg-slate-200"></div>
                            Booked
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
                            Selected
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Floating Action */}
            <div className="fixed bottom-0 left-0 right-0 p-6 bg-white border-t border-slate-200 shadow-[0_-10px_40px_rgba(0,0,0,0.05)] z-40">
                <div className="max-w-4xl mx-auto flex items-center justify-between">
                    <div>
                        <div className="text-xs text-slate-500 uppercase font-bold tracking-wider">Total Booking</div>
                        <div className="text-2xl font-bold text-emerald-600">
                            {selectedDate ? '฿850' : '฿0'}
                        </div>
                    </div>
                    <button
                        disabled={!selectedDate}
                        onClick={() => alert('Proceeding to confirmation...')}
                        className="bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed text-white px-8 py-3 rounded-xl font-bold shadow-lg shadow-emerald-600/20 transition-all"
                    >
                        Confirm Booking
                    </button>
                </div>
            </div>
        </div>
    );
}
