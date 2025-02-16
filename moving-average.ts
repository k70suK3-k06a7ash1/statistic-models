export function movingAverage(data: number[], windowSize: number): number[] {
	if (windowSize > data.length || windowSize <= 0) {
		return [];
	}

	return Array.from({ length: data.length - windowSize + 1 }, (_, i) => {
		const window = data.slice(i, i + windowSize);
		const sum = window.reduce((acc, val) => acc + val, 0);
		return sum / windowSize;
	});
}
