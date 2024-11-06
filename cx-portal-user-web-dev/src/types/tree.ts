export interface ITree<T> {
  children?: T[]
  disabled?: boolean
}

export interface INodeItemKey {
  value: string | number // node 아이디로 사용
  label: string // node 명으로 사용
  children: string // 자식 key
  disabled?: string
}

export interface ICheckedList {
  checkedKeys: string[]
  checkedNodes: string[]
  halfCheckedKeys: string[]
  halfCheckedNodes: string[]
}
