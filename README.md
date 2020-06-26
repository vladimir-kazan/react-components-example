# Build Component Library for React

## Pre-commit hook

https://pre-commit.com/#installation

```sh
brew install pre-commit
# pip install pre-commit

pre-commit install
# optional
pre-commit run --all-files
```

## Rollup

```sh
npm install --save-dev rollup rollup-plugin-peer-deps-external @rollup/plugin-node-resolve rollup-plugin-typescript2 @rollup/plugin-commonjs rollup-plugin-postcss rollup-plugin-copy rollup-plugin-visualizer node-sass typescript
```

`roolup.config.js`

```js
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import resolve from '@rollup/plugin-node-resolve';
import typescript from 'rollup-plugin-typescript2';
import commonjs from '@rollup/plugin-commonjs';
import postcss from 'rollup-plugin-postcss';
import copy from 'rollup-plugin-copy';
import visualize from 'rollup-plugin-visualizer';

import packageJson from './package.json';

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
    visualize({ gzipSize: true }),
  ],
  external: ['react', 'react-dom'],
};
```

`package.json`

```json
"module": "build/index.esm.js",
"files": [
    "build"
],
"types": "./build/index.d.ts",
"scripts": {
    "prebuild": "rm -rf build",
    "build": "rollup -c ./rollup.config.js"
}
```

## Storybook

```sh
npm install --save-dev @storybook/react @babel/core babel-preset-react-app babel-loader sass-loader
```

`.storybook/main.js`

```js
const path = require('path');

module.exports = {
  stories: ['../src/**/*.stories.tsx'],
  // Add any Storybook addons you want here: https://storybook.js.org/addons/
  addons: [],
  webpackFinal: async (config) => {
    config.module.rules.push({
      test: /\.scss$/,
      use: ['style-loader', 'css-loader', 'sass-loader'],
      include: path.resolve(__dirname, '../'),
    });

    config.module.rules.push({
      test: /\.(ts|tsx)$/,
      loader: require.resolve('babel-loader'),
      options: {
        presets: [['react-app', { flow: false, typescript: true }]],
      },
    });
    config.resolve.extensions.push('.ts', '.tsx');

    return config;
  },
};
```

`package.json`

```json
"storybook": "start-storybook -p 6006",
"build-storybook": "build-storybook",
```

## Jest

```sh
npm i --save-dev jest ts-jest @types/jest identity-obj-proxy @testing-library/react @testing-library/jest-dom
```

`jest.config.js`

```js
module.exports = {
  roots: ['./src'],
  setupFilesAfterEnv: ['./jest.setup.ts'],
  moduleFileExtensions: ['ts', 'tsx', 'js'],
  testPathIgnorePatterns: ['node_modules/'],
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
  testMatch: ['**/*.test.(ts|tsx)'],
  moduleNameMapper: {
    // Mocks out all these file formats when tests are run
    '\\.(jpg|ico|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      'identity-obj-proxy',
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
  },
};
```

`jest.setup.ts`

```js
import '@testing-library/jest-dom';
```

`package.json`

```json
"test": "jest",
"test:watch": "jest --watch",
```
