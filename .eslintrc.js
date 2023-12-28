module.exports = {
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint/eslint-plugin'],
  extends: ['plugin:@typescript-eslint/recommended', 'plugin:prettier/recommended'],
  env: {
    node: true,
    jest: true,
  },
  ignorePatterns: ['.eslintrc.js'],
  overrides: [
    {
      files: ['*.js'],
      rules: {
        quotes: [2, 'single', { avoidEscape: true }],
        'react/prop-types': 'off',
        'prettier/prettier': 'off',
        '@typescript-eslint/no-var-requires': 'off',
        '@typescript-eslint/no-empty-function': 'off',
        '@typescript-eslint/no-unused-vars': 'off',
      },
    },
    {
      files: ['*.ts'],
      rules: {
        quotes: [2, 'single', { avoidEscape: true }],
        'import/no-unresolved': 'off',
        'prettier/prettier': 'off',
        'sonarjs/no-duplicate-string': 'off',
        '@typescript-eslint/no-explicit-any': 'off',
        '@typescript-eslint/no-unused-vars': 'off',
        '@typescript-eslint/explicit-module-boundary-types': 'off',
        '@typescript-eslint/no-var-requires': 'off',
      },
    },
    {
      files: ['*.spec.ts'],
      rules: {
        quotes: [2, 'single', { avoidEscape: true }],
        '@typescript-eslint/no-explicit-any': 'off',
        'prettier/prettier': 'off',
        '@typescript-eslint/no-empty-function': 'off',
        '@typescript-eslint/no-unused-vars': 'off',
      },
    },
  ],
};
