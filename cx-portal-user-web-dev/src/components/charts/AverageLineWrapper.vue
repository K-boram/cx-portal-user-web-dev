<script setup lang="ts">
import * as echarts from "echarts/core";
import { SVGRenderer } from 'echarts/renderers'
import { LineChart } from 'echarts/charts'
import {
  GridComponent,
  // TitleComponent,
  // TooltipComponent,
  MarkLineComponent,
  // MarkPointComponent,
  // DataZoomComponent,
  DatasetComponent,
} from 'echarts/components'
import type { ECharts, EChartsOption } from 'echarts'

// 렌딩을 빨리하기 위해 SVGRenderer 사용
echarts.use([
  SVGRenderer,
  LineChart,
  GridComponent,
  // TitleComponent,
  // TooltipComponent,
  MarkLineComponent,
  // MarkPointComponent,
  // DataZoomComponent,
  DatasetComponent,
])

const props = withDefaults(defineProps<{
  categoryKey: string // 데이터 column key 값
  valueKey: string // 데이터 value key 값
  dataList: { [key: string]: any }[], // 데이터
  showAverageLineLabel?: boolean // 평균값 라벨 보여줄지 여부
  defaultLineColor: string // default 라인 컬러 코드
  warningLineColor?: string // 특정 값 라인 컬러 코드
  isWarning?: boolean // 특정 값인 경우 warningLineColor 적용
  useLineShadow: boolean // 라인 그림자 사용여부
}>(), {
  showAverageLineLabel: false,
  isWarning: false
})

const chartContainer = ref<HTMLDivElement | null>(null)
const chartInstance = ref<ECharts | null>(null)

const setLineColor = () => {
  if (props.isWarning) {
    return props.warningLineColor
  } else {
    return props.defaultLineColor
  }
}

const setAverageLineColor = () => {
  if (props.isWarning) {
    return '#EC008B'
  } else {
    return '#999999'
  }
}

// 차트 옵션 설정
const options = ref<EChartsOption>({
  grid: {
    top: '10%',    // 상단 여백
    bottom: '10%', // 하단 여백
    left: '10%',   // 좌측 여백
    right: '10%',   // 우측 여백
    containLabel: true
  },
  animation: false,
  dataset: {
    source: props.dataList
  },
  xAxis: {
    type: 'category',
    show: false,
  },
  yAxis: {
    show: false,
  },
  series: [
    {
      type: 'line',
      encode: {
        // Map "amount" column to x-axis.
        x: props.categoryKey,
        // Map "product" row to y-axis.
        y: props.valueKey
      },
      showSymbol: false,
      lineStyle: {
        color: setLineColor(),
        shadowColor: setLineColor(),
        shadowBlur: 20,
        shadowOffsetY: 5,
        shadowOffsetX: 5
      },
      // data: [150, 230, 224, 218, 135, 147, 260],
      markLine: {
        symbol: 'none',
        label: {
          show: props.showAverageLineLabel,
          position: 'insideEndTop',
          formatter: `{markFont|{b}.\n{c}}`,
          rich: {
            markFont: {
              fontFamily: 'Pretendard',
              fontWeight: 400,
              fontSize: 11,
              lineHeight: 13.13
            },
          },
        },
        lineStyle: {
          width: 2,
          type: 'dotted',
          color: setAverageLineColor()
        },
        emphasis: {
          disabled: true,
        },
        data: [{ type: 'average', name: 'avg' }],
      },
    },
  ],
})
const initChart = () => {
  if (chartContainer.value) {
    // ECharts 인스턴스 생성
    chartInstance.value = echarts.init(chartContainer.value)
    chartInstance.value.setOption(options.value)
  }
}

onMounted(async () => {
  initChart()
})

onBeforeUnmount(() => {
  if (chartInstance.value)
    chartInstance.value.dispose()
})
</script>

<template>
  <div ref="chartContainer" style="width: 100%; height: 100%;" />
</template>

<style scoped></style>
