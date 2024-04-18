/** @type {import('eslint').Linter.Config} */
module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:prettier/recommended',
    'plugin:jsx-a11y/recommended',
    '@remix-run/eslint-config',
    '@remix-run/eslint-config/node',
  ],
  plugins: ['import', 'prettier', 'jsx-a11y', 'react', 'react-hooks'],
  rules: {
    'import/order': [
      'error',
      {
        alphabetize: {
          order: 'asc',
          caseInsensitive: true,
        },
        groups: ['external', 'builtin', 'internal', 'parent', 'sibling', 'index', 'object', 'type'],
      },
    ],
    'prefer-const': 'error',
    curly: ['error', 'all'],
    'no-extra-boolean-cast': 'off',
    'no-debugger': 'error',

    '@typescript-eslint/ban-ts-comment': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/ban-types': 'off',
    '@typescript-eslint/no-empty-function': 'off',

    '@typescript-eslint/no-var-requires': 'warn',

    '@typescript-eslint/no-use-before-define': 'error',
    '@typescript-eslint/no-unused-vars': [
      'error',
      {
        varsIgnorePattern: '^_',
        argsIgnorePattern: '^_',
        vars: 'all',
        args: 'all',
      },
    ],
    '@typescript-eslint/consistent-type-definitions': ['error', 'interface'],

    'react/jsx-filename-extension': [1, { extensions: ['.ts', '.tsx'] }],
    'react/sort-comp': [
      1,
      {
        order: [
          'static-methods',
          'static-variables',
          'instance-variables',
          'type-annotations',
          'lifecycle',
          'everything-else',
          'render',
        ],
        groups: {
          lifecycle: [
            'displayName',
            'propTypes',
            'contextTypes',
            'childContextTypes',
            'mixins',
            'statics',
            'defaultProps',
            'constructor',
            'getDefaultProps',
            'state',
            'getInitialState',
            'getChildContext',
            'getDerivedStateFromProps',
            'getDerivedStateFromError',
            'componentWillMount',
            'UNSAFE_componentWillMount',
            'componentDidMount',
            'componentWillReceiveProps',
            'UNSAFE_componentWillReceiveProps',
            'shouldComponentUpdate',
            'componentWillUpdate',
            'UNSAFE_componentWillUpdate',
            'getSnapshotBeforeUpdate',
            'componentDidUpdate',
            'componentDidCatch',
            'componentWillUnmount',
          ],
        },
      },
    ],

    'react/react-in-jsx-scope': 'off',
    'react/no-unescaped-entities': 'off',
    'react-hooks/exhaustive-deps': 'warn',
    'react-hooks/rules-of-hooks': 'warn',

    'jsx-a11y/click-events-have-key-events': 'off',
    'jsx-a11y/no-static-element-interactions': 'off',
    'jsx-a11y/no-noninteractive-element-interactions': 'off',
    'jsx-a11y/no-autofocus': 'off',
    'jsx-a11y/media-has-caption': 'off',
    '@typescript-eslint/no-unnecessary-type-constraint': 'off',
    'import/no-duplicates': 'off',

    'prettier/prettier': [
      'error',
      {
        semi: true,
        tabWidth: 2,
        printWidth: 100,
        singleQuote: true,
        jsxBracketSameLine: false,
        endOfLine: 'auto',
        jsxSingleQuote: true,
        trailingComma: 'all',
        arrowParens: 'always',
        useTabs: false,
        bracketSameLine: false,
      },
    ],
  },
};
