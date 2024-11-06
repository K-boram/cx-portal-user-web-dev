<script setup lang="ts">
const dataList = ref<{ category: string, value: number }[]>([])
</script>

<template>
  <div class="chart">
    <ChartsLineFunctionWrapper />
  </div>
</template>

<style lang="scss" scoped>
.chart {
  width: 100%;
  height: 500px;
}
</style>