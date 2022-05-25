const nodeExternals = require('webpack-node-externals');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const path = require('path');
const ESLintPlugin = require('eslint-webpack-plugin');

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
        ],
      },
    ],
  },
  plugins: [
    new CopyWebpackPlugin({
      patterns:
      [
        'package.json',
        { from: 'src/config', to: 'config' },
        { from: 'src/protos', to: 'protos' },
        { from: 'src/cert', to: 'cert' },
        { from: 'scripts', to: 'scripts' },
        'src/swagger.yaml',
        'appspec.yml',
        'pm2.config.js'
      ]
    }
    ),
    new ESLintPlugin({
      extensions: ['js', 'ts']
    })
  ],
  output: {
    filename: '[name].js',
    path: `${__dirname}/dist`,
    publicPath: '/',
  },
  externals: [nodeExternals()],
  mode: 'production',
};
