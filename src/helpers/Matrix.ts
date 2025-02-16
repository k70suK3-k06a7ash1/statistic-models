export class Matrix {
	constructor(
		public rows: number,
		public cols: number,
		public data: number[][] = Array.from({ length: rows }, () =>
			Array(cols).fill(0),
		),
	) {}

	get(row: number, col: number): number {
		return this.data[row][col];
	}

	set(row: number, col: number, value: number): void {
		this.data[row][col] = value;
	}

	add(other: Matrix): Matrix {
		if (this.rows !== other.rows || this.cols !== other.cols) {
			throw new Error("Matrix dimensions must match for addition.");
		}
		return new Matrix(
			this.rows,
			this.cols,
			this.data.map((row, i) => row.map((val, j) => val + other.get(i, j))),
		);
	}

	subtract(other: Matrix): Matrix {
		if (this.rows !== other.rows || this.cols !== other.cols) {
			throw new Error("Matrix dimensions must match for subtraction.");
		}
		return new Matrix(
			this.rows,
			this.cols,
			this.data.map((row, i) => row.map((val, j) => val - other.get(i, j))),
		);
	}

	multiply(other: Matrix | number): Matrix {
		if (typeof other === "number") {
			return new Matrix(
				this.rows,
				this.cols,
				this.data.map((row) => row.map((val) => val * other)),
			);
		}

		if (this.cols !== other.rows) {
			throw new Error("Matrix multiplication dimension mismatch.");
		}

		const result = new Matrix(this.rows, other.cols);
		for (let i = 0; i < this.rows; i++) {
			for (let j = 0; j < other.cols; j++) {
				result.set(
					i,
					j,
					this.data[i].reduce((sum, val, k) => sum + val * other.get(k, j), 0),
				);
			}
		}
		return result;
	}

	transpose(): Matrix {
		return new Matrix(
			this.cols,
			this.rows,
			this.data[0].map((_, colIndex) => this.data.map((row) => row[colIndex])),
		);
	}

	print(): void {
		console.log(this.data.map((row) => row.join("\t")).join("\n"));
	}

	static identity(size: number): Matrix {
		return new Matrix(
			size,
			size,
			Array.from({ length: size }, (_, i) =>
				Array.from({ length: size }, (_, j) => (i === j ? 1 : 0)),
			),
		);
	}

	inverse(): Matrix {
		if (this.rows !== this.cols) {
			throw new Error("Matrix must be square to calculate the inverse.");
		}

		const n = this.rows;
		const augmented = new Matrix(
			n,
			2 * n,
			this.data.map((row, i) => [
				...row,
				...Array(n)
					.fill(0)
					.map((_, j) => (i === j ? 1 : 0)),
			]),
		);

		for (let i = 0; i < n; i++) {
			const pivot = augmented.get(i, i);
			if (pivot === 0) {
				throw new Error("Singular matrix, cannot invert.");
			}

			for (let j = 0; j < 2 * n; j++) {
				augmented.set(i, j, augmented.get(i, j) / pivot);
			}

			for (let k = 0; k < n; k++) {
				if (k !== i) {
					const factor = augmented.get(k, i);
					for (let j = 0; j < 2 * n; j++) {
						augmented.set(
							k,
							j,
							augmented.get(k, j) - factor * augmented.get(i, j),
						);
					}
				}
			}
		}

		return new Matrix(
			n,
			n,
			augmented.data.map((row) => row.slice(n)),
		);
	}
}
