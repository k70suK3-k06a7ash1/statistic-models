var Matrix = /** @class */ (function () {
    function Matrix(rows, cols, data) {
        this.rows = rows;
        this.cols = cols;
        this.data =
            data ||
                Array(rows)
                    .fill(null)
                    .map(function () { return Array(cols).fill(0); });
    }
    // 行列の要素を取得
    Matrix.prototype.get = function (row, col) {
        return this.data[row][col];
    };
    // 行列の要素を設定
    Matrix.prototype.set = function (row, col, value) {
        this.data[row][col] = value;
    };
    // 行列の加算
    Matrix.prototype.add = function (other) {
        if (this.rows !== other.rows || this.cols !== other.cols) {
            throw new Error("Matrix dimensions must match for addition.");
        }
        var result = new Matrix(this.rows, this.cols);
        for (var i = 0; i < this.rows; i++) {
            for (var j = 0; j < this.cols; j++) {
                result.set(i, j, this.get(i, j) + other.get(i, j));
            }
        }
        return result;
    };
    // 行列の減算
    Matrix.prototype.subtract = function (other) {
        if (this.rows !== other.rows || this.cols !== other.cols) {
            throw new Error("Matrix dimensions must match for subtraction.");
        }
        var result = new Matrix(this.rows, this.cols);
        for (var i = 0; i < this.rows; i++) {
            for (var j = 0; j < this.cols; j++) {
                result.set(i, j, this.get(i, j) - other.get(i, j));
            }
        }
        return result;
    };
    // 行列の乗算
    Matrix.prototype.multiply = function (other) {
        if (typeof other === "number") {
            // スカラー倍
            var result_1 = new Matrix(this.rows, this.cols);
            for (var i = 0; i < this.rows; i++) {
                for (var j = 0; j < this.cols; j++) {
                    result_1.set(i, j, this.get(i, j) * other);
                }
            }
            return result_1;
        }
        // 行列同士の乗算
        if (this.cols !== other.rows) {
            throw new Error("Number of columns in the first matrix must match the number of rows in the second matrix for multiplication.");
        }
        var result = new Matrix(this.rows, other.cols);
        for (var i = 0; i < this.rows; i++) {
            for (var j = 0; j < other.cols; j++) {
                var sum = 0;
                for (var k = 0; k < this.cols; k++) {
                    sum += this.get(i, k) * other.get(k, j);
                }
                result.set(i, j, sum);
            }
        }
        return result;
    };
    // 転置行列
    Matrix.prototype.transpose = function () {
        var result = new Matrix(this.cols, this.rows);
        for (var i = 0; i < this.rows; i++) {
            for (var j = 0; j < this.cols; j++) {
                result.set(j, i, this.get(i, j));
            }
        }
        return result;
    };
    // 行列の内容をコンソールに出力 (デバッグ用)
    Matrix.prototype.print = function () {
        for (var i = 0; i < this.rows; i++) {
            console.log(this.data[i].join("\t"));
        }
    };
    Matrix.identity = function (size) {
        var identityMatrix = new Matrix(size, size);
        for (var i = 0; i < size; i++) {
            identityMatrix.set(i, i, 1);
        }
        return identityMatrix;
    };
    // 行列の反転 (ガウスの消去法、小規模行列向け)
    Matrix.prototype.inverse = function () {
        if (this.rows !== this.cols) {
            throw new Error("Matrix must be square to calculate the inverse.");
        }
        var n = this.rows;
        var augmentedMatrix = new Matrix(n, 2 * n);
        // 拡張行列を作成 (左半分は元の行列、右半分は単位行列)
        for (var i = 0; i < n; i++) {
            for (var j = 0; j < n; j++) {
                augmentedMatrix.set(i, j, this.get(i, j));
            }
            augmentedMatrix.set(i, i + n, 1); // 単位行列部分
        }
        // 前進消去
        for (var i = 0; i < n; i++) {
            // ピボットが0の場合、行を入れ替える (簡単のため省略)
            // 対角成分が0の場合は、より高度なピボット選択が必要
            // 対角成分を1にする
            var pivot = augmentedMatrix.get(i, i);
            if (pivot === 0) {
                throw new Error("Singular matrix, cannot invert.");
            }
            for (var j = 0; j < 2 * n; j++) {
                augmentedMatrix.set(i, j, augmentedMatrix.get(i, j) / pivot);
            }
            // i行目以外のすべての行から、i行目の倍数を引く
            for (var k = 0; k < n; k++) {
                if (k !== i) {
                    var factor = augmentedMatrix.get(k, i);
                    for (var j = 0; j < 2 * n; j++) {
                        augmentedMatrix.set(k, j, augmentedMatrix.get(k, j) - factor * augmentedMatrix.get(i, j));
                    }
                }
            }
        }
        // 結果の行列を作成 (拡張行列の右半分が逆行列)
        var inverseMatrix = new Matrix(n, n);
        for (var i = 0; i < n; i++) {
            for (var j = 0; j < n; j++) {
                inverseMatrix.set(i, j, augmentedMatrix.get(i, j + n));
            }
        }
        return inverseMatrix;
    };
    return Matrix;
}());
export { Matrix };
