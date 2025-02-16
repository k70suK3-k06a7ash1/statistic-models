export interface DoubleExponentialSmoothingResult {
    level: number[];
    trend: number[];
    smoothedData: number[];
    forecast: (steps: number) => number[];
}
