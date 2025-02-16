var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
export function exponentialSmoothing(data, alpha) {
    if (alpha <= 0 || alpha > 1) {
        throw new Error("Alpha must be between 0 and 1.");
    }
    return data.reduce(function (acc, currentValue, index) {
        var _a;
        var previousSmoothedValue = (_a = acc[index - 1]) !== null && _a !== void 0 ? _a : currentValue; // 初回は初期値
        var smoothedValue = index === 0
            ? currentValue
            : alpha * currentValue + (1 - alpha) * previousSmoothedValue;
        // biome-ignore lint/performance/noAccumulatingSpread: <explanation>
        return __spreadArray(__spreadArray([], acc, true), [smoothedValue], false);
    }, []);
}
