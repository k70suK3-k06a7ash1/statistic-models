export function movingAverageForecast(data, windowSize, forecastHorizon) {
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
    var lastWindow = data.slice(-windowSize);
    var lastWindowAverage = lastWindow.reduce(function (sum, val) { return sum + val; }, 0) / windowSize;
    // 予測値のリストを作成
    return Array(forecastHorizon).fill(lastWindowAverage);
}
