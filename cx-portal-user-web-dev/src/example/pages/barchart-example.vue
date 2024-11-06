<script lang="ts" setup>
import { onBeforeUnmount, onMounted, ref } from 'vue'
import * as echarts from 'echarts'
import type { BarSeriesOption, Color, ECharts, EChartsOption } from 'echarts'

interface BarDataItemOption {
  value: number | string
  itemStyle?: {
    color?: Color
  }
}

const chartContainer = ref<HTMLDivElement | null>(null)
let chartInstance: ECharts | null = null
let originalItemStyles: { [key: number]: (Color | undefined)[] } = {}

const initChart = () => {
  if (chartContainer.value) {
    chartInstance = echarts.init(chartContainer.value)

    const seriesData: BarSeriesOption[] = [
      {
        name: 'A',
        type: 'bar',
        stack: 'total',
        data: [10, 20, 30].map(value => ({ value, itemStyle: { color: '#4caf50' } })) as BarDataItemOption[],
        itemStyle: {
          color: '#4caf50',
        },
      },
      {
        name: 'B',
        type: 'bar',
        stack: 'total',
        data: [15, 25, 35].map(value => ({ value, itemStyle: { color: '#2196f3' } })) as BarDataItemOption[],
        itemStyle: {
          color: '#2196f3',
        },
      },
      {
        name: 'C',
        type: 'bar',
        stack: 'total',
        data: [20, 30, 40].map(value => ({ value, itemStyle: { color: '#f44336' } })) as BarDataItemOption[],
        itemStyle: {
          color: '#f44336',
        },
      },
    ]

    const options: EChartsOption = {
      title: {
        text: '누적 바 차트',
      },
      tooltip: {
        show: false, // Tooltip 비활성화
      },
      legend: {
        data: ['A', 'B', 'C'],
      },
      xAxis: {
        type: 'category',
        data: ['2021', '2022', '2023'],
      },
      yAxis: {
        type: 'value',
      },
      series: seriesData,
    }

    chartInstance.setOption(options)

    // 기존 스타일 저장
    originalItemStyles = seriesData.reduce((acc, series, seriesIndex) => {
      acc[seriesIndex] = (series.data as BarDataItemOption[]).map(item => item.itemStyle?.color)
      return acc
    }, {} as { [key: number]: (Color | undefined)[] })

    // 클릭 시, 강조 효과
    chartInstance.on('click', (params: any) => {
      if (params.componentType === 'series') {
        const seriesIndex = params.seriesIndex
        const dataIndex = params.dataIndex

        const updatedSeries = seriesData.map((series, index) => {
          if (index === seriesIndex) {
            return {
              ...series,
              data: (series.data as BarDataItemOption[]).map((item, idx) => ({
                ...item,
                itemStyle: {
                  color: idx === dataIndex ? '#000' : originalItemStyles[seriesIndex][idx],
                },
              })),
            }
          }
          return series
        })

        chartInstance?.setOption({
          series: updatedSeries,
        })
      }
    })
  }
}

onMounted(() => {
  initChart()
})

onBeforeUnmount(() => {
  if (chartInstance)
    chartInstance.dispose()
})
</script>

<template>
  <div ref="chartContainer" style="width: 100%; height: 800px;" class="p-10" />
</template>

<style scoped></style>
