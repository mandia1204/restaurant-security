/* eslint-disable */
module.exports = function (api) {
  api.cache(true)
  const presets = [
    '@babel/env',
    '@babel/preset-typescript',
  ];

  const plugins = [
    '@babel/proposal-class-properties',
    '@babel/proposal-object-rest-spread',
		'@babel/plugin-syntax-dynamic-import',
		'@babel/plugin-proposal-optional-chaining'
  ];

  return {
    presets,
    plugins,
  };
};
