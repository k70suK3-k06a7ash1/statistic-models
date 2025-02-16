export declare function doubleExponentialSmoothingMultiplicative(data: number[], alpha: number, beta: number): {
    level: number[];
    trend: number[];
    smoothedData: number[];
    forecast: (steps: number) => number[];
};
