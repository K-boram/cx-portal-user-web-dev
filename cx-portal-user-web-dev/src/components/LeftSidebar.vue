<script setup lang="ts">
import type { IMenu } from '~/types/menu'
const router = useRouter()

const menuStore = useMenuStore()

const selectLeftSideMenu = (menuInfo: IMenu) => {
  menuStore.setSelectedLeftSideMenu(menuInfo.menuId)
  router.push(menuInfo.menuUrl)
}
</script>

<template>
  <!-- 메뉴 영역 -->
  <aside class="sidebar">
    <h2>
      <a href="/">
        LG U+ CX 통합포털
      </a>
    </h2>
    <ul class="menu">
      <li
        v-for="menu in menuStore.leftSideMenuList" :key="`left-aside-menu-${menu.menuId}`" class="menu__item"
        :class="{ menu__active: menu.menuId === menuStore.selectedLeftSideMenu }" @click="selectLeftSideMenu(menu)"
      >
        {{ menu.menuName }}
      </li>
    </ul>
  </aside>
</template>

<style lang="scss" scoped></style>
