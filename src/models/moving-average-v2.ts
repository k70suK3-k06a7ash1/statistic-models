export function movingAverage(data: number[], windowSize: number): number[] {
	if (windowSize > data.length || windowSize <= 0) {
		return [];
	}

	/**
	 * Calculates the moving average of a data set.
	 *
	 * @param {number[]} data - The input data array.
	 * @param {number} windowSize - The size of the moving average window.
	 * @returns {number[]} - An array containing the moving average values.
	 *
	 * Usage:
	 * ```typescript
	 * const data = [1, 2, 3, 4, 5];
	 * const windowSize = 3;
	 * const movingAvg = movingAverage(data, windowSize);
	 * console.log(movingAvg); // [2, 3, 4]
	 * ```
	 */
	return Array.from({ length: data.length - windowSize + 1 }, (_, i) => {
		const window = data.slice(i, i + windowSize);
		const sum = window.reduce((acc, val) => acc + val, 0);
		return sum / windowSize;
	});
}
