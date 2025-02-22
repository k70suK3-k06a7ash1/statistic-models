// V2
export function doubleExponentialSmoothingAdditive(
	data: number[],
	alpha: number,
	beta: number,
) {
	if (alpha <= 0 || alpha > 1 || beta <= 0 || beta > 1) {
		throw new Error("Alpha and Beta must be between 0 and 1.");
	}
	if (data.length < 2) {
		throw new Error(
			"Data must contain at least two data points for initialization.",
		);
	}

	const initialTrend = (data[1] - data[0]) / 1;
	const initialState = {
		level: data[0],
		trend: initialTrend,
		smoothedData: data[0],
	};

	/**
	 * Applies the double exponential smoothing additive method to a time series data.
	 *
	 * @param {number[]} data - The time series data as an array of numbers.
	 * @param {number} alpha - The smoothing factor for the level (0 < alpha <= 1).
	 * @param {number} beta - The smoothing factor for the trend (0 < beta <= 1).
	 * @returns {{ level: number[]; trend: number[]; smoothedData: number[]; forecast: (steps: number) => number[] }} - An object containing the level, trend, smoothed data, and a forecast function.
	 *
	 * @throws {Error} If alpha or beta are not between 0 and 1.
	 * @throws {Error} If the data array contains less than two data points.
	 *
	 * Usage:
	 * ```typescript
	 * const data = [10, 12, 14, 18, 24, 30];
	 * const alpha = 0.5;
	 * const beta = 0.3;
	 * const result = doubleExponentialSmoothingAdditive(data, alpha, beta);
	 *
	 * console.log(result.level);
	 * console.log(result.trend);
	 * console.log(result.smoothedData);
	 *
	 * const forecastValues = result.forecast(3);
	 * console.log(forecastValues);
	 * ```
	 */

	const result = data.slice(1).reduce(
		(acc, point) => {
			const lastLevel = acc.level[acc.level.length - 1];
			const lastTrend = acc.trend[acc.trend.length - 1];

			const currentLevel =
				alpha * point + (1 - alpha) * (lastLevel + lastTrend);
			const currentTrend =
				beta * (currentLevel - lastLevel) + (1 - beta) * lastTrend;

			return {
				level: [...acc.level, currentLevel],
				trend: [...acc.trend, currentTrend],
				smoothedData: [...acc.smoothedData, currentLevel + currentTrend],
			};
		},
		{
			level: [initialState.level],
			trend: [initialState.trend],
			smoothedData: [initialState.smoothedData],
		},
	);

	const forecast = (steps: number) => {
		const lastLevel = result.level[result.level.length - 1];
		const lastTrend = result.trend[result.trend.length - 1];
		return Array.from(
			{ length: steps },
			(_, i) => lastLevel + (i + 1) * lastTrend,
		);
	};

	return { ...result, forecast };
}
