<script setup lang="ts">
const menuStore = useMenuStore()
</script>

<template>
  <main class="layout">
    <layout-header />
    <section class="wrapper">
      <!-- 퍼블리싱을 위한 조건 임시 주석처리 -->
      <!-- <layout-sidebar v-if="!!menuStore.leftSideMenuList.length" /> -->
      <layout-sidebar />
      <div class="content">
        <div class="content-body">
          <router-view />
        </div>
        <LayoutFooter />
      </div>
    </section>
  </main>
</template>

<style lang="scss" scoped></style>
