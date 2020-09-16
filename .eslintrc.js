module.exports = {
  env: {
    browser: true,
    es2020: true,
  },
  extends: [
    'airbnb-base',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: [
    '@typescript-eslint',
  ],
  rules: {
    "no-useless-constructor": "off",
    "no-empty-function": "off",
    "no-console": "off",
    "no-unused-vars": "off",
    "max-classes-per-file": "off",
    "class-methods-use-this": "off",
    "import/prefer-default-export": "off",
    "no-use-before-define": "off",
    "consistent-return": "off",
    "no-plusplus": "off"
  },
};
