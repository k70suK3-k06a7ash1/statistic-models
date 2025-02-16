export declare class Matrix {
    rows: number;
    cols: number;
    data: number[][];
    constructor(rows: number, cols: number, data?: number[][]);
    get(row: number, col: number): number;
    set(row: number, col: number, value: number): void;
    add(other: Matrix): Matrix;
    subtract(other: Matrix): Matrix;
    multiply(other: Matrix | number): Matrix;
    transpose(): Matrix;
    print(): void;
    static identity(size: number): Matrix;
    inverse(): Matrix;
}
