const nodeExternals = require('webpack-node-externals');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    target: 'node',
    entry: { 
        securityApp: ['./src/server.js']
    },
    resolve: {
      extensions: ['*', '.js']
    },
    plugins: [
        new CopyWebpackPlugin([
        'package.json',
        './dist'
        ])
    ],
    output: {
      filename: '[name].js',
      path: __dirname + '/dist',
      publicPath: '/',
    },
    externals: [nodeExternals()],
    mode: 'production'
  };