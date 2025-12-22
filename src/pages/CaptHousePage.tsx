import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Home, Users, Calendar, MapPin, Search, Star, Wifi, Car, Coffee, ArrowRight } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import logo from '../assets/logo.png';

// --- MOCK DATA ---
const MOCK_PROPERTIES = [
    {
        id: 1,
        title: "Modern Minimalist Home @ Surat Thani",
        type: "Entire Home",
        location: "Mueang Surat Thani, Surat Thani",
        guests: 4,
        bedrooms: 2,
        bathrooms: 2,
        price: 1500,
        rating: 4.8,
        reviews: 24,
        image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80",
        amenities: ["Wifi", "Parking", "Kitchen", "Workspace"]
    },
    // Extensible for future properties
];

const CONTENT = {
    en: {
        nav: { back: 'Back to Home', sign_in: 'Sign In', sign_out: 'Sign Out' },
        hero: {
            title: 'Find your perfect stay',
            subtitle: 'Experience comfort and style in our curated properties.'
        },
        search: {
            location: 'Location',
            checkin: 'Check in',
            checkout: 'Check out',
            guests: 'Guests',
            search_btn: 'Search'
        },
        listing: {
            night: '/ night'
        }
    },
    th: {
        nav: { back: 'กลับหน้าหลัก', sign_in: 'เข้าสู่ระบบ', sign_out: 'ออกจากระบบ' },
        hero: {
            title: 'ค้นหาที่พักที่ใช่สำหรับคุณ',
            subtitle: 'สัมผัสประสบการณ์การพักผ่อนที่สะดวกสบายและมีสไตล์'
        },
        search: {
            location: 'สถานที่',
            checkin: 'เช็คอิน',
            checkout: 'เช็คเอาท์',
            guests: 'ผู้เข้าพัก',
            search_btn: 'ค้นหา'
        },
        listing: {
            night: '/ คืน'
        }
    }
};

