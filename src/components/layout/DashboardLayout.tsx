import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { Menu, X, LogOut, Settings, User, ChevronDown } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { cn } from '../../lib/utils';

export function DashboardLayout() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const { user, profile, signOut } = useAuth();

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
                {/* Desktop Header */}
                <header className="hidden md:flex h-16 items-center justify-end px-8 border-b border-slate-200 bg-white">
                    <div className="relative">
                        <button
                            onClick={() => setIsProfileOpen(!isProfileOpen)}
                            className="flex items-center gap-3 rounded-xl p-2 hover:bg-slate-50 transition-colors"
                        >
                            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-accent to-accent-dark text-sm font-bold text-white shadow-sm">
                                {profile?.full_name?.charAt(0) || user?.email?.charAt(0).toUpperCase() || 'U'}
                            </div>
                            <div className="text-right hidden lg:block">
                                <p className="text-sm font-semibold text-slate-900 leading-none">
                                    {profile?.full_name || user?.email?.split('@')[0] || 'User'}
                                </p>
                                <p className="text-xs text-slate-500 capitalize mt-1">
                                    {profile?.role || 'User'}
                                </p>
                            </div>
                            <ChevronDown className={cn("h-4 w-4 text-slate-400 transition-transform", isProfileOpen && "rotate-180")} />
                        </button>

                        {/* Dropdown Menu */}
                        {isProfileOpen && (
                            <>
                                <div
                                    className="fixed inset-0 z-10"
                                    onClick={() => setIsProfileOpen(false)}
                                />
                                <div className="absolute right-0 top-full mt-2 w-56 rounded-xl border border-slate-200 bg-white shadow-lg p-2 z-20">
                                    <div className="px-3 py-2 border-b border-slate-100 mb-2 lg:hidden">
                                        <p className="text-sm font-semibold text-slate-900">
                                            {profile?.full_name || user?.email?.split('@')[0] || 'User'}
                                        </p>
                                        <p className="text-xs text-slate-500 capitalize">
                                            {profile?.role || 'User'}
                                        </p>
                                    </div>

                                    <button
                                        onClick={() => {
                                            setIsProfileOpen(false);
                                            // Handle settings navigation
                                            console.log("Navigate to settings");
                                        }}
                                        className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition-colors"
                                    >
                                        <Settings className="h-4 w-4" />
                                        Settings
                                    </button>

                                    <div className="my-1 border-t border-slate-100" />

                                    <button
                                        onClick={() => {
                                            setIsProfileOpen(false);
                                            signOut();
                                        }}
                                        className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-rose-600 hover:bg-rose-50 transition-colors"
                                    >
                                        <LogOut className="h-4 w-4" />
                                        Sign Out
                                    </button>
                                </div>
                            </>
                        )}
                    </div>
                </header>

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
