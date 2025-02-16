export function exponentialSmoothing(data: number[], alpha: number): number[] {
	if (alpha <= 0 || alpha > 1) {
		throw new Error("Alpha must be between 0 and 1.");
	}

	return data.reduce((acc: number[], currentValue: number, index: number) => {
		const previousSmoothedValue = acc[index - 1] ?? currentValue; // 初回は初期値
		const smoothedValue =
			index === 0
				? currentValue
				: alpha * currentValue + (1 - alpha) * previousSmoothedValue;
		// biome-ignore lint/performance/noAccumulatingSpread: <explanation>
		return [...acc, smoothedValue];
	}, []);
}
