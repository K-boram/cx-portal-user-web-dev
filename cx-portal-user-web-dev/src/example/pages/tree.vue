<script setup lang="ts">
import mockTreeData from '~/example/mock/treeData.js'
import Tree from '~/example/components/tree/Tree.vue'
import type { ITreeData } from '~/example/types/tree'
import type { INodeItemKey } from '~/types/tree'

const nodeItemKey: INodeItemKey = {
  value: 'id',
  label: 'label',
  children: 'children'
}
const treeData = ref<ITreeData[]>(mockTreeData)
const checkList = ref<string[]>([])
const setCheckList = (checkedList: string[]) => {
  checkList.value = checkedList
}

const clickednode = (clickedNodeInfo: ITreeData) => {
  console.log('클릭한 노드 정보>>>>>', clickedNodeInfo);
}
</script>

<template>
  <div>
    <p>필터가 있고 체크박스가 없는 트리</p>
    <Tree :tree-data="treeData" :node-item-key="nodeItemKey" use-filter @clicked-node="clickednode" />
    <p>데이터만 보여주는 트리</p>
    <Tree :tree-data="treeData" :node-item-key="nodeItemKey" />
  </div>
</template>

<style scoped></style>
