import { FlatCompat } from '@eslint/eslintrc'

import propperNextJsPlugin from 'eslint-plugin-propper-nextjs'
import { dirname } from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const compat = new FlatCompat({
  baseDirectory: __dirname,
})

const eslintConfig = [
  ...compat.extends('next/core-web-vitals', 'next/typescript'),
  propperNextJsPlugin.configs.recommended,
  {
    ignores: ['node_modules', '.next'],
  },
  {
    rules: {
      'semi': ['error', 'never'],
    },
  }
]

export default eslintConfig
