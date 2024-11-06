<script lang="ts" setup>
import _ from 'lodash'
import { TableV2SortOrder } from 'element-plus'
import type { ExpandedRowsChangeHandler, RowExpandHandler, SortBy } from 'element-plus'
import type {
  CellSlotProps,
  HeaderCellSlotProps,
  HeaderSlotProps,
  RowSlotProps,
  VirtualizedTableProps,
} from '~/types/virtualized-table'

const props = withDefaults(defineProps<VirtualizedTableProps>(), {})
const emits = defineEmits(['columnSort', 'dataGetter', 'rowExpanded', 'expandedRowsChange'])
const slots = defineSlots<{
  cell: CellSlotProps
  header: HeaderSlotProps
  'header-prepend': HeaderSlotProps
  'header-cell': HeaderCellSlotProps
  row: RowSlotProps
  footer: void
  empty: void
  overlay: void
}>()
const copyData = ref(_.cloneDeep(props.data))
const sortState = ref<SortBy>({
  key: '',
  order: TableV2SortOrder.ASC,
})
const sortedList = computed(() => {
  const { key, order } = sortState.value
  if (!key)
    return copyData.value

  const sortedData = _.sortBy(copyData.value, key)
  return order === TableV2SortOrder.DESC ? sortedData.reverse() : sortedData
})
const mergedProps = ref({
  ...props,
  ...{
    data: sortedList,
    sortBy: sortState,
  },
})
const onColumnSort = (sortBy: SortBy): void => {
  sortState.value = sortBy
  emits('columnSort', sortState.value)
}

const onRowExpanded = ({ expanded }: Parameters<RowExpandHandler<any>>[0]) => {
  emits('rowExpanded', expanded)
}

const onExpandedRowsChange = (expandedKeys: Parameters<ExpandedRowsChangeHandler>[0]) => {
  emits('expandedRowsChange', expandedKeys)
}

provide('commonProps', {
  headerHeight: props.headerHeight,
})
</script>

<template>
  <el-table-v2
    v-bind="mergedProps"
    @column-sort="onColumnSort"
    @row-expand="onRowExpanded"
    @expanded-rows-change="onExpandedRowsChange"
  >
    <template v-for="(_, name) in slots" #[name]="slotData">
      <slot :name="name" v-bind="slotData" />
    </template>
  </el-table-v2>
</template>
