import { Ship } from '../types/models';
import { delay } from './api';
import { supabase, isSupabaseConfigured } from '../lib/supabase';

const TIMEOUT_MS = 30000; // 30 seconds

const fetchWithTimeout = async <T>(promise: Promise<{ data: T | null, error: any }>): Promise<T> => {
    let timeoutId: NodeJS.Timeout;
    const timeoutPromise = new Promise<{ data: T | null, error: any }>((_, reject) => {
        timeoutId = setTimeout(() => reject(new Error('Request timed out')), TIMEOUT_MS);
    });

    try {
        const { data, error } = await Promise.race([promise, timeoutPromise]);
        clearTimeout(timeoutId!);
        if (error) throw error;
        return data as T;
    } catch (error) {
        clearTimeout(timeoutId!);
        throw error;
    }
};

// Mock Data (Fallback)
const mockShips: Ship[] = [];

export const shipService = {
    getAllShips: async (): Promise<Ship[]> => {
        if (isSupabaseConfigured()) {
            console.log('Fetching ships from Supabase...');
            try {
                // Try fetching with 5s timeout
                return await fetchWithTimeout(
                    supabase!.from('ships').select('*').order('created_at', { ascending: false }) as unknown as Promise<any>
                );
            } catch (error) {
                console.warn('Supabase fetch failed or timed out, falling back to mock data:', error);
                // Fallback to mock data on error/timeout to prevent UI hang
                return [...mockShips];
            }
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
        // Try Supabase first if configured
        if (isSupabaseConfigured()) {
            try {
                console.log('Adding ship to Supabase...');
                // Wrap insert in timeout
                const result = await fetchWithTimeout(
                    supabase!.from('ships').insert(ship).select().single() as unknown as Promise<any>
                );
                return result as Ship;
            } catch (error: any) {
                console.warn('Supabase write failed/timed out. Falling back to local mode.', error);
                alert(`DEBUG: Supabase Write Failed! \nReason: ${error.message || JSON.stringify(error)} \n\nFalling back to temporary offline mode.`);
                // Fallback continues below...
            }
        }

        await delay(800);
        const newShip = { ...ship, id: Math.random().toString(36).substr(2, 9) };
        mockShips.push(newShip);
        return newShip;
    },

    updateShip: async (id: string, updates: Partial<Ship>): Promise<Ship> => {
        if (isSupabaseConfigured()) {
            try {
                console.log('Updating ship in Supabase...');
                const result = await fetchWithTimeout(
                    supabase!.from('ships').update(updates).eq('id', id).select().single() as unknown as Promise<any>
                );
                return result as Ship;
            } catch (error: any) {
                console.warn('Supabase update failed. Falling back to local mode.', error);
                alert(`DEBUG: Supabase Update Failed! \nReason: ${error.message || JSON.stringify(error)}`);
            }
        }

        await delay(500);
        const index = mockShips.findIndex(s => s.id === id);
        if (index !== -1) {
            mockShips[index] = { ...mockShips[index], ...updates };
            return mockShips[index];
        }
        throw new Error('Ship not found');
    },

    deleteShip: async (id: string): Promise<void> => {
        if (isSupabaseConfigured()) {
            try {
                // Wrap delete in timeout to prevent hang
                await fetchWithTimeout(
                    supabase!.from('ships').delete().eq('id', id) as unknown as Promise<any>
                );
                return;
            } catch (error) {
                console.warn('Supabase delete failed. Falling back to local mode.', error);
                // Fallback continues below...
            }
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
