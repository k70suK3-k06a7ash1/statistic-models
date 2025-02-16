export function movingAverage(data: number[], windowSize: number): number[] {
	if (windowSize > data.length || windowSize <= 0) {
		return [];
	}

	const result: number[] = [];
	for (let i = 0; i <= data.length - windowSize; i++) {
		let sum = 0;
		for (let j = i; j < i + windowSize; j++) {
			sum += data[j];
		}
		result.push(sum / windowSize);
	}

	return result;
}
