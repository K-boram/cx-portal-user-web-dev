export interface IMenuDetail {
  menuId: string
  menuIndex: number
  menuName: string
  menuUrl: string
  parentMenuId: string
}

export interface IMenuSetting {
  sideMenuList?: IMenu[]
  menuBackgroundColor?: string // 메뉴 배경색 지정
  menuActiveTextColor?: string // 메뉴 활성화 text 색상 지정
  menuTextColor?: string // 메뉴 text 색상 지정
}

export interface IMenu {
  menuId: string
  menuName: string
  menuIndex: string
  menuUrl?: string
  icon?: string
  children?: IMenu[]
  disabled?: boolean
}
