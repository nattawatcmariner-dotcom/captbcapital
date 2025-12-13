import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { DashboardLayout } from './components/layout/DashboardLayout';
import { HomePage } from './pages/HomePage';
import { MonitorPage } from './pages/MonitorPage';
import { CalculatorsPage } from './pages/CalculatorsPage';
import { LaytimePage } from './pages/LaytimePage';
import { PerformancePage } from './pages/PerformancePage';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<DashboardLayout />}>
                    <Route index element={<HomePage />} />
                    <Route path="monitor" element={<MonitorPage />} />
                    <Route path="calculators" element={<CalculatorsPage />} />
                    <Route path="laytime" element={<LaytimePage />} />
                    <Route path="performance" element={<PerformancePage />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
