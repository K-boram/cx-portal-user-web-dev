<script setup lang="ts">
const dataList = ref<{ category: string, value: number }[]>([])

const setDataList = (minValue: number, maxValue: number, dataCount: number) => {
  for (let i = 1; i <= dataCount; i++) {
    const randomValue = Math.floor(Math.random() * (maxValue - minValue + 1)) + minValue;
    dataList.value.push({
      category: `${i}월`,
      value: randomValue
    })

  }
}

setDataList(100000, 5000000, 12)
</script>

<template>
  <div class="chart">
    <ChartsAverageLineWrapper :category-key="'category'" :value-key="'value'" :data-list="dataList"
      :default-line-color="'#333'" :show-average-line-label="true" :use-line-shadow="true" />
    <ChartsAverageLineWrapper :category-key="'category'" :value-key="'value'" :data-list="dataList" :is-warning="true"
      :warning-line-color="'#F42D1A'" :default-line-color="'#333'" :show-average-line-label="false"
      :use-line-shadow="false" />
  </div>
</template>

<style lang="scss" scoped>
.chart {
  width: 100%;
  height: 500px;
}
</style>