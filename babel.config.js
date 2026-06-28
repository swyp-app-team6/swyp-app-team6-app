module.exports = {
  presets: ['module:@react-native/babel-preset', 'nativewind/babel'],
  plugins: [
    ['module-resolver', {
      root: ['./src'],
      alias: { '@': './src' },
    }],
    '@babel/plugin-transform-class-static-block',
    'react-native-reanimated/plugin',
  ]
};
