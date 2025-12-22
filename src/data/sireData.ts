export interface SireChapter {
    id: string;
    code: string;
    title: string;
}

export interface SireQuestion {
    id: string;
    chapterId: string;
    code: string;
    text: string;
    guidance?: string;
}

export interface SireQuestionnaire {
    id: string;
    createdAt: string;
    questions: SireQuestion[];
}

export const sireChapters: SireChapter[] = [
    { id: '1', code: 'C1', title: 'Leadership and the Tanker Interface Management' },
    { id: '2', code: 'C2', title: 'Propulsion, Power Generation and Machinery' },
    { id: '3', code: 'C3', title: 'General Safety and Security' },
    { id: '4', code: 'C4', title: 'Navigation and Communications' },
    { id: '5', code: 'C5', title: 'Cargo and Ballast Systems' },
    { id: '6', code: 'C6', title: 'Mooring and Anchoring' },
    { id: '7', code: 'C7', title: 'Human Factors' },
    { id: '8', code: 'C8', title: 'Pollution Prevention' },
    { id: '9', code: 'C9', title: 'Structural Condition' },
    { id: '10', code: 'C10', title: 'Ice Operations' },
];

export const sireQuestions: SireQuestion[] = [
    // Chapter 1
    {
        id: '1-1',
        chapterId: '1',
        code: '1.1.1',
        text: 'Is the Master effectively implementing the company safety management system?',
        guidance: 'Verify Master\'s review of SMS, safety meetings, and leadership in emergencies.'
    },
    {
        id: '1-2',
        chapterId: '1',
        code: '1.2.1',
        text: 'Are the officers and rating familiar with the company\'s drug and alcohol policy?',
        guidance: 'Check for posted policies and interview crew members.'
    },

    // Chapter 2
    {
        id: '2-1',
        chapterId: '2',
        code: '2.1.1',
        text: 'Are the main propulsion boilers and associated machinery in good order?',
        guidance: 'Inspect boiler logs, gauge glasses, and safety valves.'
    },
    {
        id: '2-2',
        chapterId: '2',
        code: '2.2.1',
        text: 'Is the emergency generator in a state of readiness?',
        guidance: 'Check fuel levels, starting batteries, and test run records.'
    },

    // Chapter 3
    {
        id: '3-1',
        chapterId: '3',
        code: '3.1.1',
        text: 'Are permit to work systems effectively managed?',
        guidance: 'Review recent permits for hot work, enclosed space entry, etc.'
    },
    {
        id: '3-2',
        chapterId: '3',
        code: '3.2.1',
        text: 'Are fire-fighting equipment operational and ready for use?',
        guidance: 'Inspect fire hoses, extinguishers, and main pumps.'
    },

    // Chapter 4
    {
        id: '4-1',
        chapterId: '4',
        code: '4.1.1',
        text: 'Is the passage plan comprehensive and berth-to-berth?',
        guidance: 'Review ECDIS/Paper charts for the current and previous voyages.'
    },
    {
        id: '4-2',
        chapterId: '4',
        code: '4.2.1',
        text: 'Are all nautical publications up to date?',
        guidance: 'Check Notices to Mariners and corrections.'
    },

    // Chapter 5
    {
        id: '5-1',
        chapterId: '5',
        code: '5.1.1',
        text: 'Are cargo pump emergency stops tested and operational?',
        guidance: 'Witness test of emergency stops from various locations.'
    },
    {
        id: '5-2',
        chapterId: '5',
        code: '5.2.1',
        text: 'Is the ODME (Oil Discharge Monitoring Equipment) functional?',
        guidance: 'Check records and verifying self-test functionality.'
    },

    // Chapter 6
    {
        id: '6-1',
        chapterId: '6',
        code: '6.1.1',
        text: 'Are mooring winches and brakes in good condition?',
        guidance: 'Inspect brake linings and drum condition.'
    },

    // Chapter 7 (Human Factors - Simulated)
    {
        id: '7-1',
        chapterId: '7',
        code: '7.1.1',
        text: 'Are rest hours properly recorded and monitored?',
        guidance: 'Check records against STCW requirements.'
    },

    // Additional mock questions to increase volume
    {
        id: '1-3',
        chapterId: '1',
        code: '1.3.1',
        text: 'Are safety meetings held regularly and minutes recorded?',
    },
    {
        id: '2-3',
        chapterId: '2',
        code: '2.3.1',
        text: 'Are bilge alarms tested and operational?',
    },
    {
        id: '3-3',
        chapterId: '3',
        code: '3.3.1',
        text: 'Is the hospital and medical chest properly maintained?',
    },
    {
        id: '4-3',
        chapterId: '4',
        code: '4.3.1',
        text: 'Are navigation lights and shapes in good condition?',
    },
    {
        id: '5-3',
        chapterId: '5',
        code: '5.3.1',
        text: 'Are cargo tank high level alarms tested?',
    },
    {
        id: '6-2',
        chapterId: '6',
        code: '6.2.1',
        text: 'Are anchor windlasses operational and inspected?',
    }
];
