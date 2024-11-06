<script setup lang="ts">
import { cloneVNode } from 'vue'
import type { VNode } from 'vue'
import type { Column } from 'element-plus'
import _ from 'lodash'

interface HeaderCellProps {
  cells: VNode[]
  cellName?: string
  headerIndex: number
  columns: Column[]
  title: string
  dataKey?: string
  height?: number
  mergeCell?: number[]
  mergeRow?: number
}
const props = defineProps<HeaderCellProps>()
const { headerHeight } = inject('commonProps', {
  headerHeight: [],
})
const cell = computed((): VNode | null => {
  const findCell = props.cells?.find((cell) => {
    return cell.props?.column.dataKey === props.cellName
  })
  if (!_.isEmpty(findCell)) {
    const mergeRow = props.mergeRow || 1
    const style = {
      ...findCell.props!.style,
      height: `${mergeRow * height.value - 1}px`,
      alignSelf: 'flex-start',
      zIndex: 1,
    }
    const column = {
      ...findCell.props!.column,
      title: props.title,
    }
    return cloneVNode(findCell, { style, column })
  }
  return null
})
const height = computed((): number => {
  return headerHeight[props.headerIndex]
})
const width = computed((): number => {
  const [startIndex, endIndex] = props.mergeCell ? props.mergeCell : []
  const sum = _.chain(props.cells)
    .filter((cell) => {
      const columnIndex = cell.props!.columnIndex
      return startIndex <= columnIndex && columnIndex <= endIndex
    })
    .map(cell => cell.props!.style.width)
    .sum()
    .value()
  return sum
})
const hasCellNode = computed((): boolean => {
  return !_.isEmpty(cell.value)
})
</script>

<template>
  <template v-if="hasCellNode">
    <component :is="cell" :name="cell.name" />
  </template>
  <template v-else>
    <div
      class="el-table-v2__header-cell is-align-center"
      role="columnheader"
      :style="{
        flex: '0 0 auto',
        zIndex: 1,
        width: `${width - 1}px`,
      }"
    >
      {{ title }}
    </div>
  </template>
</template>
