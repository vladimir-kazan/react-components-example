import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import resolve from '@rollup/plugin-node-resolve';
import typescript from 'rollup-plugin-typescript2';
import commonjs from '@rollup/plugin-commonjs';
import postcss from 'rollup-plugin-postcss';
import replace from 'rollup-plugin-re';
import copy from 'rollup-plugin-copy';
import visualize from 'rollup-plugin-visualizer';
import bundleSize from 'rollup-plugin-bundle-size';

import packageJson from './package.json';

const replacePatterns = [
  {
    include: ['src/**/*.tsx'],
    test: /\sdata-testid=[^\s|>|\/>]+/g,
    replace: '',
  },
];

export default {
  input: ['src/index.ts'],
  output: [
    {
      file: packageJson.module,
      format: 'esm',
      sourcemap: true,
    },
  ],
  plugins: [
    peerDepsExternal(),
    replace({ patterns: replacePatterns }),
    postcss({
      extract: 'bundle.css',
      // extract: false,
      modules: true,
      use: ['sass'],
      // plugins: [autoprefixer()],
      writeDefinitions: true,
      minimize: true,
      sourceMap: true,
    }),
    resolve(),
    commonjs(),
    typescript({ useTsconfigDeclarationDir: true }),
    copy({
      targets: [
        {
          src: 'src/variables.scss',
          dest: 'build',
          rename: 'variables.scss',
        },
      ],
    }),
    visualize(),
    bundleSize(),
  ],
  external: ['react', 'react-dom'],
};
