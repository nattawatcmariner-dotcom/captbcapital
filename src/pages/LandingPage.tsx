
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Anchor, Globe, Phone, FileText, CheckCircle2 } from 'lucide-react';
import bgImage from '../assets/tanker-bg.png';
import logo from '../assets/logo.png';

export function LandingPage() {
    const navigate = useNavigate();

    const handleLogin = () => {
        // For now, simulate login and go to dashboard
        navigate('/app');
    };

    return (
        <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
            {/* Navigation */}
            <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-white/20 shadow-sm">
                <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="relative h-12 w-10 overflow-hidden shrink-0">
                            <img src={logo} alt="CAPTB Logo" className="absolute h-[48px] max-w-none object-contain left-0 top-0" />
                        </div>
                        <span className="text-2xl font-bold tracking-tight text-slate-900">
                            CAP<span className="text-blue-500">TB</span>
                        </span>
                    </div>

                    <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600">
                        <a href="#about" className="hover:text-blue-600 transition-colors">About Us</a>
                        <a href="#vision" className="hover:text-blue-600 transition-colors">Vision</a>
                        <a href="#services" className="hover:text-blue-600 transition-colors">Services</a>
                        <a href="#contact" className="hover:text-blue-600 transition-colors">Contact Us</a>
                    </div>

                    <div className="flex items-center gap-4">
                        <button onClick={handleLogin} className="text-sm font-medium text-slate-600 hover:text-slate-900">
                            Log in
                        </button>
                        <button onClick={handleLogin} className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-full transition-all shadow-lg shadow-blue-600/20">
                            Sign Up
                        </button>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="relative h-screen flex items-center justify-center overflow-hidden">
                {/* Background Image with Overlay */}
                <div className="absolute inset-0 z-0">
                    <img
                        src={bgImage}
                        alt="Oil Tanker Aerial View"
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-slate-900/60 mix-blend-multiply"></div>
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent"></div>
                </div>

                {/* Content */}
                <div className="relative z-10 max-w-5xl mx-auto px-6 text-center text-white">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-300 text-xs font-semibold uppercase tracking-wider mb-6 backdrop-blur-sm">
                        <Globe className="w-3 h-3" />
                        Global Marine Logistics
                    </div>
                    <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 leading-tight">
                        Streamline Your <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">Tanker Operations</span>
                    </h1>
                    <p className="text-lg md:text-xl text-slate-300 max-w-2xl mx-auto mb-10 leading-relaxed">
                        The ultimate platform for Post-Fixture commercial management.
                        Calculate laytime, monitor fleet performance, and ensure SIRE 2.0 compliance with AI-driven insights.
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <button onClick={handleLogin} className="w-full sm:w-auto px-8 py-4 bg-blue-500 hover:bg-blue-600 text-white font-bold rounded-full transition-all shadow-xl shadow-blue-500/20 flex items-center justify-center gap-2">
                            Get Started Now
                            <ArrowRight className="w-5 h-5" />
                        </button>
                        <button className="w-full sm:w-auto px-8 py-4 bg-white/10 hover:bg-white/20 text-white backdrop-blur-sm border border-white/20 font-bold rounded-full transition-all flex items-center justify-center gap-2">
                            <FileText className="w-5 h-5" />
                            View Documentation
                        </button>
                    </div>
                </div>
            </section>

            {/* Services/Pricing Section */}
            <section id="services" className="py-24 bg-slate-50">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Choose Your Plan</h2>
                        <p className="text-slate-600 text-lg">Flexible solutions tailored to your fleet size and operational needs.</p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {/* Basic Plan */}
                        <div className="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm hover:shadow-xl transition-all">
                            <h3 className="text-xl font-bold text-slate-900 mb-2">Starter</h3>
                            <p className="text-slate-500 text-sm mb-6">For independent operators</p>
                            <div className="text-4xl font-bold text-slate-900 mb-6">$49<span className="text-lg text-slate-500 font-normal">/mo</span></div>
                            <ul className="space-y-4 mb-8">
                                <li className="flex items-center gap-3 text-slate-600 text-sm">
                                    <CheckCircle2 className="w-5 h-5 text-blue-500 shrink-0" />
                                    Ship Monitor (Up to 2 vessels)
                                </li>
                                <li className="flex items-center gap-3 text-slate-600 text-sm">
                                    <CheckCircle2 className="w-5 h-5 text-blue-500 shrink-0" />
                                    Basic Freight Calculator
                                </li>
                                <li className="flex items-center gap-3 text-slate-600 text-sm">
                                    <CheckCircle2 className="w-5 h-5 text-blue-500 shrink-0" />
                                    Standard Support
                                </li>
                            </ul>
                            <button className="w-full py-3 rounded-xl border-2 border-slate-200 text-slate-700 font-bold hover:border-blue-500 hover:text-blue-500 transition-colors">Select Starter</button>
                        </div>

                        {/* Pro Plan */}
                        <div className="relative bg-slate-900 rounded-2xl p-8 border border-slate-800 shadow-2xl transform md:-translate-y-4">
                            <div className="absolute top-0 right-0 bg-blue-500 text-white text-xs font-bold px-3 py-1 rounded-bl-lg rounded-tr-lg">POPULAR</div>
                            <h3 className="text-xl font-bold text-white mb-2">Professional</h3>
                            <p className="text-slate-400 text-sm mb-6">For growing fleets</p>
                            <div className="text-4xl font-bold text-white mb-6">$199<span className="text-lg text-slate-500 font-normal">/mo</span></div>
                            <ul className="space-y-4 mb-8">
                                <li className="flex items-center gap-3 text-slate-300 text-sm">
                                    <CheckCircle2 className="w-5 h-5 text-blue-400 shrink-0" />
                                    Ship Monitor (Up to 10 vessels)
                                </li>
                                <li className="flex items-center gap-3 text-slate-300 text-sm">
                                    <CheckCircle2 className="w-5 h-5 text-blue-400 shrink-0" />
                                    Advanced Laytime Calculator
                                </li>
                                <li className="flex items-center gap-3 text-slate-300 text-sm">
                                    <CheckCircle2 className="w-5 h-5 text-blue-400 shrink-0" />
                                    Pre-SIRE Module ACCESS
                                </li>
                                <li className="flex items-center gap-3 text-slate-300 text-sm">
                                    <CheckCircle2 className="w-5 h-5 text-blue-400 shrink-0" />
                                    Priority Email Support
                                </li>
                            </ul>
                            <button className="w-full py-3 rounded-xl bg-blue-500 text-white font-bold hover:bg-blue-600 transition-colors shadow-lg shadow-blue-500/25">Get Professional</button>
                        </div>

                        {/* Enterprise Plan */}
                        <div className="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm hover:shadow-xl transition-all">
                            <h3 className="text-xl font-bold text-slate-900 mb-2">Enterprise</h3>
                            <p className="text-slate-500 text-sm mb-6">For large organizations</p>
                            <div className="text-4xl font-bold text-slate-900 mb-6">Custom</div>
                            <ul className="space-y-4 mb-8">
                                <li className="flex items-center gap-3 text-slate-600 text-sm">
                                    <CheckCircle2 className="w-5 h-5 text-blue-500 shrink-0" />
                                    Unlimited Vessels
                                </li>
                                <li className="flex items-center gap-3 text-slate-600 text-sm">
                                    <CheckCircle2 className="w-5 h-5 text-blue-500 shrink-0" />
                                    Full Audit Suite & Analytics
                                </li>
                                <li className="flex items-center gap-3 text-slate-600 text-sm">
                                    <CheckCircle2 className="w-5 h-5 text-blue-500 shrink-0" />
                                    Custom AI Integrations
                                </li>
                                <li className="flex items-center gap-3 text-slate-600 text-sm">
                                    <CheckCircle2 className="w-5 h-5 text-blue-500 shrink-0" />
                                    24/7 Dedicated Support
                                </li>
                            </ul>
                            <button className="w-full py-3 rounded-xl border-2 border-slate-200 text-slate-700 font-bold hover:border-blue-500 hover:text-blue-500 transition-colors">Contact Sales</button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer id="contact" className="bg-white border-t border-slate-200 py-12">
                <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-4 gap-8">
                    <div className="col-span-1 md:col-span-2">
                        <div className="flex items-center gap-2 mb-4">
                            <Anchor className="w-6 h-6 text-blue-600" />
                            <span className="text-xl font-bold text-slate-900">CAPTB</span>
                        </div>
                        <p className="text-slate-500 text-sm max-w-xs">
                            Empowering maritime logistics with precision, safety, and advanced technology.
                        </p>
                    </div>
                    <div>
                        <h4 className="font-bold text-slate-900 mb-4">Company</h4>
                        <ul className="space-y-2 text-sm text-slate-600">
                            <li><a href="#" className="hover:text-blue-600">About Us</a></li>
                            <li><a href="#" className="hover:text-blue-600">Careers</a></li>
                            <li><a href="#" className="hover:text-blue-600">News & Blog</a></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-bold text-slate-900 mb-4">Contact</h4>
                        <ul className="space-y-2 text-sm text-slate-600">
                            <li className="flex items-center gap-2"><Phone className="w-4 h-4" /> +1 (555) 123-4567</li>
                            <li>support@captb.com</li>
                        </ul>
                    </div>
                </div>
                <div className="max-w-7xl mx-auto px-6 mt-12 pt-8 border-t border-slate-100 text-center text-slate-400 text-sm">
                    © 2024 CAPTB Marine Logistics. All rights reserved.
                </div>
            </footer>
        </div>
    );
}
