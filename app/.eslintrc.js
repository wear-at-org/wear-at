module.exports = {
  root: true,
  extends: ['@react-native-community', 'plugin:prettier/recommended', 'eslint:recommended'],
  rules: {
    'no-async-promise-executor': 'off',
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
    'prettier/prettier': [
      'error',
      {
        endOfLine: 'auto',
      },
    ],
  },
};
