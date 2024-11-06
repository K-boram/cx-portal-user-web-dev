<script lang="tsx" setup>
import { generateColumns, generateData } from '~/example/pages/use-table'
import type { CellSelectOption } from '~/components/table/CellSelect.vue'
import CellSelect from '~/components/table/CellSelect.vue'
import type { ITreeData } from '~/types/custom-dropdown'

const columns = generateColumns(10)
const data = ref<any>(generateData(columns, 3000))
const options = ref<ITreeData[]>([{ label: 'label1', value: '1' }, { label: 'label2', value: '2' }])
const subOptions = ref<CellSelectOption[]>([{ label: 'sub-label1', value: 'sub1', groupKey: '1' }, { label: 'sub-label2', value: 'sub2', groupKey: '2' }])
</script>

<template>
  <div>
    <el-table-v2 :columns="columns" :data="data" :height="800" :width="1600">
      <template #cell="{ column, cellData, rowData, rowIndex }">
        <template v-if="column.key === 'column-0'">
          <CellSelect v-model="rowData[column.key]" :options="options" />
        </template>
        <template v-else-if="column.key === 'column-1'">
          <CellSelect v-model="rowData[column.key]" :group-key="rowData['column-0']" :options="subOptions" />
        </template>
        <template v-else>
          {{ rowData[column.key] }}
        </template>
      </template>
    </el-table-v2>
  </div>
  <div />
</template>
