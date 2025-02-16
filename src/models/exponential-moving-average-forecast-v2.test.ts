// Vitest のテストコード
import { describe, expect, test } from "vitest";
import { exponentialMovingAverageForecast } from "./exponential-moving-average-forecast-v2";
// テストスイート
describe("exponentialMovingAverageForecast", () => {
	test("正しい指数移動平均の予測ができる", () => {
		const data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
		const smoothingFactor = 0.8;
		const forecastHorizon = 2;
		expect(
			exponentialMovingAverageForecast(data, smoothingFactor, forecastHorizon),
		).toEqual([9.750000128, 9.750000128]);
	});

	test("異なる平滑化係数での予測", () => {
		const data = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100];
		const smoothingFactor = 0.2;
		const forecastHorizon = 3;
		expect(
			exponentialMovingAverageForecast(data, smoothingFactor, forecastHorizon),
		).toEqual([65.36870912, 65.36870912, 65.36870912]);
	});

	test("予測期間が長い場合の動作", () => {
		const data = [5, 10, 15, 20, 25, 30];
		const smoothingFactor = 0.3;
		const forecastHorizon = 5;
		expect(
			exponentialMovingAverageForecast(data, smoothingFactor, forecastHorizon),
		).toEqual([20.29415, 20.29415, 20.29415, 20.29415, 20.29415]);
	});

	test("データが空のときエラーを投げる", () => {
		expect(() => exponentialMovingAverageForecast([], 0.5, 2)).toThrow(
			"データが空です",
		);
	});

	test("平滑化係数が0以下または1より大きいときエラーを投げる", () => {
		expect(() => exponentialMovingAverageForecast([1, 2, 3], 0, 2)).toThrow(
			"平滑化係数は0より大きく1以下、予測期間は正の整数である必要があります",
		);
	});

	test("予測期間が0以下のときエラーを投げる", () => {
		expect(() => exponentialMovingAverageForecast([1, 2, 3], 0.5, 0)).toThrow(
			"平滑化係数は0より大きく1以下、予測期間は正の整数である必要があります",
		);
	});
});
