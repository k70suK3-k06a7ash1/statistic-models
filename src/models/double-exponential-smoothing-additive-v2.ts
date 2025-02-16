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
