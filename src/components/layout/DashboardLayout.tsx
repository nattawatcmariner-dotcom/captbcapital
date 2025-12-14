import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { Menu, X } from 'lucide-react';

export function DashboardLayout() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    return (
        <div className="flex h-screen overflow-hidden bg-slate-50">
            {/* Desktop Sidebar */}
            <div className="hidden md:block">
                <Sidebar />
            </div>

            {/* Mobile Sidebar Overlay */}
            {isMobileMenuOpen && (
                <div className="fixed inset-0 z-50 md:hidden">
                    <div className="fixed inset-0 bg-black/50" onClick={() => setIsMobileMenuOpen(false)} />
                    <div className="relative flex h-full max-w-xs flex-col bg-white">
                        <div className="absolute top-2 right-2 p-2">
                            <button onClick={() => setIsMobileMenuOpen(false)}>
                                <X className="h-6 w-6 text-slate-400" />
                            </button>
                        </div>
                        <Sidebar />
                    </div>
                </div>
            )}

            <main className="flex-1 flex flex-col overflow-hidden">
                {/* Mobile Header */}
                <div className="md:hidden flex items-center justify-between p-4 border-b border-slate-200 bg-white">
                    <button onClick={() => setIsMobileMenuOpen(true)} className="p-2 -ml-2 text-slate-600">
                        <Menu className="h-6 w-6" />
                    </button>
                    <span className="font-bold text-slate-900">CAPTB</span>
                    <div className="w-8" /> {/* Spacer for balance */}
                </div>

                <div className="flex-1 overflow-y-auto p-4 md:p-8">
                    <div className="mx-auto max-w-7xl">
                        <Outlet />
                    </div>
                </div>
            </main>
        </div>
    );
}
