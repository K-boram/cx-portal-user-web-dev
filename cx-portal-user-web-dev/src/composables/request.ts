import axios from 'axios'
import NProgress from 'nprogress'
import type { AxiosResponse } from 'axios'

declare module 'axios' {
  export interface AxiosRequestConfig {
    meta?: {
      useTokenUpdate?: boolean
      useAuth?: boolean
      useResponseAll?: boolean
      useProgress?: boolean
      useToast?: boolean
      logKey?: string
      prefix?: string
      timeout?: number
      useSse?: boolean
    }
  }
}

const baseUrl: string = import.meta.env.VITE_API_CONTEXT_PATH

const getDefaultMeta = () => {
  return {
    useTokenUpdate: false,
    useAuth: true,
    useResponseAll: false,
    useProgress: true,
    useToast: true,
    timeout: import.meta.env.VITE_REQUEST_TIMEOUT,
    useSse: false
  }
}

const service = axios.create({
  baseURL: baseUrl,
  headers: {
  },
})

service.interceptors.request.use(
  async (config) => {
    if (config.method?.toLowerCase() === 'get') {
      if (config.params === undefined)
        config.params = {}

      config.params['t'] = new Date().getTime()
    }

    if (!config.meta)
      config.meta = {}

    config.meta = Object.assign(getDefaultMeta(), config.meta)

    config.timeout = config.meta.timeout

    if (config.meta.prefix)
      config.baseURL = config.meta.prefix

    // 로딩 사용 여부
    if (config.meta.useProgress) {
      const logKey = getUniqueId()
      config.meta.logKey = logKey
      // TODO :: 로딩바 시작 자리
      NProgress.start()
    }

    return config
  },

  (error) => {
    // 에러가 날 경우 진행 부분
    console.error('[Client Error]', error) // for debug

    // loading 초기화
    NProgress.done()

    Promise.reject(error)
  },
)

/**
 * Axios 응답
 * @param res Response||error 객체
 * @prevate
 */
const responseLog = (res: AxiosResponse) => {
  // TODO :: 응답시 표시되는 log
  // console.log(res)
}

// Axios 의 response 인터셉터
service.interceptors.response.use(
  async (response: AxiosResponse) => {
    let res = {}
    const meta = response.config.meta!

    // Axios 를 통해 response 내역 중 data 에 서버에서 response 된 값이 들어옴.
    if (response.data)
      res = response.data

    if (meta.useProgress)
      NProgress.done()

    responseLog(response)
  

    if (meta.useResponseAll)
      return Promise.resolve(response)
    return Promise.resolve(response)
  },

  (error) => {
    // response 부분 객체 내 meta 사용을 위한 기본 값 셋팅
    responseLog(error)
    const logKey = error.response ? error.response.config.meta.logKey : error.config.meta.logKey
    const useToast = error.response ? error.response.config.meta.useToast : error.config.meta.useToast

    // 로딩 멈춤 처리
    if (logKey)
      NProgress.done()

    // if (!error.response) {
    //   // 서버 응답 없는 경우 (서버 장애 및 배포중)
    //   location.href = '/not-available'
    // }
    // else if (error.response.status === 401) {
    //   // 세션 만료
    //   location.href = '/unauthenticated'
    // }
    // else if (error.response.status === 403) {
    //   // 권한 없음
    //   location.href = '/unauthorized'
    // }
    // else if (error.response.status === 404 || error.response.status === 500) {
    //   const resultCode = error.response.data.result.code
    //   let errorMsg = '서버에러가 발생했습니다.<br />잠시 후 다시 이용하세요.'
    //   if (
    //     resultCode === '40000010'
    //         || resultCode === '40000011'
    //         || resultCode === '40000012'
    //         || resultCode === '40000013'
    //         || resultCode === '40000014'
    //   )
    //     errorMsg = error.response.data.result.message

    //   if (useToast) {
    //     openToast({
    //       message: errorMsg,
    //       type: 'error',
    //     })
    //   }
    // }
    // else if (error.response.status === 503) {
    //   location.href = '/not-available'
    // }

    return Promise.reject(error)
  },
)

export default service
