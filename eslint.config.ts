import tseslint from 'typescript-eslint';
import pluginVue from 'eslint-plugin-vue';
import pluginUnicorn from 'eslint-plugin-unicorn';
import stylistic from '@stylistic/eslint-plugin';
import vueParser from 'vue-eslint-parser';

export default [
  {
    files: ['**/*.ts', '**/*.vue'],
    ignores: ['dist', 'node_modules', 'coverage'],

    languageOptions: {
      parser: vueParser,
      parserOptions: {
        parser: tseslint.parser,
        ecmaVersion: 'latest',
        sourceType: 'module',
        extraFileExtensions: ['.vue'],
      },
      globals: {
        defineProps: 'readonly',
        defineEmits: 'readonly',
        defineExpose: 'readonly',
        withDefaults: 'readonly',
        console: 'off',
      },
    },

    plugins: {
      vue: pluginVue,
      '@typescript-eslint': tseslint.plugin,
      unicorn: pluginUnicorn,
      '@stylistic': stylistic,
    },

    rules: {
      indent: ['error', 2],
      quotes: ['error', 'single'],
      semi: ['error', 'always'],
      'comma-dangle': ['error', 'always-multiline'],
      eqeqeq: ['error', 'always'],
      'no-var': 'error',
      'no-console': 'error',
      'no-multi-spaces': 'error',
      'no-multiple-empty-lines': ['error', { max: 1 }],
      'object-curly-spacing': ['error', 'always'],
      'space-infix-ops': 'error',

      '@typescript-eslint/no-explicit-any': 'error',
      '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
      '@typescript-eslint/consistent-type-definitions': ['error', 'interface'],
      '@stylistic/type-annotation-spacing': 'error',

      'unicorn/filename-case': 'off',

      'vue/html-indent': ['error', 2],
      'vue/max-attributes-per-line': ['error', { singleline: 99, multiline: 1 }],
      'vue/html-self-closing': ['error', {
        html: { void: 'always', normal: 'never', component: 'always' },
      }],
    },
  },
];
