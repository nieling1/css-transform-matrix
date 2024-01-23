import {Matrix} from "./Matrix";

type MatrixType = '2d' | '3d';

interface ICssMatrix {
    // 平移
    move: (mx: number, my: number) => void;
    // 缩放
    scale: (x: number, y: number, scale: number) => void;
    // 旋转
    rotate: (x: number, y: number, degree: number) => void;
    // 获取css字符串
    toString: () => string;
}

export class CssMatrix implements ICssMatrix {
    private matrix: Matrix = null;
    constructor() {
    
    }
    moveX(mx: number) {
        const x = this.matrix.get(0, 2);
        this.matrix.set(0, 2, x + mx);
        return this;
    }
    moveY(my: number) {
        const y = this.matrix.get(0, 2);
        this.matrix.set(0, 2, y + my);
        return this;
    }
    move(mx: number, my: number) {
        return this.moveX(mx).moveY(my);
    };
    scale(scale: number) {
        
        return this;
    };
    scaleX(scale: number, x?: number) {
    
    }
    scaleY(scale: number, y?: number) {
    
    }
    scaleAtPoint(scale: number, x: number, y: number) {
        const scMatrix = Matrix.array([
            [scale, 0, -1 * scale * x + x],
            [0, scale, -1 * scale * y + y],
            [0, 0, 1],
        ]);
        this.matrix = scMatrix.multiply(this.matrix);
        return this;
    };
    rotate(degree: number) {
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
}
