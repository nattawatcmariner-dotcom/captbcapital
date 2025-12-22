import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Anchor, Car, Home, ArrowRight, Globe, Building2, MapPin, Mail, Phone } from 'lucide-react';
import logo from '../assets/logo.png';
import marineImage from '../assets/capt-marine.jpg';
import carImage from '../assets/capt-car-new.jpg';
import comingSoonIcon from '../assets/icon-coming-soon.png';

// Use online placeholders or local assets if available
const IMAGES = {
    // Marine: Custom uploaded image
    marine: marineImage,
    // Car: Clean white EV
    car: carImage,
    // House: Modern architecture
    house: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80"
};

// --- Localization Content ---
const CONTENT = {
    en: {
        nav: {
            about: 'About Us',
            contact: 'Contact Us',
        },
        hero: {
            tag: 'Innovation in Motion',
            title: 'Empowering Future',
            desc: (
                <>
                    Driving innovation across Land, Sea, and Living. <br className="hidden md:block" />
                    We are a diversified group committed to excellence in <br className="hidden md:block" /><span className="font-medium">Marine Logistics</span>, <span className="font-medium">EV Transportation</span>, and <span className="font-medium">Modern Real Estate</span>.
                </>
            )
        },
        parcels: {
            marine: {
                tag: 'Marine Logistics',
                title: 'CAPT MARINE',
                desc: 'Premier ship management and commercial operations. AI-driven insights for Laytime, Demurrage, and Post-Fixture analytics.',
                action: 'Go to Platform'
            },
            car: {
                tag: 'EV Transport',
                title: 'CAPT CAR',
                desc: 'Revolutionizing urban transport with our premium EV Taxi fleet. Sustainable, silent, and smart mobility solutions for the future city.',
                action: 'Go to Platform'
            },
            house: {
                tag: 'Real Estate',
                title: 'CAPT HOUSE',
                desc: 'Modern living defined. Exquisite single-detached homes designed for contemporary lifestyles, blending aesthetic beauty with functional space.',
                action: 'Book Now'
            }
        },
        about: {
            title: 'About CAPTB',
            intro: 'CAPTB is a Technology-driven & Service Company operating under Lean, AI-first, and Automation philosophies. We are committed to building platforms and services that simplify complexity in target industries to deliver maximum value to customers and partners.',
            coreTitle: 'Our Core Business Lines',
            coreDesc: 'We operate three main business sectors interconnected by technology:',
            business: [
                {
                    title: 'CAPT CAR (Mobility Solution)',
                    desc: 'EV and commercial vehicle rental services creating opportunities in the modern economy.',
                    focus: 'Supporting ride-hailing drivers (e.g., Grab) and commercial tasks.',
                    strategy: 'Clean energy vehicles for sustainability and Digital-first management.'
                },
                {
                    title: 'CAPT HOUSE (Property Management)',
                    desc: 'Flexible residential and property management services.',
                    focus: 'Monthly and Short-term rentals (e.g., Airbnb).',
                    strategy: 'International Payment Gateways for fast and convenient transactions.'
                },
                {
                    title: 'CAPT MARINE (Maritime Advisory & SaaS)',
                    desc: 'Maritime and logistics experts with AI at the core.',
                    focus: 'Marine Superintendent, SIRE 2.0 / TMSA Advisory, and vessel management.',
                    subItems: [
                        'SaaS Development: Developing Digital Tools and Subscription platforms to elevate shipping standards.',
                        'Advisory: Comprehensive Post-fixture and technical marine support.'
                    ]
                }
            ],
            techTitle: 'Our Tech Stack & Philosophy',
            techDesc: 'We never stop developing technology to lead the industry:',
            techStack: [
                { label: 'Frontend', value: 'Advanced Vercel deployment for speed and security.' },
                { label: 'Backend', value: 'Stable Supabase database systems.' },
                { label: 'AI Core', value: 'Leveraging Google AI Pro (Gemini & Antigravity) for data analysis and content generation.' },
                { label: 'Financial Integrity', value: 'Transparent, auditable accounting systems under Thai legal standards.' }
            ]
        },
        contactInfo: {
            title: 'Contact Information',
            companyName: 'CAPTB CO., LTD.',
            regNo: 'Registration No.: 0845568022456',
            addressLabel: 'Registered Address',
            address: '22/68 Moo 2, Kanchanawithee Rd., Bang Kung, Mueang Surat Thani, Surat Thani 84000',
            emailLabel: 'Digital Contact',
            email: 'nattawat_c@captmarine.com',
            website: 'https://captbcapital.com',
            phoneLabel: 'Phone',
            phone: '080-5073467'
        },
        footer: {
            rights: '© 2025 CAPTB Capital Group. All rights reserved.',
            privacy: 'Privacy Policy',
            terms: 'Terms of Service',
            contact: 'Contact'
        }
    },
    th: {
        nav: {
            about: 'เกี่ยวกับเรา',
            contact: 'ติดต่อเรา',
        },
        hero: {
            tag: 'นวัตกรรมแห่งการขับเคลื่อน',
            title: 'Empowering Future',
            desc: (
                <>
                    ขับเคลื่อนนวัตกรรมสู่ทุกภาคส่วน ทั้งทางบก ทางทะเล และการอยู่อาศัย <br className="hidden md:block" />
                    เราคือกลุ่มบริษัทชั้นนำที่มุ่งมั่นสู่ความเป็นเลิศในด้าน <br className="hidden md:block" /><span className="font-medium">โลจิสติกส์ทางทะเล</span>, <span className="font-medium">ยานยนต์ไฟฟ้า (EV)</span>, และ <span className="font-medium">อสังหาริมทรัพย์ยุคใหม่</span>.
                </>
            )
        },
        parcels: {
            marine: {
                tag: 'โลจิสติกส์ทางทะเล',
                title: 'CAPT MARINE',
                desc: 'ผู้นำด้านการบริหารจัดการเรือและการพาณิชย์นาวี ยกระดับด้วย AI อัจฉริยะสำหรับ Laytime, Demurrage และการวิเคราะห์ Post-Fixture',
                action: 'ไปที่แพลตฟอร์ม'
            },
            car: {
                tag: 'ยานยนต์ไฟฟ้า',
                title: 'CAPT CAR',
                desc: 'พลิกโฉมการเดินทางในเมืองด้วยกองทัพรถแท็กซี่ EV ระดับพรีเมียม ทางเลือกการเดินทางที่ยั่งยืน ไร้เสียงรบกวน และชาญฉลาดสำหรับเมืองแห่งอนาคต',
                action: 'เข้าสู่แพลตฟอร์ม'
            },
            house: {
                tag: 'อสังหาริมทรัพย์',
                title: 'CAPT HOUSE',
                desc: 'นิยามใหม่ของการอยู่อาศัย บ้านเดี่ยวดีไซน์หรูที่ออกแบบมาเพื่อไลฟ์สไตล์ร่วมสมัย ผสมผสานความงามทางสถาปัตยกรรมเข้ากับการใช้งานอย่างลงตัว',
                action: 'จองที่พัก'
            }
        },
        about: {
            title: 'เกี่ยวกับ CAPTB',
            intro: 'CAPTB เป็นบริษัทที่ขับเคลื่อนด้วยเทคโนโลยีและนวัตกรรม (Technology-driven & Service Company) ดำเนินธุรกิจภายใต้ปรัชญา Lean, AI-first, และ Automation เรามุ่งมั่นในการสร้างแพลตฟอร์มและบริการที่ลดความซับซ้อนในอุตสาหกรรมเป้าหมาย เพื่อส่งมอบคุณค่าสูงสุดให้กับลูกค้าและคู่ค้า',
            coreTitle: 'Our Core Business Lines',
            coreDesc: 'เราดำเนินธุรกิจหลัก 3 ภาคส่วนที่เชื่อมโยงกันด้วยเทคโนโลยี:',
            business: [
                {
                    title: '1. CAPT CAR (Mobility Solution)',
                    desc: 'บริการให้เช่ารถยนต์ไฟฟ้า (EV) และรถใช้งานเชิงพาณิชย์เพื่อสร้างโอกาสในระบบเศรษฐกิจสมัยใหม่',
                    focus: 'สนับสนุนผู้ขับขี่บนแพลตฟอร์ม Ride-hailing (เช่น Grab) และงานรับจ้างเชิงพาณิชย์',
                    strategy: 'เน้นการใช้ยานยนต์พลังงานสะอาดเพื่อความยั่งยืน และบริหารจัดการด้วยระบบ Digital-first'
                },
                {
                    title: '2. CAPT HOUSE (Property Management)',
                    desc: 'บริการจัดการที่พักอาศัยและอสังหาริมทรัพย์ในรูปแบบที่ยืดหยุ่น',
                    focus: 'การปล่อยเช่าที่พักอาศัยทั้งแบบรายเดือนและรูปแบบ Short-term rental (เช่น Airbnb)',
                    strategy: 'ใช้ระบบจัดการทางการเงินที่เป็นสากล (International Payment Gateways) เพื่อความสะดวกรวดเร็วในการทำธุรกรรม'
                },
                {
                    title: '3. CAPT MARINE (Maritime Advisory & SaaS)',
                    desc: 'ผู้เชี่ยวชาญด้านพาณิชยนาวีและโลจิสติกส์ที่นำ AI มาเป็นหัวใจหลักในการทำงาน',
                    focus: 'ให้คำปรึกษาด้าน Marine Superintendent, SIRE 2.0 / TMSA Advisory และการบริหารจัดการเรือขนส่งสินค้า',
                    subItems: [
                        'SaaS Development: กำลังพัฒนา Digital Tools และแพลตฟอร์ม Subscription เพื่อยกระดับมาตรฐานงานเดินเรือ',
                        'Advisory: สนับสนุนงาน Post-fixture และเทคนิคการเดินเรืออย่างครบวงจร'
                    ]
                }
            ],
            techTitle: 'Our Tech Stack & Philosophy',
            techDesc: 'เรามุ่งมั่นที่จะไม่หยุดพัฒนาเทคโนโลยีเพื่อเป็นผู้นำในอุตสาหกรรม:',
            techStack: [
                { label: 'Frontend', value: 'พัฒนาด้วยเทคโนโลยีขั้นสูงบน Vercel เพื่อความรวดเร็วและปลอดภัย' },
                { label: 'Backend', value: 'ระบบฐานข้อมูลที่เสถียรผ่าน Supabase' },
                { label: 'AI Core', value: 'ผสานพลังของ Google AI Pro (Gemini & Antigravity) ในการวิเคราะห์ข้อมูลและสร้างเนื้อหา' },
                { label: 'Financial Integrity', value: 'ใช้ระบบบัญชีที่ตรวจสอบได้และมีความโปร่งใสภายใต้มาตรฐานกฎหมายไทย' }
            ]
        },
        contactInfo: {
            title: 'ข้อมูลการติดต่อ',
            companyName: 'บริษัท แคปท์บี จำกัด',
            regNo: 'เลขทะเบียนนิติบุคคล: 0845568022456',
            addressLabel: 'ที่อยู่สำนักงานใหญ่',
            address: '22/68 หมู่ที่ 2 ถนนกาญจนวิถี ตำบลบางกุ้ง อำเภอเมืองสุราษฎร์ธานี จังหวัดสุราษฎร์ธานี 84000',
            emailLabel: 'การติดต่อดิจิทัล',
            email: 'nattawat_c@captmarine.com',
            website: 'https://captbcapital.com',
            phoneLabel: 'โทรศัพท์',
            phone: '080-5073467'
        },
        footer: {
            rights: '© 2025 CAPTB Capital Group. สงวนลิขสิทธิ์.',
            privacy: 'นโยบายความเป็นส่วนตัว',
            terms: 'ข้อกำหนดการให้บริการ',
            contact: 'ติดต่อเรา'
        }
    }
};

