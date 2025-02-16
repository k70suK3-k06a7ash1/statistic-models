var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
export function doubleExponentialSmoothingAdditive(data, alpha, beta) {
    if (alpha <= 0 || alpha > 1 || beta <= 0 || beta > 1) {
        throw new Error("Alpha and Beta must be between 0 and 1.");
    }
    // 初期値を定義
    var initialState = {
        level: data[0],
        trend: data[1] - data[0],
        smoothedData: data[0],
    };
    // スムージング処理をreduceで実行
    var _a = data.slice(1).reduce(function (acc, currentValue) {
        var lastLevel = acc.level[acc.level.length - 1];
        var lastTrend = acc.trend[acc.trend.length - 1];
        var currentLevel = alpha * currentValue + (1 - alpha) * (lastLevel + lastTrend);
        var currentTrend = beta * (currentLevel - lastLevel) + (1 - beta) * lastTrend;
        return {
            level: __spreadArray(__spreadArray([], acc.level, true), [currentLevel], false),
            trend: __spreadArray(__spreadArray([], acc.trend, true), [currentTrend], false),
            smoothedData: __spreadArray(__spreadArray([], acc.smoothedData, true), [currentLevel + currentTrend], false),
        };
    }, {
        level: [initialState.level],
        trend: [initialState.trend],
        smoothedData: [initialState.smoothedData],
    }), levels = _a.level, trends = _a.trend, smoothedValues = _a.smoothedData;
    var forecast = function (steps) {
        var lastLevel = levels[levels.length - 1];
        var lastTrend = trends[trends.length - 1];
        return Array.from({ length: steps }, function (_, i) { return lastLevel + (i + 1) * lastTrend; });
    };
    return {
        level: levels,
        trend: trends,
        smoothedData: smoothedValues,
        forecast: forecast,
    };
}
