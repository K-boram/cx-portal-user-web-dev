<script lang="tsx" setup>
// import { PieChart } from 'echarts/charts'
//import {
//  LegendComponent,
//  TitleComponent,
//  TooltipComponent,
//} from 'echarts/components'
// import { use } from 'echarts/core'
// import { SVGRenderer } from 'echarts/renderers'
import { generateColumns, generateData } from '~/example/pages/use-table'
// use([
//   SVGRenderer,
//   PieChart,
//   TitleComponent,
//   TooltipComponent,
//   LegendComponent,
// ])

// const option = ref({
//   series: [
//     {
//       name: 'Traffic Sources',
//       type: 'pie',
//       radius: '55%',
//       center: ['50%', '60%'],
//       data: [
//         {
//           value: 335,
//           name: 'Direct',
//         },
//         {
//           value: 310,
//           name: 'Email',
//         },
//         {
//           value: 234,
//           name: 'Ad Networks',
//         },
//         {
//           value: 135,
//           name: 'Video Ads',
//         },
//         {
//           value: 1548,
//           name: 'Search Engines',
//         },
//       ],
//       emphasis: {
//         itemStyle: {
//           shadowBlur: 10,
//           shadowOffsetX: 0,
//           shadowColor: 'rgba(0, 0, 0, 0.5)',
//         },
//       },
//     },
//   ],
// })

const columns = generateColumns(30)
const data = generateData(columns, 10000)

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
  <el-table-v2 :columns="columns" :data="data" :height="700" :width="1600" fixed>
    <template #cell="{ column, cellData, rowData, rowIndex }">
      <template v-if="column.key === 'column-0'">
        <!-- <GridLineChart/> -->
        <ChartsAverageLineWrapper :category-key="'category'" :value-key="'value'" :data-list="dataList"
          :is-warning="false" :warning-line-color="'#F42D1A'" :default-line-color="'#333'"
          :show-average-line-label="false" :use-line-shadow="false" />
      </template>
      <template v-else>
        {{ rowData[column.key] }}
      </template>
    </template>
  </el-table-v2>
</template>
