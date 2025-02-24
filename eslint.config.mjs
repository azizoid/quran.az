import { FlatCompat } from '@eslint/eslintrc'

import { dirname } from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const compat = new FlatCompat({
  baseDirectory: __dirname,
})

const eslintConfig = [
  ...compat.extends('next/core-web-vitals', 'next/typescript'),
  {
    ignores: ['node_modules', '.next'],
  },
  {
    rules: {
      'no-console': 'error',
      'semi': ['error', 'never'],
      'quotes': ['error', 'single'],
      'no-mixed-spaces-and-tabs': 'error',
      'no-trailing-spaces': 'error',
      'no-multi-spaces': 'error',
      'arrow-spacing': 'error',
      'prefer-arrow-callback': 'error',
      'brace-style': [ 'error', '1tbs', { 'allowSingleLine': true }],
      'no-use-before-define': 'error',
      'prefer-const': 'error',
      'no-unneeded-ternary': 'error',
      'no-shadow': 'error',
      'no-multiple-empty-lines': ['error', { 'max': 1, 'maxEOF': 0, 'maxBOF': 0 }],
      'import/order': [
        'error',
        {
          'groups': ['type', 'builtin', 'external', 'internal', 'parent', 'sibling', 'index'],
          'pathGroups': [
            { 'pattern': 'react', 'group': 'external', 'position': 'before' },
            { 'pattern': '@next/*', 'group': 'internal', 'position': 'before' },
            { 'pattern': '@/**', 'group': 'internal' },
            { 'pattern': '*', 'group': 'external', 'position': 'after' }
          ],
          'pathGroupsExcludedImportTypes': ['react'],
          'newlines-between': 'always',
          'alphabetize': { 'order': 'asc', 'caseInsensitive': true }
        }
      ],
    },

  }
]

export default eslintConfig
