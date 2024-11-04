const RULES = {
  OFF: 'off',
  WARN: 'warn',
  ERROR: 'error',
}

module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ['standard', 'prettier'],
  plugins: ['prettier', 'vue'],
  overrides: [
    {
      env: {
        node: true,
      },
      files: ['.eslintrc.{js,cjs}'],
      parserOptions: {
        sourceType: 'script',
      },
    },
    {
      files: ['*.vue'],
      parser: 'vue-eslint-parser',
      rules: {
        'vue/html-indent': RULES.ERROR,
        'vue/multiline-html-element-content-newline': RULES.ERROR,
        'vue/first-attribute-linebreak': RULES.OFF,
        'vue/require-default-prop': RULES.OFF,
        'vue/singleline-html-element-content-newline': 0,
        'vue/component-name-in-template-casing': [RULES.ERROR, 'PascalCase'],
        'vue/html-quotes': [RULES.ERROR, 'double', { avoidEscape: true }],
        'vue/mustache-interpolation-spacing': [RULES.ERROR, 'always'],
        'vue/no-multi-spaces': [
          RULES.ERROR,
          {
            ignoreProperties: false,
          },
        ],
        'vue/no-spaces-around-equal-signs-in-attribute': [RULES.ERROR],
        'vue/v-on-style': [RULES.ERROR, 'shorthand'],
        'vue/v-bind-style': [RULES.ERROR, 'shorthand'],
        'vue/multi-word-component-names': RULES.OFF,
        'vue/no-setup-props-destructure': RULES.OFF,
        'vue/no-v-text-v-html-on-component': RULES.OFF,
      },
    },
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  rules: {
    'prettier/prettier': RULES.ERROR,
    'arrow-spacing': RULES.ERROR,
    'no-unused-vars': [RULES.ERROR, { args: 'all' }],
    'object-curly-spacing': [RULES.ERROR, 'always'],
    'array-callback-return': [RULES.OFF, { checkForEach: true }],
    'no-return-assign': RULES.OFF,
    'no-mixed-operators': RULES.OFF,
  },
}