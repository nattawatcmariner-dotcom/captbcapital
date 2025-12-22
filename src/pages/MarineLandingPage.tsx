import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Check, Anchor, Ship, ArrowRight, LayoutDashboard } from 'lucide-react';
import logo from '../assets/logo.png';
import marineImage from '../assets/aerial-tanker.png';

export function MarineLandingPage() {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
            {/* Navbar */}
            {/* Navbar */}
            <nav className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-slate-200">
                <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
                    <div className="flex items-center gap-4 cursor-pointer" onClick={() => navigate('/')}>
                        <div className="relative h-[58px] w-[50px] overflow-hidden shrink-0">
                            <img src={logo} alt="CAPTB Logo" className="absolute h-full max-w-none object-contain left-0 top-0" />
                        </div>
                        <span className="text-3xl font-bold tracking-tight text-slate-900">
                            CAPT <span className="text-blue-600">MARINE</span>
                        </span>
                    </div>
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => navigate('/login')}
                            className="text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors"
                        >
                            Sign In
                        </button>
                        <button
                            onClick={() => navigate('/app')}
                            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold rounded-full transition-all shadow-md shadow-blue-600/20"
                        >
                            Go to Platform
                        </button>
                    </div>
                </div>
            </nav>

            {/* Hero Section with Top Corner Ship Background */}
            <header className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden bg-slate-900">
                {/* Background Image Overlay */}
                <div className="absolute inset-0 z-0">
                    <img src={marineImage} alt="Marine Background" className="w-full h-full object-cover opacity-25" />
                </div>

                <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-300 text-sm font-medium mb-6 backdrop-blur-sm">
                        <Ship className="w-4 h-4" />
                        Commercial Suite for Oil Tankers
                    </div>
                    <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-white mb-8">
                        Precision in Every <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">Voyage Calculation</span>
                    </h1>
                    <p className="text-xl text-slate-300 max-w-2xl mx-auto mb-10 leading-relaxed">
                        Comprehensive tools for Laytime, Demurrage, and Voyage Estimation.
                        Optimized for ship owners, charterers, and brokers.
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <button
                            onClick={() => navigate('/app')}
                            className="px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-lg transition-all shadow-lg flex items-center gap-2"
                        >
                            <LayoutDashboard className="w-5 h-5" />
                            Launch Dashboard
                        </button>
                        <button className="px-8 py-4 bg-white/10 hover:bg-white/20 text-white font-medium rounded-lg transition-all backdrop-blur-sm">
                            View Documentation
                        </button>
                    </div>
                </div>
            </header>

            {/* Pricing / Packages Section */}
            <section className="py-24 px-6 bg-slate-50">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold text-slate-900 mb-4">Choose Your Plan</h2>
                        <p className="text-slate-600 max-w-2xl mx-auto">
                            Scalable solutions for teams of all sizes. Start focusing on your business logic, not spreadsheets.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                        {/* Starter Plan */}
                        <div className="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm hover:shadow-xl transition-shadow relative">
                            <h3 className="text-lg font-semibold text-slate-900 mb-2">Starter</h3>
                            <div className="text-4xl font-bold text-slate-900 mb-6">$0 <span className="text-base font-normal text-slate-500">/mo</span></div>
                            <p className="text-slate-600 text-sm mb-6">Essential tools for individual brokers.</p>
                            <ul className="space-y-4 mb-8">
                                <li className="flex items-center gap-3 text-sm text-slate-600">
                                    <Check className="w-5 h-5 text-emerald-500 shrink-0" /> Voyage Estimator
                                </li>
                                <li className="flex items-center gap-3 text-sm text-slate-600">
                                    <Check className="w-5 h-5 text-emerald-500 shrink-0" /> Basic Port Data
                                </li>
                                <li className="flex items-center gap-3 text-sm text-slate-600">
                                    <Check className="w-5 h-5 text-emerald-500 shrink-0" /> Single User
                                </li>
                            </ul>
                            <button onClick={() => navigate('/app')} className="w-full py-3 px-4 bg-slate-100 hover:bg-slate-200 text-slate-900 font-semibold rounded-lg transition-colors">
                                Get Started
                            </button>
                        </div>

                        {/* Pro Plan */}
                        <div className="bg-white rounded-2xl p-8 border-2 border-blue-600 shadow-xl relative transform md:-translate-y-4">
                            <div className="absolute top-0 right-0 bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-bl-lg rounded-tr-lg">POPULAR</div>
                            <h3 className="text-lg font-semibold text-slate-900 mb-2">Professional</h3>
                            <div className="text-4xl font-bold text-slate-900 mb-6">$499 <span className="text-base font-normal text-slate-500">/mo</span></div>
                            <p className="text-slate-600 text-sm mb-6">Full suite for commercial operations.</p>
                            <ul className="space-y-4 mb-8">
                                <li className="flex items-center gap-3 text-sm text-slate-900 font-medium">
                                    <Check className="w-5 h-5 text-blue-600 shrink-0" /> Advanced Laytime Calc
                                </li>
                                <li className="flex items-center gap-3 text-sm text-slate-900 font-medium">
                                    <Check className="w-5 h-5 text-blue-600 shrink-0" /> Create Statement of Facts
                                </li>
                                <li className="flex items-center gap-3 text-sm text-slate-900 font-medium">
                                    <Check className="w-5 h-5 text-blue-600 shrink-0" /> AI-Powered Analysis
                                </li>
                                <li className="flex items-center gap-3 text-sm text-slate-900 font-medium">
                                    <Check className="w-5 h-5 text-blue-600 shrink-0" /> Up to 5 Users
                                </li>
                            </ul>
                            <button onClick={() => navigate('/app')} className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg transition-colors shadow-lg shadow-blue-600/25">
                                Try Professional
                            </button>
                        </div>

                        {/* Enterprise Plan */}
                        <div className="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm hover:shadow-xl transition-shadow">
                            <h3 className="text-lg font-semibold text-slate-900 mb-2">Enterprise</h3>
                            <div className="text-4xl font-bold text-slate-900 mb-6">Custom</div>
                            <p className="text-slate-600 text-sm mb-6">For large fleets and organizations.</p>
                            <ul className="space-y-4 mb-8">
                                <li className="flex items-center gap-3 text-sm text-slate-600">
                                    <Check className="w-5 h-5 text-emerald-500 shrink-0" /> Unlimited Users
                                </li>
                                <li className="flex items-center gap-3 text-sm text-slate-600">
                                    <Check className="w-5 h-5 text-emerald-500 shrink-0" /> API Access
                                </li>
                                <li className="flex items-center gap-3 text-sm text-slate-600">
                                    <Check className="w-5 h-5 text-emerald-500 shrink-0" /> Dedicated Support
                                </li>
                                <li className="flex items-center gap-3 text-sm text-slate-600">
                                    <Check className="w-5 h-5 text-emerald-500 shrink-0" /> On-premise Deployment
                                </li>
                            </ul>
                            <button onClick={() => navigate('/contact')} className="w-full py-3 px-4 bg-white border border-slate-300 hover:bg-slate-50 text-slate-900 font-semibold rounded-lg transition-colors">
                                Contact Sales
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Simple Footer */}
            <footer className="border-t border-slate-200 bg-white py-12">
                <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between text-slate-500 text-sm">
                    <p>© 2025 CAPT MARINE. Part of CAPTB Capital Group.</p>
                </div>
            </footer>
        </div>
    );
}
