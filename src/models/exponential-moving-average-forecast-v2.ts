export function exponentialMovingAverageForecast(
	data: number[],
	smoothingFactor: number,
	forecastHorizon: number,
): number[] {
	if (!Array.isArray(data) || data.length === 0) {
		throw new Error("データが空です");
	}
	if (smoothingFactor <= 0 || smoothingFactor > 1 || forecastHorizon <= 0) {
		throw new Error(
			"平滑化係数は0より大きく1以下、予測期間は正の整数である必要があります",
		);
	}

	/**
	 * Calculates the exponential moving average forecast for a given data set.
	 *
	 * @param {number[]} data - The input data array.
	 * @param {number} smoothingFactor - The smoothing factor (0 < smoothingFactor <= 1).
	 * @param {number} forecastHorizon - The number of periods to forecast.
	 * @returns {number[]} - An array containing the forecasted values.
	 *
	 * @throws {Error} If the data array is empty.
	 * @throws {Error} If the smoothing factor is not between 0 and 1 or the forecast horizon is not a positive integer.
	 *
	 * Usage:
	 * ```typescript
	 * const data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
	 * const smoothingFactor = 0.8;
	 * const forecastHorizon = 2;
	 * const forecast = exponentialMovingAverageForecast(data, smoothingFactor, forecastHorizon);
	 * console.log(forecast); // [9.750000128, 9.750000128]
	 * ```
	 */

	// 初期値をデータの最初の値に設定
	let ema = data[0];

	// 指数移動平均を計算
	for (let i = 1; i < data.length; i++) {
		ema = smoothingFactor * data[i] + (1 - smoothingFactor) * ema;
	}

	// 予測値のリストを作成
	return Array(forecastHorizon).fill(ema);
}
