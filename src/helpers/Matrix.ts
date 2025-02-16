export class Matrix {
	rows: number;
	cols: number;
	data: number[][];

	constructor(rows: number, cols: number, data?: number[][]) {
		this.rows = rows;
		this.cols = cols;
		this.data =
			data ||
			Array(rows)
				.fill(null)
				.map(() => Array(cols).fill(0));
	}

	// 行列の要素を取得
	get(row: number, col: number): number {
		return this.data[row][col];
	}

	// 行列の要素を設定
	set(row: number, col: number, value: number): void {
		this.data[row][col] = value;
	}

	// 行列の加算
	add(other: Matrix): Matrix {
		if (this.rows !== other.rows || this.cols !== other.cols) {
			throw new Error("Matrix dimensions must match for addition.");
		}
		const result = new Matrix(this.rows, this.cols);
		for (let i = 0; i < this.rows; i++) {
			for (let j = 0; j < this.cols; j++) {
				result.set(i, j, this.get(i, j) + other.get(i, j));
			}
		}
		return result;
	}

	// 行列の減算
	subtract(other: Matrix): Matrix {
		if (this.rows !== other.rows || this.cols !== other.cols) {
			throw new Error("Matrix dimensions must match for subtraction.");
		}
		const result = new Matrix(this.rows, this.cols);
		for (let i = 0; i < this.rows; i++) {
			for (let j = 0; j < this.cols; j++) {
				result.set(i, j, this.get(i, j) - other.get(i, j));
			}
		}
		return result;
	}

	// 行列の乗算
	multiply(other: Matrix | number): Matrix {
		if (typeof other === "number") {
			// スカラー倍
			const result = new Matrix(this.rows, this.cols);
			for (let i = 0; i < this.rows; i++) {
				for (let j = 0; j < this.cols; j++) {
					result.set(i, j, this.get(i, j) * other);
				}
			}
			return result;
		}

		// 行列同士の乗算
		if (this.cols !== other.rows) {
			throw new Error(
				"Number of columns in the first matrix must match the number of rows in the second matrix for multiplication.",
			);
		}

		const result = new Matrix(this.rows, other.cols);
		for (let i = 0; i < this.rows; i++) {
			for (let j = 0; j < other.cols; j++) {
				let sum = 0;
				for (let k = 0; k < this.cols; k++) {
					sum += this.get(i, k) * other.get(k, j);
				}
				result.set(i, j, sum);
			}
		}
		return result;
	}

	// 転置行列
	transpose(): Matrix {
		const result = new Matrix(this.cols, this.rows);
		for (let i = 0; i < this.rows; i++) {
			for (let j = 0; j < this.cols; j++) {
				result.set(j, i, this.get(i, j));
			}
		}
		return result;
	}

	// 行列の内容をコンソールに出力 (デバッグ用)
	print(): void {
		for (let i = 0; i < this.rows; i++) {
			console.log(this.data[i].join("\t"));
		}
	}
	static identity(size: number): Matrix {
		const identityMatrix = new Matrix(size, size);
		for (let i = 0; i < size; i++) {
			identityMatrix.set(i, i, 1);
		}
		return identityMatrix;
	}

	// 行列の反転 (ガウスの消去法、小規模行列向け)
	inverse(): Matrix {
		if (this.rows !== this.cols) {
			throw new Error("Matrix must be square to calculate the inverse.");
		}

		const n = this.rows;
		const augmentedMatrix = new Matrix(n, 2 * n);

		// 拡張行列を作成 (左半分は元の行列、右半分は単位行列)
		for (let i = 0; i < n; i++) {
			for (let j = 0; j < n; j++) {
				augmentedMatrix.set(i, j, this.get(i, j));
			}
			augmentedMatrix.set(i, i + n, 1); // 単位行列部分
		}

		// 前進消去
		for (let i = 0; i < n; i++) {
			// ピボットが0の場合、行を入れ替える (簡単のため省略)
			// 対角成分が0の場合は、より高度なピボット選択が必要

			// 対角成分を1にする
			const pivot = augmentedMatrix.get(i, i);
			if (pivot === 0) {
				throw new Error("Singular matrix, cannot invert.");
			}

			for (let j = 0; j < 2 * n; j++) {
				augmentedMatrix.set(i, j, augmentedMatrix.get(i, j) / pivot);
			}

			// i行目以外のすべての行から、i行目の倍数を引く
			for (let k = 0; k < n; k++) {
				if (k !== i) {
					const factor = augmentedMatrix.get(k, i);
					for (let j = 0; j < 2 * n; j++) {
						augmentedMatrix.set(
							k,
							j,
							augmentedMatrix.get(k, j) - factor * augmentedMatrix.get(i, j),
						);
					}
				}
			}
		}

		// 結果の行列を作成 (拡張行列の右半分が逆行列)
		const inverseMatrix = new Matrix(n, n);
		for (let i = 0; i < n; i++) {
			for (let j = 0; j < n; j++) {
				inverseMatrix.set(i, j, augmentedMatrix.get(i, j + n));
			}
		}

		return inverseMatrix;
	}
}
