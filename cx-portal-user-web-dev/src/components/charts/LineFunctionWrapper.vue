<script setup lang="ts">
import * as echarts from 'echarts';
// import * as echarts from "echarts/core";
// import { SVGRenderer } from 'echarts/renderers'
// import { LineChart } from 'echarts/charts'
// import {
//   GridComponent,
//   // TitleComponent,
//   TooltipComponent,
//   MarkLineComponent,
//   MarkPointComponent,
//   DataZoomComponent,
//   DatasetComponent,
//   DataZoomInsideComponent,
//   ToolboxComponent,
//   DataZoomSliderComponent
// } from 'echarts/components'
import type { ECharts, EChartsOption } from 'echarts'

// 렌딩을 빨리하기 위해 SVGRenderer 사용
// echarts.use([
//   SVGRenderer,
//   LineChart,
//   GridComponent,
//   // TitleComponent,
//   TooltipComponent,
//   MarkLineComponent,
//   MarkPointComponent,
//   DataZoomComponent,
//   DatasetComponent,
//   DataZoomInsideComponent,
//   ToolboxComponent,
//   DataZoomSliderComponent
// ])

// const setDataList = (minValue: number, maxValue: number, dataCount: number) => {
//   let dataList = []
//   for (let i = 1; i <= dataCount; i++) {
//     const randomValue = Math.floor(Math.random() * (maxValue - minValue + 1)) + minValue;
//     dataList.push({
//       category: `${i}월`,
//       value: randomValue
//     })
//   }
//   return dataList
// }

const getRandomValue = (minValue: number, maxValue: number) => {
  const randomValue = Math.floor(Math.random() * (maxValue - minValue + 1)) + minValue;
  return randomValue
}

const generateDateRange = (startDate: string, endDate: string): string[] => {
  const dateArray: string[] = [];
  let currentDate = new Date(startDate);
  const end = new Date(endDate);

  while (currentDate <= end) {
    dateArray.push(currentDate.toISOString().split('T')[0]);
    currentDate.setDate(currentDate.getDate() + 1);
  }

  return dateArray;
};

const createDailyDataset = (startDate: string, endDate: string, minValue: number, maxValue: number) => {
  const dateRange = generateDateRange(startDate, endDate);
  const dataset = dateRange.map(date => ({
    category: date,
    value: getRandomValue(minValue, maxValue)
  }));

  return dataset;
};

const createMonthlyDataset = (dailyData: any[]) => {
  const monthlyData: Record<string, { sum: number; count: number }> = {};

  dailyData.forEach(item => {
    const month = item.category.slice(0, 7); // 'YYYY-MM' 형식으로 월 추출
    if (!monthlyData[month]) {
      monthlyData[month] = { sum: 0, count: 0 };
    }
    monthlyData[month].sum += item.value;
    monthlyData[month].count += 1;
  });

  return Object.keys(monthlyData).map(month => ({
    category: month,
    value: Math.round(monthlyData[month].sum / monthlyData[month].count) // 월 평균값 계산
  }));
};

// 사용 예시
const startDate = '2023-09-01';
const endDate = '2024-08-25';
const minValue = 100000;
const maxValue = 5000000;

// 일별 데이터 생성
const dailyDataset = createDailyDataset(startDate, endDate, minValue, maxValue);

// 월별 데이터 집계
const monthlyDataset = createMonthlyDataset(dailyDataset);

const chartContainer = ref<HTMLDivElement | null>(null)
const chartInstance = ref<ECharts | null>(null)

// 차트 옵션 설정
const options = ref<EChartsOption>({
  grid: {
    top: '10%',    // 상단 여백
    bottom: '10%', // 하단 여백
    left: '10%',   // 좌측 여백
    right: '10%',   // 우측 여백
    containLabel: true
  },
  toolbox: {
    feature: {
      dataZoom: {
        yAxisIndex: 'none'
      },
    }
  },
  tooltip: {
    trigger: 'axis', // 현재 마우스 포인터에 위치 y 축 점선이 노출되도록 설정
    // formatter: `
    //   <div class="text-center">
    //     <span class="text-sm text-white">{c}</span>
    //     <br />
    //     <span class="text-xs text-gray-5">{b}</span>
    //   </div>`,
    // backgroundColor: '#FF008C',
  },
  dataset: {
    source: monthlyDataset
  },
  xAxis: {
    type: 'time',
    show: true,
    axisLabel: {
      formatter: function (value: number) {
        const date = new Date(value);
        const monthFormat = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}`;
        return monthFormat;
      }
    }
  },
  yAxis: {
    show: true,
  },
  dataZoom: [
    {
      type: 'inside', // 내부 dataZoom 기능
      xAxisIndex: 0,
      filterMode: 'filter'
    },
  ],
  series: [
    {
      type: 'line',
      encode: {
        // Map "amount" column to x-axis.
        x: 'category',
        // Map "product" row to y-axis.
        y: 'value'
      },
      showSymbol: false,
      // lineStyle: {
      //   color: setLineColor(),
      //   shadowColor: setLineColor(),
      //   shadowBlur: 20,
      //   shadowOffsetY: 5,
      //   shadowOffsetX: 5
      // },
      // data: [150, 230, 224, 218, 135, 147, 260],
      markLine: {
        symbol: 'none',
        label: {
          show: false,
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
          color: '#999999'
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


    chartInstance.value.on('dataZoom', function (params) {
      console.log('데이터 줌>>>>>>', params);

      // const zoom = params.batch ? params.batch[0] : params;
      // const startValue = zoom.startValue;
      // const endValue = zoom.endValue;
      // const range = endValue - startValue;

      // // 데이터 줌의 범위가 좁아지면 (일 단위로 변경)
      // if (range < 30 * 24 * 3600 * 1000) { // 대략 30일 이내
      //   chartInstance.value.setOption({
      //     xAxis: {
      //       axisLabel: {
      //         formatter: function (value) {
      //           const date = new Date(value);
      //           const dayFormat = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;
      //           return dayFormat;
      //         }
      //       }
      //     }
      //   });
      // } else {
      //   // 다시 월 단위로 변경
      //   chartInstance.value.setOption({
      //     xAxis: {
      //       axisLabel: {
      //         formatter: function (value) {
      //           const date = new Date(value);
      //           const monthFormat = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}`;
      //           return monthFormat;
      //         }
      //       }
      //     }
      //   });
      // }
    });
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

<style lang="scss" scoped></style>