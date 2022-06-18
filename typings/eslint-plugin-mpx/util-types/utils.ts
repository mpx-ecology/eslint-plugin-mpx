import * as VAST from './ast'
export type MpxObjectType = 'createApp' | 'createPage' | 'createComponent'
export type MpxObjectData = {
  node: ObjectExpression
  type: MpxObjectType
  parent: MpxObjectData | null
  functional: boolean
}
type MpxVisitorBase = {
  [T in keyof NodeListenerMap]?: (
    node: NodeListenerMap[T],
    obj: MpxObjectData
  ) => void
}
export interface MpxVisitor extends MpxVisitorBase {
  onMpxObjectEnter?(node: ObjectExpression, obj: MpxObjectData): void
  onMpxObjectExit?(node: ObjectExpression, obj: MpxObjectData): void
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