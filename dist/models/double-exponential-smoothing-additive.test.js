import { expect, test } from "vitest";
import { doubleExponentialSmoothingAdditive } from "./double-exponential-smoothing-additive";
test("doubleExponentialSmoothingAdditive should throw an error if alpha or beta is out of range", function () {
    expect(function () {
        return doubleExponentialSmoothingAdditive([1, 2, 3], -0.1, 0.5);
    }).toThrowError("Alpha and Beta must be between 0 and 1.");
    expect(function () {
        return doubleExponentialSmoothingAdditive([1, 2, 3], 0.5, 1.1);
    }).toThrowError("Alpha and Beta must be between 0 and 1.");
});
test("doubleExponentialSmoothingAdditive should handle array with single element", function () {
    var data = [10];
    var alpha = 0.5;
    var beta = 0.5;
    var result = doubleExponentialSmoothingAdditive(data, alpha, beta);
    expect(result.level).toEqual([10]);
    expect(result.trend).toEqual([Number.NaN]); // または別の適切な値。 single elementの場合のトレンドは定義できない
    expect(result.smoothedData).toEqual([10]);
    var forecast = result.forecast(3);
    expect(forecast).toEqual([Number.NaN, Number.NaN, Number.NaN]); // single elementなのでNaNになる。またはエラーを返すように実装しても良い
});
test("doubleExponentialSmoothingAdditive should calculate level, trend and smoothed data correctly", function () {
    var data = [10, 12, 14, 16, 18];
    var alpha = 0.5;
    var beta = 0.5;
    var result = doubleExponentialSmoothingAdditive(data, alpha, beta);
    // 計算結果の検証 (精度は浮動小数点数の誤差を考慮して許容範囲を設定)
    var tolerance = 0.0001;
    expect(result.level[0]).toBeCloseTo(10, tolerance);
    expect(result.level[1]).toBeCloseTo(12, tolerance);
    expect(result.level[2]).toBeCloseTo(14, tolerance);
    expect(result.level[3]).toBeCloseTo(16, tolerance);
    expect(result.level[4]).toBeCloseTo(18, tolerance);
    expect(result.trend[0]).toBeCloseTo(2, tolerance);
    expect(result.trend[1]).toBeCloseTo(2, tolerance);
    expect(result.trend[2]).toBeCloseTo(2, tolerance);
    expect(result.trend[3]).toBeCloseTo(2, tolerance);
    expect(result.trend[4]).toBeCloseTo(2, tolerance);
    expect(result.smoothedData[0]).toBeCloseTo(10, tolerance);
    expect(result.smoothedData[1]).toBeCloseTo(14, tolerance);
    expect(result.smoothedData[2]).toBeCloseTo(16, tolerance);
    expect(result.smoothedData[3]).toBeCloseTo(18, tolerance);
    expect(result.smoothedData[4]).toBeCloseTo(20, tolerance);
});
test("doubleExponentialSmoothingAdditive forecast should return correct values", function () {
    var data = [10, 12, 14, 16, 18];
    var alpha = 0.5;
    var beta = 0.5;
    var result = doubleExponentialSmoothingAdditive(data, alpha, beta);
    var forecast = result.forecast(3);
    var tolerance = 0.0001;
    expect(forecast[0]).toBeCloseTo(20, tolerance);
    expect(forecast[1]).toBeCloseTo(22, tolerance);
    expect(forecast[2]).toBeCloseTo(24, tolerance);
});
