import { describe, it, expect } from "vitest";
import { StateSpaceModel } from "./state-space-model";
import { Matrix } from "../helpers/Matrix";
describe("StateSpaceModel", function () {
    // 行列の定義
    var A_data = [
        [1, 0.1],
        [0, 1],
    ];
    var B_data = [[0], [0.1]];
    var C_data = [[1, 0]];
    var D_data = [[0]];
    var initial_x_data = [[0], [0]];
    var R_data = [[0.1]];
    var Q_data = [
        [0.01, 0],
        [0, 0.01],
    ];
    var initial_P_data = [
        [1, 0],
        [0, 1],
    ];
    it("should create a StateSpaceModel instance", function () {
        var ssm = new StateSpaceModel(A_data, B_data, C_data, D_data, initial_x_data);
        expect(ssm).toBeInstanceOf(StateSpaceModel);
    });
    it("should predict the next state", function () {
        var ssm = new StateSpaceModel(A_data, B_data, C_data, D_data, initial_x_data);
        var u_data = [[1]];
        var nextState = ssm.predict(u_data);
        expect(nextState).toBeInstanceOf(Matrix);
        expect(nextState.rows).toBe(2);
        expect(nextState.cols).toBe(1);
        expect(nextState.get(0, 0)).toBeCloseTo(+0); // 予測値が正しいか検証
        expect(nextState.get(1, 0)).toBeCloseTo(0.1); // 予測値が正しいか検証
    });
    it("should predict the observation", function () {
        var ssm = new StateSpaceModel(A_data, B_data, C_data, D_data, initial_x_data);
        var u_data = [[1]];
        var observation = ssm.observe(u_data);
        expect(observation).toBeInstanceOf(Matrix);
        expect(observation.rows).toBe(1);
        expect(observation.cols).toBe(1);
        expect(observation.get(0, 0)).toBeCloseTo(+0); // 観測値が正しいか検証
    });
    it("should update the state with Kalman filter", function () {
        var ssm = new StateSpaceModel(A_data, B_data, C_data, D_data, initial_x_data);
        var y_data = [[1.2]];
        var initial_x = ssm.x.get(0, 0);
        ssm.updateWithKalman(y_data, R_data, Q_data, initial_P_data);
        expect(ssm.x).toBeInstanceOf(Matrix);
        expect(ssm.x.rows).toBe(2);
        expect(ssm.x.cols).toBe(1);
        expect(ssm.x.get(0, 0)).not.toBeCloseTo(initial_x); //状態が更新されているか確認
    });
    it("Inverse function should throw an error for non-square matrix", function () {
        var nonSquareMatrix = new Matrix(2, 3, [
            [1, 2, 3],
            [4, 5, 6],
        ]);
        expect(function () { return nonSquareMatrix.inverse(); }).toThrowError("Matrix must be square to calculate the inverse.");
    });
    it("Inverse function should throw an error for singular matrix", function () {
        var singularMatrix = new Matrix(2, 2, [
            [1, 1],
            [1, 1],
        ]);
        expect(function () { return singularMatrix.inverse(); }).toThrowError("Singular matrix, cannot invert.");
    });
    it("Inverse function calculates inverse for 2x2 matrix", function () {
        var matrix = new Matrix(2, 2, [
            [2, 3],
            [2, 5],
        ]);
        var inverse = matrix.inverse();
        expect(inverse.get(0, 0)).toBeCloseTo(1.25);
        expect(inverse.get(0, 1)).toBeCloseTo(-0.75);
        expect(inverse.get(1, 0)).toBeCloseTo(-0.5);
        expect(inverse.get(1, 1)).toBeCloseTo(0.5);
    });
    it("Static identity function creates identity matrix", function () {
        var identity = Matrix.identity(3);
        expect(identity.get(0, 0)).toBe(1);
        expect(identity.get(0, 1)).toBe(0);
        expect(identity.get(0, 2)).toBe(0);
        expect(identity.get(1, 0)).toBe(0);
        expect(identity.get(1, 1)).toBe(1);
        expect(identity.get(1, 2)).toBe(0);
        expect(identity.get(2, 0)).toBe(0);
        expect(identity.get(2, 1)).toBe(0);
        expect(identity.get(2, 2)).toBe(1);
    });
    it("Matrix Addition should throw error when matrix dimensions do not match", function () {
        var matrix1 = new Matrix(2, 2, [
            [1, 2],
            [3, 4],
        ]);
        var matrix2 = new Matrix(3, 3, [
            [1, 2, 3],
            [4, 5, 6],
            [7, 8, 9],
        ]);
        expect(function () { return matrix1.add(matrix2); }).toThrowError("Matrix dimensions must match for addition.");
    });
    it("Matrix Subtraction should throw error when matrix dimensions do not match", function () {
        var matrix1 = new Matrix(2, 2, [
            [1, 2],
            [3, 4],
        ]);
        var matrix2 = new Matrix(3, 3, [
            [1, 2, 3],
            [4, 5, 6],
            [7, 8, 9],
        ]);
        expect(function () { return matrix1.subtract(matrix2); }).toThrowError("Matrix dimensions must match for subtraction.");
    });
    it("Matrix Multiplication should throw error when number of columns of first matrix does not match number of rows of second matrix", function () {
        var matrix1 = new Matrix(2, 2, [
            [1, 2],
            [3, 4],
        ]);
        var matrix2 = new Matrix(3, 3, [
            [1, 2, 3],
            [4, 5, 6],
            [7, 8, 9],
        ]);
        expect(function () { return matrix1.multiply(matrix2); }).toThrowError("Number of columns in the first matrix must match the number of rows in the second matrix for multiplication.");
    });
    it("Matrix Transpose function should work", function () {
        var matrix1 = new Matrix(2, 3, [
            [1, 2, 3],
            [4, 5, 6],
        ]);
        var matrix2 = matrix1.transpose();
        expect(matrix2.get(0, 0)).toBe(1);
        expect(matrix2.get(0, 1)).toBe(4);
        expect(matrix2.get(1, 0)).toBe(2);
        expect(matrix2.get(1, 1)).toBe(5);
        expect(matrix2.get(2, 0)).toBe(3);
        expect(matrix2.get(2, 1)).toBe(6);
    });
    it("Should be able to multiply by a scalar", function () {
        var matrix = new Matrix(2, 2, [
            [1, 2],
            [3, 4],
        ]);
        var scalar = 2;
        var multipliedMatrix = matrix.multiply(scalar);
        expect(multipliedMatrix.get(0, 0)).toBe(2);
        expect(multipliedMatrix.get(0, 1)).toBe(4);
        expect(multipliedMatrix.get(1, 0)).toBe(6);
        expect(multipliedMatrix.get(1, 1)).toBe(8);
    });
    it("Should be able to add matricies", function () {
        var matrix1 = new Matrix(2, 2, [
            [1, 2],
            [3, 4],
        ]);
        var matrix2 = new Matrix(2, 2, [
            [5, 6],
            [7, 8],
        ]);
        var addedMatrix = matrix1.add(matrix2);
        expect(addedMatrix.get(0, 0)).toBe(6);
        expect(addedMatrix.get(0, 1)).toBe(8);
        expect(addedMatrix.get(1, 0)).toBe(10);
        expect(addedMatrix.get(1, 1)).toBe(12);
    });
    it("Should be able to subtract matricies", function () {
        var matrix1 = new Matrix(2, 2, [
            [1, 2],
            [3, 4],
        ]);
        var matrix2 = new Matrix(2, 2, [
            [5, 6],
            [7, 8],
        ]);
        var subtractedMatrix = matrix1.subtract(matrix2);
        expect(subtractedMatrix.get(0, 0)).toBe(-4);
        expect(subtractedMatrix.get(0, 1)).toBe(-4);
        expect(subtractedMatrix.get(1, 0)).toBe(-4);
        expect(subtractedMatrix.get(1, 1)).toBe(-4);
    });
    it("Should be able to multiply matricies", function () {
        var matrix1 = new Matrix(2, 2, [
            [1, 2],
            [3, 4],
        ]);
        var matrix2 = new Matrix(2, 2, [
            [5, 6],
            [7, 8],
        ]);
        var multipliedMatrix = matrix1.multiply(matrix2);
        expect(multipliedMatrix.get(0, 0)).toBe(19);
        expect(multipliedMatrix.get(0, 1)).toBe(22);
        expect(multipliedMatrix.get(1, 0)).toBe(43);
        expect(multipliedMatrix.get(1, 1)).toBe(50);
    });
});
