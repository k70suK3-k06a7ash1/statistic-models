import { Matrix } from "../helpers/Matrix";
/**
 * Represents a vector autoregression model.
 *
 * Usage:
 * ```typescript
 * const data = [
 *   [1.0, 2.0],
 *   [1.5, 2.5],
 *   [1.3, 2.7],
 *   [1.8, 3.1],
 *   [2.0, 3.0],
 *   [2.2, 3.4],
 *   [2.5, 3.7],
 *   [2.3, 3.5],
 *   [2.8, 4.0],
 *   [3.0, 4.2],
 * ];
 * const p = 2;
 * const k = 2;
 *
 * const varModel = new VectorAutoregression(p, k);
 * varModel.fit(data);
 * const steps = 3;
 * const forecast = varModel.predict(data, steps);
 * console.log(forecast);
 * ```
 */
export declare class VectorAutoregression {
    p: number;
    k: number;
    coefficients: Matrix[];
    constructor(p: number, k: number);
    /**
     * Prepares the data for training the VAR model.
     * @param data The input data.
     * @returns The prepared data.
     */
    prepareData(data: number[][]): {
        Y: Matrix;
        X: Matrix;
    };
    /**
     * Fits the model to the given data.
     * @param data The input data.
     */
    fit(data: number[][]): void;
    /**
     * Predicts future values.
     * @param data The input data.
     * @param steps The number of steps to predict.
     * @returns The predicted values.
     */
    predict(data: number[][], steps: number): number[][];
    /**
     * Predicts the next value (internal function).
     * @param lastData The last p data points.
     * @returns The predicted value.
     */
    private predictNext;
    /**
     * Logs the current state of the model (for debugging).
     */
    logState(): void;
}
