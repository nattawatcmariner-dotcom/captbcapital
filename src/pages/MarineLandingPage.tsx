import React from 'react';
import { useNavigate } from 'react-router-dom';
import { LayoutDashboard, Anchor, ArrowRight } from 'lucide-react';

const SHIP_BG = "https://images.unsplash.com/photo-1542152331-5c32729c3f3a?auto=format&fit=crop&q=80";

export function MarineLandingPage() {
    const navigate = useNavigate();

    return (
        <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-slate-900 font-sans">
            {/* Watermark Background */}
            <div className="absolute inset-0 z-0">
                <img
                    src={SHIP_BG}
                    alt="Ship Background"
                    className="w-full h-full object-cover opacity-20 filter grayscale"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-slate-900/50"></div>
            </div>

            {/* Content Container */}
            <div className="relative z-10 max-w-4xl mx-auto px-6 text-center animate-in fade-in slide-in-from-bottom-8 duration-700">

                {/* Icon */}
                <div className="inline-flex items-center justify-center p-4 rounded-full bg-blue-500/10 border border-blue-400/20 backdrop-blur-sm mb-8 shadow-2xl shadow-blue-900/20">
                    <Anchor className="w-12 h-12 text-blue-400" />
                </div>

                <h1 className="text-6xl md:text-8xl font-bold tracking-tight text-white mb-6">
                    CAPT <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">MARINE</span>
                </h1>

                <p className="text-xl md:text-2xl text-slate-300 max-w-2xl mx-auto mb-12 leading-relaxed font-light">
                    Experience the future of maritime logistics. <br />
                    Precision. Intelligence. Control.
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                    <button
                        onClick={() => navigate('/app')}
                        className="group relative px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-full transition-all shadow-lg shadow-blue-600/25 flex items-center gap-3 text-lg"
                    >
                        <LayoutDashboard className="w-5 h-5" />
                        Go to Dashboard
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </button>

                    <button
                        onClick={() => navigate('/')}
                        className="px-8 py-4 bg-white/5 hover:bg-white/10 text-slate-300 border border-white/10 font-medium rounded-full transition-all backdrop-blur-sm"
                    >
                        Back to Home
                    </button>
                </div>
            </div>
        </div>
    );
}
