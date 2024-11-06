import { acceptHMRUpdate, defineStore } from 'pinia'
export const useTokenStore = defineStore('tokenStore', () => {

  // const treeChildrenCheckedList = ref<Record<string, IGridData[]>>({})

  // const setTreeParentCheckedList = (checkedList: IGridData[]) => {
  //   treeParentCheckedList.value = checkedList
  // }
  // const setTreeChildrenCheckedList = (checkedList: IGridData[], parentRowId: string) => {
  //   treeChildrenCheckedList.value[parentRowId] = checkedList
  // }

  const setToken = (token: string) => {
    localStorage.setItem('token', token)
  }

  const setTokenExp = (token: string) => {
    

    let base64Url = token.split('.')[1];
    let base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    let jsonPayload = JSON.parse(
      decodeURIComponent(
        window.atob(base64).split('').map(
          function(c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
          }
        ).join('')
      )
    );
    
    
    localStorage.setItem('tokenExp', jsonPayload.exp)
  }
 
  return {
    setToken,
    setTokenExp,
  }
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useTokenStore, import.meta.hot))