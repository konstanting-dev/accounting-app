'use strict';

module.exports = {
  extends: ['plugin:react/recommended', 'airbnb/hooks', './.eslintrc.base.js'],
  rules: {
    'jsx-a11y/anchor-is-valid': 'error',
    'react/prop-types': 'off',
    'react/require-default-props': 'off',
    'react/jsx-props-no-spreading': 'off',
    'react/jsx-filename-extension': 'error',
    'react/jsx-uses-react': 'off',
    'react/react-in-jsx-scope': 'off',
    'react/function-component-definition': 'off',
    'react/jsx-fragments': 'error',
    'react/destructuring-assignment': ['error', 'always', { destructureInSignature: 'always' }],
    'react/jsx-key': [
      'error',
      {
        checkFragmentShorthand: true,
        checkKeyMustBeforeSpread: true,
        warnOnDuplicates: true,
      },
    ],
    'react/jsx-no-useless-fragment': 'error',
    'react/display-name': 'warn',
    'react/self-closing-comp': 'error',
    'react/jsx-sort-props': 'off',
    'react/jsx-one-expression-per-line': 'off',
    'react/no-danger': 'error',
  },
  settings: {
    react: {
      pragma: 'React',
      version: 'detect',
    },
  },
};
