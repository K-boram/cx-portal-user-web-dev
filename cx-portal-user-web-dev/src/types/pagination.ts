export interface IPaginationOptions {
  totalCount: number
  limit: number
  limitOptions?: number[]
  maxPagesShown?: number
  limitOptionsShown?: boolean
}

export interface ILimitOptions {
  label: string
  value: number
}
