import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { DashboardLayout } from './components/layout/DashboardLayout';
import { AuthProvider } from './context/AuthContext';
import { ProtectedRoute } from './components/auth/ProtectedRoute';
import { Ship } from 'lucide-react';

// Lazy Load Pages for Performance
const LandingPage = lazy(() => import('./pages/LandingPage').then(module => ({ default: module.LandingPage })));
const MarineLandingPage = lazy(() => import('./pages/MarineLandingPage').then(module => ({ default: module.MarineLandingPage }))); // NEW
const HomePage = lazy(() => import('./pages/HomePage').then(module => ({ default: module.HomePage })));
const LoginPage = lazy(() => import('./pages/auth/LoginPage').then(module => ({ default: module.LoginPage })));
const SignUpPage = lazy(() => import('./pages/auth/SignUpPage').then(module => ({ default: module.SignUpPage })));
const MonitorPage = lazy(() => import('./pages/MonitorPage').then(module => ({ default: module.MonitorPage })));
const CalculatorsPage = lazy(() => import('./pages/CalculatorsPage').then(module => ({ default: module.CalculatorsPage })));
const LaytimePage = lazy(() => import('./pages/LaytimePage').then(module => ({ default: module.LaytimePage })));
const PerformancePage = lazy(() => import('./pages/PerformancePage').then(module => ({ default: module.PerformancePage })));
const FleetPage = lazy(() => import('./pages/FleetPage').then(module => ({ default: module.FleetPage })));
const PreSirePage = lazy(() => import('./pages/PreSirePage').then(module => ({ default: module.PreSirePage })));
const StandardPlaceholder = lazy(() => import('./pages/StandardPlaceholder').then(module => ({ default: module.StandardPlaceholder })));

// Loading Component
const LoadingScreen = () => (
  <div className="flex h-screen w-full items-center justify-center bg-slate-50">
    <div className="flex flex-col items-center gap-4">
      <div className="relative">
        <Ship className="h-12 w-12 text-slate-300 animate-pulse" />
        <div className="absolute inset-0 h-12 w-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
      <p className="text-sm font-medium text-slate-500 animate-pulse">Loading CAPTB...</p>
    </div>
  </div>
);

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Suspense fallback={<LoadingScreen />}>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/marine" element={<MarineLandingPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignUpPage />} />

            {/* Protected Dashboard Routes */}
            <Route element={<ProtectedRoute />}>
              <Route path="/app" element={<DashboardLayout />}>
                <Route index element={<HomePage />} />
                <Route path="monitor" element={<MonitorPage />} />
                <Route path="fleet" element={<FleetPage />} />
                <Route path="calculators" element={<CalculatorsPage />} />
                <Route path="laytime" element={<LaytimePage />} />
                <Route path="performance" element={<PerformancePage />} />

                {/* Standard Feature Routes */}
                <Route path="standard">
                  <Route path="sire2" element={<StandardPlaceholder />} />
                  <Route path="pre-sire" element={<PreSirePage />} />
                  <Route path="internal-audit" element={<StandardPlaceholder />} />
                  <Route path="marine-visit" element={<StandardPlaceholder />} />
                  <Route path="tech-visit" element={<StandardPlaceholder />} />
                  <Route path="engineering-audit" element={<StandardPlaceholder />} />
                  <Route path="cargo-audit" element={<StandardPlaceholder />} />
                  <Route path="mooring-audit" element={<StandardPlaceholder />} />
                  <Route path="navigation-audit" element={<StandardPlaceholder />} />
                </Route>
              </Route>
            </Route>
          </Routes>
        </Suspense>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;