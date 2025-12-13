import { Ship, Anchor, AlertTriangle, CheckCircle } from 'lucide-react';

export const fleetData = [
    {
        id: '1',
        name: 'MT Ocean Queen',
        type: 'VLCC',
        status: 'Laden',
        lat: 1.3521,
        lng: 103.8198, // Singapore
        destination: 'Ningbo, CN',
        eta: '2025-12-05',
        cargo: 'Crude Oil',
        qty: '270,000 MT',
    },
    {
        id: '2',
        name: 'MT Pacific Star',
        type: 'Suezmax',
        status: 'Ballast',
        lat: 25.2048,
        lng: 55.2708, // Dubai
        destination: 'Ras Tanura, SA',
        eta: '2025-12-03',
        cargo: 'N/A',
        qty: 'N/A',
    },
    {
        id: '3',
        name: 'MT Atlantic Rose',
        type: 'Aframax',
        status: 'Discharging',
        lat: 51.9244,
        lng: 4.4777, // Rotterdam
        destination: 'Rotterdam, NL',
        eta: 'Arrived',
        cargo: 'Fuel Oil',
        qty: '80,000 MT',
    },
];

export const kpiData = [
    {
        title: 'Active Voyages',
        value: '12',
        change: '+2',
        icon: Ship,
        color: 'text-blue-500',
        bgColor: 'bg-blue-100',
    },
    {
        title: 'Fleet Utilization',
        value: '92%',
        change: '+5%',
        icon: Anchor,
        color: 'text-green-500',
        bgColor: 'bg-green-100',
    },
    {
        title: 'Demurrage Risk',
        value: '3',
        change: '-1',
        icon: AlertTriangle,
        color: 'text-amber-500',
        bgColor: 'bg-amber-100',
    },
    {
        title: 'Completed (MTD)',
        value: '8',
        change: '+1',
        icon: CheckCircle,
        color: 'text-indigo-500',
        bgColor: 'bg-indigo-100',
    },
];
