import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { DashboardLayout } from './components/layout/DashboardLayout';
import { LandingPage } from './pages/LandingPage';
import { HomePage } from './pages/HomePage';
import { MonitorPage } from './pages/MonitorPage';
import { CalculatorsPage } from './pages/CalculatorsPage';
import { LaytimePage } from './pages/LaytimePage';
import { PerformancePage } from './pages/PerformancePage';
import { FleetPage } from './pages/FleetPage';
import { PreSirePage } from './pages/PreSirePage';
import { StandardPlaceholder } from './pages/StandardPlaceholder';

import { AuthProvider } from './context/AuthContext';
import { LoginPage } from './pages/auth/LoginPage';
import { SignUpPage } from './pages/auth/SignUpPage';
import { ProtectedRoute } from './components/auth/ProtectedRoute';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
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
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;