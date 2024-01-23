/**
 * @file 矩阵工具类
 */
export class Matrix {
    readonly rows: number;
    readonly cols: number;
    readonly data: number[][];

    constructor(rows: number, cols: number) {
        this.rows = rows;
        this.cols = cols;
        this.data = [];

        for (let i = 0; i < rows; i++) {
            this.data[i] = [];
            for (let j = 0; j < cols; j++) {
                this.data[i][j] = 0;
            }
        }
    }

    static array(array: number[][]) {
        const rows = array.length;
        const cols = array[0].length;
        const matrix = new Matrix(rows, cols);
        for (let i = 0; i < rows; i++) {
            for (let j = 0; j < cols; j++) {
                matrix.set(i, j, array[i][j]);
            }
        }
        return matrix;
    }

    /**
     * 获取单位矩阵
     * @param n
     */
    static eye(n: number) {
        const matrix = new Matrix(n, n);
        for (let i = 0; i < n; i++) {
            matrix.set(i, i, 1);
        }
        return matrix;
    }

    /**
     * 设置矩阵元素的值
     * @param row
     * @param col
     * @param value
     */
    set(row: number, col: number, value: number) {
        this.data[row][col] = value;
    }

    /**
     * 获取矩阵元素的值
     * @param row
     * @param col
     */
    get(row: number, col: number) {
        return this.data[row][col];
    }

    /**
     * 矩阵加法
     * @param matrixB
     */
    add(matrixB: Matrix) {
        const result = new Matrix(this.rows, this.cols);
        for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < this.cols; j++) {
                result.set(i, j, this.get(i, j) + matrixB.get(i, j));
            }
        }
        return result;
    }

    /**
     * 右乘一个矩阵
     * @param matrixB
     */
    multiply(matrixB: Matrix) {
        const result = new Matrix(this.rows, matrixB.cols);
        for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < matrixB.cols; j++) {
                let sum = 0;
                for (let k = 0; k < this.cols; k++) {
                    sum += this.get(i, k) * matrixB.get(k, j);
                }
                result.set(i, j, sum);
            }
        }
        return result;
    }

    copy() {
        return Matrix.array(this.data);
    }

    /**
     * 矩阵求逆
     */
    inverse() {
        const det = this.det();
        if (det === 0) {
            throw new Error('矩阵不可逆');
        }
        const adjMatrix = this.adjugate();
        const n = this.rows;
        const invMatrix = [];
        for (let i = 0; i < n; i++) {
            const invRow = [];
            for (let j = 0; j < n; j++) {
                invRow.push(adjMatrix.get(i, j) / det);
            }
            invMatrix.push(invRow);
        }
        return Matrix.array(invMatrix);
    }

    /**
     * 行列式
     */
    det() {
        if (this.rows !== this.cols) {
            throw new Error('matrix rows !== cols');
        }
        const n = this.rows;
        if (n === 2) {
            return this.get(0, 0) * this.get(1, 1) - this.get(0, 1) * this.get(1, 0);
        }
        let det = 0;
        for (let i = 0; i < n; i++) {
            det += this.get(0, i) * this.cofactor(0, i);
        }
        return det;
    }

    /**
     * 代数余子式
     * @param row
     * @param col
     * @private
     */
    private cofactor(row: number, col: number) {
        const n = this.rows;
        const subMatrix: number[][] = [];
        for (let i = 0; i < n; i++) {
            if (i !== row) {
                const subRow = [];
                for (let j = 0; j < n; j++) {
                    if (j !== col) {
                        subRow.push(this.get(i, j));
                    }
                }
                subMatrix.push(subRow);
            }
        }
        return Math.pow(-1, row + col) * Matrix.array(subMatrix).det();
    }

    /**
     * 伴随矩阵
     * @private
     */
    private adjugate() {
        const n = this.rows;
        const adjMatrix = [];
        for (let i = 0; i < n; i++) {
            const adjRow = [];
            for (let j = 0; j < n; j++) {
                adjRow.push(this.cofactor(j, i));
            }
            adjMatrix.push(adjRow);
        }
        return Matrix.array(adjMatrix);
    }
}
