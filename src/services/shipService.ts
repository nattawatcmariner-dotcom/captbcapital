import { Ship } from '../types/models';
import { delay } from './api';
import { supabase, isSupabaseConfigured } from '../lib/supabase';

// Mock Data (Fallback)
const mockShips: Ship[] = [
    { id: '1', name: 'MT OCEAN QUEEN', type: 'VLCC', status: 'In Transit', location: 'Indian Ocean', destination: 'Ningbo, CN', eta: '2025-12-15', speed: 12.5, cargo: 'Crude Oil', charterer: 'Unipec' },
    { id: '2', name: 'MT PACIFIC STAR', type: 'Suezmax', status: 'Loading', location: 'Ras Tanura, SA', destination: 'Singapore, SG', eta: '2025-12-20', speed: 0, cargo: 'Crude Oil', charterer: 'Shell' },
    { id: '3', name: 'MT ATLANTIC ROSE', type: 'Aframax', status: 'Discharging', location: 'Rotterdam, NL', destination: 'Antwerp, BE', eta: '2025-12-05', speed: 0, cargo: 'Fuel Oil', charterer: 'BP' },
    { id: '4', name: 'MT NORDIC SPIRIT', type: 'VLCC', status: 'Waiting', location: 'Fujairah, AE', destination: 'Orders', eta: '-', speed: 0, cargo: 'Empty', charterer: 'Spot' },
    { id: '5', name: 'MT EASTERN DRAGON', type: 'MR', status: 'In Transit', location: 'South China Sea', destination: 'Manila, PH', eta: '2025-12-08', speed: 13.0, cargo: 'Gasoline', charterer: 'Petron' },
];

export const shipService = {
    getAllShips: async (): Promise<Ship[]> => {
        if (isSupabaseConfigured()) {
            console.log('Fetching ships from Supabase...');
            const { data, error } = await supabase!.from('ships').select('*').order('created_at', { ascending: false });
            if (error) throw error;
            return data as Ship[];
        }

        await delay(800); // Simulate network latency
        return [...mockShips];
    },

    getShipById: async (id: string): Promise<Ship | undefined> => {
        if (isSupabaseConfigured()) {
            const { data, error } = await supabase!.from('ships').select('*').eq('id', id).single();
            if (error) return undefined;
            return data as Ship;
        }

        await delay(500);
        return mockShips.find(s => s.id === id);
    },

    searchShips: async (query: string): Promise<Ship[]> => {
        if (isSupabaseConfigured()) {
            const { data, error } = await supabase!.from('ships').select('*')
                .or(`name.ilike.%${query}%,location.ilike.%${query}%,type.ilike.%${query}%`);
            if (error) throw error;
            return data as Ship[];
        }

        await delay(400);
        const lowerQuery = query.toLowerCase();
        return mockShips.filter(s =>
            s.name.toLowerCase().includes(lowerQuery) ||
            s.location.toLowerCase().includes(lowerQuery) ||
            s.type.toLowerCase().includes(lowerQuery)
        );
    },

    addShip: async (ship: Omit<Ship, 'id'>): Promise<Ship> => {
        if (isSupabaseConfigured()) {
            console.log('Adding ship to Supabase...');
            const { data, error } = await supabase!.from('ships').insert(ship).select().single();
            if (error) throw error;
            return data as Ship;
        }

        await delay(800);
        const newShip = { ...ship, id: Math.random().toString(36).substr(2, 9) };
        mockShips.push(newShip);
        return newShip;
    },

    deleteShip: async (id: string): Promise<void> => {
        if (isSupabaseConfigured()) {
            const { error } = await supabase!.from('ships').delete().eq('id', id);
            if (error) throw error;
            return;
        }

        await delay(500);
        const index = mockShips.findIndex(s => s.id === id);
        if (index !== -1) {
            mockShips.splice(index, 1);
        }
    },

    // Simulates AI parsing a Q88 file
    parseQ88: async (file: File): Promise<Partial<Ship>> => {
        await delay(2500); // Simulate AI processing time

        // Return mock data based on file name or random
        return {
            name: file.name.split('.')[0].replace(/[-_]/g, ' ').toUpperCase() || 'MT NEW VESSEL',
            type: 'Aframax',
            status: 'Waiting',
            location: 'Singapore',
            destination: 'Orders',
            eta: '-',
            speed: 0,
            cargo: 'Empty',
            charterer: 'Spot'
        };
    }
};
