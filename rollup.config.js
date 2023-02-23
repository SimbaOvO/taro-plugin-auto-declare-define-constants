import { defineConfig } from 'rollup';
import babel from '@rollup/plugin-babel';
import typescript from '@rollup/plugin-typescript';
import resolve from '@rollup/plugin-node-resolve';
import terser from '@rollup/plugin-terser';

export default defineConfig({
  input: 'src/index.ts',
  output: [
    {
      file: `dist/index.es.js`,
      format: 'es',
    },
    {
      file: `dist/index.umd.js`,
      format: 'umd',
      // 注意如果是umd格式的bundle的话name属性是必须的，这时可以在script标签引入后window下会挂载该属性的变量来使用你的类库方法
      name: 'index',
    },
  ],
  plugins: [
    babel({
      exclude: 'node_modules/**',
      babelHelpers: 'bundled',
    }),
    typescript({
      sourceMap: false,
    }),
    resolve(),
    terser(),
  ],
});
