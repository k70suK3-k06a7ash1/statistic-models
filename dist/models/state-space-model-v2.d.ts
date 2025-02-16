import { Matrix } from "../helpers/Matrix";
export declare class StateSpaceModel {
    A: Matrix;
    B: Matrix;
    C: Matrix;
    D: Matrix;
    x: Matrix;
    constructor(A: number[][], B: number[][], C: number[][], D: number[][], initial_x: number[][]);
    predict(u: number[][]): Matrix;
    observe(u: number[][]): Matrix;
    update(y: number[][], u: number[][]): void;
    updateWithKalman(y: number[][], R: number[][], Q: number[][], P: number[][]): void;
}
