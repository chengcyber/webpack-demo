function configFn(api) {
  api.cache(true);
  return {
    presets: ['@babel/preset-env', '@babel/preset-react'],
    plugins: [
      '@babel/plugin-transform-runtime',
    ],
  };
}

module.exports = configFn;

