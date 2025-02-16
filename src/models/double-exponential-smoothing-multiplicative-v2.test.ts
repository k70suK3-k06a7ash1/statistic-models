import { expect, describe, it } from "vitest";
import { doubleExponentialSmoothingMultiplicative } from "./double-exponential-smoothing-multiplicative-v2";

describe("doubleExponentialSmoothingMultiplicative", () => {
	it("should throw an error if alpha or beta are out of bounds", () => {
		expect(() =>
			doubleExponentialSmoothingMultiplicative([10, 12], -0.1, 0.5),
		).toThrow();
		expect(() =>
			doubleExponentialSmoothingMultiplicative([10, 12], 1.1, 0.5),
		).toThrow();
	});

	it("should return correct smoothing results", () => {
		const data = [10, 12, 14, 18, 24, 30];
		const alpha = 0.5;
		const beta = 0.3;
		const result = doubleExponentialSmoothingMultiplicative(data, alpha, beta);
		expect(result.level.length).toBe(data.length);
		expect(result.trend.length).toBe(data.length);
		expect(result.smoothedData.length).toBe(data.length);
	});

	it("should forecast future values correctly", () => {
		const data = [10, 12, 14, 18, 24, 30];
		const alpha = 0.5;
		const beta = 0.3;
		const result = doubleExponentialSmoothingMultiplicative(data, alpha, beta);
		const forecastValues = result.forecast(3);
		expect(forecastValues.length).toBe(3);
	});
});
