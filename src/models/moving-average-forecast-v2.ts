export function movingAverageForecast(
	data: number[],
	windowSize: number,
	forecastHorizon: number,
): number[] {
	if (!Array.isArray(data) || data.length === 0) {
		throw new Error("データが空です");
	}
	if (windowSize <= 0 || forecastHorizon <= 0) {
		throw new Error("ウィンドウサイズと予測期間は正の整数である必要があります");
	}
	if (data.length < windowSize) {
		throw new Error("データ長がウィンドウサイズより小さい");
	}

	// 直近のウィンドウの平均値を計算
	const lastWindow = data.slice(-windowSize);
	const lastWindowAverage =
		lastWindow.reduce((sum, val) => sum + val, 0) / windowSize;

	// 予測値のリストを作成
	return Array(forecastHorizon).fill(lastWindowAverage);
}
