import { expect, test } from "vitest";
import { exponentialSmoothing } from "./exponential-smoothing";
test("exponentialSmoothing should return the original array if alpha is 1", function () {
    var data = [1, 2, 3];
    var smoothedData = exponentialSmoothing(data, 1);
    expect(smoothedData).toEqual([1, 2, 3]);
});
test("exponentialSmoothing should calculate the smoothed values correctly with a valid alpha", function () {
    var data = [10, 12, 15, 13];
    var alpha = 0.5;
    var smoothedData = exponentialSmoothing(data, alpha);
    expect(smoothedData).toEqual([10, 11, 13, 13]); // 計算結果を検証
});
test("exponentialSmoothing should handle empty array correctly", function () {
    var data = [];
    var alpha = 0.5;
    var smoothedData = exponentialSmoothing(data, alpha);
    expect(smoothedData).toEqual([]);
});
test("exponentialSmoothing should work correctly with negative numbers", function () {
    var data = [-1, -2, -3, -4];
    var alpha = 0.5;
    var smoothedData = exponentialSmoothing(data, alpha);
    expect(smoothedData).toEqual([-1, -1.5, -2.25, -3.125]); // 計算結果を検証
});
