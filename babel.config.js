module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        'module-resolver',
        {
          root: ['.'],
          alias: {
            apis: './apis',
            assets: './assets',
            containers: './containers',
            components: './components',
            hooks: './hooks',
            screens: './screens',
            store: './store',
            utils: './utils',
            interfaces: './interfaces',
            features: './features',
          },
        },
      ],
    ],
  };
};
