import { describe, it, expect } from "vitest";
import { TripleExponentialSmoothing } from "./triple-exponential-smoothing";
describe("TripleExponentialSmoothing", function () {
    var alpha = 0.2;
    var beta = 0.1;
    var gamma = 0.3;
    var period = 12;
    var initialData = [
        493, 442, 543, 583, 663, 722, 793, 723, 643, 583, 493, 452, 503, 452, 553,
        593, 673, 732, 803, 733, 653, 593, 503, 462,
    ];
    it("should create a TripleExponentialSmoothing instance", function () {
        var holtWinters = new TripleExponentialSmoothing(alpha, beta, gamma, period);
        expect(holtWinters).toBeInstanceOf(TripleExponentialSmoothing);
        expect(holtWinters.alpha).toBe(alpha);
        expect(holtWinters.beta).toBe(beta);
        expect(holtWinters.gamma).toBe(gamma);
        expect(holtWinters.period).toBe(period);
    });
    it("should initialize the model", function () {
        var holtWinters = new TripleExponentialSmoothing(alpha, beta, gamma, period);
        var trainingData = initialData.slice(0, 2 * period); // 2年分のデータ
        holtWinters.initialize(trainingData);
        expect(holtWinters.level).toBeDefined();
        expect(holtWinters.trend).toBeDefined();
        expect(holtWinters.seasonal.length).toBe(period);
    });
    it("should forecast future values", function () {
        var holtWinters = new TripleExponentialSmoothing(alpha, beta, gamma, period);
        var trainingData = initialData.slice(0, 2 * period); // 2年分のデータ
        holtWinters.initialize(trainingData);
        var forecast = holtWinters.forecast(3);
        expect(forecast).toBeInstanceOf(Array);
        expect(forecast.length).toBe(3);
        // biome-ignore lint/complexity/noForEach: <explanation>
        forecast.forEach(function (value) { return expect(typeof value).toBe("number"); });
    });
    it("should train the model with new data", function () {
        var holtWinters = new TripleExponentialSmoothing(alpha, beta, gamma, period);
        var trainingData = initialData.slice(0, 2 * period); // 2年分のデータ
        holtWinters.initialize(trainingData);
        var newData = [472, 563, 603];
        var initialLevel = holtWinters.level;
        holtWinters.train(newData);
        expect(holtWinters.level).not.toBe(initialLevel); // レベルが更新されているか確認
        expect(holtWinters.history.length).toBe(trainingData.length + newData.length);
    });
    it("should update the model with a single new value", function () {
        var holtWinters = new TripleExponentialSmoothing(alpha, beta, gamma, period);
        var trainingData = initialData.slice(0, 2 * period); // 2年分のデータ
        holtWinters.initialize(trainingData);
        var newValue = 472;
        var initialLevel = holtWinters.level;
        holtWinters.update(newValue);
        expect(holtWinters.level).not.toBe(initialLevel); // レベルが更新されているか確認
    });
    it("should correctly calculate initial level", function () {
        var holtWinters = new TripleExponentialSmoothing(alpha, beta, gamma, period);
        var trainingData = initialData.slice(0, 2 * period);
        holtWinters.initialize(trainingData);
        var expectedInitialLevel = 0;
        for (var i = 0; i < period; i++) {
            expectedInitialLevel += trainingData[i];
        }
        expectedInitialLevel /= period;
        expect(holtWinters.level).toBeCloseTo(expectedInitialLevel);
    });
    it("should correctly calculate initial trend", function () {
        var holtWinters = new TripleExponentialSmoothing(alpha, beta, gamma, period);
        var trainingData = initialData.slice(0, 2 * period);
        holtWinters.initialize(trainingData);
        var expectedInitialTrend = 0;
        for (var i = 0; i < period; i++) {
            expectedInitialTrend += trainingData[period + i] - trainingData[i];
        }
        expectedInitialTrend /= period * period;
        expect(holtWinters.trend).toBeCloseTo(expectedInitialTrend);
    });
    it("should correctly calculate initial seasonal components", function () {
        var holtWinters = new TripleExponentialSmoothing(alpha, beta, gamma, period);
        var trainingData = initialData.slice(0, 2 * period);
        holtWinters.initialize(trainingData);
        var expectedInitialLevel = 0;
        for (var i = 0; i < period; i++) {
            expectedInitialLevel += trainingData[i];
        }
        expectedInitialLevel /= period;
        for (var i = 0; i < period; i++) {
            expect(holtWinters.seasonal[i]).toBeCloseTo(trainingData[i] - expectedInitialLevel);
        }
    });
});
