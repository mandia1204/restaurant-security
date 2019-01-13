const nodeExternals = require('webpack-node-externals');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const path = require('path');

module.exports = {
  target: 'node',
  entry: {
    securityApp: ['./src/server.js'],
  },
  resolve: {
    extensions: ['*', '.js'],
    alias: {
      config: path.resolve(__dirname, 'config/default.js'),
    },
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
      { from: 'src/config', to: 'config' },
      { from: 'src/protos', to: 'protos' },
    ]),
  ],
  output: {
    filename: '[name].js',
    path: `${__dirname}/dist`,
    publicPath: '/',
  },
  externals: [nodeExternals()],
  mode: 'production',
};
