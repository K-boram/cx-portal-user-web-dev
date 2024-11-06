import { acceptHMRUpdate, defineStore } from 'pinia'
import type {IMenu} from '~/types/menu'

export const useMenuStore = defineStore('menuStore', () => {
  const allMenuList = ref<IMenu[]>([])
  const setAllMenuList = (menus: IMenu[]) => {
    allMenuList.value = menus
  }
  
  const leftSideMenuList = ref<IMenu[]>([])
  const setLeftSideMenuList = (subMenus: IMenu[]) => {
    leftSideMenuList.value = subMenus
  }
  
  const selectedHeaderMenu = ref<string>('')
  const setSelectedHeaderMenu = (selectMenuId: string) => {
    selectedHeaderMenu.value = selectMenuId
  }

  const selectedLeftSideMenu = ref<string>('')
  const setSelectedLeftSideMenu = (selectMenuId: string) => {
    selectedLeftSideMenu.value = selectMenuId
  }
  return {
    allMenuList,
    setAllMenuList,
    leftSideMenuList,
    setLeftSideMenuList,
    selectedHeaderMenu,
    setSelectedHeaderMenu,
    selectedLeftSideMenu,
    setSelectedLeftSideMenu
  }
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useMenuStore, import.meta.hot))
