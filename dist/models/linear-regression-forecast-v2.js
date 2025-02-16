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
