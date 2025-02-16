import { Matrix } from "../helpers/Matrix";
export declare class VectorAutoregression {
    p: number;
    k: number;
    coefficients: Matrix[];
    constructor(p: number, k: number);
    prepareData(data: number[][]): {
        Y: Matrix;
        X: Matrix;
    };
    fit(data: number[][]): void;
    predict(data: number[][], steps: number): number[][];
    private predictNext;
    logState(): void;
}
