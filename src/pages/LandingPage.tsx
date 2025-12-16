import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronRight, Anchor, Car, Home, ArrowRight, ExternalLink } from 'lucide-react';
import logo from '../assets/logo.png';

// Use online placeholders to prevent "Missing Asset" errors
const IMAGES = {
    bg: "https://images.unsplash.com/photo-1500904068138-16fd2531cd85?auto=format&fit=crop&q=80",
    marine: "https://images.unsplash.com/photo-1542152331-5c32729c3f3a?auto=format&fit=crop&q=80",
    car: "https://images.unsplash.com/photo-1593941707886-f607d79af1f5?auto=format&fit=crop&q=80",
    house: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80"
};

export function LandingPage() {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-white font-sans text-slate-900">
            {/* Navigation */}
            <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-100">
                <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="relative h-12 w-10 overflow-hidden shrink-0">
                            <img src={logo} alt="CAPTB Logo" className="absolute h-[48px] max-w-none object-contain left-0 top-0" />
                        </div>
                        <span className="text-2xl font-bold tracking-tight text-slate-900">
                            CAPTB <span className="text-blue-600">CAPITAL</span>
                        </span>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <div className="pt-32 pb-16 px-6 text-center max-w-4xl mx-auto">
                <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-600">
                    Empowering Future
                </h1>
                <p className="text-xl text-slate-500 max-w-2xl mx-auto leading-relaxed">
                    Driving innovation across Land, Sea, and Living.
                    We are a diversified group committed to excellence in Marine Logistics, EV Transportation, and Modern Real Estate.
                </p>
            </div>

            {/* Parcels Grid */}
            <div className="max-w-7xl mx-auto px-6 pb-24">
                <div className="grid md:grid-cols-3 gap-8">

                    {/* PARCEL 1: CAPT MARINE */}
                    <div className="group relative rounded-3xl overflow-hidden bg-slate-900 shadow-2xl transition-all hover:scale-[1.02] hover:shadow-blue-900/20 cursor-pointer"
                        onClick={() => navigate('/marine')}>
                        {/* Background Image */}
                        <div className="absolute inset-0">
                            <img src={IMAGES.marine} alt="Marine" className="w-full h-full object-cover opacity-60 group-hover:scale-110 transition-transform duration-700" />
                            <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent"></div>
                        </div>

                        {/* Content */}
                        <div className="relative h-full min-h-[500px] p-8 flex flex-col justify-end">
                            <div className="mb-auto pt-4">
                                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-300 text-xs font-bold uppercase tracking-wider backdrop-blur-sm mb-4">
                                    <Anchor className="w-3 h-3" />
                                    Marine Logistics
                                </div>
                            </div>

                            <h2 className="text-3xl font-bold text-white mb-3">CAPT MARINE</h2>
                            <p className="text-slate-300 mb-6 leading-relaxed">
                                Premier ship management and commercial operations.
                                AI-driven insights for Laytime, Demurrage, and Post-Fixture analytics.
                            </p>

                            <div className="flex items-center gap-2 text-blue-400 font-bold group-hover:text-blue-300 transition-colors">
                                Go to Platform <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </div>
                        </div>
                    </div>

                    {/* PARCEL 2: CAPT CAR */}
                    <div className="group relative rounded-3xl overflow-hidden bg-white border border-slate-200 shadow-xl transition-all hover:scale-[1.02] hover:border-slate-300">
                        {/* Image */}
                        <div className="h-[280px] bg-slate-50 overflow-hidden relative">
                            <img src={IMAGES.car} alt="EV Car" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 mix-blend-multiply" />
                        </div>

                        {/* Content */}
                        <div className="p-8">
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-700 text-xs font-bold uppercase tracking-wider mb-4">
                                <Car className="w-3 h-3" />
                                EV Transport
                            </div>

                            <h2 className="text-3xl font-bold text-slate-900 mb-3">CAPT CAR</h2>
                            <p className="text-slate-500 mb-6 leading-relaxed">
                                Revolutionizing urban transport with our premium EV Taxi fleet.
                                Sustainable, silent, and smart mobility solutions for the future city.
                            </p>

                            <div className="inline-flex items-center gap-2 text-slate-400 font-medium text-sm bg-slate-100 px-4 py-2 rounded-full">
                                Coming Soon
                            </div>
                        </div>
                    </div>

                    {/* PARCEL 3: CAPT HOUSE */}
                    <div className="group relative rounded-3xl overflow-hidden bg-white border border-slate-200 shadow-xl transition-all hover:scale-[1.02] hover:border-slate-300">
                        {/* Image */}
                        <div className="h-[280px] bg-slate-50 overflow-hidden relative">
                            <img src={IMAGES.house} alt="Modern House" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                        </div>

                        {/* Content */}
                        <div className="p-8">
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 text-amber-700 text-xs font-bold uppercase tracking-wider mb-4">
                                <Home className="w-3 h-3" />
                                Real Estate
                            </div>

                            <h2 className="text-3xl font-bold text-slate-900 mb-3">CAPT HOUSE</h2>
                            <p className="text-slate-500 mb-6 leading-relaxed">
                                Modern living defined. Exquisite single-detached homes designed for
                                contemporary lifestyles, blending aesthetic beauty with functional space.
                            </p>

                            <div className="inline-flex items-center gap-2 text-slate-400 font-medium text-sm bg-slate-100 px-4 py-2 rounded-full">
                                Coming Soon
                            </div>
                        </div>
                    </div>

                </div>
            </div>

            {/* Footer */}
            <footer className="border-t border-slate-200 bg-slate-50 py-12">
                <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between text-slate-500 text-sm">
                    <p>© 2025 CAPTB Capital Group. All rights reserved.</p>
                    <div className="flex items-center gap-6 mt-4 md:mt-0">
                        <span className="hover:text-slate-900 cursor-pointer">Privacy Policy</span>
                        <span className="hover:text-slate-900 cursor-pointer">Terms of Service</span>
                        <span className="hover:text-slate-900 cursor-pointer">Contact</span>
                    </div>
                </div>
            </footer>
        </div>
    );
}
