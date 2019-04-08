var nodeExternals = require('webpack-node-externals');
var path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'main.js',
    path: __dirname + '/dist'
  },
  module: {
    rules: [
      {
        test: /\.es6$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['react', 'es2015']
        }
      }
    ]
  },
  resolve: {
    extensions: ['.ts', '.js', '.es6']
  },
  watch: true,
  target: 'node',
  externals: [nodeExternals()],
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    port: 9000,
    proxy: {
      '/api': {
        target: 'http://localhost:8000',
        secure: false
      }
    },
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
      'Access-Control-Allow-Headers':
        'X-Requested-With, content-type, Authorization'
    }
  }
};
