export function exponentialSmoothing(data: number[], alpha: number): number[] {
	if (alpha <= 0 || alpha > 1) {
		throw new Error("Alpha must be between 0 and 1.");
	}

	/**
	 * Applies exponential smoothing to a data set.
	 *
	 * @param {number[]} data - The input data array.
	 * @param {number} alpha - The smoothing factor (0 < alpha <= 1).
	 * @returns {number[]} - An array containing the smoothed values.
	 *
	 * Usage:
	 * ```typescript
	 * const data = [10, 12, 15, 13];
	 * const alpha = 0.5;
	 * const smoothedData = exponentialSmoothing(data, alpha);
	 * console.log(smoothedData); // [10, 11, 13, 13]
	 * ```
	 */
	const smoothedData: number[] = [];
	for (let i = 0; i < data.length; i++) {
		const previousSmoothedValue = i === 0 ? data[i] : smoothedData[i - 1];
		const smoothedValue = alpha * data[i] + (1 - alpha) * previousSmoothedValue;
		smoothedData.push(smoothedValue);
	}

	return smoothedData;
}
