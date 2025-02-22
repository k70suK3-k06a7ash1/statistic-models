export class TripleExponentialSmoothing {
	alpha: number; // レベル平滑化定数 (0 < alpha < 1)
	beta: number; // トレンド平滑化定数 (0 < beta < 1)
	gamma: number; // 季節性平滑化定数 (0 < gamma < 1)
	period: number; // 季節性周期
	level: number; // レベル成分
	trend: number; // トレンド成分
	seasonal: number[]; // 季節性成分
	history: number[]; // 過去データ

	/**
	 * Represents a triple exponential smoothing model.
	 *
	 * Usage:
	 * ```typescript
	 * const alpha = 0.5;
	 * const beta = 0.3;
	 * const gamma = 0.2;
	 * const period = 4;
	 * const data = [10, 20, 15, 25, 12, 22, 18, 28, 14, 24, 19, 29];
	 *
	 * const model = new TripleExponentialSmoothing(alpha, beta, gamma, period);
	 * model.initialize(data);
	 *
	 * const predictions = model.forecast(4);
	 * console.log(predictions);
	 *
	 * model.update(30);
	 *
	 * model.train([35, 40, 38, 45]);
	 * ```
	 */
	constructor(alpha: number, beta: number, gamma: number, period: number) {
		this.alpha = alpha;
		this.beta = beta;
		this.gamma = gamma;
		this.period = period;
		this.level = 0; // 初期値は後で設定
		this.trend = 0; // 初期値は後で設定
		this.seasonal = new Array(period).fill(0); // 初期値は後で設定
		this.history = [];
	}

	/**
	 * Initializes the model with the given data.
	 * @param data The data to initialize the model with.
	 */
	initialize(data: number[]): void {
		this.history = [...data];
		let initialLevel = 0;
		for (let i = 0; i < this.period; i++) {
			initialLevel += data[i];
		}
		initialLevel /= this.period;

		this.level = initialLevel;

		let initialTrend = 0;
		for (let i = 0; i < this.period; i++) {
			initialTrend += data[this.period + i] - data[i];
		}
		initialTrend /= this.period * this.period;

		this.trend = initialTrend;

		for (let i = 0; i < this.period; i++) {
			this.seasonal[i] = data[i] - initialLevel;
		}
	}

	/**
	 * Forecasts future values.
	 * @param steps The number of steps to forecast.
	 * @returns The forecasted values.
	 */
	forecast(steps: number): number[] {
		const forecastValues: number[] = [];
		const currentLevel = this.level;
		const currentTrend = this.trend;

		for (let i = 0; i < steps; i++) {
			const seasonalIndex = i % this.period;
			const forecastValue =
				currentLevel + (i + 1) * currentTrend + this.seasonal[seasonalIndex];
			forecastValues.push(forecastValue);
		}
		return forecastValues;
	}

	/**
	 * Trains the model with new data.
	 * @param newData The new data to train the model with.
	 */
	train(newData: number[]): void {
		// biome-ignore lint/complexity/noForEach: <explanation>
		newData.forEach((value) => {
			this.history.push(value);
			this.update(value);
		});
	}

	/**
	 * Updates the model with a single new value.
	 * @param newValue The new value to update the model with.
	 */
	update(newValue: number): void {
		const seasonalIndex = this.history.length % this.period;
		const lastLevel = this.level;
		const lastTrend = this.trend;

		// レベルの更新
		this.level =
			this.alpha * (newValue - this.seasonal[seasonalIndex]) +
			(1 - this.alpha) * (lastLevel + lastTrend);

		// トレンドの更新
		this.trend =
			this.beta * (this.level - lastLevel) + (1 - this.beta) * lastTrend;

		// 季節性の更新
		this.seasonal[seasonalIndex] =
			this.gamma * (newValue - this.level) +
			(1 - this.gamma) * this.seasonal[seasonalIndex];
	}

	/**
	 * Logs the current state of the model (for debugging).
	 */
	logState(): void {
		console.log("Level:", this.level);
		console.log("Trend:", this.trend);
		console.log("Seasonal:", this.seasonal);
	}
}
