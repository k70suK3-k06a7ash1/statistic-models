import { describe, it, test, expect } from "vitest";
import { movingAverage } from "./moving-average-v2";

describe("movingAverage", () => {
	test("window size is larger than data length", () => {
		expect(movingAverage([1, 2, 3], 5)).toEqual([]);
	});

	test("window size is zero", () => {
		expect(movingAverage([1, 2, 3], 0)).toEqual([]);
	});

	test("basic moving average calculation", () => {
		expect(movingAverage([1, 2, 3, 4, 5], 3)).toEqual([2, 3, 4]);
	});

	test("window size is 1 (should return original data)", () => {
		expect(movingAverage([10, 20, 30, 40], 1)).toEqual([10, 20, 30, 40]);
	});

	test("window size equals data length", () => {
		expect(movingAverage([2, 4, 6, 8], 4)).toEqual([5]);
	});

	test("floating point values", () => {
		expect(movingAverage([1.2, 2.4, 3.6, 4.8], 2)).toEqual([
			1.7999999999999998, 3.0, 4.2,
		]);
	});
});
describe("movingAverage", () => {
	it("should calculate moving average correctly with valid input", () => {
		const data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
		const windowSize = 3;
		const expected = [2, 3, 4, 5, 6, 7, 8, 9];
		expect(movingAverage(data, windowSize)).toEqual(expected);
	});

	it("should calculate moving average correctly with a different window size", () => {
		const data = [1, 2, 3, 4, 5];
		const windowSize = 2;
		const expected = [1.5, 2.5, 3.5, 4.5];
		expect(movingAverage(data, windowSize)).toEqual(expected);
	});

	it("should return an empty array when window size is greater than data length", () => {
		const data = [1, 2, 3];
		const windowSize = 4;
		const expected: number[] = [];
		expect(movingAverage(data, windowSize)).toEqual(expected);
	});

	it("should return the original array when window size is 1", () => {
		const data = [1, 2, 3, 4, 5];
		const windowSize = 1;
		const expected = [1, 2, 3, 4, 5];
		expect(movingAverage(data, windowSize)).toEqual(expected);
	});

	it("should calculate the correct average when the window size equals the data length", () => {
		const data = [1, 2, 3];
		const windowSize = 3;
		const expected = [2];
		expect(movingAverage(data, windowSize)).toEqual(expected);
	});

	it("should handle empty data array correctly", () => {
		const data: number[] = [];
		const windowSize = 2;
		const expected: number[] = [];
		expect(movingAverage(data, windowSize)).toEqual(expected);
	});
});
