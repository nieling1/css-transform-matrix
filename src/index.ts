import {Matrix} from "./Matrix";

type MatrixType = '2d' | '3d';

interface ICssMatrix {
    moveX: (mx: number) => this;
    moveY: (my: number) => this;
    move: (mx: number, my: number) => this;
    scale: (scale: number) => this;
    scaleX: (scale: number, x?: number) => this;
    scaleY: (scale: number, y?: number) => this;
    scaleAtPoint: (scale: number, x: number, y: number) => this;
    rotate: (degree: number) => this;
    rotateAtPoint: (degree: number, x: number, y: number) => this;
    toString: () => string;
}

export class CssMatrix implements ICssMatrix {
    private matrix: Matrix = null;
    constructor(initMatrix: number[] = [1, 0, 0, 1, 0, 0]) {
        if (initMatrix.length !== 6) {
            throw new Error('params length error');
        }
        this.matrix = Matrix.array([
            [initMatrix[0], initMatrix[2], initMatrix[4]],
            [initMatrix[1], initMatrix[3], initMatrix[5]],
            [0, 0, 1],
        ]);
        return this;
    }
    moveX(mx: number) {
        const x = this.matrix.get(0, 2);
        this.matrix.set(0, 2, x + mx);
        return this;
    }
    moveY(my: number) {
        const y = this.matrix.get(1, 2);
        this.matrix.set(1, 2, y + my);
        return this;
    }
    move(mx: number, my: number) {
        return this.moveX(mx).moveY(my);
    };
    scale(scale: number) {
        this.matrix = this.getScaleMatrix(scale, scale, 0, 0).multiply(this.matrix);
        return this;
    };
    scaleX(scale: number, x: number = 0) {
        this.matrix = this.getScaleMatrix(scale, 0, x, 0).multiply(this.matrix);
        return this;
    }
    scaleY(scale: number, y: number = 0) {
        this.matrix = this.getScaleMatrix(0, scale, 0, y).multiply(this.matrix);
        return this;
    }
    scaleAtPoint(scale: number, x: number, y: number) {
        this.matrix = this.getScaleMatrix(scale, scale, x, y).multiply(this.matrix);
        return this;
    };
    rotate(degree: number) {
        const ratio = Math.PI / 180;
        const a = Math.cos(degree * ratio);
        const b = Math.sin(degree * ratio)
        const c = -1 * b;
        this.matrix = Matrix.array([
            [a, c, 0],
            [b, a, 0],
            [0, 0, 1]
        ]).multiply(this.matrix);
        return this;
    };
    rotateAtPoint(degree: number, x: number, y: number) {
        return this;
    }
    toString() {
        const res = [];
        for (let i = 0; i < this.matrix.cols; i++) {
            for (let j = 0; j < this.matrix.rows - 1; j++) {
                res.push(this.matrix.get(j, i));
            }
        }
        return `matrix(${res.join(',')})`;
    }
    
    // 矩阵缩放
    private getScaleMatrix(sx: number, sy: number, x: number, y: number) {
        sx = sx ?? 1;
        sy = sy ?? 1;
        x = x ?? 0;
        y = y ?? 0;
        return Matrix.array([
            [sx, 0, -1 * sx * x + x],
            [0, sy, -1 * sy * y + y],
            [0, 0, 1],
        ]);
    }
}
