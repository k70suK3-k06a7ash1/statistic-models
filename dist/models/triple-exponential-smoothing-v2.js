var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var TripleExponentialSmoothing = /** @class */ (function () {
    /**
     * Represents a triple exponential smoothing model.
     *
     * Usage:
     * ```typescript
     * const alpha = 0.5;
     * const beta = 0.3;
     * const gamma = 0.2;
     * const period = 4;
     * const data = [10, 20, 15, 25, 12, 22, 18, 28, 14, 24, 19, 29];
     *
     * const model = new TripleExponentialSmoothing(alpha, beta, gamma, period);
     * model.initialize(data);
     *
     * const predictions = model.forecast(4);
     * console.log(predictions);
     *
     * model.update(30);
     *
     * model.train([35, 40, 38, 45]);
     * ```
     */
    function TripleExponentialSmoothing(alpha, beta, gamma, period) {
        this.alpha = alpha;
        this.beta = beta;
        this.gamma = gamma;
        this.period = period;
        this.level = 0; // 初期値は後で設定
        this.trend = 0; // 初期値は後で設定
        this.seasonal = new Array(period).fill(0); // 初期値は後で設定
        this.history = [];
    }
    /**
     * Initializes the model with the given data.
     * @param data The data to initialize the model with.
     */
    TripleExponentialSmoothing.prototype.initialize = function (data) {
        this.history = __spreadArray([], data, true);
        var initialLevel = 0;
        for (var i = 0; i < this.period; i++) {
            initialLevel += data[i];
        }
        initialLevel /= this.period;
        this.level = initialLevel;
        var initialTrend = 0;
        for (var i = 0; i < this.period; i++) {
            initialTrend += data[this.period + i] - data[i];
        }
        initialTrend /= this.period * this.period;
        this.trend = initialTrend;
        for (var i = 0; i < this.period; i++) {
            this.seasonal[i] = data[i] - initialLevel;
        }
    };
    /**
     * Forecasts future values.
     * @param steps The number of steps to forecast.
     * @returns The forecasted values.
     */
    TripleExponentialSmoothing.prototype.forecast = function (steps) {
        var forecastValues = [];
        var currentLevel = this.level;
        var currentTrend = this.trend;
        for (var i = 0; i < steps; i++) {
            var seasonalIndex = i % this.period;
            var forecastValue = currentLevel + (i + 1) * currentTrend + this.seasonal[seasonalIndex];
            forecastValues.push(forecastValue);
        }
        return forecastValues;
    };
    /**
     * Trains the model with new data.
     * @param newData The new data to train the model with.
     */
    TripleExponentialSmoothing.prototype.train = function (newData) {
        var _this = this;
        // biome-ignore lint/complexity/noForEach: <explanation>
        newData.forEach(function (value) {
            _this.history.push(value);
            _this.update(value);
        });
    };
    /**
     * Updates the model with a single new value.
     * @param newValue The new value to update the model with.
     */
    TripleExponentialSmoothing.prototype.update = function (newValue) {
        var seasonalIndex = this.history.length % this.period;
        var lastLevel = this.level;
        var lastTrend = this.trend;
        // レベルの更新
        this.level =
            this.alpha * (newValue - this.seasonal[seasonalIndex]) +
                (1 - this.alpha) * (lastLevel + lastTrend);
        // トレンドの更新
        this.trend =
            this.beta * (this.level - lastLevel) + (1 - this.beta) * lastTrend;
        // 季節性の更新
        this.seasonal[seasonalIndex] =
            this.gamma * (newValue - this.level) +
                (1 - this.gamma) * this.seasonal[seasonalIndex];
    };
    /**
     * Logs the current state of the model (for debugging).
     */
    TripleExponentialSmoothing.prototype.logState = function () {
        console.log("Level:", this.level);
        console.log("Trend:", this.trend);
        console.log("Seasonal:", this.seasonal);
    };
    return TripleExponentialSmoothing;
}());
export { TripleExponentialSmoothing };
