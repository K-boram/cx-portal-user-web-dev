<script lang="ts" setup>
import type { RowClassNameGetter } from 'element-plus'
import { TableV2FixedDir } from 'element-plus'
import CustomHeaderCell from '~/components/table/CustomHeaderCell.vue'
import VirtualizedTable from '~/components/table/VirtualizedTable.vue'
import { generateColumns, generateData } from '~/example/pages/use-table'

const columns = generateColumns(10)
const data = generateData(columns, 3000)

columns[1].sortable = true
columns[5].sortable = true
columns[0].fixed = true
columns[1].fixed = TableV2FixedDir.LEFT

// cellRenderer 사용시 tsx 문법 사용 성능 이슈
const onClick = (rowData) => {
  alert('clicked!!')
  console.log(rowData)
}

const rowClass = ({ rowIndex }: Parameters<RowClassNameGetter<any>>[0]) => {
  if (rowIndex % 10 === 5)
    return 'bg-red-100'
  else if (rowIndex % 10 === 0)
    return 'bg-blue-200'

  return ''
}
</script>

<template>
  <VirtualizedTable
    :columns="columns"
    :data="data"
    :height="800"
    :width="1200"
    :row-height="50"
    :header-height="[50, 50]"
    :row-class="rowClass"
    fixed
  >
    <template #header="slotData">
      <template v-if="slotData.headerIndex === 0">
        <CustomHeaderCell title="서비스영역" cell-name="column-0" :merge-row="2" v-bind="slotData" />
        <CustomHeaderCell title="COL2" cell-name="column-1" :merge-row="2" v-bind="slotData" />
        <CustomHeaderCell title="8월" :merge-cell="[2, 5]" v-bind="slotData" />
        <CustomHeaderCell title="24년" :merge-cell="[6, 8]" v-bind="slotData" />
        <CustomHeaderCell title="COL9" cell-name="column-9" :merge-row="2" v-bind="slotData" />
      </template>
      <template v-else>
        <component :is="cell" v-for="cell in slotData.cells" :key="cell.name" :name="cell.name" />
      </template>
    </template>
    <template #cell="{ columns, column, columnIndex, rowData, rowIndex }">
      <template v-if="column.dataKey === 'column-5'">
        <el-avatar :size="30" />
      </template>
      <template v-if="columnIndex === 9">
        <ElButton @click="onClick(rowData)">
          CLICK
        </ElButton>
      </template>
    </template>
  </VirtualizedTable>
</template>
