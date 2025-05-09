module.exports = {
  root: true,
  env: {
    node: true,
    jest: true,
  },

  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: 'tsconfig.json',
    tsconfigRootDir: __dirname,
    sourceType: 'module',
  },

  plugins: ['@typescript-eslint/eslint-plugin'],
  extends: ['plugin:@typescript-eslint/recommended', 'plugin:prettier/recommended'],

  rules: {
    'no-console': ['warn', { allow: ['warn', 'error'] }],

    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-var-requires': 'off',
    '@typescript-eslint/no-empty-interface': 'off',
  },

  overrides: [
    {
      files: ['src/**/schemas/**/*.ts'],
      plugins: ['custom'],
      rules: {
        'custom/required-column-comment': 'error',
      },
    },
  ],
};