export function CaptHousePage() {
    const navigate = useNavigate();
    const { user, profile, signOut } = useAuth();
    const [lang, setLang] = useState<'en' | 'th'>('th');
    const t = CONTENT[lang];

    // Check if user is authorized (House Renter or Admin)
    const isAuthorized = user && (
        profile?.role === 'house_renter' ||
        profile?.role === 'admin'
    );

    const handleSignOut = async () => {
        await signOut();
        navigate('/');
    };

    return (
        <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
            {/* Navbar */}
            <nav className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-amber-100 shadow-sm h-20">
                <div className="max-w-7xl mx-auto px-6 h-full flex items-center justify-between">
                    <div className="flex items-center gap-3 cursor-pointer" onClick={() => navigate('/')}>
                        <div className="bg-amber-100 p-2 rounded-lg">
                            <Home className="w-6 h-6 text-amber-600" />
                        </div>
                        <span className="text-xl font-bold text-slate-900 tracking-tight">CAPT <span className="text-amber-600">HOUSE</span></span>
                    </div>

                    <div className="flex items-center gap-6">
                        {/* Language Switcher */}
                        <button
                            onClick={() => setLang(lang === 'en' ? 'th' : 'en')}
                            className="text-sm font-medium text-slate-500 hover:text-amber-600"
                        >
                            {lang === 'en' ? 'TH' : 'EN'}
                        </button>

                        {user ? (
                            <div className="flex items-center gap-4">
                                <div className="hidden md:block text-right">
                                    <div className="text-sm font-bold text-slate-900">{profile?.full_name || 'User'}</div>
                                    <div className="text-xs text-amber-600 font-medium capitalize">{profile?.role?.replace('_', ' ') || 'Guest'}</div>
                                </div>
                                <button
                                    onClick={handleSignOut}
                                    className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-full text-sm font-bold transition-colors"
                                >
                                    {t.nav.sign_out}
                                </button>
                            </div>
                        ) : (
                            <button
                                onClick={() => navigate('/login', { state: { from: '/house', isCaptHouse: true } })}
                                className="px-6 py-2.5 bg-amber-500 hover:bg-amber-600 text-white rounded-full text-sm font-bold shadow-lg shadow-amber-500/20 transition-all"
                            >
                                {t.nav.sign_in}
                            </button>
                        )}
                    </div>
                </div>
            </nav>

            {/* Hero & Search */}
            <div className="pt-32 pb-16 px-6 bg-gradient-to-b from-amber-50 to-slate-50">
                <div className="max-w-7xl mx-auto">
                    <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">{t.hero.title}</h1>
                    <p className="text-xl text-slate-500 mb-12">{t.hero.subtitle}</p>

                    {/* Search Bar */}
                    <div className="bg-white p-4 rounded-3xl shadow-xl shadow-amber-900/5 grid md:grid-cols-[1.5fr,1fr,1fr,1fr,auto] gap-4 items-center border border-slate-100">
                        <div className="bg-slate-50 rounded-2xl p-3 px-4 hover:bg-slate-100 transition-colors cursor-pointer group">
                            <label className="text-xs font-bold text-amber-600 uppercase tracking-wider block mb-1">{t.search.location}</label>
                            <div className="font-semibold text-slate-900 flex items-center gap-2">
                                <MapPin className="w-4 h-4 text-slate-400 group-hover:text-amber-500" />
                                Surat Thani
                            </div>
                        </div>
                        <div className="bg-slate-50 rounded-2xl p-3 px-4 hover:bg-slate-100 transition-colors cursor-pointer">
                            <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1">{t.search.checkin}</label>
                            <div className="font-semibold text-slate-900">Add Date</div>
                        </div>
                        <div className="bg-slate-50 rounded-2xl p-3 px-4 hover:bg-slate-100 transition-colors cursor-pointer">
                            <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1">{t.search.checkout}</label>
                            <div className="font-semibold text-slate-900">Add Date</div>
                        </div>
                        <div className="bg-slate-50 rounded-2xl p-3 px-4 hover:bg-slate-100 transition-colors cursor-pointer">
                            <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1">{t.search.guests}</label>
                            <div className="font-semibold text-slate-900">2 Guests</div>
                        </div>
                        <button className="bg-amber-500 hover:bg-amber-600 text-white p-4 rounded-2xl shadow-lg shadow-amber-500/20 transition-all">
                            <Search className="w-6 h-6" />
                        </button>
                    </div>
                </div>
            </div>

            {/* Property Listing */}
            <div className="max-w-7xl mx-auto px-6 pb-24">
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {MOCK_PROPERTIES.map((property) => (
                        <div key={property.id} className="group bg-white rounded-3xl overflow-hidden border border-slate-200 hover:border-amber-300 shadow-sm hover:shadow-xl hover:shadow-amber-900/10 transition-all duration-300 cursor-pointer">
                            <div className="relative aspect-[4/3] overflow-hidden">
                                <img src={property.image} alt={property.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                                <button className="absolute top-3 right-3 p-2 bg-white/80 backdrop-blur-sm rounded-full text-slate-400 hover:text-red-500 transition-colors">
                                    <div className="sr-only">Save</div>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" /></svg>
                                </button>
                                <div className="absolute top-3 left-3 px-3 py-1 bg-slate-900/70 backdrop-blur-sm text-white text-xs font-bold rounded-full">
                                    {property.type}
                                </div>
                            </div>
                            <div className="p-5">
                                <div className="flex justify-between items-start mb-2">
                                    <h3 className="font-bold text-lg text-slate-900 leading-snug group-hover:text-amber-600 transition-colors line-clamp-1">{property.title}</h3>
                                    <div className="flex items-center gap-1 text-slate-900 font-bold text-sm">
                                        <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                                        {property.rating}
                                    </div>
                                </div>
                                <p className="text-slate-500 text-sm mb-4 flex items-center gap-1">
                                    <MapPin className="w-3 h-3" /> {property.location}
                                </p>

                                <div className="flex items-center gap-4 text-xs text-slate-500 font-medium mb-6">
                                    <span className="flex items-center gap-1"><Users className="w-3 h-3" /> {property.guests} Guests</span>
                                    <span className="flex items-center gap-1"><Wifi className="w-3 h-3" /> Wifi</span>
                                    <span className="flex items-center gap-1"><Car className="w-3 h-3" /> Parking</span>
                                </div>

                                <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                                    <div>
                                        <span className="text-xl font-bold text-slate-900">฿{property.price.toLocaleString()}</span>
                                        <span className="text-slate-500 text-sm">{t.listing.night}</span>
                                    </div>
                                    <button className="p-2 bg-amber-50 text-amber-600 rounded-full group-hover:bg-amber-500 group-hover:text-white transition-all">
                                        <ArrowRight className="w-5 h-5" />
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
