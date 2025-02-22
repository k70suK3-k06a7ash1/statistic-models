/**
 * 指数平滑法を使用して将来を予測する (シンプルなバージョン)
 * @param data 時系列データ (数値の配列)
 * @param forecastHorizon 予測期間 (未来の時点数)
 * @param smoothingLevel 平滑化係数 (0 < alpha < 1)
 * @returns 予測値の配列
 *
 * Usage:
 * ```typescript
 * const data = [10, 12, 13, 11, 14, 17, 20, 18, 22, 25];
 * const forecastHorizon = 3;
 * const smoothingLevel = 0.2;
 * const expected = [
 *   18.048950784000002, 18.048950784000002, 18.048950784000002,
 * ];
 * const forecast = exponentialSmoothingForecast(data, forecastHorizon, smoothingLevel);
 * console.log(forecast); // [18.048950784000002, 18.048950784000002, 18.048950784000002]
 * ```
 */
export declare function exponentialSmoothingForecast(data: number[], forecastHorizon: number, smoothingLevel?: number): number[];
