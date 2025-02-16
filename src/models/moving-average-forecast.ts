/**
 * 移動平均を使用して将来を予測する
 * @param data 時系列データ (数値の配列)
 * @param windowSize 移動平均のウィンドウサイズ
 * @param forecastHorizon 予測期間 (未来の時点数)
 * @returns 予測値の配列
 */
export function movingAverageForecast(
	data: number[],
	windowSize: number,
	forecastHorizon: number,
): number[] {
	if (data.length < windowSize) {
		throw new Error("データ長がウィンドウサイズより小さい");
	}

	// 直近のウィンドウの平均値を計算
	const lastWindow = data.slice(data.length - windowSize);
	const lastWindowAverage =
		lastWindow.reduce((sum, val) => sum + val, 0) / windowSize;

	// 予測値のリストを作成
	const forecast: number[] = Array(forecastHorizon).fill(lastWindowAverage);
	return forecast;
}
