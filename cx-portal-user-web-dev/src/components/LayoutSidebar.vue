<script setup lang="ts">
// import type { IMenu } from '~/types/menu'

// const router = useRouter()

// const menuStore = useMenuStore()

// const selectLeftSideMenu = (menuInfo: IMenu) => {
//   menuStore.setSelectedLeftSideMenu(menuInfo.menuId)
//   router.push(menuInfo.menuUrl)
// }
const leftSideMenuList = reactive([
  {
    menuId: 0,
    icoNm: 'chart',
    name: 'My View',
  },
  {
    menuId: 1,
    icoNm: 'dashboard',
    name: 'Dashboard',
  },
  {
    menuId: 2,
    icoNm: 'notes',
    name: '관리실적',
  },
  {
    menuId: 3,
    icoNm: 'chat',
    name: '원문보기',
  },
  {
    menuId: 4,
    icoNm: 'filter',
    name: '목표관리',
  },
])

const currentMenu = ref(0)

const setActive = (i: number) => {
  currentMenu.value = i
}
</script>

<template>
  <aside class="sidebar">
    <div class="sidebar__scroll-area">
      <h2 class="logo--sm">
        <a href="/">
          <Icon name="logo--sm" width="72" height="30" alt="LG U+ CX 통합포탈" />
        </a>
      </h2>
      <div class="sidebar__menu">
        <ul>
          <!-- ASIS 개발자 소스 -->
          <!--       <li v-for="menu in menuStore.leftSideMenuList" :key="`left-aside-menu-${menu.menuId}`" class="menu__item"
        :class="{ 'menu__active': menu.menuId === menuStore.selectedLeftSideMenu }" @click="selectLeftSideMenu(menu)">
        {{ menu.menuName }}
      </li> -->
          <!-- TOBE 퍼블리셔 소스 - 사이드 메뉴가 store에 없어서 퍼블리싱을 위해 하드코딩해서 작업 -->
          <li
            v-for="menu in leftSideMenuList" :key="`side-menu-${menu.menuId}`"
            :class="{ 'is-active': menu.menuId === currentMenu }" @click="setActive(menu.menuId)"
          >
            <Icon
              v-if="menu.menuId === currentMenu" :name="`side-${menu.icoNm}__full--ec0`" width="24" height="24" alt=""
              aria-hidden="true"
            />
            <Icon v-else :name="`side-${menu.icoNm}__full--fff`" width="24" height="24" alt="" aria-hidden="true" />
            <span>{{ menu.name }}</span>
          </li>
        </ul>
        <div
          class="sidebar__bubble" :style="{ transform: `translateY(calc(var(--sidebar-size) * ${currentMenu}))` }"
          aria-hidden="true"
        />
        <div class="sidebar__scroll-area" />
      </div>
    </div>
  </aside>
</template>

<style lang="scss"></style>
