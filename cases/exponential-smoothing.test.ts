import { expect, test } from "vitest";
import { exponentialSmoothing } from "./exponential-smoothing";

test("exponentialSmoothing should return the original array if alpha is 1", () => {
	const data = [1, 2, 3];
	const smoothedData = exponentialSmoothing(data, 1);
	expect(smoothedData).toEqual([1, 2, 3]);
});

test("exponentialSmoothing should calculate the smoothed values correctly with a valid alpha", () => {
	const data = [10, 12, 15, 13];
	const alpha = 0.5;
	const smoothedData = exponentialSmoothing(data, alpha);
	expect(smoothedData).toEqual([10, 11, 13, 13]); // 計算結果を検証
});

test("exponentialSmoothing should handle empty array correctly", () => {
	const data: number[] = [];
	const alpha = 0.5;
	const smoothedData = exponentialSmoothing(data, alpha);
	expect(smoothedData).toEqual([]); // 初期値がundefinedになる
});

test("exponentialSmoothing should work correctly with negative numbers", () => {
	const data = [-1, -2, -3, -4];
	const alpha = 0.5;
	const smoothedData = exponentialSmoothing(data, alpha);
	expect(smoothedData).toEqual([-1, -1.5, -2.25, -3.125]); // 計算結果を検証
});
