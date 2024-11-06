<script lang="ts" setup>
import { TableV2FixedDir } from 'element-plus'
import VirtualizedTable from '~/components/table/VirtualizedTable.vue'
import { unflatten } from '~/utils/comlib'

const generateColumns = (length = 10, prefix = 'column-', props?: any) =>
  Array.from({ length }).map((_, columnIndex) => ({
    ...props,
    key: `${prefix}${columnIndex}`,
    dataKey: `${prefix}${columnIndex}`,
    title: `Column ${columnIndex}`,
    width: 150,
  }))

const generateData = (
  columns: ReturnType<typeof generateColumns>,
  length = 200,
  prefix = 'row-',
) =>
  Array.from({ length }).map((_, rowIndex) => {
    return columns.reduce(
      (rowData, column, columnIndex) => {
        rowData[column.dataKey] = `Row ${rowIndex} - Col ${columnIndex}`
        return rowData
      },
      {
        id: `${prefix}${rowIndex}`,
        parentId: null,
      },
    )
  })

const columns = generateColumns(10).map((column, columnIndex) => {
  let fixed!: TableV2FixedDir
  if (columnIndex < 2)
    fixed = TableV2FixedDir.LEFT
  if (columnIndex > 8)
    fixed = TableV2FixedDir.RIGHT
  return { ...column, fixed }
})

const data = generateData(columns, 200)

const expandColumnKey = 'column-0'

// add some sub items
for (let i = 0; i < 50; i++) {
  data.push(
    {
      ...data[0],
      id: `${data[0].id}-sub-${i}`,
      parentId: data[0].id,
      [expandColumnKey]: `Sub ${i}`,
    },
    {
      ...data[2],
      id: `${data[2].id}-sub-${i}`,
      parentId: data[2].id,
      [expandColumnKey]: `Sub ${i}`,
    },
    {
      ...data[2],
      id: `${data[2].id}-sub-sub-${i}`,
      parentId: `${data[2].id}-sub-${i}`,
      [expandColumnKey]: `Sub-Sub ${i}`,
    },
  )
}
const treeData = computed(() => unflatten(data))

const onRowExpanded = (expanded: boolean) => {
  console.log('Expanded:', expanded)
}

const onExpandedRowsChange = (expandedKeys: string[]) => {
  console.log(expandedKeys)
}
</script>

<template>
  <VirtualizedTable
    :columns="columns"
    :data="treeData"
    :height="800"
    :width="1200"
    :row-height="50"
    :expand-column-key="expandColumnKey"
    fixed
    @row-expanded="onRowExpanded"
    @expanded-rows-change="onExpandedRowsChange"
  />
</template>
