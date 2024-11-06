<script lang="ts" setup>
import { ElTreeV2 } from 'element-plus'
import type Node from 'element-plus/es/components/tree/src/model/node'
import type { DragEvents } from 'element-plus/es/components/tree/src/model/useDragNode'
import type { ICheckedList, INodeItemKey } from '~/types/tree'
import type { ITreeData } from '~/example/types/tree'
import type { TreeNode } from 'element-plus/es/components/tree-v2/src/types'

const props = withDefaults(defineProps<{
  treeData: ITreeData[]
  draggable?: boolean
  showCheckbox?: boolean
  useFilter?: boolean
  nodeItemKey: INodeItemKey
  defaultExpandedKeys?: string[]
  defaultCheckedKeys?: string[]
}>(), {
  draggable: false,
  showCheckbox: false,
  defaultExpandAll: false,
  useFilter: false,
  defaultExpandedKeys: () => [],
  defaultCheckedKeys: () => []
})

const emit = defineEmits<{
  (e: 'checkedList', checkedList: string[]): void
  (e: 'clickedNode', clickedNodeInfo: ITreeData): void
}>()

const filterText = ref('')
const treeRef = ref<InstanceType<typeof ElTreeV2>>()
// const checkedList = ref<string[]>([])

// 노드 클릭 시 실행
const clickNode = (clickedNode: Node, _ev: DragEvents) => {
  emit('clickedNode', clickedNode)
}

// 노드 체크박스 클릭 시 실행
// const checkNode = (checkedNode: ICheckedList) => {
//   checkedList.value = checkedNode.checkedNodes
//   emit('checkedList', checkedList.value)
// }

// 노드 검색
const filterNode = (value: string, data: TreeNode) => {
  return data.label!.includes(value)
}

// 검색
const searchText = () => {
  treeRef.value!.filter(filterText.value)
}

// 전체 닫기 버튼 클릭 시 실행     Todo: 하위도 닫기 기능
const collapseAll = () => {
  const treeInstance = treeRef.value
  if (treeInstance) {
    const rootNode = treeInstance.store.root
    rootNode.childNodes.forEach((node) => {
      node.collapse()
    })
  }
}

// 전체 열기 버튼 클릭 시 실행
const expandAll = () => {
  const treeInstance = treeRef.value
  if (treeInstance) {
    const rootNode = treeInstance.store.root
    rootNode.childNodes.forEach((node) => {
      node.expand()
    })
  }
}
</script>

<template>
  <div>
    <CustomInput v-if="props.useFilter" v-model="filterText" class="mb-3" placeholder="Filter keyword"
      @keypress-enter="searchText" />

    <el-tree-v2 ref="treeRef" :data="props.treeData" :props="props.nodeItemKey" :filter-method="filterNode"
      @node-click="clickNode" />
  </div>
</template>
