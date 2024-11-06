<script setup lang="ts">
const percentage = ref(40)
const progressDesc = ref('카피를 생성 중이예요.')
</script>

<template>
  <div class="status loading">
    <!-- <Icon name="loading__line--ff7" width="188" height="168" alt="" /> -->
    <el-progress :show-text="false" :indeterminate="true" :duration="3" :stroke-width="10" :percentage="percentage" />
    <p>{{ progressDesc }}</p>
  </div>
</template>

<style scoped lang="scss"></style>

<route lang="yaml">
meta:
  layout: status
</route>
