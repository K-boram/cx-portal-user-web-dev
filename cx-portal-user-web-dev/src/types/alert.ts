export interface IOpenAlert {
  message: string
  title?: string
  confirmButtonText?: string
  center?: boolean
  closeOnClickModal?: boolean
  closeOnPressEscape?: boolean
  showClose?: boolean
  dangerouslyUseHTMLString?: boolean
}
export interface IOpenCustomAlert {
  title?: string
  confirmButtonText?: string
  center?: boolean
  closeOnClickModal?: boolean
  closeOnPressEscape?: boolean
  showClose?: boolean
  dangerouslyUseHTMLString?: boolean
}