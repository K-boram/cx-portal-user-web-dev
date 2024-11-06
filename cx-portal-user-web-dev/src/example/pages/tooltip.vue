<script setup lang="ts">
const content = ref('툴팁 내용입니다.')
</script>

<template>
  <div>
    <h2 class="text-3xl font-semibold">
      Tooltip
    </h2>
    <div class="my-10">
      <el-tooltip :content="content" placement="bottom-start" popper-class="el-tooltip">
        <!-- <Icon name="info__full--ff0" width="20" heigh="20" /> -->tooltip
      </el-tooltip>
    </div>
  </div>
</template>

<style scoped lang="scss"></style>
