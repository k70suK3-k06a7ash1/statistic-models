// Vitest のテストコード
import { describe, expect, test } from "vitest";
import { movingAverageForecast } from "./moving-average-forecast-v2";

// テストスイート
describe("movingAverageForecast", () => {
	test("正しい移動平均の予測ができる", () => {
		const data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
		const windowSize = 3;
		const forecastHorizon = 2;
		expect(movingAverageForecast(data, windowSize, forecastHorizon)).toEqual([
			9, 9,
		]);
	});

	test("異なるウィンドウサイズでの予測", () => {
		const data = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100];
		const windowSize = 5;
		const forecastHorizon = 3;
		expect(movingAverageForecast(data, windowSize, forecastHorizon)).toEqual([
			80, 80, 80,
		]);
	});

	test("予測期間が長い場合の動作", () => {
		const data = [5, 10, 15, 20, 25, 30];
		const windowSize = 2;
		const forecastHorizon = 5;
		expect(movingAverageForecast(data, windowSize, forecastHorizon)).toEqual([
			27.5, 27.5, 27.5, 27.5, 27.5,
		]);
	});

	test("ウィンドウサイズがデータ長と等しい場合", () => {
		const data = [3, 6, 9, 12];
		const windowSize = 4;
		const forecastHorizon = 2;
		expect(movingAverageForecast(data, windowSize, forecastHorizon)).toEqual([
			7.5, 7.5,
		]);
	});

	test("データが空のときエラーを投げる", () => {
		expect(() => movingAverageForecast([], 3, 2)).toThrow("データが空です");
	});

	test("ウィンドウサイズが0以下のときエラーを投げる", () => {
		expect(() => movingAverageForecast([1, 2, 3], 0, 2)).toThrow(
			"ウィンドウサイズと予測期間は正の整数である必要があります",
		);
	});

	test("予測期間が0以下のときエラーを投げる", () => {
		expect(() => movingAverageForecast([1, 2, 3], 2, 0)).toThrow(
			"ウィンドウサイズと予測期間は正の整数である必要があります",
		);
	});

	test("ウィンドウサイズがデータ長より大きいときエラーを投げる", () => {
		expect(() => movingAverageForecast([1, 2], 3, 2)).toThrow(
			"データ長がウィンドウサイズより小さい",
		);
	});
});
