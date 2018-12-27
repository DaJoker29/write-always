const alias = [
  ['@root', './'],
  ['@app', './app/'],
  ['@tools', './tools/'],
  ['@config', './app/config/']
];

module.exports = {
  env: {
    node: true
  },
  extends: [
    'eslint:recommended',
    'airbnb',
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:prettier/recommended',
    'plugin:vue/recommended'
  ],
  parserOptions: {
    echmaVersion: 7,
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
    semi: ['error', 'always'],
    'import-order-autofix/order': 1,
    'no-multi-assign': 0,
    'no-use-before-define': ['error', 'nofunc'],
    'no-console': 0,
    'import/no-extraneous-dependencies': 0,
    'import/no-unresolved': ['error']
    // TODO: Fix this rule so the @imports don't fail in the JS
  },
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.json', '.vue']
      },
      alias
    }
  },
  plugins: ['json', 'import', 'import-order-autofix']
};
