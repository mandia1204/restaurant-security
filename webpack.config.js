const nodeExternals = require('webpack-node-externals');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  target: 'node',
  entry: {
    securityApp: ['./src/server.js'],
  },
  resolve: {
    extensions: ['*', '.js'],
  },
  module: {
    rules: [
      {
        test: /\.(js)$/,
        exclude: /node_modules/,
        use: [
          'babel-loader',
          'eslint-loader',
        ],
      },
    ],
  },
  plugins: [
    new CopyWebpackPlugin([
      'package.json',
      'dist',
    ], { context: './' }),
  ],
  output: {
    filename: '[name].js',
    path: `${__dirname}/dist`,
    publicPath: '/',
  },
  externals: [nodeExternals()],
  mode: 'production',
};
