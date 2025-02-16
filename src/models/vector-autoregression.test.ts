import { describe, it, expect } from "vitest";
import { VectorAutoregression } from "./vector-autoregression";
import { Matrix } from "../helpers/Matrix";

describe("VectorAutoregression", () => {
	const data = [
		[1.0, 2.0],
		[1.5, 2.5],
		[1.3, 2.7],
		[1.8, 3.1],
		[2.0, 3.0],
		[2.2, 3.4],
		[2.5, 3.7],
		[2.3, 3.5],
		[2.8, 4.0],
		[3.0, 4.2],
	];
	const p = 2;
	const k = 2;

	it("should create a VectorAutoregression instance", () => {
		const varModel = new VectorAutoregression(p, k);
		expect(varModel).toBeInstanceOf(VectorAutoregression);
		expect(varModel.p).toBe(p);
		expect(varModel.k).toBe(k);
	});

	it("should prepare data correctly", () => {
		const varModel = new VectorAutoregression(p, k);
		const { Y, X } = varModel.prepareData(data);

		expect(Y).toBeInstanceOf(Matrix);
		expect(X).toBeInstanceOf(Matrix);
		expect(Y.rows).toBe(data.length - p);
		expect(X.rows).toBe(data.length - p);
		expect(Y.cols).toBe(k);
		expect(X.cols).toBe(p * k);
	});

	it("should throw an error when data is insufficient for prepareData", () => {
		const varModel = new VectorAutoregression(p, k);
		const insufficientData = [
			[1, 2],
			[3, 4],
		]; // p = 2 なのでデータが足りない
		expect(() => varModel.prepareData(insufficientData)).toThrowError(
			"データが少なすぎます。ラグ数以上のデータが必要です。",
		);
	});

	it("should fit the model", () => {
		const varModel = new VectorAutoregression(p, k);
		varModel.fit(data);
		expect(varModel.coefficients.length).toBe(p);
		// biome-ignore lint/complexity/noForEach: <explanation>
		varModel.coefficients.forEach((coeff) => {
			expect(coeff).toBeInstanceOf(Matrix);
			expect(coeff.rows).toBe(k);
			expect(coeff.cols).toBe(k);
		});
	});

	it("should predict future values", () => {
		const varModel = new VectorAutoregression(p, k);
		varModel.fit(data);
		const steps = 3;
		const forecast = varModel.predict(data, steps);
		expect(forecast).toBeInstanceOf(Array);
		expect(forecast.length).toBe(steps);
		// biome-ignore lint/complexity/noForEach: <explanation>
		forecast.forEach((prediction) => {
			expect(prediction).toBeInstanceOf(Array);
			expect(prediction.length).toBe(k);
			// biome-ignore lint/complexity/noForEach: <explanation>
			prediction.forEach((value) => expect(typeof value).toBe("number"));
		});
	});

	it("should predictNext correctly", () => {
		const varModel = new VectorAutoregression(p, k);
		varModel.fit(data);
		const lastData = data.slice(data.length - p);
		// @ts-ignore  (private メソッドにアクセスするため)
		const prediction = varModel.predictNext(lastData);
		expect(prediction).toBeInstanceOf(Array);
		expect(prediction.length).toBe(k);
		// biome-ignore lint/complexity/noForEach: <explanation>
		prediction.forEach((value) => expect(typeof value).toBe("number"));
	});
});
