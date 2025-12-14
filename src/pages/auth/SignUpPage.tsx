import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { supabase } from '../../lib/supabase';
import { Ship, Lock, Mail, ArrowRight, AlertCircle, Building, User, Briefcase, Eye, EyeOff } from 'lucide-react';

export function SignUpPage() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        confirmPassword: '',
        fullName: '',
        companyName: '',
        role: 'company' // default role
    });
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        if (formData.password !== formData.confirmPassword) {
            setError('Passwords do not match');
            setLoading(false);
            return;
        }

        try {
            if (!supabase) throw new Error('Supabase client not initialized');

            // 1. Sign up with Supabase Auth
            const { data: { user, session }, error: authError } = await supabase.auth.signUp({
                email: formData.email,
                password: formData.password,
            });

            if (authError) throw authError;

            if (user) {
                // 2. Create Profile entry (Upsert to avoid duplicate key errors if trigger exists)
                const { error: profileError } = await supabase
                    .from('profiles')
                    .upsert([
                        {
                            id: user.id,
                            email: formData.email,
                            full_name: formData.fullName,
                            company_name: formData.companyName,
                            role: formData.role
                        }
                    ]);

                if (profileError) {
                    console.error('Profile creation failed:', profileError);
                    // Continue anyway as auth succeeded, but warn user
                }

                // Success
                // Check if email confirmation is required (no session)
                if (!session) {
                    alert('Registration successful! Please check your email to confirm your account.');
                    navigate('/login');
                } else {
                    navigate('/app');
                }
            }
        } catch (err: any) {
            setError(err.message || 'Failed to sign up');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-slate-50 p-4">
            <div className="w-full max-w-md animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="mb-8 text-center">
                    <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-600 text-white shadow-lg mb-4">
                        <Ship className="h-6 w-6" />
                    </div>
                    <h1 className="text-2xl font-bold text-slate-900">Create your account</h1>
                    <p className="mt-2 text-slate-600">Join CAPTB Commercial Suite</p>
                </div>

                <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
                    <form onSubmit={handleSubmit} className="space-y-4">
                        {error && (
                            <div className="flex items-center gap-2 rounded-lg bg-red-50 p-3 text-sm text-red-600">
                                <AlertCircle className="h-4 w-4" />
                                <span>{error}</span>
                            </div>
                        )}

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="mb-1.5 block text-sm font-medium text-slate-700">Full Name</label>
                                <div className="relative">
                                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
                                        <User className="h-5 w-5" />
                                    </div>
                                    <input
                                        type="text"
                                        required
                                        className="block w-full rounded-lg border border-slate-300 py-2.5 pl-10 pr-3 text-slate-900 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                                        placeholder="John Doe"
                                        value={formData.fullName}
                                        onChange={e => setFormData({ ...formData, fullName: e.target.value })}
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="mb-1.5 block text-sm font-medium text-slate-700">Company</label>
                                <div className="relative">
                                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
                                        <Building className="h-5 w-5" />
                                    </div>
                                    <input
                                        type="text"
                                        required
                                        className="block w-full rounded-lg border border-slate-300 py-2.5 pl-10 pr-3 text-slate-900 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                                        placeholder="Acme Inc"
                                        value={formData.companyName}
                                        onChange={e => setFormData({ ...formData, companyName: e.target.value })}
                                    />
                                </div>
                            </div>
                        </div>

                        <div>
                            <label className="mb-1.5 block text-sm font-medium text-slate-700">Email address</label>
                            <div className="relative">
                                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
                                    <Mail className="h-5 w-5" />
                                </div>
                                <input
                                    type="email"
                                    required
                                    className="block w-full rounded-lg border border-slate-300 py-2.5 pl-10 pr-3 text-slate-900 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                                    placeholder="name@company.com"
                                    value={formData.email}
                                    onChange={e => setFormData({ ...formData, email: e.target.value })}
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
                                    className="block w-full rounded-lg border border-slate-300 py-2.5 pl-10 pr-10 text-slate-900 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                                    placeholder="••••••••"
                                    minLength={6}
                                    value={formData.password}
                                    onChange={e => setFormData({ ...formData, password: e.target.value })}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute inset-y-0 right-0 flex items-center pr-3 text-slate-400 hover:text-slate-600"
                                >
                                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                                </button>
                            </div>
                        </div>

                        <div>
                            <label className="mb-1.5 block text-sm font-medium text-slate-700">Confirm Password</label>
                            <div className="relative">
                                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
                                    <Lock className="h-5 w-5" />
                                </div>
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    required
                                    className="block w-full rounded-lg border border-slate-300 py-2.5 pl-10 pr-3 text-slate-900 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                                    placeholder="••••••••"
                                    minLength={6}
                                    value={formData.confirmPassword}
                                    onChange={e => setFormData({ ...formData, confirmPassword: e.target.value })}
                                />
                            </div>
                        </div>

                        <div>
                            <label className="mb-1.5 block text-sm font-medium text-slate-700">Account Type</label>
                            <div className="relative">
                                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
                                    <Briefcase className="h-5 w-5" />
                                </div>
                                <select
                                    className="block w-full rounded-lg border border-slate-300 py-2.5 pl-10 pr-3 text-slate-900 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                                    value={formData.role}
                                    onChange={e => setFormData({ ...formData, role: e.target.value })}
                                >
                                    <option value="company">Company (Operator)</option>
                                    <option value="marine">Marine (Vessel Crew)</option>
                                    <option value="admin">Admin</option>
                                </select>
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="mt-2 group flex w-full items-center justify-center gap-2 rounded-lg bg-indigo-600 px-4 py-2.5 font-semibold text-white transition-all hover:bg-indigo-700 disabled:opacity-70"
                        >
                            {loading ? (
                                <div className="h-5 w-5 animate-spin rounded-full border-2 border-white/30 border-t-white"></div>
                            ) : (
                                <>
                                    Create Account
                                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                                </>
                            )}
                        </button>
                    </form>

                    <div className="mt-6 text-center text-sm text-slate-600">
                        Already have an account?{' '}
                        <Link to="/login" className="font-semibold text-indigo-600 hover:text-indigo-500">
                            Sign in
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
