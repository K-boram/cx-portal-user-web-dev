import type { Column, RowClassNameGetter, SortBy, SortState } from 'element-plus'
import type { SortOrder } from 'element-plus/es/components/table-v2/src/constants'
import type { CSSProperties } from 'vue'

interface VirtualizedColumn extends Column {
  order?: SortOrder
  children?: VirtualizedColumn[]
  colspan?: number
}

interface VirtualizedTableProps<T = any> {
  cache?: number
  estimatedRowHeight?: number
  headerHeight?: number[]
  footerHeight?: number
  rowClass?: RowClassNameGetter<any>
  rowKey?: string | number
  columns: VirtualizedColumn[]
  data: T[]
  expandColumnKey?: string
  expandedRowKeys?: string[]
  fixed?: boolean
  width: number
  height: number
  maxHeight?: number
  rowHeight?: number
}

interface CellSlotProps {
  column: Column
  columns: Column[]
  columnIndex: number
  depth: number
  style: CSSProperties
  rowData: any
  rowIndex: number
  isScrolling: boolean
  expandIconProps?:
  | {
    rowData: any
    rowIndex: number
    onExpand: (expand: boolean) => void
  }
  | undefined
}

interface HeaderSlotProps {
  cells: VNode[]
  columns: Column<any>[]
  headerIndex: number
}

interface HeaderCellSlotProps {
  class: string
  columns: Column<any>[]
  column: Column<any>
  columnIndex: number
  headerIndex: number
  style: CSSProperties
  headerCellProps?: any
  sortBy: SortBy
  sortState?: SortState | undefined
  onColumnSorted: (e: MouseEvent) => void
}

interface RowSlotProps {
  columns: Column<any>[]
  rowData: any
  columnIndex: number
  rowIndex: number
  data: any
  key: number | string
  isScrolling?: boolean
  style: CSSProperties
}

interface tableInjectionProps {
  headerHeight?: number[]
}

export { VirtualizedTableProps, VirtualizedColumn, CellSlotProps, HeaderSlotProps, HeaderCellSlotProps, RowSlotProps, tableInjectionProps }
