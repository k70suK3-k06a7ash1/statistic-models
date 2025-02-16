export declare function doubleExponentialSmoothingAdditive(data: number[], alpha: number, beta: number): {
    forecast: (steps: number) => number[];
    level: number[];
    trend: number[];
    smoothedData: number[];
};
