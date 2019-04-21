const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const nodeExternals = require('webpack-node-externals');

const APP_DIR = path.resolve(__dirname, '../src');

module.exports = env => {
  return merge([
    {
      entry: ['@babel/polyfill', APP_DIR],
      output: {
        path: path.resolve(__dirname, '../dist'),
        filename: 'server-bundle.js'
      },
      target: 'node',
      externals: [nodeExternals()],
      module: {
        rules: [
          {
            test: /\.js$/,
            exclude: /node_modules/,
            use: {
              loader: 'babel-loader'
            }
          }
        ]
      }
    }
  ]);
};
