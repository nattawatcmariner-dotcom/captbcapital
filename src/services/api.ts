// Simulates network delay
export const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Generic API response wrapper
export interface ApiResponse<T> {
    data: T;
    message?: string;
    status: number;
}

// Mock error generator
export const mockError = (probability: number = 0.05) => {
    if (Math.random() < probability) {
        throw new Error("Network Error: Failed to fetch data");
    }
};
