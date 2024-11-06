<script setup lang="ts">
import CustomInput from '~/components/CustomInput.vue'
import type { IMenu } from '~/types/menu'

const router = useRouter()

const menuStore = useMenuStore()

const isOpenedProfile = ref<boolean>(false)
const profile = ref<HTMLDivElement | null>(null)
const profileDetail = ref<HTMLDivElement | null>(null)

const showProfileDetail = () => {
  isOpenedProfile.value = true
}
const hideProfileDetail = () => {
  isOpenedProfile.value = false
}

const isShowSearchInput = ref<boolean>(false)
const searchInput = ref<InstanceType<typeof CustomInput> | null>(null)
const searchText = ref<string>('')
const toggleSearch = async () => {
  isShowSearchInput.value = !isShowSearchInput.value

  await nextTick()
  if (isShowSearchInput.value)
    searchInput.value?.focusInput()
}

const blurSearchInput = () => {
  setTimeout(() => {
    isShowSearchInput.value = false
  }, 700)
}

const selectHeaderMenu = (menuInfo: IMenu) => {
  if (menuInfo.children) {
    menuStore.setLeftSideMenuList(menuInfo.children)
    menuStore.setSelectedHeaderMenu(menuInfo.menuId)

    // 왼쪽 사이드 메뉴 첫번째 값 선택되도록 적용
    menuStore.setSelectedLeftSideMenu(menuInfo.children[0].menuId)
    router.push(menuInfo.children[0].menuUrl)
  }
}
</script>

<template>
  <header class="header">
    <div class="header__inner">
      <h1 class="header__logo">
        <a href="/">
          LG U+ CX 통합포털
        </a>
      </h1>
      <div>공지사항 내용</div>
      <div class="header__util">
        <div>
          <CustomInput
            v-if="isShowSearchInput" ref="searchInput" v-model="searchText" placeholder="검색어를 입력하세요."
            @blur="blurSearchInput"
          />
          <button type="button" @click="toggleSearch">
            검색
          </button>
        </div>
        <button>알림</button>
        <div class="ml-2">
          <el-popover placement="bottom" :width="200" trigger="click" @show="showProfileDetail" @hide="hideProfileDetail">
            <template #reference>
              <div ref="profile">
                <!-- TODO: isOpenedProfile 값이 true/false 에 따라 dropdown 아이콘 변경 되어야 함. -->
                <span>홍길동</span><span>0000/00/00 00:00:00</span>
                <div>Consumer부분</div>
              </div>
            </template>
            <div ref="profileDetail">
              사용자 정보 노출 영역
            </div>
          </el-popover>
        </div>
      </div>
    </div>
    <!-- 메뉴 영역 -->
    <nav class="navbar">
      <ul class="menu">
        <li
          v-for="menu in menuStore.allMenuList" :key="`header-nav-menu-${menu.menuId}`" class="menu__item"
          :class="{ menu__active: menu.menuId === menuStore.selectedHeaderMenu }" @click="selectHeaderMenu(menu)"
        >
          {{ menu.menuName }}
        </li>
      </ul>
    </nav>
  </header>
</template>

<style lang="scss" scoped>
</style>
