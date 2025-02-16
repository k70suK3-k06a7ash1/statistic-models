import { describe, it, expect } from "vitest";
import { movingAverage } from "./moving-average";
describe("movingAverage", function () {
    it("should calculate moving average correctly with valid input", function () {
        var data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
        var windowSize = 3;
        var expected = [2, 3, 4, 5, 6, 7, 8, 9];
        expect(movingAverage(data, windowSize)).toEqual(expected);
    });
    it("should calculate moving average correctly with a different window size", function () {
        var data = [1, 2, 3, 4, 5];
        var windowSize = 2;
        var expected = [1.5, 2.5, 3.5, 4.5];
        expect(movingAverage(data, windowSize)).toEqual(expected);
    });
    it("should return an empty array when window size is greater than data length", function () {
        var data = [1, 2, 3];
        var windowSize = 4;
        var expected = [];
        expect(movingAverage(data, windowSize)).toEqual(expected);
    });
    it("should return the original array when window size is 1", function () {
        var data = [1, 2, 3, 4, 5];
        var windowSize = 1;
        var expected = [1, 2, 3, 4, 5];
        expect(movingAverage(data, windowSize)).toEqual(expected);
    });
    it("should calculate the correct average when the window size equals the data length", function () {
        var data = [1, 2, 3];
        var windowSize = 3;
        var expected = [2];
        expect(movingAverage(data, windowSize)).toEqual(expected);
    });
    it("should handle empty data array correctly", function () {
        var data = [];
        var windowSize = 2;
        var expected = [];
        expect(movingAverage(data, windowSize)).toEqual(expected);
    });
});
