module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'plugin:react/recommended',
    'airbnb',
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: [
    'react',
  ],
  rules: {
    'react/jsx-uses-react': 'off',
    'react/react-in-jsx-scope': 'off',
    'react/prop-types': 0,
    'react/jsx-no-constructed-context-values': 0,
    'linebreak-style': 0,
    'react/jsx-props-no-spreading': 0,
    'max-len': 0,
    semi: ['error', 'never'],
    'no-console': 0,
    'no-alert': 0,
    'func-names': ['error', 'never'],
  },
}
