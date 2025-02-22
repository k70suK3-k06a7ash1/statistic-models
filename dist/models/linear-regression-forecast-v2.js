var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
import { Matrix } from "../helpers/Matrix";
export function linearRegressionForecast(data, forecastHorizon, lag) {
    if (lag === void 0) { lag = 1; }
    if (data.length <= lag) {
        throw new Error("データ長がラグより大きい必要があります。");
    }
    /**
     * Predicts future values based on linear regression.
     *
     * @param {number[]} data - The input data array.
     * @param {number} forecastHorizon - The number of periods to forecast.
     * @param {number} lag - The number of lagged values to use as predictors.
     * @returns {number[]} - An array containing the forecasted values.
     *
     * Usage:
     * ```typescript
     * const data = [10, 12, 15, 13, 18, 20, 22, 25];
     * const forecastHorizon = 3;
     * const lag = 2;
     *
     * const forecast = linearRegressionForecast(data, forecastHorizon, lag);
     *
     * console.log(forecast); // [ 27.316199962413137, 30.328439375339528, 33.16705128188415 ]
     * ```
     */
    var X = data.slice(0, -lag).map(function (_, i) { return __spreadArray([1], data.slice(i, i + lag), true); });
    var y = data.slice(lag);
    var XMatrix = new Matrix(X.length, lag + 1, X);
    var yMatrix = new Matrix(y.length, 1, y.map(function (v) { return [v]; }));
    var XT = XMatrix.transpose();
    var XTX = XT.multiply(XMatrix);
    var XTX_inv = XTX.inverse();
    var XTy = XT.multiply(yMatrix);
    var beta = XTX_inv.multiply(XTy);
    var forecast = [];
    var lastWindow = data.slice(-lag);
    for (var i = 0; i < forecastHorizon; i++) {
        var inputData = __spreadArray([1], lastWindow, true);
        var predictedValue = inputData.reduce(function (sum, val, idx) { return sum + val * beta.get(idx, 0); }, 0);
        forecast.push(predictedValue);
        lastWindow = __spreadArray(__spreadArray([], lastWindow.slice(1), true), [predictedValue], false);
    }
    return forecast;
}
