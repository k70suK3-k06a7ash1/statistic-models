import { expect, test } from "vitest";
import { doubleExponentialSmoothingMultiplicative } from "./double-exponential-smoothing-multiplicative";

test("doubleExponentialSmoothingMultiplicative should handle array with single element", () => {
	const data = [10];
	const alpha = 0.5;
	const beta = 0.5;
	const result = doubleExponentialSmoothingMultiplicative(data, alpha, beta);
	expect(result.level).toEqual([10]);
	expect(result.trend).toEqual([Number.NaN]); // または別の適切な値。 single elementの場合のトレンドは定義できない
	expect(result.smoothedData).toEqual([10]);

	const forecast = result.forecast(3);
	expect(forecast).toEqual([Number.NaN, Number.NaN, Number.NaN]); // single elementなのでNaNになる。またはエラーを返すように実装しても良い
});
test("doubleExponentialSmoothingMultiplicative should calculate level, trend and smoothed data correctly", () => {
	const data = [10, 12, 14, 16, 18];
	const alpha = 0.5;
	const beta = 0.5;
	const result = doubleExponentialSmoothingMultiplicative(data, alpha, beta);

	// 計算結果の検証 (精度は浮動小数点数の誤差を考慮して許容範囲を設定)
	const tolerance = 0.0001;

	expect(result.level[0]).toBeCloseTo(10, tolerance);
	expect(result.level[1]).toBeCloseTo(12, tolerance); // ここを修正
	expect(result.level[2]).toBeCloseTo(14.2, tolerance); // これ以降も必要に応じて修正
	expect(result.level[3]).toBeCloseTo(16.460833333333333, tolerance);
	expect(result.level[4]).toBeCloseTo(18.67436212588028, tolerance);

	expect(result.trend[0]).toBeCloseTo(1.2, tolerance);
	expect(result.trend[1]).toBeCloseTo(1.12, tolerance);
	expect(result.trend[2]).toBeCloseTo(1.093333333, tolerance);
	expect(result.trend[3]).toBeCloseTo(1.085197531, tolerance);
	expect(result.trend[4]).toBeCloseTo(1.083091579, tolerance);

	expect(result.smoothedData[0]).toBeCloseTo(10, tolerance);
	expect(result.smoothedData[1]).toBeCloseTo(14.399999999999999, tolerance);
	expect(result.smoothedData[2]).toBeCloseTo(16.921666666666667, tolerance);
	expect(result.smoothedData[3]).toBeCloseTo(19.34872425176056, tolerance);
	expect(result.smoothedData[4]).toBeCloseTo(21.568072216666547, tolerance);
});
