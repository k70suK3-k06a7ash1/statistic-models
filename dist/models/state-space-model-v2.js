import { Matrix } from "../helpers/Matrix";
var StateSpaceModel = /** @class */ (function () {
    function StateSpaceModel(A, B, C, D, initial_x) {
        this.A = new Matrix(A.length, A[0].length, A);
        this.B = new Matrix(B.length, B[0].length, B);
        this.C = new Matrix(C.length, C[0].length, C);
        this.D = new Matrix(D.length, D[0].length, D);
        this.x = new Matrix(initial_x.length, initial_x[0].length, initial_x); // 初期状態
    }
    // 状態を予測する
    StateSpaceModel.prototype.predict = function (u) {
        var uMatrix = new Matrix(u.length, u[0].length, u);
        // x(t+1) = A * x(t) + B * u(t)
        this.x = this.A.multiply(this.x).add(this.B.multiply(uMatrix));
        return this.x;
    };
    // 観測値を予測する
    StateSpaceModel.prototype.observe = function (u) {
        var uMatrix = new Matrix(u.length, u[0].length, u);
        // y(t) = C * x(t) + D * u(t)
        return this.C.multiply(this.x).add(this.D.multiply(uMatrix));
    };
    // 状態を更新する（カルマンフィルタなどを使用する場合）
    StateSpaceModel.prototype.update = function (y, u) {
        console.warn("Update method is a placeholder.  Implement your specific state update logic (e.g., Kalman Filter).");
    };
    StateSpaceModel.prototype.updateWithKalman = function (y, R, Q, P) {
        var yMatrix = new Matrix(y.length, y[0].length, y);
        var RMatrix = new Matrix(R.length, R[0].length, R);
        var QMatrix = new Matrix(Q.length, Q[0].length, Q);
        var PMatrix = new Matrix(P.length, P[0].length, P);
        // 予測誤差共分散行列
        PMatrix = this.A.multiply(PMatrix)
            .multiply(this.A.transpose())
            .add(QMatrix);
        // カルマンゲイン
        var K = PMatrix.multiply(this.C.transpose());
        K = K.multiply(this.C.multiply(PMatrix)
            .multiply(this.C.transpose())
            .add(RMatrix)
            .inverse());
        // 状態の更新
        var innovation = yMatrix.subtract(this.C.multiply(this.x));
        this.x = this.x.add(K.multiply(innovation));
        // 誤差共分散行列の更新
        // const identityMatrix = Matrix.identity(this.A.rows);
        // PMatrix = identityMatrix.subtract(K.multiply(this.C)).multiply(PMatrix);
        var identityMatrix = Matrix.identity(this.A.rows);
        PMatrix = identityMatrix.subtract(K.multiply(this.C)).multiply(PMatrix);
        PMatrix = PMatrix.add(PMatrix.transpose()).multiply(0.5);
    };
    return StateSpaceModel;
}());
export { StateSpaceModel };
