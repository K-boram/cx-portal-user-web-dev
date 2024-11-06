import { acceptHMRUpdate, defineStore } from 'pinia'

export const useCopyWriteStore = defineStore('copyWriteStore', () => {
  const copyWriteId = ref<string>('')
  const setCopyWriteId = (id: string) => {
    copyWriteId.value = id
  }
  return {
    copyWriteId,
    setCopyWriteId
  }
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useCopyWriteStore, import.meta.hot))
