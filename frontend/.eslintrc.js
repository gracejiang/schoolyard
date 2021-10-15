module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: 'airbnb',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: [
    'react',
  ],
  rules: {
    'no-alert': 'off',
    'react/prop-types': 'off',
    'brace-style': [2, '1tbs'],
    camelcase: 0,
    'no-bitwise': 2,
    'no-empty': 2,
    'no-ex-assign': 2,
    'no-lonely-if': 2,
    'no-mixed-spaces-and-tabs': 2,
    'no-tabs': 2,
    'no-underscore-dangle': 0,
    'no-unused-vars': 0,
    'quote-props': [2, 'as-needed'],
    quotes: [2, 'single', 'avoid-escape'],
    strict: 0,
    semi: [2, 'never'],
    'arrow-parens': [2, 'as-needed'],
  },
}
