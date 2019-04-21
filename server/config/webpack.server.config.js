const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const nodeExternals = require('webpack-node-externals');
const APP_DIR = path.resolve(__dirname, '../src');
const baseConfig = require('./webpack.base.config');

const serverConfig = (env, argv) => {
  const { PLATFORM, VERSION } = env;
  return merge([
    {
      entry: ['@babel/polyfill', APP_DIR],
      output: {
        path: path.join(APP_DIR, 'dist'),
        filename: 'bundle.js'
      },
      target: 'node',
      externals: [nodeExternals()]
    }
  ]);
};

module.exports = env => {
  return merge(baseConfig(env), serverConfig(env));
};
