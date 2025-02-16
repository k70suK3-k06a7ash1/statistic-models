import { Matrix } from "../helpers/Matrix";

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
