module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
    es2020: true
  },

  parser: 'vue-eslint-parser',
  parserOptions: {
    ecmaVersion: 'latest',
    parser: '@typescript-eslint/parser'
  },

  ignorePatterns: ['dist', '.eslintrc.js', 'tailwind.config.cjs'],

  extends: [
    'eslint:recommended',
    'plugin:vue/strongly-recommended',
    'plugin:@typescript-eslint/recommended',
    '@nuxtjs/eslint-config-typescript',

    'plugin:unicorn/recommended',
    'plugin:prettier/recommended',
    'prettier'
  ],
  plugins: ['@typescript-eslint', 'simple-import-sort', 'import', 'prettier'],
  rules: {
    // 'no-console': 'warn',
    curly: 'error',
    'no-console': 'off',

    'unicorn/prevent-abbreviations': 'off',
    'unicorn/filename-case': 'off',
    'unicorn/prefer-module': 'off',
    'unicorn/no-null': 'off',
    'unicorn/no-useless-undefined': 'off',
    'unicorn/no-array-for-each': 'off',
    'unicorn/no-empty-file': 'off',
    'unicorn/expiring-todo-comments': 'off',

    'vue/no-multiple-template-root': 'off',
    'vue/no-v-for-template-key': 'off',
    'vue/no-v-html': 'off',

    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': [
      'error',
      {
        varsIgnorePattern: '^_',
        argsIgnorePattern: '^_'
      }
    ],

    'import/order': 'off',
    'simple-import-sort/imports': 'error',
    'import/newline-after-import': 'error',
    'simple-import-sort/exports': 'error',
    'import/first': 'error'
  }
}
