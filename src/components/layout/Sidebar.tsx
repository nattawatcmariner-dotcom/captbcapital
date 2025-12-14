import React, { useState } from 'react';
import { NavLink, useLocation, Link } from 'react-router-dom';
import { LayoutDashboard, Anchor, Calculator, FileText, BarChart3, Ship, ClipboardCheck, ChevronDown, ChevronRight, Circle, LogOut } from 'lucide-react';
import { cn } from '../../lib/utils';
import logo from '../../assets/logo.png';
import { useAuth } from '../../context/AuthContext';

const navigation = [
    { name: 'Dashboard', href: '/app', icon: LayoutDashboard },
    { name: 'Ship Monitor', href: '/app/monitor', icon: Anchor },
    { name: 'Fleet', href: '/app/fleet', icon: Ship },
    { name: 'Calculators', href: '/app/calculators', icon: Calculator },
    { name: 'Laytime', href: '/app/laytime', icon: FileText },
    { name: 'Performance', href: '/app/performance', icon: BarChart3 },
];

const standardSubItems = [
    { name: 'SIRE 2.0', href: '/app/standard/sire2' },
    { name: 'Pre-SIRE', href: '/app/standard/pre-sire' },
    { name: 'Internal Audit', href: '/app/standard/internal-audit' },
    { name: 'Marine Supt. Visit', href: '/app/standard/marine-visit' },
    { name: 'Tech Supt. Visit', href: '/app/standard/tech-visit' },
    { name: 'Engineering Audit', href: '/app/standard/engineering-audit' },
    { name: 'Cargo Op. Audit', href: '/app/standard/cargo-audit' },
    { name: 'Mooring Audit', href: '/app/standard/mooring-audit' },
    { name: 'Navigation Audit', href: '/app/standard/navigation-audit' },
];

export function Sidebar() {
    const location = useLocation();
    const { user, profile, signOut } = useAuth();
    const [isStandardOpen, setIsStandardOpen] = useState(false);

    // Auto-open standard menu if active
    React.useEffect(() => {
        if (location.pathname.startsWith('/standard')) {
            setIsStandardOpen(true);
        }
    }, [location.pathname]);

    return (
        <div className="flex h-full w-72 flex-col border-r border-slate-200 bg-white shadow-sm">
            {/* Logo Section */}
            <div className="flex h-20 items-center border-b border-slate-200 px-6">
                <Link to="/" className="flex items-center gap-4 hover:opacity-80 transition-opacity">
                    {/* Icon - Cropped from logo image */}
                    <div className="relative h-[72px] w-[60px] overflow-hidden shrink-0">
                        <img
                            src={logo}
                            alt="Logo Icon"
                            className="absolute h-[72px] max-w-none object-contain left-0 top-0"
                        />
                    </div>
                    {/* Text - Recreated with CSS to match Dashboard size */}
                    <div className="flex flex-col justify-center">
                        <h1 className="text-3xl font-bold tracking-tight leading-none text-slate-900">
                            CAP<span className="text-[#38bdf8]">TB</span>
                        </h1>
                        <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-900 mt-1">
                            MARINE LOGISTICS
                        </p>
                    </div>
                </Link>
            </div>

            {/* Navigation */}
            <nav className="flex-1 space-y-1 px-4 py-6 overflow-y-auto">
                <div className="mb-4 px-3 text-xs font-semibold uppercase tracking-wider text-slate-500">
                    Main Menu
                </div>
                {navigation.map((item) => (
                    <NavLink
                        key={item.name}
                        to={item.href}
                        className={({ isActive }) =>
                            cn(
                                'group flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all duration-200',
                                isActive
                                    ? 'bg-accent text-white shadow-md shadow-accent/20'
                                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                            )
                        }
                    >
                        {({ isActive }) => (
                            <>
                                <item.icon
                                    className={cn(
                                        "h-5 w-5 transition-colors",
                                        isActive ? "text-white" : "text-slate-400 group-hover:text-accent"
                                    )}
                                />
                                <span>{item.name}</span>
                            </>
                        )}
                    </NavLink>
                ))}

                {/* Standard Group */}
                <div className="pt-2">
                    <button
                        onClick={() => setIsStandardOpen(!isStandardOpen)}
                        className={cn(
                            'group flex w-full items-center justify-between gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all duration-200',
                            isStandardOpen || location.pathname.startsWith('/standard')
                                ? 'text-slate-900 bg-slate-50'
                                : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                        )}
                    >
                        <div className="flex items-center gap-3">
                            <ClipboardCheck className={cn("h-5 w-5 transition-colors",
                                location.pathname.startsWith('/standard') ? "text-accent" : "text-slate-400 group-hover:text-accent"
                            )} />
                            <span>Standard</span>
                        </div>
                        {isStandardOpen ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
                    </button>

                    {isStandardOpen && (
                        <div className="mt-1 space-y-1 pl-4">
                            {standardSubItems.map((subItem) => (
                                <NavLink
                                    key={subItem.name}
                                    to={subItem.href}
                                    className={({ isActive }) =>
                                        cn(
                                            'flex items-center gap-3 rounded-xl px-4 py-2 text-sm font-medium transition-all duration-200',
                                            isActive
                                                ? 'bg-accent/10 text-accent'
                                                : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'
                                        )
                                    }
                                >
                                    <Circle className="h-2 w-2" />
                                    <span>{subItem.name}</span>
                                </NavLink>
                            ))}
                        </div>
                    )}
                </div>

            </nav>

            {/* User Profile */}
            <div className="border-t border-slate-200 p-4">
                <div className="flex items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 p-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-accent to-accent-dark text-sm font-bold text-white shadow-sm shrink-0">
                        {profile?.full_name?.charAt(0) || user?.email?.charAt(0).toUpperCase() || 'U'}
                    </div>
                    <div className="flex-1 overflow-hidden min-w-0">
                        <p className="truncate text-sm font-semibold text-slate-900">
                            {profile?.full_name || user?.email?.split('@')[0] || 'User'}
                        </p>
                        <p className="truncate text-xs text-slate-500 capitalize">
                            {profile?.role || 'User'}
                        </p>
                    </div>
                    <button
                        onClick={signOut}
                        className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors shrink-0"
                        title="Log Out"
                    >
                        <LogOut className="h-5 w-5" />
                    </button>
                </div>
            </div>
        </div>
    );
}

