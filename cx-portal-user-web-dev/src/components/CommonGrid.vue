<script setup lang="ts">
import type { IColumn } from '~/types/grid'

// radio 또는 checkbox 는 둘중 하나만 사용 가능
const props = withDefaults(defineProps<{
  name: string // 그리드 명칭
  rowId: string // row ID 로 사용되는 key 값
  columns: IColumn[]
  rows: any[]
  checkboxInfo?: IColumn
  radioInfo?: IColumn
  noDataText?: string
}>(), {
  noDataText: '조회된 데이터가 없습니다.',
})
const selectedList = defineModel<Array<string>>('selectedList')
const radioSelected = defineModel<string>('radioSelected')

const setNoDataColspan = () => {
  if (props.checkboxInfo?.visible || props.radioInfo?.visible)
    return props.columns.length + 1
  else
    return props.columns.length
}
</script>

<template>
  <table class="cm-table">
    <template v-if="columns.length">
      <colgroup>
        <col v-if="checkboxInfo?.visible" :width="checkboxInfo?.width">
        <col v-if="radioInfo?.visible" :width="radioInfo?.width">
        <slot v-for="column of columns" name="colgroup" :width="column.width" />
      </colgroup>
    </template>
    <thead>
      <tr>
        <!-- checkbox -->
        <th v-if="checkboxInfo?.visible">
          {{ checkboxInfo?.name }}
        </th>
        <!-- radio -->
        <th v-if="radioInfo?.visible">
          {{ radioInfo?.name }}
        </th>
        <template v-if="columns.length">
          <slot v-for="column of columns" name="header" :column="column" />
        </template>
      </tr>
    </thead>
    <tbody>
      <template v-if="rows.length">
        <tr v-for="(row, index) of rows" :key="`${name}-grid-row-${row[rowId]}`">
          <!-- checkbox -->
          <td v-if="checkboxInfo?.visible">
            <div class="flex items-center justify-center">
              <input v-model="selectedList" type="checkbox" :value="row[rowId]">
            </div>
          </td>
          <!-- radio -->
          <td v-if="radioInfo?.visible">
            <div class="flex items-center justify-center">
              <input v-model="radioSelected" type="radio" :value="row[rowId]">
            </div>
          </td>
          <slot name="content" :row="row" :index="index" />
        </tr>
      </template>
      <tr v-if="rows.length === 0" class="no-data">
        <td :colspan="setNoDataColspan()">
          {{ noDataText }}
        </td>
      </tr>
    </tbody>
  </table>
</template>

<style scoped>
/* .use-mouse-hover {
  &:hover {
    background-color: rgba(188,232,241,.3);
  }
}
.row-highlight {
  background-color: rgba(188,232,241,.3);
} */
</style>
