import { Matrix } from "../helpers/Matrix";

/**
 * Represents a vector autoregression model.
 *
 * Usage:
 * ```typescript
 * const data = [
 *   [1.0, 2.0],
 *   [1.5, 2.5],
 *   [1.3, 2.7],
 *   [1.8, 3.1],
 *   [2.0, 3.0],
 *   [2.2, 3.4],
 *   [2.5, 3.7],
 *   [2.3, 3.5],
 *   [2.8, 4.0],
 *   [3.0, 4.2],
 * ];
 * const p = 2;
 * const k = 2;
 *
 * const varModel = new VectorAutoregression(p, k);
 * varModel.fit(data);
 * const steps = 3;
 * const forecast = varModel.predict(data, steps);
 * console.log(forecast);
 * ```
 */
export class VectorAutoregression {
	p: number; // ラグ数 (過去のデータのいくつを使用するか)
	k: number; // 変数の数 (時系列の数)
	coefficients: Matrix[]; // 係数 (A1, A2, ..., Ap)

	constructor(p: number, k: number) {
		this.p = p;
		this.k = k;
		this.coefficients = [];
		for (let i = 0; i < p; i++) {
			this.coefficients.push(new Matrix(k, k)); // 各係数行列を初期化
		}
	}

	/**
	 * Prepares the data for training the VAR model.
	 * @param data The input data.
	 * @returns The prepared data.
	 */
	prepareData(data: number[][]): { Y: Matrix; X: Matrix } {
		const T = data.length; // 時間点の数

		if (T <= this.p) {
			throw new Error("データが少なすぎます。ラグ数以上のデータが必要です。");
		}

		const Y_data: number[][] = [];
		const X_data: number[][] = [];

		// Yデータの作成 (予測したい値)
		for (let t = this.p; t < T; t++) {
			Y_data.push(data[t]);
		}

		// Xデータの作成 (予測に使う過去の値)
		for (let t = this.p; t < T; t++) {
			const row: number[] = [];
			for (let i = 1; i <= this.p; i++) {
				// 過去の値を順番に追加
				// biome-ignore lint/complexity/noForEach: <explanation>
				data[t - i].forEach((val) => row.push(val));
			}
			X_data.push(row);
		}

		const Y = new Matrix(Y_data.length, this.k, Y_data); // Yを行列に変換
		const X = new Matrix(X_data.length, this.p * this.k, X_data); // Xを行列に変換

		return { Y, X };
	}

	/**
	 * Fits the model to the given data.
	 * @param data The input data.
	 */
	fit(data: number[][]): void {
		const { Y, X } = this.prepareData(data);

		// OLS (最小二乗法) で係数を推定
		//  (X'X)^-1 * X'Y
		const Xt = X.transpose();
		const A = Xt.multiply(X);
		const B = A.inverse();
		const C = B.multiply(Xt);
		const coefficientsMatrix = C.multiply(Y);

		// 推定された係数を格納
		for (let i = 0; i < this.p; i++) {
			const startCol = i * this.k;
			const endCol = (i + 1) * this.k;

			const Ai_data: number[][] = [];
			for (let row = 0; row < this.k; row++) {
				const rowData: number[] = [];
				for (let col = startCol; col < endCol; col++) {
					rowData.push(coefficientsMatrix.get(row, col));
				}
				Ai_data.push(rowData);
			}
			this.coefficients[i] = new Matrix(this.k, this.k, Ai_data);
		}
	}

	/**
	 * Predicts future values.
	 * @param data The input data.
	 * @param steps The number of steps to predict.
	 * @returns The predicted values.
	 */
	predict(data: number[][], steps: number): number[][] {
		const T = data.length;
		const predictedValues: number[][] = [];

		// 最新の p 個のデータを使って予測
		let lastData = data.slice(T - this.p);

		for (let step = 0; step < steps; step++) {
			const prediction = this.predictNext(lastData);
			predictedValues.push(prediction);
			lastData = lastData.slice(1).concat([prediction]); // 最新の予測値をデータに追加
		}

		return predictedValues;
	}

	/**
	 * Predicts the next value (internal function).
	 * @param lastData The last p data points.
	 * @returns The predicted value.
	 */
	private predictNext(lastData: number[][]): number[] {
		if (lastData.length !== this.p) {
			throw new Error("予測に必要な過去データが不足しています。");
		}

		const prediction = new Array(this.k).fill(0); // 予測値を初期化

		for (let i = 0; i < this.p; i++) {
			const Ai = this.coefficients[i];
			const lagData = lastData[this.p - 1 - i]; // 過去のデータ

			for (let row = 0; row < this.k; row++) {
				for (let col = 0; col < this.k; col++) {
					prediction[row] += Ai.get(row, col) * lagData[col];
				}
			}
		}

		return prediction;
	}

	/**
	 * Logs the current state of the model (for debugging).
	 */
	logState(): void {
		console.log("ラグ数 (p):", this.p);
		console.log("変数の数 (k):", this.k);
		console.log("係数:");
		this.coefficients.forEach((coeff, i) => {
			console.log(`A${i + 1}:`);
			coeff.print();
		});
	}
}
