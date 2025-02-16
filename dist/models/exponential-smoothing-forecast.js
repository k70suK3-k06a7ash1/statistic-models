/**
 * 指数平滑法を使用して将来を予測する (シンプルなバージョン)
 * @param data 時系列データ (数値の配列)
 * @param forecastHorizon 予測期間 (未来の時点数)
 * @param smoothingLevel 平滑化係数 (0 < alpha < 1)
 * @returns 予測値の配列
 */
export function exponentialSmoothingForecast(data, forecastHorizon, smoothingLevel) {
    if (smoothingLevel === void 0) { smoothingLevel = 0.2; }
    if (smoothingLevel <= 0 || smoothingLevel >= 1) {
        throw new Error("平滑化係数は 0 より大きく 1 より小さい必要があります。");
    }
    var lastLevel = data[0]; //初期値
    if (data.length > 1) {
        lastLevel = data
            .slice(0)
            .reduce(function (prevLevel, currentVal) {
            return smoothingLevel * currentVal + (1 - smoothingLevel) * prevLevel;
        }, 0);
    }
    var forecast = [];
    var currentForecast = lastLevel;
    for (var i = 0; i < forecastHorizon; i++) {
        forecast.push(currentForecast);
        currentForecast =
            smoothingLevel * currentForecast + (1 - smoothingLevel) * currentForecast; // 同じ値を予測
    }
    return forecast;
}
