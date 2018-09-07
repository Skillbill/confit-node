import pkg from './package.json'

import babel from 'rollup-plugin-babel'
import uglify from 'rollup-plugin-uglify-es'
import commonjs from 'rollup-plugin-commonjs'
import resolve from 'rollup-plugin-node-resolve'
import json from 'rollup-plugin-json'
import replace from 'rollup-plugin-replace'

module.exports = [
  {
    input: 'src/index.js',
    output: [
      {
        file: pkg.main,
        format: 'cjs'
      },
      {
        file: pkg.module,
        format: 'es'
      }
    ],
    plugins: [
      babel({
        exclude: 'node_modules/**'
      }),
      uglify()
    ],
    external: ['axios']
  },
  {
    input: 'src/index.js',
    output: [
      {
        file: 'dist/confit-client.iife.min.js',
        format: 'iife',
        name: 'Confit'
      }
    ],
    plugins: [
      replace({
        'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV) // for axios (https://github.com/axios/axios/commit/4d2f9c21d48f8370a16af9e0b890cd0ce137b158)
      }),
      babel({
        exclude: 'node_modules/**'
      }),
      resolve({
        browser: true,
        main: true
      }),
      commonjs({
        include: 'node_modules/**'
      }),
      json(),
      uglify()
    ]
  }
]