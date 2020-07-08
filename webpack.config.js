const nodeExternals = require('webpack-node-externals');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const path = require('path');

module.exports = {
  target: 'node',
  node: {
    __dirname: false,
    __filename: false,
  },
  entry: {
    securityApp: ['./src/server.js'],
  },
  resolve: {
    extensions: ['*', '.js', '.ts'],
    alias: {
      config: path.resolve(__dirname, 'config/default.js'),
    },
  },
  module: {
    rules: [
      {
        test: /\.(ts|js)$/,
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
      { from: 'src/cert', to: 'cert' },
      { from: 'scripts', to: 'scripts' },
      'src/swagger.yaml',
      'appspec.yml',
      'pm2.config.js'
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
