export declare class TripleExponentialSmoothing {
    alpha: number;
    beta: number;
    gamma: number;
    period: number;
    level: number;
    trend: number;
    seasonal: number[];
    history: number[];
    /**
     * Represents a triple exponential smoothing model.
     *
     * Usage:
     * ```typescript
     * const alpha = 0.5;
     * const beta = 0.3;
     * const gamma = 0.2;
     * const period = 4;
     * const data = [10, 20, 15, 25, 12, 22, 18, 28, 14, 24, 19, 29];
     *
     * const model = new TripleExponentialSmoothing(alpha, beta, gamma, period);
     * model.initialize(data);
     *
     * const predictions = model.forecast(4);
     * console.log(predictions);
     *
     * model.update(30);
     *
     * model.train([35, 40, 38, 45]);
     * ```
     */
    constructor(alpha: number, beta: number, gamma: number, period: number);
    /**
     * Initializes the model with the given data.
     * @param data The data to initialize the model with.
     */
    initialize(data: number[]): void;
    /**
     * Forecasts future values.
     * @param steps The number of steps to forecast.
     * @returns The forecasted values.
     */
    forecast(steps: number): number[];
    /**
     * Trains the model with new data.
     * @param newData The new data to train the model with.
     */
    train(newData: number[]): void;
    /**
     * Updates the model with a single new value.
     * @param newValue The new value to update the model with.
     */
    update(newValue: number): void;
    /**
     * Logs the current state of the model (for debugging).
     */
    logState(): void;
}
