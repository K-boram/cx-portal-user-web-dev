<script lang="ts" setup>
import { onBeforeUnmount, onMounted, ref } from 'vue'
import * as echarts from 'echarts'
import type { ECharts, EChartsOption } from 'echarts'

const chartContainer = ref<HTMLDivElement | null>(null)
let chartInstance: ECharts | null = null
const initChart = () => {
  if (chartContainer.value) {
    // ECharts 인스턴스 생성
    chartInstance = echarts.init(chartContainer.value)

    // 차트 옵션 설정
    const options: EChartsOption = {
      title: {
        text: 'Sample Line Chart',
      },
      tooltip: {
        trigger: 'axis',
      },
      xAxis: {
        type: 'category',
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      },
      yAxis: {
        type: 'value',
      },
      series: [
        {
          name: 'Data',
          type: 'line',
          data: [150, 230, 224, 218, 135, 147, 260],
        },
      ],
    }
    chartInstance.setOption(options)
  }
}

onMounted(async () => {
  initChart()
})

onBeforeUnmount(() => {
  if (chartInstance)
    chartInstance.dispose()
})
</script>

<template>
  <div ref="chartContainer" style="width: 100%; height: 100px;" />
</template>

<style scoped></style>
