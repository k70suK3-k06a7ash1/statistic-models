var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
// V2
export function doubleExponentialSmoothingAdditive(data, alpha, beta) {
    if (alpha <= 0 || alpha > 1 || beta <= 0 || beta > 1) {
        throw new Error("Alpha and Beta must be between 0 and 1.");
    }
    if (data.length < 2) {
        throw new Error("Data must contain at least two data points for initialization.");
    }
    var initialTrend = (data[1] - data[0]) / 1;
    var initialState = {
        level: data[0],
        trend: initialTrend,
        smoothedData: data[0],
    };
    var result = data.slice(1).reduce(function (acc, point) {
        var lastLevel = acc.level[acc.level.length - 1];
        var lastTrend = acc.trend[acc.trend.length - 1];
        var currentLevel = alpha * point + (1 - alpha) * (lastLevel + lastTrend);
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
    });
    var forecast = function (steps) {
        var lastLevel = result.level[result.level.length - 1];
        var lastTrend = result.trend[result.trend.length - 1];
        return Array.from({ length: steps }, function (_, i) { return lastLevel + (i + 1) * lastTrend; });
    };
    return __assign(__assign({}, result), { forecast: forecast });
}
