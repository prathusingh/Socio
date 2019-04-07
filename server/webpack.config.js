var nodeExternals = require('webpack-node-externals');
module.exports = {
  entry: './src/index.js',
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
  externals: [nodeExternals()]
};
