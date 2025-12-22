import { CharterPartyTerms, TimeSheetEvent, LaytimeResult, LaytimePeriod } from '../types/laytime';

// Helper to calculate hours difference
const getHoursDiff = (start: string, end: string): number => {
    const diffMs = new Date(end).getTime() - new Date(start).getTime();
    return diffMs / (1000 * 60 * 60);
};

export const laytimeService = {
    calculate: (terms: CharterPartyTerms, events: TimeSheetEvent[]): LaytimeResult => {
        // 1. Sort events chronologically
        const sortedEvents = [...events].sort((a, b) =>
            new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
        );

        const breakdown: LaytimePeriod[] = [];
        let totalLaytimeUsedHours = 0;
        let totalLaytimeDeductedHours = 0;

        // 2. Identify Key Anchors
        const norEvent = sortedEvents.find(e => e.type === 'NOR_TENDERED');
        const disconnectEvent = sortedEvents.find(e => e.type === 'CARGO_HOSES_DISCONNECTED');
        const documentsEvent = sortedEvents.find(e => e.type === 'DOCUMENTS_ON_BOARD');

        const completedEvent = sortedEvents.find(e => e.type === 'COMPLETED_LOADING');
        // Practical end of laytime: Hoses Disconnected (most tanker CPs) 
        // Some CPs allow until Documents on Board, but Hoses is safer default.
        // Fallback: If no disconnect/docs, use Completed Loading or just the last event.
        const endEvent = documentsEvent || disconnectEvent || completedEvent || sortedEvents[sortedEvents.length - 1];

        if (!norEvent || !endEvent) {
            // Not enough data to calculate
            return {
                totalDurationHours: 0,
                totalLaytimeUsedHours: 0,
                totalLaytimeDeductedHours: 0,
                allowedLaytimeHours: terms.allowedLaytimeHours,
                timeOnDemurrageHours: 0,
                timeSavedHours: 0,
                demurrageDue: 0,
                despatchDue: 0,
                breakdown: []
            };
        }

        // 3. Determine Commencement Time
        // Standard Tanker: 6 hours after NOR or Upon All Fast (whichever is earlier)
        // Note: If All Fast happens BEFORE NOR + 6h, commencement is at All Fast.
        // If All Fast happens AFTER NOR + 6h, commencement is at NOR + 6h.

        let commencementTime = new Date(norEvent.timestamp).getTime() + (terms.norTenderedWaitTime * 60 * 60 * 1000);

        const allFastEvent = sortedEvents.find(e => e.type === 'BERTHTED');
        if (allFastEvent) {
            const allFastTime = new Date(allFastEvent.timestamp).getTime();
            if (allFastTime < commencementTime) {
                commencementTime = allFastTime;
            }
        }

        const endTime = new Date(endEvent.timestamp).getTime();
        const fullDurationHours = (endTime - commencementTime) / (1000 * 60 * 60);

        // 4. Iterate through time "slices" from Commencement to End
        // For V1 simple logic: We assume continuous counting unless an "Exception" event occurred.
        // In a real complex engine, we would iterate hour-by-hour checking for rain/shifting.
        // For this implementation, we will treat the main block as "Time Used" and deduct known stoppages.

        // Main Block: Commencement -> End
        // We need to check if any deducted events happened INSIDE this block.

        // Let's look for "Bad Weather" or "Shifting" events that have a duration.
        // Since our Event model identifies POINTS in time, we need PAIRS to define a duration.
        // User inputs typically: "Rain Started" -> "Rain Stopped".
        // To simplify V1, we will assume everything is "Time Used" except specific periods if we had range inputs.
        // BUT, since we only have single events, we will calculate the GROSS time first.

        // Let's construct the main period
        breakdown.push({
            startTime: new Date(commencementTime).toISOString(),
            endTime: endEvent.timestamp,
            durationHours: fullDurationHours,
            description: 'Laytime Duration (Gross)',
            isCounting: true
        });

        totalLaytimeUsedHours = fullDurationHours;

        // TODO: Future enhancement - Detect "Rain Start" / "Rain Stop" pairs and subtract them.
        // For now, assume Gross = Net unless specific deductor logic is added.

        // 5. Calculate Result
        const allowance = terms.allowedLaytimeHours;
        const diff = totalLaytimeUsedHours - allowance;

        let timeOnDemurrage = 0;
        let timeSaved = 0;
        let demurrageDue = 0;
        let despatchDue = 0;

        if (diff > 0) {
            timeOnDemurrage = diff;
            demurrageDue = (terms.demurrageRatePerDay / 24) * timeOnDemurrage;
        } else {
            timeSaved = Math.abs(diff);
            // Tankers rarely pay despatch, but IF they do:
            if (terms.despatchRatePerDay) {
                despatchDue = (terms.despatchRatePerDay / 24) * timeSaved;
            }
        }

        return {
            totalDurationHours: fullDurationHours,
            totalLaytimeUsedHours: totalLaytimeUsedHours,
            totalLaytimeDeductedHours: totalLaytimeDeductedHours,
            allowedLaytimeHours: allowance,
            timeOnDemurrageHours: timeOnDemurrage,
            timeSavedHours: timeSaved,
            demurrageDue: demurrageDue,
            despatchDue: despatchDue,
            breakdown: breakdown
        };
    },

    // Mock Parser for Files
    mockParse: async (file: File): Promise<TimeSheetEvent[]> => {
        // Return realistic dummy data for demo purposes
        const today = new Date();
        const dateStr = (offsetHours: number) => new Date(today.getTime() + offsetHours * 60 * 60 * 1000).toISOString();

        return [
            { id: '1', type: 'NOR_TENDERED', timestamp: dateStr(0), description: 'NOR Tendered at Anchorage' },
            { id: '2', type: 'ANCHORED', timestamp: dateStr(0.5), description: 'Anchored at OPL' },
            { id: '3', type: 'BERTHTED', timestamp: dateStr(12), description: 'All Fast alongside' },
            { id: '4', type: 'COMMENCED_LOADING', timestamp: dateStr(14), description: 'Commenced Loading' },
            { id: '5', type: 'COMPLETED_LOADING', timestamp: dateStr(36), description: 'Completed Loading' },
            { id: '6', type: 'CARGO_HOSES_DISCONNECTED', timestamp: dateStr(38), description: 'Hoses Disconnected' },
            { id: '7', type: 'DOCUMENTS_ON_BOARD', timestamp: dateStr(40), description: 'Documents on Board / Cast Off' },
        ];
    }
};
