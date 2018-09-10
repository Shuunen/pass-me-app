module.exports = {
  extends: [
    // add more generic rulesets here, such as:
    // 'eslint:recommended',
    'plugin:vue/essential'
  ],
  // add your custom rules here
  rules: {
    'semi': ['error', 'never'],
    'quotes': ['error', 'single'],
    'indent': ['error', 2],
    'brace-style': 'error',
    'yoda': 'error',
    'keyword-spacing': ['error', { 'before': true, 'after': true }],
    'space-infix-ops': 'error',
    'space-unary-ops': 'error',
    'block-spacing': 'error',
    'no-irregular-whitespace': 'error',
    'spaced-comment': ['error', 'always'],
    'space-before-function-paren': ['error', 'always'],
    'space-before-blocks': ['error', 'always'],
    'no-console': 'off',
    'vue/attributes-order': 'off',
    'vue/max-attributes-per-line': 'off',
  },
}
