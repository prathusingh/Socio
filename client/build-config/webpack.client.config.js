const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const APP_DIR = path.resolve(__dirname, '../src');
const env_path = path.resolve(__dirname, '../.env');
const dotenv = require('dotenv').config({ path: env_path });

module.exports = env => {
  const { PLATFORM, VERSION } = env;

  return merge([
    {
      entry: ['@babel/polyfill', APP_DIR],
      output: {
        path: path.resolve(__dirname, '../dist'),
        filename: 'client-bundle.js'
      },
      node: {
        fs: 'empty'
      },
      devServer: {
        port: 8081
      },
      module: {
        rules: [
          {
            test: /\.js$/,
            exclude: /node_modules/,
            use: {
              loader: 'babel-loader'
            }
          },
          {
            test: /\.scss$/,
            use: [
              PLATFORM === 'production'
                ? MiniCssExtractPlugin.loader
                : 'style-loader',
              'css-loader',
              'sass-loader'
            ]
          }
        ]
      },
      plugins: [
        new HtmlWebpackPlugin({
          template: path.join(__dirname, '../public/index.html'),
          filename: path.join(__dirname, '../dist/index.html')
        }),
        new webpack.DefinePlugin({
          'process.env.VERSION': JSON.stringify(env.VERSION),
          'process.env.PLATFORM': JSON.stringify(env.PLATFORM),
          'process.env.API_PREFIX': JSON.stringify(
            PLATFORM === 'production'
              ? dotenv.parsed.API_PREFIX_PROD
              : dotenv.parsed.API_PREFIX_DEV
          ),
          'process.env.GOOGLE_CLIENT_ID': JSON.stringify(
            dotenv.parsed.GOOGLE_CLIENT_ID
          )
        }),
        new CopyWebpackPlugin([
          {
            from: path.join(__dirname, '../src/assets/images'),
            to: 'public',
            toType: 'dir'
          },
          {
            from: path.join(__dirname, '../public'),
            to: 'public',
            toType: 'dir'
          }
        ])
      ]
    }
  ]);
};
