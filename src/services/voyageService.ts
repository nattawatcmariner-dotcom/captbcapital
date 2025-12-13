import { Voyage } from '../types/models';
import { delay } from './api';

const mockVoyages: Voyage[] = [
    { id: 'V001', shipId: '1', shipName: 'MT Ocean Queen', voyageNo: '2501', route: 'Ras Tanura - Ningbo', cargo: 'Crude Oil', status: 'Completed', tce: 45200, startDate: '2025-11-01', endDate: '2025-11-25' },
    { id: 'V002', shipId: '2', shipName: 'MT Pacific Star', voyageNo: '2502', route: 'Fujairah - Singapore', cargo: 'Fuel Oil', status: 'In Progress', tce: 38500, startDate: '2025-11-28' },
    { id: 'V003', shipId: '3', shipName: 'MT Atlantic Rose', voyageNo: '2503', route: 'Rotterdam - New York', cargo: 'Gasoline', status: 'Completed', tce: 29800, startDate: '2025-10-15', endDate: '2025-10-30' },
    { id: 'V004', shipId: '1', shipName: 'MT Ocean Queen', voyageNo: '2504', route: 'Basrah - Cochin', cargo: 'Crude Oil', status: 'Completed', tce: 41000, startDate: '2025-10-01', endDate: '2025-10-12' },
];

export const voyageService = {
    getRecentVoyages: async (): Promise<Voyage[]> => {
        await delay(600);
        return [...mockVoyages];
    },

    getVoyageById: async (id: string): Promise<Voyage | undefined> => {
        await delay(400);
        return mockVoyages.find(v => v.id === id);
    }
};
