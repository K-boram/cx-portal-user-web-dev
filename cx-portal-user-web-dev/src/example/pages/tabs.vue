<script setup lang="ts">
const currentTab = ref<string>('TabMenu1')
const tabList = reactive([
  {
    tabName: '탭 메뉴 1',
    tabId: 'TabMenu1',
  },
  {
    tabName: '탭 메뉴 2',
    tabId: 'TabMenu2',
  },
  {
    tabName: '탭 메뉴 3',
    tabId: 'TabMenu3',
  },
  {
    tabName: '탭 메뉴 4',
    tabId: 'TabMenu4',
  },
])

const changeTab = (tabId: string) => {
  currentTab.value = tabId
  console.log('emit 확인 >>>>', tabId)
}
</script>

<template>
  <div>
    <h2 class="py-3 font-bold">
      커스텀 탭 예제
    </h2>
    <custom-tabs v-model="currentTab" :tab-list="tabList" @change-tab="changeTab" />
    <div v-if="currentTab" class="mt-3">
      {{ currentTab }}
    </div>
  </div>
</template>

<style scoped></style>
