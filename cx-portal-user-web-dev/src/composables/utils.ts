// FIXME: delete replace to src/utils/comlib.tss
import type { MessageOptions } from 'element-plus'
import axios from 'axios'
import { h } from 'vue'
import type { VNode } from 'vue'
import type { IOpenConfirm, IOpenCustomConfirm } from '~/types/confirm'
import type { IOpenAlert, IOpenCustomAlert } from '~/types/alert'
import type { ILoginData } from '~/types/login'
import type { IMenu } from '~/types/menu'
import Dialog from '~/components/Dialog.vue'

export const getUniqueId = (length = 16): string => {
  return Math.ceil(Math.random() * Date.now()).toPrecision(length).toString().replace('.', '')
}

export const openConfirm = ({ content, hideCancelButton, title, confirmButtonText, cancelButtonText, center, closeOnClickModal, closeOnPressEscape, showClose, dangerouslyUseHTMLString }: IOpenConfirm) => {
  return ElMessageBox.confirm(
    content,
    {
      title,
      confirmButtonText: confirmButtonText || '확인',
      cancelButtonText: cancelButtonText || '취소',
      center: center || false,
      showCancelButton: !hideCancelButton,
      closeOnClickModal: closeOnClickModal || false,
      closeOnPressEscape: closeOnPressEscape || false,
      showClose: showClose || false,
      dangerouslyUseHTMLString: dangerouslyUseHTMLString || true,
    },
  )
}

export const openCustomConfirm = ({ title, message, confirmText, cancelText, isShowConfirmBtn, isShowCancelBtn }: IOpenCustomConfirm) => {
  return new Promise<void>((resolve, reject) => {
    ElMessageBox({
      message: h(Dialog, {
        title,
        message,
        confirmText,
        cancelText,
        isShowConfirmBtn,
        isShowCancelBtn,
        onConfirm: () => {
          resolve()
          ElMessageBox.close()
        },
        onCancel: () => {
          reject('cancel')
          ElMessageBox.close()
        },
      }),
      showConfirmButton: false,
      showCancelButton: false,
      showClose: false,
    })
  })
}

export const openAlert = ({ message, confirmButtonText, showClose, center, closeOnClickModal, closeOnPressEscape, dangerouslyUseHTMLString }: IOpenAlert) => {
  return ElMessageBox.alert(message, {
    confirmButtonText: confirmButtonText || '확인',
    showClose: showClose || false,
    center: center || false,
    closeOnClickModal: closeOnClickModal || false,
    closeOnPressEscape: closeOnPressEscape || false,
    dangerouslyUseHTMLString: dangerouslyUseHTMLString || true,
  })
}

export const openCustomAlert = ({ title, message, confirmText }: IOpenCustomConfirm) => {
  return new Promise<void>((resolve, reject) => {
    ElMessageBox({
      message: h(Dialog, {
        title,
        message,
        confirmText,
        isShowCancelBtn: false,
        onConfirm: () => {
          resolve()
          ElMessageBox.close()
        },
        onCancel: () => {
          reject('cancel')
          ElMessageBox.close()
        },
      }),
      showConfirmButton: false,
      showCancelButton: false,
      showClose: false,
    })
  })
}

export const openToast = ({ message, type, showClose }: MessageOptions) => {
  return ElMessage(
    {
      message,
      type,
      showClose,
    },
  )
}

export const convertThousandComma = (targetNum: string) => {
  return targetNum.startsWith('0') ? targetNum.replace(/[^0-9]/g, '') : targetNum.replace(/[^0-9]/g, '').replace(/(\d)(?=(?:\d{3})+(?!\d))/g, '$1,')
}

export const onlyNumbers = (targetNum: string) => {
  return targetNum.replace(/[^0-9]/g, '')
}

export const convertNumberType = (targetNum: string) => {
  return Number(targetNum.replace(/,/g, ''))
}

export const generateRandomString = (length: number) => {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  let result = ''

  for (let i = 0; i < length; i++)
    result += characters.charAt(Math.floor(Math.random() * characters.length))

  return result
}

export const separateFileNameAndExtension = (fileName: string) => {
  const lastDotIndex = fileName.lastIndexOf('.')
  if (lastDotIndex === -1 || lastDotIndex === 0) {
    return { fileName, extension: '' }
  }
  else {
    return {
      fileName: fileName.slice(0, lastDotIndex),
      fileExtension: fileName.slice(lastDotIndex + 1),
    }
  }
}

export const setFileIconExtension = (fileExtension: string) => {
  const targetExtension = fileExtension.toLowerCase()
  const extensions = {
    img: ['jpg', 'jpeg', 'gif', 'png'],
    hwp: ['hwp', 'hml', 'hwt'],
    pdf: ['pdf'],
    ppt: ['ppt', 'pptx', 'pptm'],
    word: ['doc', 'docx', 'docm', 'dot'],
    xlsx: ['xls', 'xlsx'],
    zip: ['zip'],
  }

  for (const key in extensions) {
    if (extensions[key].includes(targetExtension))
      return key
  }
  return 'etc'
}

export const findActiveMenuInfo = (menuList: IMenu[], path: string): null | IMenu => {
  for (const m of menuList) {
    if (m.menuUrl === path) {
      return m
    }
    else if (Array.isArray(m.children)) {
      const activeMenu: IMenu | null = findActiveMenuInfo(m.children, path)
      if (!isEmpty(activeMenu))
        return activeMenu
    }
  }
  return null
}

export const getAccessToken = async (code?: string) => {
  if (!code || (code === '4000000008' || code === '4000000010')) {
    try {
      const res = await axios.post(`${import.meta.env.VITE_API_CONTEXT_PATH}/common/sign-in`, {
        userId: 'string',
        password: 'string',
      })
      if (res.status === 200) {
        localStorage.setItem('igsn-access-token', `Bearer ${res.data.body.accessToken}`)
        return code ? true : localStorage.getItem('igsn-access-token')
      }
      else { throw new Error('Failed to get access-token.') }
    }
    catch (error) {
      console.error(error)
    }
  }
  else {
    return false
  }
}

export const isDevelop = import.meta.env.DEV

export const debounce = (func: Function, timeout = 300) => {
  let timer: ReturnType<typeof setTimeout>
  return (...args: Parameters<any>) => {
    clearTimeout(timer)
    timer = setTimeout(() => {
      func.apply(this, args)
    }, timeout)
  }
}

export const makeDeepCopy = (obj: any): any => {
  // 객체가 null이거나 기본 데이터 타입인 경우
  if (obj === null || typeof obj !== 'object')
    return obj

  // 객체가 배열인 경우
  if (Array.isArray(obj)) {
    const copy = []
    for (let i = 0; i < obj.length; i++)
      copy[i] = makeDeepCopy(obj[i])

    return copy
  }

  // 객체가 일반 객체인 경우
  const copy: any = {}
  for (const key in obj) {
    if (Object.hasOwnProperty.call(obj, key))
      copy[key] = makeDeepCopy(obj[key])
  }
  return copy
}
