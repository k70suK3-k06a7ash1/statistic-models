import { Matrix } from "../helpers/Matrix";
/**
 * Represents a state-space model.
 *
 * Usage:
 * ```typescript
 * const A = [[1, 0], [0, 1]];
 * const B = [[1, 0], [0, 1]];
 * const C = [[1, 0], [0, 1]];
 * const D = [[0, 0], [0, 0]];
 * const initial_x = [[0], [0]];
 *
 * const model = new StateSpaceModel(A, B, C, D, initial_x);
 *
 * const u = [[1], [2]];
 * const predictedState = model.predict(u);
 * console.log(predictedState.data); // [[1], [2]]
 *
 * const observed = model.observe(u);
 * console.log(observed.data); // [[1], [2]]
 * ```
 */
export declare class StateSpaceModel {
    A: Matrix;
    B: Matrix;
    C: Matrix;
    D: Matrix;
    x: Matrix;
    constructor(A: number[][], B: number[][], C: number[][], D: number[][], initial_x: number[][]);
    /**
     * Predicts the next state.
     * @param u The input matrix.
     * @returns The predicted state matrix.
     */
    predict(u: number[][]): Matrix;
    /**
     * Predicts the observation.
     * @param u The input matrix.
     * @returns The predicted observation matrix.
     */
    observe(u: number[][]): Matrix;
    /**
     * Updates the state (placeholder method).
     * @param y The observation matrix.
     * @param u The input matrix.
     */
    update(y: number[][], u: number[][]): void;
    /**
     * Updates the state using a Kalman filter.
     * @param y The observation matrix.
     * @param R The observation noise covariance matrix.
     * @param Q The process noise covariance matrix.
     * @param P The error covariance matrix.
     */
    updateWithKalman(y: number[][], R: number[][], Q: number[][], P: number[][]): void;
}
