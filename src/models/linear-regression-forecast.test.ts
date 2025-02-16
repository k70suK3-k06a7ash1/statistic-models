import { describe, test, expect } from "vitest";
import { linearRegressionForecast } from "./linear-regression-forecast";

describe("linearRegressionForecast", () => {
	test("should predict future values based on linear regression", () => {
		const data = [10, 12, 15, 13, 18, 20, 22, 25];
		const forecastHorizon = 3;
		const lag = 2;

		const forecast = linearRegressionForecast(data, forecastHorizon, lag);

		expect(forecast.length).toBe(forecastHorizon);
		expect(forecast[0]).toBeGreaterThan(0);
	});

	test("should throw an error when data length is less than or equal to lag", () => {
		expect(() => linearRegressionForecast([10, 12], 3, 3)).toThrow(
			"データ長がラグより大きい必要があります。",
		);
	});

	// test("should return a reasonable prediction trend", () => {
	// 	const data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
	// 	const forecastHorizon = 5;
	// 	const lag = 3;

	// 	const forecast = linearRegressionForecast(data, forecastHorizon, lag);

	// 	expect(forecast.length).toBe(forecastHorizon);
	// 	expect(forecast[0]).toBeGreaterThan(data[data.length - 1]);
	// });
});