// --- Meteor Shower Component (Black Meteors) ---
const MeteorShower = () => {
    const [meteors, setMeteors] = useState<{ id: number; left: number; delay: number; duration: number }[]>([]);

    useEffect(() => {
        const createMeteor = () => {
            return {
                id: Math.random(),
                left: Math.random() * 100, // Random horizontal start (0-100%)
                delay: Math.random() * 5, // Random delay
                duration: Math.random() * 2 + 1 // Random speed (1-3s)
            };
        };

        // Initialize meteors
        const initialMeteors = Array.from({ length: 20 }, createMeteor);
        setMeteors(initialMeteors);
    }, []);

    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
            {/* Subtle Texture for White Background */}
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.03]"></div>

            <style>{`
                @keyframes meteor {
                    0% {
                        transform: rotate(215deg) translateX(0);
                        opacity: 1;
                    }
                    70% {
                        opacity: 1;
                    }
                    100% {
                        transform: rotate(215deg) translateX(-500px);
                        opacity: 0;
                    }
                }
                .meteor-tail {
                    /* Black Gradient for Light Theme */
                    background: linear-gradient(to right, rgba(0, 0, 0, 0) 0%, rgba(30, 41, 59, 1) 100%);
                }
            `}</style>

            {meteors.map((meteor) => (
                <div
                    key={meteor.id}
                    className="absolute top-0 w-[2px] h-[2px] rounded-full bg-slate-900 shadow-[0_0_0_1px_#00000010]"
                    style={{
                        left: `${meteor.left}%`,
                        animation: `meteor ${meteor.duration}s linear infinite`,
                        animationDelay: `${meteor.delay}s`,
                        transform: 'rotate(215deg)',
                    }}
                >
                    {/* Tail */}
                    <div
                        className="meteor-tail absolute top-1/2 -translate-y-1/2 w-[50px] h-[1px] right-0 transform translate-x-full"
                    />
                </div>
            ))}
        </div>
    );
};

