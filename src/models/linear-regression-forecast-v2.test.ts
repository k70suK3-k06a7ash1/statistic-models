import { describe, test, expect } from "vitest";
import { linearRegressionForecast } from "./linear-regression-forecast-v2";

describe("linearRegressionForecast", () => {
	test("should predict future values based on linear regression", () => {
		const data = [10, 12, 15, 13, 18, 20, 22, 25];
		const forecastHorizon = 3;
		const lag = 2;

		const forecast = linearRegressionForecast(data, forecastHorizon, lag);

		expect(forecast.length).toBe(forecastHorizon);
		expect(forecast[0]).toBeGreaterThan(0);
		expect(forecast).toEqual([
			27.316199962413137, 30.328439375339528, 33.16705128188415,
		]);
	});

	test("should throw an error when data length is less than or equal to lag", () => {
		expect(() => linearRegressionForecast([10, 12], 3, 3)).toThrow(
			"データ長がラグより大きい必要があります。",
		);
	});
});
