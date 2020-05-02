module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        alias: {
          assets: './src/assets',
          components: './src/components',
          constants: './src/constants',
          screen: './src/screen',
          navigation: './src/navigation',
          utils: './src/utils',
        },
      },
    ],
  ],
};