// --- About Us Modal ---
const AboutModal = ({ isOpen, onClose, content }: { isOpen: boolean; onClose: () => void; content: any }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm transition-opacity" onClick={onClose}></div>
            <div className="relative bg-white rounded-3xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto animate-in slide-in-from-bottom-8 fade-in duration-300">
                <div className="p-8 md:p-12">
                    <div className="flex justify-between items-start mb-6">
                        <h2 className="text-3xl font-bold text-slate-900">{content.about.title}</h2>
                        <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-full transition-colors">
                            <span className="text-2xl text-slate-400">×</span>
                        </button>
                    </div>

                    <div className="space-y-8 text-slate-700">
                        {/* Intro */}
                        <p className="text-lg leading-relaxed text-slate-600 border-l-4 border-blue-500 pl-4 py-1 bg-slate-50 rounded-r-lg">
                            {content.about.intro}
                        </p>

                        {/* Core Business */}
                        <div>
                            <h3 className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                                <span className="w-8 h-1 bg-blue-600 rounded-full"></span>
                                {content.about.coreTitle}
                            </h3>
                            <p className="mb-6 text-slate-500">{content.about.coreDesc}</p>
                            <div className="grid gap-6">
                                {content.about.business.map((biz: any, idx: number) => (
                                    <div key={idx} className="bg-white border border-slate-100 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
                                        <h4 className="text-xl font-bold text-blue-900 mb-2">{biz.title}</h4>
                                        <p className="text-slate-600 mb-3 font-medium">{biz.desc}</p>
                                        <div className="space-y-2 text-sm text-slate-500">
                                            <p><strong className="text-slate-700">Focus:</strong> {biz.focus}</p>
                                            {biz.strategy && <p><strong className="text-slate-700">Strategy:</strong> {biz.strategy}</p>}
                                            {biz.subItems && (
                                                <ul className="list-disc pl-5 space-y-1 mt-2">
                                                    {biz.subItems.map((item: string, i: number) => (
                                                        <li key={i}>{item}</li>
                                                    ))}
                                                </ul>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Tech Stack */}
                        <div className="bg-slate-900 text-slate-300 rounded-2xl p-8">
                            <h3 className="text-2xl font-bold text-white mb-2">{content.about.techTitle}</h3>
                            <p className="text-slate-400 mb-6">{content.about.techDesc}</p>
                            <div className="grid sm:grid-cols-2 gap-4">
                                {content.about.techStack.map((tech: any, idx: number) => (
                                    <div key={idx} className="bg-white/5 border border-white/10 rounded-lg p-4">
                                        <strong className="block text-blue-400 mb-1">{tech.label}</strong>
                                        <span className="text-sm">{tech.value}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="mt-10 pt-6 border-t border-slate-100 text-center">
                        <button
                            onClick={onClose}
                            className="px-8 py-3 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-full transition-colors"
                        >
                            Close
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

// --- Contact Modal ---
const ContactModal = ({ isOpen, onClose, content }: { isOpen: boolean; onClose: () => void; content: any }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm transition-opacity" onClick={onClose}></div>
            <div className="relative bg-white rounded-3xl shadow-2xl max-w-2xl w-full animate-in zoom-in-95 fade-in duration-300 overflow-hidden">
                <div className="bg-blue-600 p-8 text-white relative overflow-hidden">
                    <div className="absolute top-0 right-0 opacity-10 transform translate-x-1/4 -translate-y-1/4">
                        <Anchor className="w-64 h-64" />
                    </div>
                    <h2 className="text-3xl font-bold relative z-10">{content.contactInfo.title}</h2>
                    <p className="opacity-90 mt-2 relative z-10">We are here to help and answer any questions.</p>
                </div>

                <div className="p-8 space-y-8">
                    {/* Company Info */}
                    <div className="flex gap-4">
                        <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center shrink-0">
                            <Building2 className="w-6 h-6 text-blue-600" />
                        </div>
                        <div>
                            <h3 className="font-bold text-slate-900 text-lg">{content.contactInfo.companyName}</h3>
                            <p className="text-slate-500 text-sm">{content.contactInfo.regNo}</p>
                        </div>
                    </div>

                    {/* Address */}
                    <div className="flex gap-4">
                        <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center shrink-0">
                            <MapPin className="w-6 h-6 text-blue-600" />
                        </div>
                        <div>
                            <h3 className="font-bold text-slate-900 text-sm uppercase tracking-wide mb-1">{content.contactInfo.addressLabel}</h3>
                            <p className="text-slate-600 leading-relaxed">{content.contactInfo.address}</p>
                        </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8">
                        {/* Digital Contact */}
                        <div className="flex gap-4">
                            <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center shrink-0">
                                <Mail className="w-6 h-6 text-blue-600" />
                            </div>
                            <div>
                                <h3 className="font-bold text-slate-900 text-sm uppercase tracking-wide mb-1">{content.contactInfo.emailLabel}</h3>
                                <a href={`mailto:${content.contactInfo.email}`} className="text-blue-600 hover:underline block">{content.contactInfo.email}</a>
                                <a href={content.contactInfo.website} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline flex items-center gap-1 mt-1">
                                    <Globe className="w-3 h-3" /> captbcapital.com
                                </a>
                            </div>
                        </div>

                        {/* Phone */}
                        <div className="flex gap-4">
                            <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center shrink-0">
                                <Phone className="w-6 h-6 text-blue-600" />
                            </div>
                            <div>
                                <h3 className="font-bold text-slate-900 text-sm uppercase tracking-wide mb-1">{content.contactInfo.phoneLabel}</h3>
                                <a href={`tel:${content.contactInfo.phone}`} className="text-slate-700 hover:text-blue-600 font-medium text-lg">{content.contactInfo.phone}</a>
                            </div>
                        </div>
                    </div>

                    <div className="pt-6 border-t border-slate-100 flex justify-end">
                        <button
                            onClick={onClose}
                            className="px-6 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-full transition-colors"
                        >
                            Close
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

// --- Custom Christmas Tree Component (Colorful & Festive) ---
const ChristmasTree = ({ className, style }: { className?: string, style?: React.CSSProperties }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        className={className}
        style={style}
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
    >
        {/* Trunk */}
        <path d="M12 22v-3" stroke="#78350f" strokeWidth="2.5" />

        {/* Tree Body - Green with dark green border */}
        <path
            d="m17 14 3 3.3a1 1 0 0 1-.7 1.7H4.7a1 1 0 0 1-.7-1.7L7 14h-.3a1 1 0 0 1-.7-1.7L9 8.5 12 2l3 6.5 3 4.2a1 1 0 0 1-.7 1.7H17Z"
            fill="#10b981"
            stroke="#047857"
            strokeWidth="1.5"
        />

        {/* Lights / Ornaments */}
        {/* Top Star/Light - Twinkling */}
        <circle cx="12" cy="4" r="1.5" fill="#facc15" className="animate-pulse" />

        {/* Colorful Lights */}
        <circle cx="10.5" cy="8.5" r="1.2" fill="#ef4444" /> {/* Red */}
        <circle cx="13.5" cy="8.5" r="1.2" fill="#3b82f6" /> {/* Blue */}

        <circle cx="12" cy="12.5" r="1.2" fill="#fbbf24" /> {/* Amber */}
        <circle cx="8" cy="13.5" r="1.2" fill="#ec4899" /> {/* Pink */}
        <circle cx="16" cy="13.5" r="1.2" fill="#ef4444" /> {/* Red */}

        <circle cx="10" cy="17" r="1.2" fill="#3b82f6" /> {/* Blue */}
        <circle cx="14" cy="17" r="1.2" fill="#facc15" /> {/* Yellow */}
    </svg>
);

export function LandingPage() {
    const navigate = useNavigate();
    const [lang, setLang] = useState<'en' | 'th'>('en');
    const [showAbout, setShowAbout] = useState(false);
    const [showContact, setShowContact] = useState(false);

    // Helper to get current content
    const t = CONTENT[lang];

    return (
        <div className="min-h-screen bg-white font-sans text-slate-900 relative">
            {/* Animated Background (Black Meteors) */}
            <MeteorShower />

            {/* About Modal */}
            <AboutModal isOpen={showAbout} onClose={() => setShowAbout(false)} content={t} />
            <ContactModal isOpen={showContact} onClose={() => setShowContact(false)} content={t} />

            {/* Navigation (White Background) */}
            <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-slate-100 shadow-sm">
                <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <div className="relative h-[58px] w-[50px] overflow-hidden shrink-0">
                            {/* Standard Logo (No Filters) */}
                            <img src={logo} alt="CAPTB Logo" className="absolute h-full max-w-none object-contain left-0 top-0" />
                        </div>
                        <span className="text-3xl font-bold tracking-tight text-slate-900">
                            CAPTB <span className="text-blue-600">CAPITAL</span>
                        </span>
                    </div>

                    {/* Right: Menu & Language */}
                    <div className="flex items-center gap-8">
                        {/* Links */}
                        <div className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600">
                            <button onClick={() => setShowAbout(true)} className="hover:text-blue-600 transition-colors">
                                {t.nav.about}
                            </button>
                            <button onClick={() => setShowContact(true)} className="hover:text-blue-600 transition-colors">
                                {t.nav.contact}
                            </button>
                        </div>

                        {/* Language Switcher */}
                        <button
                            onClick={() => setLang(lang === 'en' ? 'th' : 'en')}
                            className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-slate-200 text-sm font-medium text-slate-600 hover:border-blue-400 hover:text-blue-600 transition-all bg-white"
                        >
                            <Globe className="w-4 h-4 text-blue-500" />
                            <span>{lang === 'en' ? 'EN' : 'TH'}</span>
                        </button>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <div className="relative z-10 pt-40 pb-20 px-6 text-center max-w-5xl mx-auto">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 border border-blue-100 text-blue-600 text-sm font-medium mb-8">
                    <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
                    </span>
                    {t.hero.tag}
                </div>
                <h1 className="text-5xl md:text-8xl font-bold tracking-tight mb-8 leading-tight text-slate-900 flex items-center justify-center gap-3 md:gap-5">
                    {t.hero.title}
                    <ChristmasTree className="mb-2 md:mb-3 hover:scale-110 transition-transform duration-300 transform origin-bottom" style={{ width: '0.85em', height: '0.85em' }} />
                </h1>
                <p className="text-xl md:text-2xl text-slate-900 max-w-3xl mx-auto leading-relaxed font-light">
                    {t.hero.desc}
                </p>
            </div>

            {/* Parcels Grid */}
            <div className="relative z-10 max-w-7xl mx-auto px-6 pb-24">
                <div className="grid md:grid-cols-3 gap-8">

                    {/* PARCEL 1: CAPT MARINE */}
                    <div className="group relative flex flex-col h-full rounded-3xl overflow-hidden bg-white border border-slate-200 shadow-xl transition-all duration-500 hover:scale-[1.02] hover:border-blue-300 group-hover:shadow-blue-500/10 cursor-pointer"
                        onClick={() => navigate('/marine')}>
                        {/* Image */}
                        <div className="h-[280px] bg-slate-50 overflow-hidden relative shrink-0">
                            <img src={IMAGES.marine} alt="Marine" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                        </div>

                        {/* Content */}
                        <div className="p-8 flex flex-col flex-1">
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-xs font-bold uppercase tracking-wider mb-4 border border-blue-200 w-fit">
                                <Anchor className="w-3 h-3" />
                                {t.parcels.marine.tag}
                            </div>

                            <h2 className="text-3xl font-bold text-slate-900 mb-3">{t.parcels.marine.title}</h2>
                            <p className="text-slate-500 mb-6 leading-relaxed flex-1">
                                {t.parcels.marine.desc}
                            </p>

                            <div className="mt-auto inline-flex items-center gap-2 text-blue-600 font-bold group-hover:text-blue-500 transition-colors">
                                {t.parcels.marine.action} <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </div>
                        </div>
                    </div>

                    {/* PARCEL 2: CAPT CAR */}
                    <div className="group relative flex flex-col h-full rounded-3xl overflow-hidden bg-white border border-slate-200 shadow-xl transition-all duration-500 hover:scale-[1.02] hover:border-emerald-300 group-hover:shadow-emerald-500/10 cursor-pointer"
                        onClick={() => navigate('/car')}>
                        {/* Image */}
                        <div className="h-[280px] bg-slate-50 overflow-hidden relative shrink-0">
                            <img src={IMAGES.car} alt="EV Car" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                        </div>

                        {/* Content */}
                        <div className="p-8 flex flex-col flex-1">
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-700 text-xs font-bold uppercase tracking-wider mb-4 border border-emerald-200 w-fit">
                                <Car className="w-3 h-3" />
                                {t.parcels.car.tag}
                            </div>

                            <h2 className="text-3xl font-bold text-slate-900 mb-3">{t.parcels.car.title}</h2>
                            <p className="text-slate-500 mb-6 leading-relaxed flex-1">
                                {t.parcels.car.desc}
                            </p>

                            <div className="mt-auto inline-flex items-center gap-2 text-emerald-600 font-bold group-hover:text-emerald-500 transition-colors">
                                {t.parcels.car.action} <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </div>
                        </div>
                    </div>

                    {/* PARCEL 3: CAPT HOUSE */}
                    <div className="group relative flex flex-col h-full rounded-3xl overflow-hidden bg-white border border-slate-200 shadow-xl transition-all duration-500 hover:scale-[1.02] hover:border-amber-300 group-hover:shadow-amber-500/10 cursor-pointer"
                        onClick={() => navigate('/house')}>
                        {/* Image */}
                        <div className="h-[280px] bg-slate-50 overflow-hidden relative shrink-0">
                            <img src={IMAGES.house} alt="Modern House" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                        </div>

                        {/* Content */}
                        <div className="p-8 flex flex-col flex-1">
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 text-amber-700 text-xs font-bold uppercase tracking-wider mb-4 border border-amber-200 w-fit">
                                <Home className="w-3 h-3" />
                                {t.parcels.house.tag}
                            </div>

                            <h2 className="text-3xl font-bold text-slate-900 mb-3">{t.parcels.house.title}</h2>
                            <p className="text-slate-500 mb-6 leading-relaxed flex-1">
                                {t.parcels.house.desc}
                            </p>

                            <div className="mt-auto inline-flex items-center gap-2 text-amber-600 font-bold group-hover:text-amber-500 transition-colors">
                                {t.parcels.house.action} <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </div>
                        </div>
                    </div>

                </div>
            </div>

            {/* Footer */}
            <footer className="border-t border-slate-200 bg-white py-12 relative z-10">
                <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between text-slate-500 text-sm">
                    <p>{t.footer.rights}</p>
                    <div className="flex items-center gap-6 mt-4 md:mt-0">
                        <span className="hover:text-slate-900 cursor-pointer transition-colors">{t.footer.privacy}</span>
                        <span className="hover:text-slate-900 cursor-pointer transition-colors">{t.footer.terms}</span>
                        <button onClick={() => setShowContact(true)} className="hover:text-slate-900 cursor-pointer transition-colors">{t.footer.contact}</button>
                    </div>
                </div>
            </footer>
        </div>
    );
}
