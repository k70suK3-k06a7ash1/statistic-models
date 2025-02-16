import type { DoubleExponentialSmoothingResult } from "../types/DoubleExponentialSmoothingResult";

export function doubleExponentialSmoothingMultiplicative(
	data: number[],
	alpha: number,
	beta: number,
): DoubleExponentialSmoothingResult {
	if (alpha <= 0 || alpha > 1 || beta <= 0 || beta > 1) {
		throw new Error("Alpha and Beta must be between 0 and 1.");
	}

	const level: number[] = [data[0]];
	const trend: number[] = [data[1] / data[0]]; // 初期トレンド (比率)
	const smoothedData: number[] = [data[0]];

	for (let i = 1; i < data.length; i++) {
		const currentLevel =
			alpha * data[i] + (1 - alpha) * level[i - 1] * trend[i - 1];
		const currentTrend =
			beta * (currentLevel / level[i - 1]) + (1 - beta) * trend[i - 1];

		level.push(currentLevel);
		trend.push(currentTrend);
		smoothedData.push(currentLevel * currentTrend); // 平滑化された値
	}

	const forecast = (steps: number): number[] => {
		const forecastValues: number[] = [];
		const lastLevel = level[level.length - 1];
		const lastTrend = trend[trend.length - 1];

		for (let i = 1; i <= steps; i++) {
			const forecastValue = lastLevel * lastTrend ** i;
			forecastValues.push(forecastValue);
		}

		return forecastValues;
	};

	return { level, trend, smoothedData, forecast };
}
