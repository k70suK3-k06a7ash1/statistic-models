import type { DoubleExponentialSmoothingResult } from "../types/DoubleExponentialSmoothingResult";

interface SmoothingState {
	level: number;
	trend: number;
	smoothedData: number;
}

export function doubleExponentialSmoothingAdditive(
	data: number[],
	alpha: number,
	beta: number,
): DoubleExponentialSmoothingResult {
	if (alpha <= 0 || alpha > 1 || beta <= 0 || beta > 1) {
		throw new Error("Alpha and Beta must be between 0 and 1.");
	}

	// 初期値を定義
	const initialState: SmoothingState = {
		level: data[0],
		trend: data[1] - data[0],
		smoothedData: data[0],
	};

	// スムージング処理をreduceで実行
	const {
		level: levels,
		trend: trends,
		smoothedData: smoothedValues,
	} = data.slice(1).reduce(
		(
			acc: { level: number[]; trend: number[]; smoothedData: number[] },
			currentValue: number,
		) => {
			const lastLevel = acc.level[acc.level.length - 1];
			const lastTrend = acc.trend[acc.trend.length - 1];

			const currentLevel =
				alpha * currentValue + (1 - alpha) * (lastLevel + lastTrend);
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

	const forecast = (steps: number): number[] => {
		const lastLevel = levels[levels.length - 1];
		const lastTrend = trends[trends.length - 1];

		return Array.from(
			{ length: steps },
			(_, i) => lastLevel + (i + 1) * lastTrend,
		);
	};

	return {
		level: levels,
		trend: trends,
		smoothedData: smoothedValues,
		forecast,
	};
}
