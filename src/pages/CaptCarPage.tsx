import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Car, Upload, Calendar, User, FileText, CheckCircle, ArrowLeft, Globe, LogIn, CircleUser, LogOut, CreditCard, TrendingUp, QrCode, Download, Clock } from 'lucide-react';
import logo from '../assets/logo.png';
import carImage from '../assets/capt-car-new.jpg';
import { useAuth } from '../context/AuthContext';

// Mock Renter Data
const MOCK_RENTER = {
    vehicle: {
        model: 'BYD Atto 3 (Extended Range)',
        plate: '1กก-9999',
        color: 'Emerald Green',
        image: 'https://images.unsplash.com/photo-1617788138017-80ad40651399?auto=format&fit=crop&q=80&w=1000'
    },
    contract: {
        id: 'CTR-2024-001',
        startDate: '2024-01-01',
        endDate: '2024-12-31',
        type: 'Yearly',
        status: 'Active'
    },
    payment: {
        score: 98,
        nextDue: '2024-12-25',
        amount: 15000,
        paidInstallments: 11,
        totalInstallments: 12,
        history: [
            { date: '2024-11-25', amount: 15000, status: 'Paid', method: 'QR Scan' },
            { date: '2024-10-25', amount: 15000, status: 'Paid', method: 'QR Scan' },
            { date: '2024-09-25', amount: 15000, status: 'Paid', method: 'QR Scan' },
        ]
    }
};

const CONTENT = {
    en: {
        nav: { back: 'Back to Home', sign_in: 'Sign In', sign_out: 'Sign Out' },
        hero: {
            title: 'Premium EV Fleet',
            subtitle: 'Sustainable Mobility for the Future'
        },
        features: {
            title: 'Why Rent with CAPT CAR?',
            f1: 'Modern EV Fleet: Drive the latest electric vehicles with cutting-edge technology.',
            f2: 'Flexible Contracts: Daily, weekly, or monthly plans tailored to your needs.',
            f3: 'Full Support: 24/7 roadside assistance and maintenance included.'
        },
        dashboard: {
            title: 'My Rental Dashboard',
            welcome: 'Welcome back,',
            active_rentals: 'Active Rentals',
            no_rentals: 'No active rentals found.',
            payment_due: 'Payment Due',
            history: 'Rental History',
            book_new: 'Book New Car',
            sections: {
                vehicle: 'Vehicle Information',
                contract: 'Contract Details',
                payment: 'Payment Overview',
                action: 'Quick Actions'
            },
            labels: {
                plate: 'License Plate',
                contractId: 'Contract ID',
                duration: 'Duration',
                status: 'Status',
                nextDue: 'Next Payment Due',
                punctuality: 'Punctuality Score',
                installments: 'Installments Paid',
                scanPay: 'Scan to Pay',
                receipts: 'My Receipts',
                download: 'Download',
                history: 'Payment History'
            },
            status: {
                active: 'Active',
                paid: 'Paid',
                pending: 'Pending'
            }
        },
        form: {
            title: 'Vehicle Rental Registration',
            subtitle: 'Complete the form below to start your journey.',
            renter_info: 'Renter Information',
            full_name: 'Full Name',
            email: 'Email',
            phone: 'Phone',
            duration: 'Rental Duration',
            duration_options: { daily: 'Daily', weekly: 'Weekly', monthly: 'Monthly', yearly: 'Yearly' },
            documents: 'Documents',
            license: "Driver's License",
            id_card: 'ID Card / Passport',
            upload_placeholder: 'Click to upload',
            submit: 'Submit Registration',
            payment_notice: 'Automatic payment system coming soon!'
        }
    },
    th: {
        nav: { back: 'กลับหน้าหลัก', sign_in: 'เข้าสู่ระบบ', sign_out: 'ออกจากระบบ' },
        hero: {
            title: 'บริการเช่ารถ EV ระดับพรีเมียม',
            subtitle: 'การเดินทางที่ยั่งยืนเพื่ออนาคต'
        },
        features: {
            title: 'ทำไมต้องเช่ากับ CAPT CAR?',
            f1: 'รถ EV ทันสมัย: ขับเคลื่อนด้วยเทคโนโลยีล่าสุด',
            f2: 'สัญญาที่ยืดหยุ่น: รายวัน รายสัปดาห์ หรือรายเดือน ตามความต้องการของคุณ',
            f3: 'บริการครบวงจร: ช่วยเหลือฉุกเฉินและบำรุงรักษาตลอด 24 ชั่วโมง'
        },
        dashboard: {
            title: 'แดชบอร์ดการเช่าของฉัน',
            welcome: 'ยินดีต้อนรับกลับ,',
            active_rentals: 'รายการเช่าปัจจุบัน',
            no_rentals: 'ไม่พบรายการเช่าที่ใช้งานอยู่',
            payment_due: 'ยอดชำระที่ต้องจ่าย',
            history: 'ประวัติการเช่า',
            book_new: 'จองรถใหม่',
            sections: {
                vehicle: 'ข้อมูลยานพาหนะ',
                contract: 'รายละเอียดสัญญา',
                payment: 'ภาพรวมการชำระเงิน',
                action: 'เมนูด่วน'
            },
            labels: {
                plate: 'ทะเบียนรถ',
                contractId: 'เลขที่สัญญา',
                duration: 'ระยะเวลา',
                status: 'สถานะ',
                nextDue: 'กำหนดชำระถัดไป',
                punctuality: 'คะแนนความตรงเวลา',
                installments: 'งวดที่จ่ายแล้ว',
                scanPay: 'สแกนจ่าย',
                receipts: 'ใบเสร็จรับเงิน',
                download: 'ดาวน์โหลด',
                history: 'ประวัติการชำระเงิน'
            },
            status: {
                active: 'ใช้งานอยู่',
                paid: 'ชำระแล้ว',
                pending: 'รอชำระ'
            }
        },
        form: {
            title: 'ลงทะเบียนเช่ารถ',
            subtitle: 'กรอกข้อมูลด้านล่างเพื่อเริ่มต้นการเดินทาง',
            renter_info: 'ข้อมูลผู้เช่า',
            full_name: 'ชื่อ-นามสกุล',
            email: 'อีเมล',
            phone: 'เบอร์โทรศัพท์',
            duration: 'ระยะเวลาเช่า',
            duration_options: { daily: 'รายวัน', weekly: 'รายสัปดาห์', monthly: 'รายเดือน', yearly: 'รายปี' },
            documents: 'เอกสารประกอบ',
            license: 'ใบขับขี่',
            id_card: 'บัตรประชาชน / พาสปอร์ต',
            upload_placeholder: 'คลิกเพื่ออัพโหลด',
            submit: 'ส่งข้อมูลลงทะเบียน',
            payment_notice: 'ระบบชำระเงินอัตโนมัติจะเปิดให้บริการเร็วๆนี้!'
        }
    }
};

