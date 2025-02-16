import { describe, it, expect } from "vitest";
import { TripleExponentialSmoothing } from "./triple-exponential-smoothing";

describe("TripleExponentialSmoothing", () => {
	const alpha = 0.2;
	const beta = 0.1;
	const gamma = 0.3;
	const period = 12;
	const initialData = [
		493, 442, 543, 583, 663, 722, 793, 723, 643, 583, 493, 452, 503, 452, 553,
		593, 673, 732, 803, 733, 653, 593, 503, 462,
	];

	it("should create a TripleExponentialSmoothing instance", () => {
		const holtWinters = new TripleExponentialSmoothing(
			alpha,
			beta,
			gamma,
			period,
		);
		expect(holtWinters).toBeInstanceOf(TripleExponentialSmoothing);
		expect(holtWinters.alpha).toBe(alpha);
		expect(holtWinters.beta).toBe(beta);
		expect(holtWinters.gamma).toBe(gamma);
		expect(holtWinters.period).toBe(period);
	});

	it("should initialize the model", () => {
		const holtWinters = new TripleExponentialSmoothing(
			alpha,
			beta,
			gamma,
			period,
		);
		const trainingData = initialData.slice(0, 2 * period); // 2年分のデータ
		holtWinters.initialize(trainingData);

		expect(holtWinters.level).toBeDefined();
		expect(holtWinters.trend).toBeDefined();
		expect(holtWinters.seasonal.length).toBe(period);
	});

	it("should forecast future values", () => {
		const holtWinters = new TripleExponentialSmoothing(
			alpha,
			beta,
			gamma,
			period,
		);
		const trainingData = initialData.slice(0, 2 * period); // 2年分のデータ
		holtWinters.initialize(trainingData);

		const forecast = holtWinters.forecast(3);
		expect(forecast).toBeInstanceOf(Array);
		expect(forecast.length).toBe(3);
		// biome-ignore lint/complexity/noForEach: <explanation>
		forecast.forEach((value) => expect(typeof value).toBe("number"));
	});

	it("should train the model with new data", () => {
		const holtWinters = new TripleExponentialSmoothing(
			alpha,
			beta,
			gamma,
			period,
		);
		const trainingData = initialData.slice(0, 2 * period); // 2年分のデータ
		holtWinters.initialize(trainingData);

		const newData = [472, 563, 603];
		const initialLevel = holtWinters.level;
		holtWinters.train(newData);

		expect(holtWinters.level).not.toBe(initialLevel); // レベルが更新されているか確認
		expect(holtWinters.history.length).toBe(
			trainingData.length + newData.length,
		);
	});

	it("should update the model with a single new value", () => {
		const holtWinters = new TripleExponentialSmoothing(
			alpha,
			beta,
			gamma,
			period,
		);
		const trainingData = initialData.slice(0, 2 * period); // 2年分のデータ
		holtWinters.initialize(trainingData);

		const newValue = 472;
		const initialLevel = holtWinters.level;
		holtWinters.update(newValue);

		expect(holtWinters.level).not.toBe(initialLevel); // レベルが更新されているか確認
	});

	it("should correctly calculate initial level", () => {
		const holtWinters = new TripleExponentialSmoothing(
			alpha,
			beta,
			gamma,
			period,
		);
		const trainingData = initialData.slice(0, 2 * period);
		holtWinters.initialize(trainingData);
		let expectedInitialLevel = 0;
		for (let i = 0; i < period; i++) {
			expectedInitialLevel += trainingData[i];
		}
		expectedInitialLevel /= period;

		expect(holtWinters.level).toBeCloseTo(expectedInitialLevel);
	});

	it("should correctly calculate initial trend", () => {
		const holtWinters = new TripleExponentialSmoothing(
			alpha,
			beta,
			gamma,
			period,
		);
		const trainingData = initialData.slice(0, 2 * period);
		holtWinters.initialize(trainingData);
		let expectedInitialTrend = 0;
		for (let i = 0; i < period; i++) {
			expectedInitialTrend += trainingData[period + i] - trainingData[i];
		}
		expectedInitialTrend /= period * period;

		expect(holtWinters.trend).toBeCloseTo(expectedInitialTrend);
	});

	it("should correctly calculate initial seasonal components", () => {
		const holtWinters = new TripleExponentialSmoothing(
			alpha,
			beta,
			gamma,
			period,
		);
		const trainingData = initialData.slice(0, 2 * period);
		holtWinters.initialize(trainingData);
		let expectedInitialLevel = 0;
		for (let i = 0; i < period; i++) {
			expectedInitialLevel += trainingData[i];
		}
		expectedInitialLevel /= period;

		for (let i = 0; i < period; i++) {
			expect(holtWinters.seasonal[i]).toBeCloseTo(
				trainingData[i] - expectedInitialLevel,
			);
		}
	});
});
