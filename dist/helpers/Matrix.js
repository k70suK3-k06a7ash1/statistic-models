var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var Matrix = /** @class */ (function () {
    function Matrix(rows, cols, data) {
        if (data === void 0) { data = Array.from({ length: rows }, function () {
            return Array(cols).fill(0);
        }); }
        this.rows = rows;
        this.cols = cols;
        this.data = data;
    }
    Matrix.prototype.get = function (row, col) {
        return this.data[row][col];
    };
    Matrix.prototype.set = function (row, col, value) {
        this.data[row][col] = value;
    };
    Matrix.prototype.add = function (other) {
        if (this.rows !== other.rows || this.cols !== other.cols) {
            throw new Error("Matrix dimensions must match for addition.");
        }
        return new Matrix(this.rows, this.cols, this.data.map(function (row, i) { return row.map(function (val, j) { return val + other.get(i, j); }); }));
    };
    Matrix.prototype.subtract = function (other) {
        if (this.rows !== other.rows || this.cols !== other.cols) {
            throw new Error("Matrix dimensions must match for subtraction.");
        }
        return new Matrix(this.rows, this.cols, this.data.map(function (row, i) { return row.map(function (val, j) { return val - other.get(i, j); }); }));
    };
    Matrix.prototype.multiply = function (other) {
        if (typeof other === "number") {
            return new Matrix(this.rows, this.cols, this.data.map(function (row) { return row.map(function (val) { return val * other; }); }));
        }
        if (this.cols !== other.rows) {
            throw new Error("Matrix multiplication dimension mismatch.");
        }
        var result = new Matrix(this.rows, other.cols);
        for (var i = 0; i < this.rows; i++) {
            var _loop_1 = function (j) {
                result.set(i, j, this_1.data[i].reduce(function (sum, val, k) { return sum + val * other.get(k, j); }, 0));
            };
            var this_1 = this;
            for (var j = 0; j < other.cols; j++) {
                _loop_1(j);
            }
        }
        return result;
    };
    Matrix.prototype.transpose = function () {
        var _this = this;
        return new Matrix(this.cols, this.rows, this.data[0].map(function (_, colIndex) { return _this.data.map(function (row) { return row[colIndex]; }); }));
    };
    Matrix.prototype.print = function () {
        console.log(this.data.map(function (row) { return row.join("\t"); }).join("\n"));
    };
    Matrix.identity = function (size) {
        return new Matrix(size, size, Array.from({ length: size }, function (_, i) {
            return Array.from({ length: size }, function (_, j) { return (i === j ? 1 : 0); });
        }));
    };
    Matrix.prototype.inverse = function () {
        if (this.rows !== this.cols) {
            throw new Error("Matrix must be square to calculate the inverse.");
        }
        var n = this.rows;
        var augmented = new Matrix(n, 2 * n, this.data.map(function (row, i) { return __spreadArray(__spreadArray([], row, true), Array(n)
            .fill(0)
            .map(function (_, j) { return (i === j ? 1 : 0); }), true); }));
        for (var i = 0; i < n; i++) {
            var pivot = augmented.get(i, i);
            if (pivot === 0) {
                throw new Error("Singular matrix, cannot invert.");
            }
            for (var j = 0; j < 2 * n; j++) {
                augmented.set(i, j, augmented.get(i, j) / pivot);
            }
            for (var k = 0; k < n; k++) {
                if (k !== i) {
                    var factor = augmented.get(k, i);
                    for (var j = 0; j < 2 * n; j++) {
                        augmented.set(k, j, augmented.get(k, j) - factor * augmented.get(i, j));
                    }
                }
            }
        }
        return new Matrix(n, n, augmented.data.map(function (row) { return row.slice(n); }));
    };
    return Matrix;
}());
export { Matrix };
