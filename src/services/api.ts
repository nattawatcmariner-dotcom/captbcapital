import { supabase } from '../lib/supabase';
import { Ship } from '../types';

// Mock error generator (kept for backward compatibility if needed)
export const mockError = (probability: number = 0.05) => {
    if (Math.random() < probability) {
        throw new Error("Network Error: Failed to fetch data");
    }
};

export const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// --- Types tailored for Supabase returns ---
export interface KpiMetric {
    id: string;
    key: string;
    label: string;
    value: string;
    change: string;
    icon_name: string;
}

export interface Alert {
    id: string;
    title: string;
    description: string;
    type: 'warning' | 'info' | 'alert';
    created_at: string;
}

export const fetchShips = async (): Promise<Ship[]> => {
    if (!supabase) throw new Error('Supabase client not initialized');

    const { data, error } = await supabase
        .from('ships')
        .select('*')
        .order('name');

    if (error) throw error;

    // Transform Supabase data if necessary to match Ship type
    return data.map((ship: any) => ({
        ...ship,
        qty: ship.quantity || ship.qty // Handle potential column name mismatch
    })) as Ship[];
};

export const fetchAlerts = async (): Promise<Alert[]> => {
    if (!supabase) throw new Error('Supabase client not initialized');

    const { data, error } = await supabase
        .from('alerts')
        .select('*')
        .order('created_at', { ascending: false });

    if (error) throw error;
    return data as Alert[];
};

export const fetchKpiMetrics = async (): Promise<KpiMetric[]> => {
    if (!supabase) throw new Error('Supabase client not initialized');

    const { data, error } = await supabase
        .from('kpi_metrics')
        .select('*')
        .order('label');

    if (error) throw error;
    return data as KpiMetric[];
};

