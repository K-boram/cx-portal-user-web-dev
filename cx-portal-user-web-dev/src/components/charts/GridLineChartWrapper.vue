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
      animation: false,
      title: {
        text: 'Sample Line Chart',
      },
      tooltip: {
        trigger: 'axis',
      },
      xAxis: {
        type: 'category',
        axisLabel: {
          show:false,
        },
      },
      yAxis: {
        type: 'value',
        axisLabel: {
          show:false,
        },
      },
      series: [
        {
          type: 'line',
          showSymbol: false,
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
