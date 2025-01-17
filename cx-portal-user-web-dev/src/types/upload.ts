export interface IFileList {
  name: string
  size: number
  progress: number
  color: string
}

export interface IUploadOptions {
  progressShown?: boolean
  pauseButtonShown?: boolean
  progressColor?: string
  successColor?: string
  errorColor?: string
  format?: string
  placeholder?: string
  uploadList?: Array<any>
  readonly?: boolean
}
