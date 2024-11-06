<script setup lang="ts">
// const menuItems = reactive([
//   { menuNum: 0, name: '문의콜', isActive: true },
//   { menuNum: 1, name: '불만콜', isActive: false },
//   { menuNum: 2, name: '통합 NPS', isActive: false },
//   { menuNum: 3, name: 'J-NPS', isActive: false },
//   { menuNum: 4, name: '고객의 소리', isActive: false },
// ])

// const currentMenu = ref(0)

// const setActive = (i: number) => {
//   currentMenu.value = i
// }
import CustomInput from '~/components/CustomInput.vue'
import type { IMenu } from '~/types/menu'

const router = useRouter()

const menuStore = useMenuStore()

const noticeCont = ref(
  '공지사항이 여기에 전광판처럼 보여집니다.공지사항이 여기에 전광판처럼 보여집니다.공지사항이 여기에 전광판처럼 보여집니다.',
)

const userInfo = reactive({
  userNm: '홍길동',
  accessDate: '0000/00/00',
  accessTime: '00:00:00',
  teamNm: 'Consumer 부문',
})

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
    <!-- Main Header -->
    <div class="main-header">
      <div class="main-header__inner">
        <div class="main-header__left">
          <h1 class="logo">
            <a href="/">
              <Icon name="logo" width="210" height="32" alt="LG U+ CX 통합포탈" />
            </a>
          </h1>
          <div class="main-header__board">
            <Icon name="loud-speaker__line--999" width="24" height="24" alt="공지사항" />
            <div class="main-header__board-wrap">
              <div class="main-header__board-content">
                {{ noticeCont }}
              </div>
            </div>
          </div>
        </div>

        <div class="main-header__right">
          <CustomInput v-if="isShowSearchInput" ref="searchInput" v-model="searchText" placeholder="'검색어를 입력하세요.'"
            @blur="blurSearchInput" />
          <button type="button" class="main-header__search" @click="toggleSearch">
            <Icon name="search__line--333" width="24" height="24" alt="검색" />
          </button>
          <el-popover placement="bottom" :width="200" trigger="click" @show="showProfileDetail"
            @hide="hideProfileDetail">
            <template #reference>
              <div ref="profile" class="main-header__user">
                <div class="main-header__user-wrap">
                  <div class="main-header__user-detail">
                    <em>{{ userInfo.userNm }}</em>
                    <span>{{ userInfo.accessDate }}</span>
                    <span>{{ userInfo.accessTime }}</span>
                    <button type="button">
                      <Icon name="arrow-d__line--333" width="24" height="24" alt="펼치기" />
                    </button>
                  </div>
                  <span> {{ userInfo.teamNm }} </span>
                </div>
              </div>
            </template>
            <div ref="profileDetail">
              사용자 정보 노출 영역
            </div>
          </el-popover>
        </div>
      </div>
    </div>
    <!-- GNB -->
    <nav class="gnb">
      <ul class="gnb__inner">
        <li v-for="menu in menuStore.allMenuList" :key="`header-nav-menu-${menu.menuId}`" class="menu__item"
          :class="{ 'is-active': menu.menuId === menuStore.selectedHeaderMenu }" @click="selectHeaderMenu(menu)">
          <a href="#">{{ menu.menuName }}</a>
        </li>
      </ul>
    </nav>
  </header>
</template>

<style lang="scss" scoped></style>