export function CaptCarPage() {
    const navigate = useNavigate();
    const { user, profile, signOut } = useAuth();
    const [lang, setLang] = useState<'en' | 'th'>('th'); // Default to Thai
    const t = CONTENT[lang];

    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        phone: '',
        duration: 'daily',
        licenseFile: null as File | null,
        idCardFile: null as File | null
    });

    // Check if user is a car renter or admin, or the specific developer account
    const isCarRenter = user && (
        profile?.role === 'car_renter' ||
        profile?.role === 'admin' ||
        user.email === 'nattawat.chaiwisade@hotmail.com'
    );

    // ... handleSubmit ...

    if (isCarRenter) {
        return (
            <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
                {/* Navbar (Reused logic ideally, but inline for now) */}
                <nav className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-slate-200">
                    <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
                        <div className="flex items-center gap-4 cursor-pointer" onClick={() => navigate('/')}>
                            <div className="relative h-[58px] w-[50px] overflow-hidden shrink-0">
                                <img src={logo} alt="CAPTB Logo" className="absolute h-full max-w-none object-contain left-0 top-0" />
                            </div>
                            <span className="text-3xl font-bold tracking-tight text-slate-900">
                                CAPT <span className="text-emerald-600">CAR</span>
                            </span>
                        </div>
                        <div className="flex items-center gap-4">
                            <button
                                onClick={() => setLang(lang === 'en' ? 'th' : 'en')}
                                className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-slate-200 text-sm font-medium text-slate-600 hover:border-emerald-400 hover:text-emerald-600 transition-all bg-white"
                            >
                                <Globe className="w-4 h-4 text-emerald-500" />
                                <span>{lang === 'en' ? 'EN' : 'TH'}</span>
                            </button>
                            <div className="flex items-center gap-4">
                                <span className="text-sm font-medium text-slate-700 hidden md:block">{user?.email}</span>
                                <button onClick={() => signOut()} className="p-2 text-slate-400 hover:text-red-500 transition-colors"><LogOut className="w-5 h-5" /></button>
                                <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center border border-emerald-200">
                                    <CircleUser className="w-6 h-6 text-emerald-600" />
                                </div>
                            </div>
                        </div>
                    </div>
                </nav>

                <div className="pt-32 pb-20 px-6 max-w-7xl mx-auto">
                    <div className="mb-8 flex items-end justify-between">
                        <div>
                            <h1 className="text-3xl font-bold text-slate-900">{t.dashboard.title}</h1>
                            <p className="text-slate-500">{t.dashboard.welcome} {profile?.full_name || user.email}</p>
                        </div>
                        <button
                            onClick={() => navigate('/car/fleet')}
                            className="hidden sm:block px-6 py-3 bg-emerald-600 text-white rounded-xl font-bold hover:bg-emerald-700 transition-colors shadow-lg shadow-emerald-600/20">
                            {t.dashboard.book_new}
                        </button>
                    </div>

                    {/* Stats Grid */}
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                        {/* Punctuality Score */}
                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 flex items-center gap-4">
                            <div className="w-16 h-16 rounded-full bg-emerald-50 flex items-center justify-center relative">
                                <TrendingUp className="w-8 h-8 text-emerald-600" />
                                <div className="absolute top-0 right-0 w-4 h-4 bg-emerald-500 rounded-full border-2 border-white"></div>
                            </div>
                            <div>
                                <div className="text-slate-500 text-sm font-medium mb-1">{t.dashboard.labels.punctuality}</div>
                                <div className="text-2xl font-bold text-slate-900">{MOCK_RENTER.payment.score}/100</div>
                            </div>
                        </div>

                        {/* Next Due */}
                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 flex items-center gap-4">
                            <div className="w-12 h-12 rounded-full bg-orange-50 flex items-center justify-center">
                                <Clock className="w-6 h-6 text-orange-500" />
                            </div>
                            <div>
                                <div className="text-slate-500 text-sm font-medium mb-1">{t.dashboard.labels.nextDue}</div>
                                <div className="text-xl font-bold text-slate-900">{MOCK_RENTER.payment.nextDue}</div>
                                <div className="text-xs text-orange-500 font-medium">฿{MOCK_RENTER.payment.amount.toLocaleString()}</div>
                            </div>
                        </div>

                        {/* Installments */}
                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 flex items-center gap-4">
                            <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center">
                                <Calendar className="w-6 h-6 text-blue-500" />
                            </div>
                            <div>
                                <div className="text-slate-500 text-sm font-medium mb-1">{t.dashboard.labels.installments}</div>
                                <div className="text-2xl font-bold text-slate-900">{MOCK_RENTER.payment.paidInstallments}/{MOCK_RENTER.payment.totalInstallments}</div>
                            </div>
                        </div>

                        {/* Status */}
                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 flex items-center gap-4">
                            <div className="w-12 h-12 rounded-full bg-emerald-50 flex items-center justify-center">
                                <CheckCircle className="w-6 h-6 text-emerald-600" />
                            </div>
                            <div>
                                <div className="text-slate-500 text-sm font-medium mb-1">{t.dashboard.labels.status}</div>
                                <div className="text-2xl font-bold text-emerald-600">{t.dashboard.status.active}</div>
                            </div>
                        </div>
                    </div>

                    <div className="grid lg:grid-cols-3 gap-8">
                        {/* LEFT COL: Vehicle & Contract */}
                        <div className="lg:col-span-2 space-y-8">
                            {/* Vehicle Card */}
                            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
                                <div className="p-6 border-b border-slate-100 flex items-center justify-between">
                                    <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                                        <Car className="w-5 h-5 text-emerald-600" />
                                        {t.dashboard.sections.vehicle}
                                    </h3>
                                    <span className="px-3 py-1 bg-emerald-100 text-emerald-700 text-sm font-bold rounded-full">
                                        {MOCK_RENTER.vehicle.plate}
                                    </span>
                                </div>
                                <div className="p-6 flex flex-col sm:flex-row gap-6">
                                    <img src={MOCK_RENTER.vehicle.image} alt="Vehicle" className="w-full sm:w-48 h-32 object-cover rounded-xl" />
                                    <div className="space-y-3 flex-1">
                                        <div>
                                            <div className="text-sm text-slate-500">Model</div>
                                            <div className="font-semibold text-slate-900">{MOCK_RENTER.vehicle.model}</div>
                                        </div>
                                        <div>
                                            <div className="text-sm text-slate-500">Color</div>
                                            <div className="font-medium text-slate-900">{MOCK_RENTER.vehicle.color}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Contract Card */}
                            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
                                <div className="p-6 border-b border-slate-100">
                                    <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                                        <FileText className="w-5 h-5 text-emerald-600" />
                                        {t.dashboard.sections.contract}
                                    </h3>
                                </div>
                                <div className="p-6 grid sm:grid-cols-2 gap-6">
                                    <div>
                                        <div className="text-sm text-slate-500 mb-1">{t.dashboard.labels.contractId}</div>
                                        <div className="font-mono font-medium text-slate-900 bg-slate-50 inline-block px-3 py-1 rounded-lg">
                                            {MOCK_RENTER.contract.id}
                                        </div>
                                    </div>
                                    <div>
                                        <div className="text-sm text-slate-500 mb-1">{t.dashboard.labels.duration}</div>
                                        <div className="font-medium text-slate-900">
                                            {MOCK_RENTER.contract.startDate} - {MOCK_RENTER.contract.endDate}
                                        </div>
                                        <div className="text-sm text-emerald-600 font-medium">({MOCK_RENTER.contract.type})</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* RIGHT COL: Payment & Actions */}
                        <div className="space-y-8">
                            {/* Actions Card */}
                            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
                                <div className="p-6 border-b border-slate-100">
                                    <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                                        <CreditCard className="w-5 h-5 text-emerald-600" />
                                        {t.dashboard.sections.payment}
                                    </h3>
                                </div>
                                <div className="p-6 space-y-4">
                                    <button className="w-full py-4 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl shadow-lg shadow-emerald-600/20 transition-all flex items-center justify-center gap-2"
                                        onClick={() => alert('QR Code Generation Coming Soon!\nThis will open a promptPay QR specific to the contract.')}
                                    >
                                        <QrCode className="w-5 h-5" />
                                        {t.dashboard.labels.scanPay}
                                    </button>

                                    <div className="bg-slate-50 rounded-xl p-4 border border-slate-100">
                                        <div className="flex items-center justify-between mb-2">
                                            <span className="text-sm font-medium text-slate-700">{t.dashboard.labels.receipts}</span>
                                            <span className="text-xs text-slate-400">Latest</span>
                                        </div>
                                        <div className="space-y-2">
                                            {MOCK_RENTER.payment.history.slice(0, 2).map((payment, idx) => (
                                                <div key={idx} className="flex items-center justify-between bg-white p-3 rounded-lg border border-slate-100 shadow-sm">
                                                    <div className="flex items-center gap-3">
                                                        <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600">
                                                            <FileText className="w-4 h-4" />
                                                        </div>
                                                        <div>
                                                            <div className="text-xs text-slate-500">{payment.date}</div>
                                                            <div className="text-sm font-bold text-slate-900">฿{payment.amount.toLocaleString()}</div>
                                                        </div>
                                                    </div>
                                                    <button className="text-slate-400 hover:text-emerald-600 transition-colors" title={t.dashboard.labels.download}>
                                                        <Download className="w-4 h-4" />
                                                    </button>
                                                </div>
                                            ))}
                                        </div>
                                        <button className="w-full mt-3 text-center text-sm text-emerald-600 font-medium hover:underline">
                                            View All History
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }


    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, field: 'licenseFile' | 'idCardFile') => {
        if (e.target.files && e.target.files[0]) {
            setFormData({ ...formData, [field]: e.target.files[0] });
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!user) {
            // Redirect to login if not authenticated
            navigate('/login', { state: { from: '/car' } });
            return;
        }

        // In a real app, you would upload files and submit data here
        // For now, show the "Payment Coming Soon" message or success
        alert(`${t.form.payment_notice}\n(Mock Data Submitted): ${formData.fullName}`);
        console.log('Form Data:', formData);
    };

    return (
        <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
            {/* Navbar */}
            <nav className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-slate-200">
                <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
                    <div className="flex items-center gap-4 cursor-pointer" onClick={() => navigate('/')}>
                        <div className="relative h-[58px] w-[50px] overflow-hidden shrink-0">
                            <img src={logo} alt="CAPTB Logo" className="absolute h-full max-w-none object-contain left-0 top-0" />
                        </div>
                        <span className="text-3xl font-bold tracking-tight text-slate-900">
                            CAPT <span className="text-emerald-600">CAR</span>
                        </span>
                    </div>

                    <div className="flex items-center gap-4">
                        {/* Language Switcher */}
                        <button
                            onClick={() => setLang(lang === 'en' ? 'th' : 'en')}
                            className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-slate-200 text-sm font-medium text-slate-600 hover:border-emerald-400 hover:text-emerald-600 transition-all bg-white"
                        >
                            <Globe className="w-4 h-4 text-emerald-500" />
                            <span>{lang === 'en' ? 'EN' : 'TH'}</span>
                        </button>

                        {/* User Section */}
                        {user ? (
                            <div className="flex items-center gap-4">
                                <span className="text-sm font-medium text-slate-700 hidden md:block">
                                    {user.email}
                                </span>
                                <button
                                    onClick={() => signOut()}
                                    className="p-2 text-slate-400 hover:text-red-500 transition-colors"
                                    title={t.nav.sign_out}
                                >
                                    <LogOut className="w-5 h-5" />
                                </button>
                                <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center border border-emerald-200">
                                    <CircleUser className="w-6 h-6 text-emerald-600" />
                                </div>
                            </div>
                        ) : (
                            <button
                                onClick={() => navigate('/login', { state: { from: '/car' } })}
                                className="px-4 py-2 bg-slate-900 text-white text-sm font-bold rounded-full hover:bg-slate-800 transition-colors flex items-center gap-2"
                            >
                                <LogIn className="w-4 h-4" />
                                {t.nav.sign_in}
                            </button>
                        )}
                    </div>
                </div>
            </nav>

            <div className="pt-32 pb-20 px-6 max-w-7xl mx-auto">
                <div className="grid lg:grid-cols-2 gap-12 items-start">
                    {/* Left Column: Information & Image */}
                    <div>
                        <div className="relative rounded-3xl overflow-hidden shadow-2xl mb-8 aspect-video">
                            <img src={carImage} alt="CAPT CAR Fleet" className="w-full h-full object-cover" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-8">
                                <div className="text-white">
                                    <h2 className="text-3xl font-bold mb-2">{t.hero.title}</h2>
                                    <p className="text-emerald-300 font-medium">{t.hero.subtitle}</p>
                                </div>
                            </div>
                        </div>

                        <div className="prose prose-lg text-slate-600">
                            <h3 className="text-2xl font-bold text-slate-900 mb-4">{t.features.title}</h3>
                            <ul className="space-y-4 list-none pl-0">
                                <li className="flex items-start gap-3">
                                    <CheckCircle className="w-6 h-6 text-emerald-500 shrink-0 mt-1" />
                                    <span>{t.features.f1}</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <CheckCircle className="w-6 h-6 text-emerald-500 shrink-0 mt-1" />
                                    <span>{t.features.f2}</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <CheckCircle className="w-6 h-6 text-emerald-500 shrink-0 mt-1" />
                                    <span>{t.features.f3}</span>
                                </li>
                            </ul>
                        </div>
                    </div>

                    {/* Right Column: Registration Form */}
                    <div className="bg-white rounded-3xl shadow-xl p-8 border border-slate-200">
                        <div className="mb-8">
                            <h1 className="text-3xl font-bold text-slate-900 mb-2">{t.form.title}</h1>
                            <p className="text-slate-500">{t.form.subtitle}</p>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* Personal Info */}
                            <div className="space-y-4">
                                <h3 className="text-lg font-semibold text-slate-900 flex items-center gap-2">
                                    <User className="w-5 h-5 text-emerald-600" />
                                    {t.form.renter_info}
                                </h3>
                                <div className="grid gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 mb-1">{t.form.full_name}</label>
                                        <input
                                            type="text"
                                            required
                                            className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all"
                                            placeholder="John Doe"
                                            value={formData.fullName}
                                            onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                                        />
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-slate-700 mb-1">{t.form.email}</label>
                                            <input
                                                type="email"
                                                required
                                                className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all"
                                                placeholder="john@example.com"
                                                value={formData.email}
                                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-slate-700 mb-1">{t.form.phone}</label>
                                            <input
                                                type="tel"
                                                required
                                                className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all"
                                                placeholder="081-234-5678"
                                                value={formData.phone}
                                                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <hr className="border-slate-100" />

                            {/* Contract Info */}
                            <div className="space-y-4">
                                <h3 className="text-lg font-semibold text-slate-900 flex items-center gap-2">
                                    <Calendar className="w-5 h-5 text-emerald-600" />
                                    {t.form.duration}
                                </h3>
                                <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                                    {(['daily', 'weekly', 'monthly', 'yearly'] as const).map((type) => (
                                        <label key={type} className={`
                                            cursor-pointer border rounded-xl p-3 text-center transition-all
                                            ${formData.duration === type
                                                ? 'bg-emerald-50 border-emerald-500 text-emerald-700 font-bold ring-1 ring-emerald-500'
                                                : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'}
                                        `}>
                                            <input
                                                type="radio"
                                                name="duration"
                                                value={type}
                                                checked={formData.duration === type}
                                                onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                                                className="sr-only"
                                            />
                                            <span className="capitalize">{t.form.duration_options[type]}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>

                            <hr className="border-slate-100" />

                            {/* Documents Upload */}
                            <div className="space-y-4">
                                <h3 className="text-lg font-semibold text-slate-900 flex items-center gap-2">
                                    <FileText className="w-5 h-5 text-emerald-600" />
                                    {t.form.documents}
                                </h3>
                                <div className="grid sm:grid-cols-2 gap-4">
                                    {/* License Upload */}
                                    <div className="border-2 border-dashed border-slate-300 rounded-xl p-6 text-center hover:bg-slate-50 transition-colors group cursor-pointer relative">
                                        <input
                                            type="file"
                                            accept="image/*,.pdf"
                                            onChange={(e) => handleFileChange(e, 'licenseFile')}
                                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                        />
                                        <div className="flex flex-col items-center gap-2">
                                            <div className={`p-3 rounded-full ${formData.licenseFile ? 'bg-emerald-100 text-emerald-600' : 'bg-slate-100 text-slate-400 group-hover:text-emerald-500'}`}>
                                                {formData.licenseFile ? <CheckCircle className="w-6 h-6" /> : <Car className="w-6 h-6" />}
                                            </div>
                                            <span className="text-sm font-medium text-slate-700">{t.form.license}</span>
                                            <span className="text-xs text-slate-400">
                                                {formData.licenseFile ? formData.licenseFile.name : t.form.upload_placeholder}
                                            </span>
                                        </div>
                                    </div>

                                    {/* ID Card Upload */}
                                    <div className="border-2 border-dashed border-slate-300 rounded-xl p-6 text-center hover:bg-slate-50 transition-colors group cursor-pointer relative">
                                        <input
                                            type="file"
                                            accept="image/*,.pdf"
                                            onChange={(e) => handleFileChange(e, 'idCardFile')}
                                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                        />
                                        <div className="flex flex-col items-center gap-2">
                                            <div className={`p-3 rounded-full ${formData.idCardFile ? 'bg-emerald-100 text-emerald-600' : 'bg-slate-100 text-slate-400 group-hover:text-emerald-500'}`}>
                                                {formData.idCardFile ? <CheckCircle className="w-6 h-6" /> : <User className="w-6 h-6" />}
                                            </div>
                                            <span className="text-sm font-medium text-slate-700">{t.form.id_card}</span>
                                            <span className="text-xs text-slate-400">
                                                {formData.idCardFile ? formData.idCardFile.name : t.form.upload_placeholder}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <button
                                type="submit"
                                className="w-full py-4 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl shadow-lg shadow-emerald-600/20 transition-all transform hover:-translate-y-0.5 active:translate-y-0"
                            >
                                {t.form.submit}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
