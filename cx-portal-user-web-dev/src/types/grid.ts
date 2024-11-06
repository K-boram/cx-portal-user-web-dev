export interface IGrid<T> {
  name: string
  checkboxInfo?: IColumn
  radioInfo?: IColumn
  rowId: string
  columns: IColumn[]
  rows: T[]
  noDataText: string
  totalCount: number
}
export interface IColumn {
  name: string
  visible?: boolean
  width: string
}