import path from 'path';
import webpack from 'webpack';

import * as common from './webpack.common.config';

export const cache = true;
export const devtool = 'eval';
export const entry = common.entry;
export const output = common.output;
export const context = common.context;
export const resolve = common.resolve;

export const module = {
  loaders: [
    {
      test: [/\.jsx?$/],
      include: [/src/],
      loader: 'babel-loader',
      exclude: [/node_modules/, /webpack/, /dist/, /server/],
      query: {
        cacheDirectory: true,
        presets: ['es2015', 'stage-0', 'react']
      }
    }
  ]
};

export const plugins = [
  new webpack.DllPlugin({
    path: path.join(common.manifestPath, "[name]-manifest.json"),
    name: "[name]",
  }),
  common.compileError
]
.concat(common.plugins);