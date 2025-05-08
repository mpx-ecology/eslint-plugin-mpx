import type { Linter } from 'eslint'

declare const mpx: {
  meta: any
  configs: {
    base: Linter.LegacyConfig
    'mpx-essential': Linter.LegacyConfig
    'composition-api-essential': Linter.LegacyConfig
    'flat/base': Linter.FlatConfig[]
    'flat/mpx-essential': Linter.FlatConfig[]
    'flat/composition-api-essential': Linter.FlatConfig[]
  }
  rules: Record<string, any>
  processors: {
    '.vue': any
    vue: any
  }
}

export = mpx
