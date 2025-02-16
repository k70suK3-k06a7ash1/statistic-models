export function exponentialSmoothing(data: number[], alpha: number): number[] {
	if (alpha <= 0 || alpha > 1) {
		throw new Error("Alpha must be between 0 and 1.");
	}

	const smoothedData: number[] = [];
	for (let i = 0; i < data.length; i++) {
		const previousSmoothedValue = i === 0 ? data[i] : smoothedData[i - 1];
		const smoothedValue = alpha * data[i] + (1 - alpha) * previousSmoothedValue;
		smoothedData.push(smoothedValue);
	}

	return smoothedData;
}
