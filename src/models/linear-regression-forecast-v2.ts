import { Matrix } from "../helpers/Matrix";

export function linearRegressionForecast(
	data: number[],
	forecastHorizon: number,
	lag = 1,
): number[] {
	if (data.length <= lag) {
		throw new Error("データ長がラグより大きい必要があります。");
	}

	const X = data.slice(0, -lag).map((_, i) => [1, ...data.slice(i, i + lag)]);
	const y = data.slice(lag);

	const XMatrix = new Matrix(X.length, lag + 1, X);
	const yMatrix = new Matrix(
		y.length,
		1,
		y.map((v) => [v]),
	);

	const XT = XMatrix.transpose();
	const XTX = XT.multiply(XMatrix);
	const XTX_inv = XTX.inverse();
	const XTy = XT.multiply(yMatrix);
	const beta = XTX_inv.multiply(XTy);

	const forecast: number[] = [];
	let lastWindow = data.slice(-lag);

	for (let i = 0; i < forecastHorizon; i++) {
		const inputData = [1, ...lastWindow];
		const predictedValue = inputData.reduce(
			(sum, val, idx) => sum + val * beta.get(idx, 0),
			0,
		);
		forecast.push(predictedValue);
		lastWindow = [...lastWindow.slice(1), predictedValue];
	}

	return forecast;
}
