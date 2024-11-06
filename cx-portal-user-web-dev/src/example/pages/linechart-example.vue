<script lang="ts" setup>
import { onBeforeUnmount, onMounted, ref } from 'vue'
import * as echarts from 'echarts'
import type { ECharts, EChartsOption, LineSeriesOption } from 'echarts'

const chartContainer = ref<HTMLDivElement | null>(null)
let chartInstance: ECharts | null = null

const initChart = () => {
  if (chartContainer.value) {
    chartInstance = echarts.init(chartContainer.value)

    // 라인 차트 데이터
    const pastData = [30, 32, 29, 27, 26, 26, 25, 25, null, null, null, null] // 1월~8월까지의 실선 구간 데이터
    const futureData = [null, null, null, null, null, null, null, 25, 27, 25, 26, 23] // 8월~12월까지의 점선 구간 데이터 (9월부터 작성하면 선이 끊어지므로 과거 데이터 8월과 동일한 숫자로 8월 데이터 입력 필요)
    const goalsData = [34, 33, 35, 31, 30, 28, 27, 26, 24, 22, 23, 20]

    const seriesData: LineSeriesOption[] = [
      {
        name: '목표 콜수',
        type: 'line',
        data: [...pastData],
        lineStyle: {
          width: 3,
          type: 'solid',
          color: '#999',
        },
        itemStyle: {
          color: '#999',
          borderColor: '#999',
        },
      },
      {
        name: '목표 콜수',
        type: 'line',
        data: [...futureData],
        lineStyle: {
          width: 3,
          type: 'dashed',
          color: '#999',
        },
        itemStyle: {
          color: '#999',
          borderColor: '#999',
        },
      },
      {
        name: '실적 및 예상 콜수',
        type: 'line',
        data: goalsData,
        lineStyle: {
          width: 3,
          type: 'solid',
          color: '#642EFE',
        },
        itemStyle: {
          color: '#642EFE',
          borderColor: '#642EFE',
        },
      },
    ]

    const options: EChartsOption = {
      title: {
        text: '이중 라인 차트',
      },
      tooltip: {
        trigger: 'axis',
      },
      legend: {
        data: ['목표 콜수', '실적 및 예상 콜수'],
      },
      xAxis: {
        type: 'category',
        data: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
      },
      yAxis: {
        type: 'value',
      },
      series: seriesData,
    }

    // 여러 라인차트가 있는 경우 dataset 으로 하는 예시
    // const lineChartDatas = [
    //   { category: '2024-01', value1: 978572, value2: 978308 },
    //   { category: '2024-02', value1: 814592, value2: 878275 },
    //   { category: '2024-03', value1: 826290, value2: 844414 },
    //   { category: '2024-04', value1: 720559, value2: 768804 },
    //   { category: '2024-05', value1: 691126, value2: 173902 },
    //   { category: '2024-06', value1: 373334, value2: null },
    //   { category: '2024-07', value1: 373334, value2: null },
    //   { category: '2024-08', value1: 373334, value2: null },
    //   { category: '2024-09', value1: 373334, value2: null },
    //   { category: '2024-10', value1: 373334, value2: null },
    //   { category: '2024-11', value1: 373334, value2: null },
    //   { category: '2024-12', value1: 373334, value2: null }
    // ];
    // const options: EChartsOption = {
    //   title: {
    //     text: '이중 라인 차트',
    //   },
    //   dataset: {
    //     // 데이터셋 정의
    //     dimensions: ['category', 'value1', 'value2'],
    //     source: lineChartDatas
    //   },
    //   xAxis: {
    //     type: 'category',
    //     axisLabel: {
    //       formatter: function (value) {
    //         const [year, month] = value.split('-'); // '2024-01' 형식에서 연도와 월을 분리
    //         const monthLabel = `${parseInt(month)}월`; // 월을 '1월', '2월' 형식으로 변환
    //         const data = lineChartDatas.find(item => item.category === value);
    //         return data ? `${monthLabel}\n${data.value1.toLocaleString()}\n${data.value2?.toLocaleString()}` : value;
    //       }
    //     }
    //   },
    //   yAxis: { type: 'value' },
    //   series: [
    //     {
    //       type: 'line',
    //       encode: {
    //         x: 'category',
    //         y: 'value1'  // 첫 번째 시리즈는 value1을 사용
    //       }
    //     },
    //     {
    //       type: 'line',
    //       encode: {
    //         x: 'category',
    //         y: 'value2'  // 두 번째 시리즈는 value2를 사용
    //       }
    //     }
    //   ]
    // }

    chartInstance.setOption(options)
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
