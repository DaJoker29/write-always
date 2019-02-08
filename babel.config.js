module.exports = function(api) {
  api.cache(true);
  const presets = [['@babel/preset-env', { useBuiltIns: 'entry' }]];

  return {
    env: {
      test: {
        plugins: ['istanbul']
      }
    },
    presets
  };
};
