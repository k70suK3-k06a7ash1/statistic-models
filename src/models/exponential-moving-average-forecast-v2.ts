export function exponentialMovingAverageForecast(
	data: number[],
	smoothingFactor: number,
	forecastHorizon: number,
): number[] {
	if (!Array.isArray(data) || data.length === 0) {
		throw new Error("データが空です");
	}
	if (smoothingFactor <= 0 || smoothingFactor > 1 || forecastHorizon <= 0) {
		throw new Error(
			"平滑化係数は0より大きく1以下、予測期間は正の整数である必要があります",
		);
	}

	// 初期値をデータの最初の値に設定
	let ema = data[0];

	// 指数移動平均を計算
	for (let i = 1; i < data.length; i++) {
		ema = smoothingFactor * data[i] + (1 - smoothingFactor) * ema;
	}

	// 予測値のリストを作成
	return Array(forecastHorizon).fill(ema);
}
