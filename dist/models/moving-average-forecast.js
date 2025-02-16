/**
 * 移動平均を使用して将来を予測する
 * @param data 時系列データ (数値の配列)
 * @param windowSize 移動平均のウィンドウサイズ
 * @param forecastHorizon 予測期間 (未来の時点数)
 * @returns 予測値の配列
 */
export function movingAverageForecast(data, windowSize, forecastHorizon) {
    if (data.length < windowSize) {
        throw new Error("データ長がウィンドウサイズより小さい");
    }
    // 直近のウィンドウの平均値を計算
    var lastWindow = data.slice(data.length - windowSize);
    var lastWindowAverage = lastWindow.reduce(function (sum, val) { return sum + val; }, 0) / windowSize;
    // 予測値のリストを作成
    var forecast = Array(forecastHorizon).fill(lastWindowAverage);
    return forecast;
}
