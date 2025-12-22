import React, { useState } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { supabase } from '../../lib/supabase';
import { Ship, Lock, Mail, ArrowRight, AlertCircle, Car, ArrowLeft, Eye, EyeOff, Home } from 'lucide-react';

export function LoginPage() {
    const navigate = useNavigate();
    const location = useLocation();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        // Timeout promise to prevent infinite hanging (e.g. firewall/network issues)
        const timeoutPromise = new Promise((_, reject) =>
            setTimeout(() => reject(new Error('Request timed out. Please check your connection (60s limit).')), 60000)
        );

        try {
            if (!supabase) throw new Error('Supabase client not initialized');

            // Race between login and timeout
            // Handle special 'admin' username convenience
            const loginEmail = email.trim().toLowerCase() === 'admin' ? 'admin@admin.com' : email.trim();
            const loginPassword = password === 'admin' ? 'adminadmin' : password;

            const { error } = await Promise.race([
                supabase.auth.signInWithPassword({
                    email: loginEmail,
                    password: loginPassword,
                }),
                timeoutPromise
            ]) as any;

            if (error) throw error;

            // 3. Fetch profile to determine role-based redirect
            const { data: { user } } = await supabase.auth.getUser();
            if (user) {
                // Check if there's a specific return path
                if (location.state?.from) {
                    navigate(location.state.from);
                    return;
                }

                // Otherwise check role
                const { data: profile } = await supabase
                    .from('profiles')
                    .select('role')
                    .eq('id', user.id)
                    .single();

                if (profile?.role === 'car_renter') {
                    navigate('/car');
                } else if (profile?.role === 'house_renter') {
                    navigate('/house');
                } else {
                    navigate('/app');
                }
            }
        } catch (err: any) {
            console.error('Login error:', err);
            setError(err.message || 'Failed to sign in');
        } finally {
            setLoading(false);
        }
    };

    // Check if we are coming from specialized portals
    const isCaptCar = (location.state as any)?.from === '/car' || (location.state as any)?.isCaptCar;
    const isCaptHouse = (location.state as any)?.from === '/house' || (location.state as any)?.isCaptHouse;

    return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-slate-50 p-4">
            <div className="w-full max-w-md animate-in fade-in slide-in-from-bottom-4 duration-500">
                {/* Back Button */}
                <button
                    onClick={() => navigate(isCaptCar ? '/car' : isCaptHouse ? '/house' : '/')}
                    className="mb-6 flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-slate-800 transition-colors"
                >
                    <ArrowLeft className="w-4 h-4" />
                    {isCaptCar ? 'Back to Capt Car' : isCaptHouse ? 'Back to Capt House' : 'Back to Home'}
                </button>

                {/* Logo */}
                <div className="mb-8 text-center">
                    <div className={`mx-auto flex h-12 w-12 items-center justify-center rounded-xl text-white shadow-lg mb-4 
                        ${isCaptCar ? 'bg-emerald-600' : isCaptHouse ? 'bg-amber-500' : 'bg-indigo-600'}`}>
                        {isCaptCar ? <Car className="h-6 w-6" /> : isCaptHouse ? <Home className="h-6 w-6" /> : <Ship className="h-6 w-6" />}
                    </div>
                    <h1 className="text-2xl font-bold text-slate-900">
                        {isCaptCar ? 'Sign in to CAPT CAR' : isCaptHouse ? 'Sign in to CAPT HOUSE' : 'Sign in to CAPTB'}
                    </h1>
                    <p className="mt-2 text-slate-600">
                        {isCaptCar ? 'Premium EV Fleet Management' : isCaptHouse ? 'Welcome back to your perfect stay' : 'Commercial Suite for Oil Tankers'}
                    </p>
                </div>

                {/* Card */}
                <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
                    <form onSubmit={handleLogin} className="space-y-6">
                        {error && (
                            <div className="flex items-center gap-2 rounded-lg bg-red-50 p-3 text-sm text-red-600">
                                <AlertCircle className="h-4 w-4" />
                                <span>{error}</span>
                            </div>
                        )}

                        <div className="space-y-4">
                            <div>
                                <label className="mb-1.5 block text-sm font-medium text-slate-700">Email address</label>
                                <div className="relative">
                                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
                                        <Mail className="h-5 w-5" />
                                    </div>
                                    <input
                                        type="text"
                                        required
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="block w-full rounded-lg border border-slate-300 py-2.5 pl-10 pr-3 text-slate-900 placeholder-slate-400 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                                        placeholder="Email address or 'admin'"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="mb-1.5 block text-sm font-medium text-slate-700">Password</label>
                                <div className="relative">
                                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
                                        <Lock className="h-5 w-5" />
                                    </div>
                                    <input
                                        type={showPassword ? 'text' : 'password'}
                                        required
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="block w-full rounded-lg border border-slate-300 py-2.5 pl-10 pr-10 text-slate-900 placeholder-slate-400 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                                        placeholder="••••••••"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute inset-y-0 right-0 flex items-center pr-3 text-slate-400 hover:text-slate-600 focus:outline-none"
                                    >
                                        {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                                    </button>
                                </div>
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className={`group flex w-full items-center justify-center gap-2 rounded-lg px-4 py-2.5 font-semibold text-white transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-70 ${isCaptCar
                                ? 'bg-emerald-600 hover:bg-emerald-700 focus:ring-emerald-500'
                                : 'bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500'
                                }`}
                        >
                            {loading ? (
                                <div className="h-5 w-5 animate-spin rounded-full border-2 border-white/30 border-t-white"></div>
                            ) : (
                                <>
                                    Sign in
                                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                                </>
                            )}
                        </button>
                    </form>

                    <div className="mt-6 text-center text-sm text-slate-600">
                        Don't have an account?{' '}
                        <Link
                            to="/signup"
                            state={location.state}
                            className={`font-semibold hover:underline ${isCaptCar ? 'text-emerald-600 hover:text-emerald-500' : 'text-indigo-600 hover:text-indigo-500'}`}
                        >
                            Sign up
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
