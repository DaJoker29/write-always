module.exports = {
  env: {
    node: true
  },
  extends: ['airbnb', 'plugin:prettier/recommended', 'plugin:vue/recommended'],
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    sourceType: 'module'
  },
  rules: {
    'prettier/prettier': ['error', { singleQuote: true }],
    indent: ['error', 2],
    'linebreak-style': ['error', 'unix'],
    quotes: ['error', 'single'],
    semi: ['error', 'always']
  },
  plugins: ['json', 'import', 'import-order-autofix']
};
