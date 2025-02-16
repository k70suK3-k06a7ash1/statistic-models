import { describe, it, expect } from "vitest";
import { doubleExponentialSmoothingAdditive } from "./double-exponential-smoothing-additive-v2";

describe("doubleExponentialSmoothingAdditive", () => {
	it("should throw an error if alpha or beta are out of bounds", () => {
		expect(() =>
			doubleExponentialSmoothingAdditive([10, 12], -0.1, 0.5),
		).toThrow();
		expect(() =>
			doubleExponentialSmoothingAdditive([10, 12], 1.1, 0.5),
		).toThrow();
		expect(() =>
			doubleExponentialSmoothingAdditive([10, 12], 0.5, -0.1),
		).toThrow();
		expect(() =>
			doubleExponentialSmoothingAdditive([10, 12], 0.5, 1.1),
		).toThrow();
	});

	it("should return correct smoothing results", () => {
		const data = [10, 12, 14, 18, 24, 30];
		const alpha = 0.5;
		const beta = 0.3;
		const result = doubleExponentialSmoothingAdditive(data, alpha, beta);
		expect(result.level).toBeInstanceOf(Array);
		expect(result.trend).toBeInstanceOf(Array);
		expect(result.smoothedData).toBeInstanceOf(Array);
		expect(result.level.length).toBe(data.length);
		expect(result.trend.length).toBe(data.length);
		expect(result.smoothedData.length).toBe(data.length);
	});

	it("should forecast future values correctly", () => {
		const data = [10, 12, 14, 18, 24, 30];
		const alpha = 0.5;
		const beta = 0.3;
		const result = doubleExponentialSmoothingAdditive(data, alpha, beta);
		const forecastValues = result.forecast(3);
		expect(forecastValues).toBeInstanceOf(Array);
		expect(forecastValues.length).toBe(3);
	});

	it("should handle small data arrays correctly", () => {
		const smallData = [5, 7];
		const alpha = 0.5;
		const beta = 0.3;
		const result = doubleExponentialSmoothingAdditive(smallData, alpha, beta);
		expect(result.level.length).toBe(2);
		expect(result.trend.length).toBe(2);
		expect(result.smoothedData.length).toBe(2);
	});
});
