module.exports = {
  root: true,
  env: {
    node: true,
    browser: true,
    es6: true
  },
  extends: [
    'airbnb',
    'eslint:recommended',
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:vue/recommended',
    'prettier',
    'prettier/vue'
  ],
  parserOptions: {
    parser: 'babel-eslint',
    sourceType: 'module',
    echmaVersion: 7,
    ecmaFeatures: {
      jsx: true
    }
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
  },
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.json', '.vue']
      },
      alias: {
        map: [
          ['@root', './'],
          ['@app', './app/'],
          ['@tools', './tools/'],
          ['@client', './app/client/'],
          ['@server', './app/server/'],
          ['@config', './app/config/']
        ],
        extensions: ['.js', '.json', '.vue']
      }
    }
  },
  plugins: ['prettier', 'vue', 'json', 'import', 'import-order-autofix']
};
