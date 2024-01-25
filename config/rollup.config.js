import path from "path";
import commonjs from "@rollup/plugin-commonjs";
import babel from "@rollup/plugin-babel";
import resolve from "@rollup/plugin-node-resolve";
import serve from "rollup-plugin-serve";
import livereload from "rollup-plugin-livereload";
import terser from "@rollup/plugin-terser";
import typescript from "rollup-plugin-typescript2";

const isProd = process.env.NODE_ENV === 'prod';

/**
 *
 * @type {import('rollup').RollupOptions}
 */
const config ={
    input: path.resolve(__dirname, '../src/index.ts'),
    output: {
        dir: 'dist',
        format: 'es',
        sourcemap: true,
    },
    plugins: [
        !isProd && serve({
            open: true,
            contentBase: './',
            host: 'localhost',
            port: 3000,
            historyApiFallback: true,
        }),
        !isProd && livereload(),
        resolve({
            extensions: ['.js', '.jsx', '.ts', '.tsx'],
        }),
        isProd && typescript(),
        babel({
            babelHelpers: 'bundled',
            extensions: ['.js', '.ts', '.jsx', '.tsx'],
        }),
        commonjs(),
        isProd && terser(),
    ].filter(Boolean),
    external: [],
}

export default config;
