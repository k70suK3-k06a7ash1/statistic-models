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

export class StateSpaceModel {
	A: Matrix;
	B: Matrix;
	C: Matrix;
	D: Matrix;
	x: Matrix; // 現在の状態

	constructor(
		A: number[][],
		B: number[][],
		C: number[][],
		D: number[][],
		initial_x: number[][],
	) {
		this.A = new Matrix(A.length, A[0].length, A);
		this.B = new Matrix(B.length, B[0].length, B);
		this.C = new Matrix(C.length, C[0].length, C);
		this.D = new Matrix(D.length, D[0].length, D);
		this.x = new Matrix(initial_x.length, initial_x[0].length, initial_x); // 初期状態
	}

	// 状態を予測する
	predict(u: number[][]): Matrix {
		const uMatrix = new Matrix(u.length, u[0].length, u);
		// x(t+1) = A * x(t) + B * u(t)
		this.x = this.A.multiply(this.x).add(this.B.multiply(uMatrix));
		return this.x;
	}

	// 観測値を予測する
	observe(u: number[][]): Matrix {
		const uMatrix = new Matrix(u.length, u[0].length, u);
		// y(t) = C * x(t) + D * u(t)
		return this.C.multiply(this.x).add(this.D.multiply(uMatrix));
	}

	// 状態を更新する（カルマンフィルタなどを使用する場合）
	update(y: number[][], u: number[][]): void {
		console.warn(
			"Update method is a placeholder.  Implement your specific state update logic (e.g., Kalman Filter).",
		);
	}
	updateWithKalman(
		y: number[][],
		R: number[][],
		Q: number[][],
		P: number[][],
	): void {
		const yMatrix = new Matrix(y.length, y[0].length, y);
		const RMatrix = new Matrix(R.length, R[0].length, R);
		const QMatrix = new Matrix(Q.length, Q[0].length, Q);
		let PMatrix = new Matrix(P.length, P[0].length, P);

		// 予測誤差共分散行列
		PMatrix = this.A.multiply(PMatrix)
			.multiply(this.A.transpose())
			.add(QMatrix);

		// カルマンゲイン
		let K = PMatrix.multiply(this.C.transpose());
		K = K.multiply(
			this.C.multiply(PMatrix)
				.multiply(this.C.transpose())
				.add(RMatrix)
				.inverse(),
		);

		// 状態の更新
		const innovation = yMatrix.subtract(this.C.multiply(this.x));
		this.x = this.x.add(K.multiply(innovation));

		// 誤差共分散行列の更新
		const identityMatrix = Matrix.identity(this.A.rows);
		PMatrix = identityMatrix.subtract(K.multiply(this.C)).multiply(PMatrix);
	}
}
