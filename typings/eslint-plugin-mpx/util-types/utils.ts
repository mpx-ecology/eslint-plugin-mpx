import * as VAST from './ast'
export type MpxObjectType = 'createApp' | 'createPage' | 'createComponent'
export type MpxObjectData = {
  node: ObjectExpression
  type: MpxObjectType
  parent: MpxObjectData | null
  functional: boolean
}
type VueVisitorBase = {
  [T in keyof NodeListenerMap]?: (
    node: NodeListenerMap[T],
    obj: MpxObjectData
  ) => void
}
export interface VueVisitor extends VueVisitorBase {
  onVueObjectEnter?(node: ObjectExpression, obj: MpxObjectData): void
  onVueObjectExit?(node: ObjectExpression, obj: MpxObjectData): void
  onSetupFunctionEnter?(
    node: (FunctionExpression | ArrowFunctionExpression) & { parent: Property },
    obj: MpxObjectData
  ): void
  onRenderFunctionEnter?(
    node: (FunctionExpression | ArrowFunctionExpression) & { parent: Property },
    obj: MpxObjectData
  ): void
  [query: string]:
    | ((node: VAST.ParamNode, obj: MpxObjectData) => void)
    | undefined
}

export type ComponentUnknownProp = {
  type: 'unknown'
  key: null
  propName: null
  value: null
  node: Expression | SpreadElement | null
}