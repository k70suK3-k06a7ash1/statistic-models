import { describe, it, expect } from "vitest";
import { movingAverageForecast } from "./moving-average-forecast";
describe("movingAverageForecast", () => {
	it("正常系: 基本的な予測", () => {
		const data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
		const windowSize = 3;
		const forecastHorizon = 2;
		const expected = [9, 9];
		expect(movingAverageForecast(data, windowSize, forecastHorizon)).toEqual(
			expected,
		);
	});

	it("正常系: 異なるウィンドウサイズと予測期間", () => {
		const data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
		const windowSize = 5;
		const forecastHorizon = 3;
		const expected = [8, 8, 8];
		expect(movingAverageForecast(data, windowSize, forecastHorizon)).toEqual(
			expected,
		);
	});

	it("正常系: 小さいデータセット", () => {
		const data = [1, 2, 3, 4, 5];
		const windowSize = 2;
		const forecastHorizon = 1;
		const expected = [4.5];
		expect(movingAverageForecast(data, windowSize, forecastHorizon)).toEqual(
			expected,
		);
	});

	it("正常系: 同じ値が続くデータ", () => {
		const data = [5, 5, 5, 5, 5, 5, 5, 5, 5, 5];
		const windowSize = 4;
		const forecastHorizon = 3;
		const expected = [5, 5, 5];
		expect(movingAverageForecast(data, windowSize, forecastHorizon)).toEqual(
			expected,
		);
	});

	it("正常系: 負の数を含むデータ", () => {
		const data = [-1, -2, -3, -4, -5, -6, -7, -8, -9, -10];
		const windowSize = 3;
		const forecastHorizon = 2;
		const expected = [-9, -9];
		expect(movingAverageForecast(data, windowSize, forecastHorizon)).toEqual(
			expected,
		);
	});

	it("正常系: 正と負の数が混在するデータ", () => {
		const data = [-1, 2, -3, 4, -5, 6, -7, 8, -9, 10];
		const windowSize = 3;
		const forecastHorizon = 2;
		const expected = [3, 3];
		expect(movingAverageForecast(data, windowSize, forecastHorizon)).toEqual(
			expected,
		);
	});

	it("エラー系: データ長がウィンドウサイズより小さい", () => {
		const data = [1, 2];
		const windowSize = 3;
		const forecastHorizon = 1;
		expect(() =>
			movingAverageForecast(data, windowSize, forecastHorizon),
		).toThrowError("データ長がウィンドウサイズより小さい");
	});

	it("正常系：forecastHorizonが0の場合", () => {
		const data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
		const windowSize = 3;
		const forecastHorizon = 0;
		const expected: number[] = [];
		expect(movingAverageForecast(data, windowSize, forecastHorizon)).toEqual(
			expected,
		);
	});
});
