export interface ICopyCreateHistoryRow {
  id: string
  channel: string
  campaignPurpose: string
  prodServiceName: string
  content: string
  targetSettingWay: string
  mainTarget: string
  targetDetail: string
  targetInsight: string
  createdUser: string
  createDate: string
}

export interface ICopyCreateHistoryPagination {
  currentPage: number
  limit: number
}