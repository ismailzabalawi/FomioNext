module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        'module-resolver',
        {
          root: ['./src'],
          alias: {
            '@': './src',
            '@/components': './src/components',
            '@/hooks': './src/hooks',
            '@/utils': './src/utils',
            '@/types': './src/types',
            '@/screens': './src/screens',
            '@/navigation': './src/navigation',
            '@/context': './src/context',
          },
        },
      ],
      'react-native-reanimated/plugin',
      [
        'babel-plugin-styled-components',
        {
          native: true,
        },
      ],
    ],
  };
};