export function doubleExponentialSmoothingAdditive(data, alpha, beta) {
    if (alpha <= 0 || alpha > 1 || beta <= 0 || beta > 1) {
        throw new Error("Alpha and Beta must be between 0 and 1.");
    }
    var level = [data[0]];
    var trend = [data[1] - data[0]];
    var smoothedData = [data[0]];
    for (var i = 1; i < data.length; i++) {
        var currentLevel = alpha * data[i] + (1 - alpha) * (level[i - 1] + trend[i - 1]);
        var currentTrend = beta * (currentLevel - level[i - 1]) + (1 - beta) * trend[i - 1];
        level.push(currentLevel);
        trend.push(currentTrend);
        smoothedData.push(currentLevel + currentTrend); // 予測値ではない。平滑化された値
    }
    var forecast = function (steps) {
        var forecastValues = [];
        var lastLevel = level[level.length - 1];
        var lastTrend = trend[trend.length - 1];
        for (var i = 1; i <= steps; i++) {
            var forecastValue = lastLevel + i * lastTrend;
            forecastValues.push(forecastValue);
        }
        return forecastValues;
    };
    return { level: level, trend: trend, smoothedData: smoothedData, forecast: forecast };
}
