import type { ESize } from './enums'

export interface ISelectProps<T> {
  validMessage?: string
  options: T[]
  clearable?: boolean
  filterable?: boolean
  multiple?: boolean
  readonly?: boolean
  disabled?: boolean
  placeholder?: string
  modelValue?: string | number | string[] | number[]
  searchPopover?: boolean
  class?: string
  collapseTags?: boolean
  maxCollapseTags?: number
  // useSelectLabel?: boolean
  // selectLabel?: string
}

export interface ITreeSelectProps<T> {
  treeData: T[]
  renderAfterExpand?: boolean
  showCheckbox?: boolean
  checkStrictly?: boolean
  multiple?: boolean
  placeholder?: string
  modelValue?: string | number | string[] | number[]

}

export interface ITree<T> {
  children?: T[]
  disabled?: boolean
}

export interface IOptions {
  value: string | number
  label: string
  disabled?: boolean
}

export interface ITreeData extends ITree<ITreeData> {
  value: string | number
  label: string
  code?: string | number
}
