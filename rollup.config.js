import vue from 'rollup-plugin-vue'
import commonjs from '@rollup/plugin-commonjs'
import { nodeResolve } from '@rollup/plugin-node-resolve'
import postcss from 'rollup-plugin-postcss'

export default {
  input: 'src/index.js',
  output: [
    {
      file: 'dist/index.js',
      format: 'cjs'
    },
    {
      file: 'dist/index.esm.js',
      format: 'esm'
    }
  ],
  plugins: [
    vue(),
    nodeResolve(),
    commonjs(),
    postcss({
      extract: true,
      minimize: true,
      modules: false
    })
  ],
  external: ['vue']
}