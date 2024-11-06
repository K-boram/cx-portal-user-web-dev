export interface IOpenConfirm {
  content: string
  hideCancelButton?: boolean
  title?: string
  confirmButtonText?: string
  cancelButtonText?: string
  center?: boolean
  closeOnClickModal?: boolean
  closeOnPressEscape?: boolean
  showClose?: boolean
  dangerouslyUseHTMLString?: boolean
}
export interface IOpenCustomConfirm {
  title: string
  message: string
  confirmText?: string
  cancelText?: string
  isShowConfirmBtn?: boolean
  isShowCancelBtn?: boolean
}
