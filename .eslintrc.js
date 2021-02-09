module.exports = {
  extends: [
    'react-app',
    'react-app/jest',
    'plugin:prettier/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:import/typescript',
  ],
  plugins: ['prettier'],
  rules: {
    // Organize the imports
    // https://github.com/benmosher/eslint-plugin-import
    'import/newline-after-import': 'warn',
    'import/order': [
      'warn',
      {
        'newlines-between': 'always',
      },
    ],

    // Allow TS comments
    '@typescript-eslint/ban-ts-comment': 'off',

    // Add a space at the start of a comment
    'spaced-comment': ['warn'],
  },
};
