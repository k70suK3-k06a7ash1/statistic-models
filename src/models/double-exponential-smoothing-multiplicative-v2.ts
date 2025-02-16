// 改善された doubleExponentialSmoothingMultiplicative
export function doubleExponentialSmoothingMultiplicative(
	data: number[],
	alpha: number,
	beta: number,
) {
	if (alpha <= 0 || alpha > 1 || beta <= 0 || beta > 1) {
		throw new Error("Alpha and Beta must be between 0 and 1.");
	}
	if (data.length < 2 || data.some((d) => d <= 0)) {
		throw new Error(
			"Data must contain at least two positive data points for initialization.",
		);
	}

	const level = [data[0]];
	const trend = [data[1] / data[0]];
	const smoothedData = [data[0]];

	for (let i = 1; i < data.length; i++) {
		const currentLevel =
			alpha * data[i] + (1 - alpha) * level[i - 1] * trend[i - 1];
		const currentTrend =
			beta * (currentLevel / level[i - 1]) + (1 - beta) * trend[i - 1];

		level.push(currentLevel);
		trend.push(currentTrend);
		smoothedData.push(currentLevel * currentTrend);
	}

	const forecast = (steps: number) => {
		const lastLevel = level[level.length - 1];
		const lastTrend = trend[trend.length - 1];
		return Array.from(
			{ length: steps },
			(_, i) => lastLevel * lastTrend ** (i + 1),
		);
	};

	return { level, trend, smoothedData, forecast };
}
