export type LaytimeClauseType = 'SHELLVOY6' | 'ASBATANKVOY' | 'GENERIC';
export type PortActivityType = 'LOADING' | 'DISCHARGING' | 'LIGHTERING';

export interface CharterPartyTerms {
    charterType: LaytimeClauseType;
    vesselName: string;
    voyageNo: string;
    port: string;
    activity: PortActivityType;
    allowedLaytimeHours: number; // Total hours allowed (e.g. 72 or 96)
    demurrageRatePerDay: number; // USD per day
    despatchRatePerDay?: number; // USD per day (optional, rare for tankers)
    isShinc: boolean; // Sundays/Holidays Included?
    reversible: boolean; // Reversible laytime?
    alwaysAccessible: boolean; // Reachable on arrival clause?
    norTenderedWaitTime: number; // Hours to wait after NOR before counting (e.g. 6)
}

export type EventType =
    | 'NOR_TENDERED'
    | 'ANCHORED'
    | 'BERTHTED' // "All Fast"
    | 'COMMENCED_LOADING'
    | 'COMPLETED_LOADING'
    | 'COMMENCED_DISCHARGING'
    | 'COMPLETED_DISCHARGING'
    | 'CARGO_HOSES_DISCONNECTED'
    | 'DOCUMENTS_ON_BOARD'
    | 'RAIN_DELAY'
    | 'STRIKE'
    | 'BAD_WEATHER'
    | 'SHIFTING'
    | 'DEBALLASTING'
    | 'OTHER';

export interface TimeSheetEvent {
    id: string;
    timestamp: string; // ISO String
    type: EventType;
    description: string;
    isRain?: boolean;
    remarks?: string;
}

export interface LaytimePeriod {
    startTime: string; // ISO String
    endTime: string;   // ISO String
    durationHours: number;
    description: string;
    isCounting: boolean; // True = Laytime Used, False = Deducted/Not Counting
    remarks?: string;
}

export interface LaytimeResult {
    totalDurationHours: number; // Absolute duration from Start to Finish
    totalLaytimeUsedHours: number; // Net counting hours
    totalLaytimeDeductedHours: number; // Non-counting hours

    allowedLaytimeHours: number;
    timeOnDemurrageHours: number; // Positive if Used > Allowed
    timeSavedHours: number;       // Positive if Used < Allowed

    demurrageDue: number; // USD
    despatchDue: number;  // USD

    breakdown: LaytimePeriod[];
}
