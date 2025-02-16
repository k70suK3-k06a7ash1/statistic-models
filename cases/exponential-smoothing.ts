export function exponentialSmoothing(data: number[], alpha: number): number[] {
	if (alpha <= 0 || alpha > 1) {
		throw new Error("Alpha must be between 0 and 1.");
	}

	const result: number[] = [data[0]]; // 初期値は最初のデータ
	for (let i = 1; i < data.length; i++) {
		const smoothedValue = alpha * data[i] + (1 - alpha) * result[i - 1];
		result.push(smoothedValue);
	}
	return result;
}
