module.exports = {
  root: true,
  env: {
    node: true,
    browser: true,
    es6: true,
    mocha: true
  },
  globals: {
    FB: 'readable'
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
    indent: ['error', 2, { SwitchCase: 1 }],
    'linebreak-style': ['error', 'unix'],
    quotes: ['error', 'single', { avoidEscape: true }],
    semi: ['error', 'always'],
    'no-multi-assign': 0,
    'no-unused-vars': ['error', { args: 'none' }],
    'no-use-before-define': ['error', 'nofunc'],
    'no-console': 0,
    'import/no-extraneous-dependencies': 0,
    'import/no-unresolved': ['error'],
    'import/first': 0,
    'import/prefer-default-export': 1
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
  plugins: ['prettier', 'vue', 'json', 'import']
};
