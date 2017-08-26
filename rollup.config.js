import nodeResolve from 'rollup-plugin-node-resolve';
import typescript from 'rollup-plugin-typescript';
import commonjs from 'rollup-plugin-commonjs';
import ejs from 'rollup-plugin-ejs';
import * as ts from 'typescript';
import uglify from 'rollup-plugin-uglify';


export default {
    entry: 'app/src/javascript/main.ts',
    dest: 'public/dist/bundle.js',
    format: 'iife',
    moduleName: 'foo',
    plugins: [
        nodeResolve({
            jsnext: true,
            extensions: [ '.ts', '.js' ]
        }),
        typescript({
            typescript: require("typescript")
        }),
        commonjs({
            extensions: [ '.ts', '.js' ]
        }),

        ejs({
            include: ['**/*.ejs', '**/*.html'],
            exclude: ['**/index.html'],
            compilerOptions: {client: true, strict: true}
        }),

        uglify()
    ]
}