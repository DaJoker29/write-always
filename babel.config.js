module.exports = function(api) {
  api.cache(true);
  const presets = [['@babel/preset-env', { useBuiltIns: 'entry' }]];
  const plugins = [
    '@babel/plugin-syntax-dynamic-import',
    ['@babel/plugin-transform-runtime', { regenerator: true }]
  ];

  return {
    env: {
      test: {
        plugins: ['istanbul']
      }
    },
    plugins,
    presets
  };
};
