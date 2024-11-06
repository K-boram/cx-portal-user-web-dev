import { acceptHMRUpdate, defineStore } from 'pinia'

export const useSessionStore = defineStore('sessionStore', () => {
  const userInfo = ref({
    usrId: '',
    usrNm: '',
    email: '',
    deptCd: '',
    whofStateCd: '',
    provusertype: '',
    admin: false
  })
  const roleList = ref<string[]>([])
  const systemName = ref<string | null>(null)
  const contacName = ref<string>('')

  const setSessionInfo = (sessionInfo) => {
    Object.assign(userInfo.value, sessionInfo.userInfo)
    roleList.value = sessionInfo.roleList
    systemName.value = sessionInfo.systemName
    contacName.value = sessionInfo.contacName
  }
  return {
    userInfo,
    roleList,
    systemName,
    contacName,
    setSessionInfo
  }
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useSessionStore, import.meta.hot))
