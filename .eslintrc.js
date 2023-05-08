module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  extends: ['@react-native-community', 'prettier'],
  env: { jest: true },
  rules: {
      'prettier/prettier': 'off',
      'no-shadow': 'off',
      '@typescript-eslint/no-shadow': ['error'],
  },
};
