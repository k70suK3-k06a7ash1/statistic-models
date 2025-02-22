import { Matrix } from "../helpers/Matrix";
/**
 * Represents a vector autoregression model.
 *
 * Usage:
 * ```typescript
 * const data = [
 *   [1.0, 2.0],
 *   [1.5, 2.5],
 *   [1.3, 2.7],
 *   [1.8, 3.1],
 *   [2.0, 3.0],
 *   [2.2, 3.4],
 *   [2.5, 3.7],
 *   [2.3, 3.5],
 *   [2.8, 4.0],
 *   [3.0, 4.2],
 * ];
 * const p = 2;
 * const k = 2;
 *
 * const varModel = new VectorAutoregression(p, k);
 * varModel.fit(data);
 * const steps = 3;
 * const forecast = varModel.predict(data, steps);
 * console.log(forecast);
 * ```
 */
var VectorAutoregression = /** @class */ (function () {
    function VectorAutoregression(p, k) {
        this.p = p;
        this.k = k;
        this.coefficients = [];
        for (var i = 0; i < p; i++) {
            this.coefficients.push(new Matrix(k, k)); // 各係数行列を初期化
        }
    }
    /**
     * Prepares the data for training the VAR model.
     * @param data The input data.
     * @returns The prepared data.
     */
    VectorAutoregression.prototype.prepareData = function (data) {
        var T = data.length; // 時間点の数
        if (T <= this.p) {
            throw new Error("データが少なすぎます。ラグ数以上のデータが必要です。");
        }
        var Y_data = [];
        var X_data = [];
        // Yデータの作成 (予測したい値)
        for (var t = this.p; t < T; t++) {
            Y_data.push(data[t]);
        }
        var _loop_1 = function (t) {
            var row = [];
            for (var i = 1; i <= this_1.p; i++) {
                // 過去の値を順番に追加
                // biome-ignore lint/complexity/noForEach: <explanation>
                data[t - i].forEach(function (val) { return row.push(val); });
            }
            X_data.push(row);
        };
        var this_1 = this;
        // Xデータの作成 (予測に使う過去の値)
        for (var t = this.p; t < T; t++) {
            _loop_1(t);
        }
        var Y = new Matrix(Y_data.length, this.k, Y_data); // Yを行列に変換
        var X = new Matrix(X_data.length, this.p * this.k, X_data); // Xを行列に変換
        return { Y: Y, X: X };
    };
    /**
     * Fits the model to the given data.
     * @param data The input data.
     */
    VectorAutoregression.prototype.fit = function (data) {
        var _a = this.prepareData(data), Y = _a.Y, X = _a.X;
        // OLS (最小二乗法) で係数を推定
        //  (X'X)^-1 * X'Y
        var Xt = X.transpose();
        var A = Xt.multiply(X);
        var B = A.inverse();
        var C = B.multiply(Xt);
        var coefficientsMatrix = C.multiply(Y);
        // 推定された係数を格納
        for (var i = 0; i < this.p; i++) {
            var startCol = i * this.k;
            var endCol = (i + 1) * this.k;
            var Ai_data = [];
            for (var row = 0; row < this.k; row++) {
                var rowData = [];
                for (var col = startCol; col < endCol; col++) {
                    rowData.push(coefficientsMatrix.get(row, col));
                }
                Ai_data.push(rowData);
            }
            this.coefficients[i] = new Matrix(this.k, this.k, Ai_data);
        }
    };
    /**
     * Predicts future values.
     * @param data The input data.
     * @param steps The number of steps to predict.
     * @returns The predicted values.
     */
    VectorAutoregression.prototype.predict = function (data, steps) {
        var T = data.length;
        var predictedValues = [];
        // 最新の p 個のデータを使って予測
        var lastData = data.slice(T - this.p);
        for (var step = 0; step < steps; step++) {
            var prediction = this.predictNext(lastData);
            predictedValues.push(prediction);
            lastData = lastData.slice(1).concat([prediction]); // 最新の予測値をデータに追加
        }
        return predictedValues;
    };
    /**
     * Predicts the next value (internal function).
     * @param lastData The last p data points.
     * @returns The predicted value.
     */
    VectorAutoregression.prototype.predictNext = function (lastData) {
        if (lastData.length !== this.p) {
            throw new Error("予測に必要な過去データが不足しています。");
        }
        var prediction = new Array(this.k).fill(0); // 予測値を初期化
        for (var i = 0; i < this.p; i++) {
            var Ai = this.coefficients[i];
            var lagData = lastData[this.p - 1 - i]; // 過去のデータ
            for (var row = 0; row < this.k; row++) {
                for (var col = 0; col < this.k; col++) {
                    prediction[row] += Ai.get(row, col) * lagData[col];
                }
            }
        }
        return prediction;
    };
    /**
     * Logs the current state of the model (for debugging).
     */
    VectorAutoregression.prototype.logState = function () {
        console.log("ラグ数 (p):", this.p);
        console.log("変数の数 (k):", this.k);
        console.log("係数:");
        this.coefficients.forEach(function (coeff, i) {
            console.log("A".concat(i + 1, ":"));
            coeff.print();
        });
    };
    return VectorAutoregression;
}());
export { VectorAutoregression };
