import { describe, it, expect } from "vitest";
import { movingAverage } from "./moving-average";
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
