import { describe, it, expect } from "vitest";
import { VectorAutoregression } from "./vector-autoregression";
import { Matrix } from "../helpers/Matrix";
describe("VectorAutoregression", function () {
    var data = [
        [1.0, 2.0],
        [1.5, 2.5],
        [1.3, 2.7],
        [1.8, 3.1],
        [2.0, 3.0],
        [2.2, 3.4],
        [2.5, 3.7],
        [2.3, 3.5],
        [2.8, 4.0],
        [3.0, 4.2],
    ];
    var p = 2;
    var k = 2;
    it("should create a VectorAutoregression instance", function () {
        var varModel = new VectorAutoregression(p, k);
        expect(varModel).toBeInstanceOf(VectorAutoregression);
        expect(varModel.p).toBe(p);
        expect(varModel.k).toBe(k);
    });
    it("should prepare data correctly", function () {
        var varModel = new VectorAutoregression(p, k);
        var _a = varModel.prepareData(data), Y = _a.Y, X = _a.X;
        expect(Y).toBeInstanceOf(Matrix);
        expect(X).toBeInstanceOf(Matrix);
        expect(Y.rows).toBe(data.length - p);
        expect(X.rows).toBe(data.length - p);
        expect(Y.cols).toBe(k);
        expect(X.cols).toBe(p * k);
    });
    it("should throw an error when data is insufficient for prepareData", function () {
        var varModel = new VectorAutoregression(p, k);
        var insufficientData = [
            [1, 2],
            [3, 4],
        ]; // p = 2 なのでデータが足りない
        expect(function () { return varModel.prepareData(insufficientData); }).toThrowError("データが少なすぎます。ラグ数以上のデータが必要です。");
    });
    it("should fit the model", function () {
        var varModel = new VectorAutoregression(p, k);
        varModel.fit(data);
        expect(varModel.coefficients.length).toBe(p);
        // biome-ignore lint/complexity/noForEach: <explanation>
        varModel.coefficients.forEach(function (coeff) {
            expect(coeff).toBeInstanceOf(Matrix);
            expect(coeff.rows).toBe(k);
            expect(coeff.cols).toBe(k);
        });
    });
    it("should predict future values", function () {
        var varModel = new VectorAutoregression(p, k);
        varModel.fit(data);
        var steps = 3;
        var forecast = varModel.predict(data, steps);
        expect(forecast).toBeInstanceOf(Array);
        expect(forecast.length).toBe(steps);
        // biome-ignore lint/complexity/noForEach: <explanation>
        forecast.forEach(function (prediction) {
            expect(prediction).toBeInstanceOf(Array);
            expect(prediction.length).toBe(k);
            // biome-ignore lint/complexity/noForEach: <explanation>
            prediction.forEach(function (value) { return expect(typeof value).toBe("number"); });
        });
    });
    it("should predictNext correctly", function () {
        var varModel = new VectorAutoregression(p, k);
        varModel.fit(data);
        var lastData = data.slice(data.length - p);
        // @ts-ignore  (private メソッドにアクセスするため)
        var prediction = varModel.predictNext(lastData);
        expect(prediction).toBeInstanceOf(Array);
        expect(prediction.length).toBe(k);
        // biome-ignore lint/complexity/noForEach: <explanation>
        prediction.forEach(function (value) { return expect(typeof value).toBe("number"); });
    });
});
