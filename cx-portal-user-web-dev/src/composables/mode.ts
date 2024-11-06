enum ModeRCM {
  READ = 'READ',
  CREATE = 'CREATE',
  MODIFY = 'MODIFY',
}

export const useMode = () => {
  const router = useRouter()
  const isModify = ref(false)

  const mode = computed(() => {
    const paramsId = router.currentRoute.value.params.id
    let status: ModeRCM = ModeRCM.READ
    if (paramsId === 'create')
      status = ModeRCM.CREATE

    else if (isModify.value)
      status = ModeRCM.MODIFY

    return status
  })

  const getPageTitle = (pageName: string) => {
    let statusText = '상세'
    if (mode.value === ModeRCM.READ)
      return `${pageName} ${statusText}`

    if (mode.value === ModeRCM.CREATE)
      statusText = '등록'
    else if (mode.value === ModeRCM.MODIFY)
      statusText = '변경'

    return `${pageName} ${statusText}`
  }

  const toggleMode = () => {
    isModify.value = !isModify.value
  }
  const setModifyMode = (flag: boolean) => {
    isModify.value = flag
  }

  return {
    isModify,
    mode,
    getPageTitle,
    toggleMode,
    setModifyMode,
  }
}
