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
    /**
     * Calculates the moving average forecast for a given data set.
     *
     * @param {number[]} data - The input data array.
     * @param {number} windowSize - The size of the moving average window.
     * @param {number} forecastHorizon - The number of periods to forecast.
     * @returns {number[]} - An array containing the forecasted values.
     *
     * Usage:
     * ```typescript
     * const data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
     * const windowSize = 3;
     * const forecastHorizon = 2;
     * const forecast = movingAverageForecast(data, windowSize, forecastHorizon);
     * console.log(forecast); // [9, 9]
     * ```
     */
    // 直近のウィンドウの平均値を計算
    var lastWindow = data.slice(-windowSize);
    var lastWindowAverage = lastWindow.reduce(function (sum, val) { return sum + val; }, 0) / windowSize;
    // 予測値のリストを作成
    return Array(forecastHorizon).fill(lastWindowAverage);
}
