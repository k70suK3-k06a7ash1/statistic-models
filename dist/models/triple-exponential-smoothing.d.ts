export declare class TripleExponentialSmoothing {
    alpha: number;
    beta: number;
    gamma: number;
    period: number;
    level: number;
    trend: number;
    seasonal: number[];
    history: number[];
    constructor(alpha: number, beta: number, gamma: number, period: number);
    initialize(data: number[]): void;
    forecast(steps: number): number[];
    train(newData: number[]): void;
    update(newValue: number): void;
    logState(): void;
}
