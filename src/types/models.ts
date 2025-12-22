export type ShipStatus = 'In Transit' | 'Loading' | 'Discharging' | 'Waiting' | 'Dry Dock';

export interface Ship {
    id: string;
    created_at?: string;
    name: string;
    type: string;
    status: ShipStatus;
    location: string;
    destination: string;
    eta: string;
    speed: number;
    cargo?: string;
    charterer?: string;
    // Q88 V6 Fields
    imo_number?: string;
    flag?: string;
    built_year?: number;
    dwt?: number;
    loa?: number;
    beam?: number;
    max_draft?: number;
    cubic_capacity?: number;
    class_society?: string;
    pi_club?: string;
}

export interface Voyage {
    id: string;
    shipId: string;
    shipName: string;
    voyageNo: string;
    route: string;
    cargo: string;
    status: 'Completed' | 'In Progress' | 'Scheduled';
    tce: number;
    startDate: string;
    endDate?: string;
}

export interface KPIData {
    revenue: string;
    revenueChange: number;
    utilization: number;
    utilizationChange: number;
    tce: string;
    tceChange: number;
    activeVoyages: number;
    activeVoyagesChange: number;
}
