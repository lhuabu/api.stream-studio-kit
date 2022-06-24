/* ---------------------------------------------------------------------------------------------
 * Copyright (c) Infiniscene, Inc. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 * -------------------------------------------------------------------------------------------- */
import { Disposable } from '../core/types'
import type { NodeId, PropsDefinition, SceneNode } from './compositor'
import type { Source } from './sources'

// TODO: Make this generic to HTML/Canvas when canvas compositing is supported

export type TransformDeclaration = {
  name: string
  sourceType?: string // TODO: keyof SourceType
  useSource?: (sources: Source[], nodeProps: any) => Source
  tagName?: string
  props?: PropsDefinition
  create?: (
    context: TransformContext,
    initialProps: any,
  ) => TransformElementBase
}

export type TransformElementBase = {
  root: HTMLElement
  /** Cleanup to run when node is removed from the scene tree */
  dispose?: () => void
}
export type TransformElement = TransformElementBase & {
  nodeId: string
  sourceType: string
  transformName: string
  // The source currently in use by the element
  source?: Source
  sourceValue?: any
  _onNewSourceHandlers: Function[]
  _onUpdateHandlers: Function[]
}

export type TransformMap = {
  [name: string]: TransformDeclaration
}
export type DefaultTransformMap = {
  [sourceType: string]: TransformDeclaration['name']
}

export type TransformSettings = {
  defaultTransforms?: DefaultTransformMap
}

export type TransformRegister = (
  declaration: TransformDeclaration | TransformDeclaration[],
) => void

export type TransformElementGetter = (node: SceneNode) => TransformElement

export type TransformContext = {
  trigger: (event: string, payload: any) => void
  /** Listens for all events emitted by the compositor */
  onEvent?: (event: string, cb: (payload: any) => void, nodeId?: string) => Disposable
  /** Called anytime the Source value returned by useSource is different */
  onNewSource?: (cb: (source: Source) => void) => void
  /** Called anytime the Source value itself has been modified */
  onSourceModified?: (cb: (source: Source) => void) => void
  /** Called anytime the Node associated with the element has been updated */
  onUpdate?: (cb: (nodeProps: any) => void) => void

  nodeId : NodeId
}

export type Filter = (node: SceneNode) => SceneNode

// Run the pipeline of filters in order
export const runFilters = (node: SceneNode, filters: Filter[] = []) => {
  return filters.reduce((node, filter) => filter(node), node)
}