import { expect, describe, it } from "vitest";

import { exponentialSmoothingForecast } from "./exponential-smoothing-forecast";

describe("exponentialSmoothingForecast", () => {
	it("正常系: 基本的な予測", () => {
		const data = [10, 12, 13, 11, 14, 17, 20, 18, 22, 25];
		const forecastHorizon = 3;
		const smoothingLevel = 0.2;
		const expected = [
			16.975208960000003, 16.975208960000003, 16.975208960000003,
		];
		expect(
			exponentialSmoothingForecast(data, forecastHorizon, smoothingLevel),
		).toEqual(expected);
	});

	it("正常系: 異なるsmoothingLevel", () => {
		const data = [10, 12, 13, 11, 14, 17, 20, 18, 22, 25];
		const forecastHorizon = 2;
		const smoothingLevel = 0.5;
		const expected = [22.419921875, 22.419921875];
		expect(
			exponentialSmoothingForecast(data, forecastHorizon, smoothingLevel),
		).toEqual(expected);
	});

	it("正常系: 短いデータセット", () => {
		const data = [5, 10];
		const forecastHorizon = 1;
		const smoothingLevel = 0.3;
		const expected = [4.05];
		expect(
			exponentialSmoothingForecast(data, forecastHorizon, smoothingLevel),
		).toEqual(expected);
	});

	it("正常系: forecastHorizonが0の場合", () => {
		const data = [1, 2, 3, 4, 5];
		const forecastHorizon = 0;
		const smoothingLevel = 0.2;
		const expected: number[] = [];
		expect(
			exponentialSmoothingForecast(data, forecastHorizon, smoothingLevel),
		).toEqual(expected);
	});

	it("正常系: デフォルトのsmoothingLevelを使用", () => {
		const data = [10, 12, 13, 11, 14, 17, 20, 18, 22, 25];
		const forecastHorizon = 3;
		const expected = [
			16.975208960000003, 16.975208960000003, 16.975208960000003,
		];
		expect(exponentialSmoothingForecast(data, forecastHorizon)).toEqual(
			expected,
		);
	});

	it("エラー系: smoothingLevelが0の場合", () => {
		const data = [1, 2, 3, 4, 5];
		const forecastHorizon = 1;
		const smoothingLevel = 0;
		expect(() =>
			exponentialSmoothingForecast(data, forecastHorizon, smoothingLevel),
		).toThrowError("平滑化係数は 0 より大きく 1 より小さい必要があります。");
	});

	it("エラー系: smoothingLevelが1の場合", () => {
		const data = [1, 2, 3, 4, 5];
		const forecastHorizon = 1;
		const smoothingLevel = 1;
		expect(() =>
			exponentialSmoothingForecast(data, forecastHorizon, smoothingLevel),
		).toThrowError("平滑化係数は 0 より大きく 1 より小さい必要があります。");
	});

	it("エラー系: smoothingLevelが負の数の場合", () => {
		const data = [1, 2, 3, 4, 5];
		const forecastHorizon = 1;
		const smoothingLevel = -0.1;
		expect(() =>
			exponentialSmoothingForecast(data, forecastHorizon, smoothingLevel),
		).toThrowError("平滑化係数は 0 より大きく 1 より小さい必要があります。");
	});

	it("エラー系: smoothingLevelが1より大きい場合", () => {
		const data = [1, 2, 3, 4, 5];
		const forecastHorizon = 1;
		const smoothingLevel = 1.1;
		expect(() =>
			exponentialSmoothingForecast(data, forecastHorizon, smoothingLevel),
		).toThrowError("平滑化係数は 0 より大きく 1 より小さい必要があります。");
	});

	it("正常系：データが1つの場合", () => {
		const data = [10];
		const forecastHorizon = 3;
		const smoothingLevel = 0.2;
		const expected = [10, 10, 10];
		expect(
			exponentialSmoothingForecast(data, forecastHorizon, smoothingLevel),
		).toEqual(expected);
	});
});
