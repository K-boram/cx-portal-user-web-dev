<script setup lang="ts">

const setDataList = (minValue: number, maxValue: number, dataCount: number) => {
  let dataList = []
  for (let i = 1; i <= dataCount; i++) {
    const randomValue = Math.floor(Math.random() * (maxValue - minValue + 1)) + minValue;
    dataList.push({
      category: `${i}월`,
      value: randomValue
    })
  }

  return dataList
}

const appVocList = ref({
  commonList: [
    {
      id: '0',
      chartDataList: setDataList(100000, 5000000, 12)
    },
    {
      id: '1',
      chartDataList: setDataList(100000, 5000000, 12)
    },
    {
      id: '2',
      chartDataList: setDataList(100000, 5000000, 12)
    }
  ],
  mobileList: [
    {
      id: '3',
      chartDataList: setDataList(100000, 5000000, 12)
    },
    {
      id: '4',
      chartDataList: setDataList(100000, 5000000, 12)
    },
    {
      id: '5',
      chartDataList: setDataList(100000, 5000000, 12)
    },
    {
      id: '6',
      chartDataList: setDataList(100000, 5000000, 12)
    },
    {
      id: '7',
      chartDataList: setDataList(100000, 5000000, 12)
    },
    {
      id: '8',
      chartDataList: setDataList(100000, 5000000, 12)
    },
    {
      id: '9',
      chartDataList: setDataList(100000, 5000000, 12)
    },
    {
      id: '10',
      chartDataList: setDataList(100000, 5000000, 12)
    },
    {
      id: '11',
      chartDataList: setDataList(100000, 5000000, 12)
    },
    {
      id: '12',
      chartDataList: setDataList(100000, 5000000, 12)
    },
    {
      id: '13',
      chartDataList: setDataList(100000, 5000000, 12)
    },
    {
      id: '14',
      chartDataList: setDataList(100000, 5000000, 12)
    },
    {
      id: '15',
      chartDataList: setDataList(100000, 5000000, 12)
    },
  ],
  homeList: [
    {
      id: '16',
      chartDataList: setDataList(100000, 5000000, 12)
    }, {
      id: '17',
      chartDataList: setDataList(100000, 5000000, 12)
    }, {
      id: '18',
      chartDataList: setDataList(100000, 5000000, 12)
    },

  ],
  businessList: [
    {
      id: '19',
      chartDataList: setDataList(100000, 5000000, 12)
    }, {
      id: '20',
      chartDataList: setDataList(100000, 5000000, 12)
    }, {
      id: '21',
      chartDataList: setDataList(100000, 5000000, 12)
    }, {
      id: '22',
      chartDataList: setDataList(100000, 5000000, 12)
    }, {
      id: '23',
      chartDataList: setDataList(100000, 5000000, 12)
    }, {
      id: '24',
      chartDataList: setDataList(100000, 5000000, 12)
    }, {
      id: '25',
      chartDataList: setDataList(100000, 5000000, 12)
    }, {
      id: '26',
      chartDataList: setDataList(100000, 5000000, 12)
    }, {
      id: '27',
      chartDataList: setDataList(100000, 5000000, 12)
    }, {
      id: '28',
      chartDataList: setDataList(100000, 5000000, 12)
    },
  ]
})
</script>

<template>
  <div class="w-full">
    <h2>공통</h2>
    <div class="list-wrapper">
      <ul class="list-container">
        <li class="list-item" v-for="common in appVocList.commonList" :key="`example-${common.id}`">
          <ChartsAverageLineWrapper :category-key="'category'" :value-key="'value'" :data-list="common.chartDataList"
            :default-line-color="'#333'" :show-average-line-label="true" :use-line-shadow="true" />
        </li>
      </ul>
    </div>
    <h2>모바일</h2>
    <div class="list-wrapper">
      <ul class="list-container">
        <li class="list-item" v-for="common in appVocList.mobileList" :key="`example-${common.id}`">
          <ChartsAverageLineWrapper :category-key="'category'" :value-key="'value'" :data-list="common.chartDataList"
            :default-line-color="'#333'" :show-average-line-label="true" :use-line-shadow="true" />
        </li>
      </ul>
    </div>
    <h2>홈</h2>
    <div class="list-wrapper">
      <ul class="list-container">
        <li class="list-item" v-for="common in appVocList.homeList" :key="`example-${common.id}`">
          <ChartsAverageLineWrapper :category-key="'category'" :value-key="'value'" :data-list="common.chartDataList"
            :default-line-color="'#333'" :show-average-line-label="true" :use-line-shadow="true" />
        </li>
      </ul>
    </div>
    <h2>기업</h2>
    <div class="list-wrapper">
      <ul class="list-container">
        <li class="list-item" v-for="common in appVocList.businessList" :key="`example-${common.id}`">
          <ChartsAverageLineWrapper :category-key="'category'" :value-key="'value'" :data-list="common.chartDataList"
            :default-line-color="'#333'" :show-average-line-label="true" :use-line-shadow="true" />
        </li>
      </ul>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.chart {
  width: 100%;
  height: 100%;
}

.list-wrapper {
  display: flex;
  justify-content: center;
  /* 리스트를 중앙 정렬 */
  padding: 20px;
  /* wrapper에 padding을 추가 */
}

.list-container {
  display: flex;
  flex-wrap: nowrap;
  padding: 0;
  margin: 0;
  list-style: none;
}

.list-item {
  width: 300px;
  /* 고정 넓이 설정 */
  height: 200px;
  /* 고정 높이 설정 */
  flex: 1 1 calc(33.333% - 20px);
  margin: 10px;
  box-sizing: border-box;
  background-color: #f5f5f5;
  padding: 20px;
  text-align: center;
  border: 1px solid #ddd;
}
</style>