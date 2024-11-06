<script setup lang="ts">
import { reactive, watch } from 'vue'
import type { IIndeicatorList, IIndicatorPage } from '~/types/swiper-indicator'

const indicatorList = reactive<IIndeicatorList[]>([
  {
    cardSno: 1,
    cardTitle: '첫 번째 카드',
    cardContent: '첫 번째 카드입니다.',
  },
  {
    cardSno: 2,
    cardTitle: '두 번째 카드',
    cardContent: '두 번째 카드입니다.',
  },
  {
    cardSno: 3,
    cardTitle: '세 번째 카드',
    cardContent: '세 번째 카드입니다.',
  },
  {
    cardSno: 4,
    cardTitle: '네 번째 카드',
    cardContent: '네 번째 카드입니다.',
  },
  {
    cardSno: 5,
    cardTitle: '다섯 번째 카드',
    cardContent: '다섯 번째 카드입니다.',
  },
  {
    cardSno: 6,
    cardTitle: '여섯 번째 카드',
    cardContent: '여섯 번째 카드입니다.',
  },
])
const monthList = reactive([
  {
    title: '문의콜',
    monthInfo: {
      title: '월 데이터'
    },
    yearInfo: {
      title: '24년 누적 모바일'
    }

  },
  {
    title: '불만콜',
    monthInfo: {
      title: '월 데이터'
    },
    yearInfo: {
      title: '24년 누적 홈'
    }
  },
])
const yearList = reactive<IIndeicatorList[]>([
  {
    title: '문의콜',
    monthInfo: {
      title: '월 데이터'
    },
    yearInfo: {
      title: '24년 누적 모바일'
    }

  },
  {
    title: '문의콜',
    monthInfo: {
      title: '월 데이터'
    },
    yearInfo: {
      title: '24년 누적 홈'
    }
  },
  {
    title: '문의콜',
    monthInfo: {
      title: '월 데이터'
    },
    yearInfo: {
      title: '24년 누적 기업'
    }
  },
  {
    title: '불만콜',
    monthInfo: {
      title: '월 데이터'
    },
    yearInfo: {
      title: '24년 누적 모바일'
    }
  },
  {
    title: '불만콜',
    monthInfo: {
      title: '월 데이터'
    },
    yearInfo: {
      title: '24년 누적 홈'
    }
  },
  {
    title: '불만콜',
    monthInfo: {
      title: '월 데이터'
    },
    yearInfo: {
      title: '24년 누적 기업'
    }
  },
])

const page: IIndicatorPage = reactive({
  currentPage: 1,
  totalCount: indicatorList.length,
})

watch(() => page.currentPage, (newValue) => {
  console.log('newValue>>>>', newValue)
})
</script>

<template>
  <div>
    <h2 class="py-3 font-bold">
      인디케이터 예제
    </h2>
    <!-- 메인화면 이중 스와이퍼 예시 -->
    <div class="p-5">
      <!-- TODO: 인터벌을 적용하는게 아닌 하위 3초인 스와이퍼의 페이지에 따라 다름 화면 보여주도록 적용 -->
      <SwiperIndicator v-model="page.currentPage" :indicator-list="monthList" :total-count="monthList.length">
        <template #content="{ item }">
          <div class="p-5 px-20">
            <p>{{ item.title }}</p>
            <p>{{ item.monthInfo.title }}</p>
          </div>
        </template>
      </SwiperIndicator>
      <SwiperIndicator v-model="page.currentPage" :indicator-list="yearList" :total-count="page.totalCount" use-pagination
        :slide-interval="3000">
        <template #content="{ item }">
          <div class="p-5 px-20">
            <p>{{ item.yearInfo.title }}</p>
          </div>
        </template>
      </SwiperIndicator>
    </div>
    <div class="p-5">
      <SwiperIndicator v-model="page.currentPage" :indicator-list="indicatorList" :total-count="page.totalCount"
        use-navigation use-pagination :slide-interval="3000" :slides-per-view="3">
        <template #content="{ item }">
          <div class="p-5 px-20">
            <p>{{ item.cardSno }}</p>
            <p>{{ item.cardTitle }}</p>
            <p>{{ item.cardContent }}</p>
          </div>
        </template>
      </SwiperIndicator>
    </div>
    <div class="p-5">
      <SwiperIndicator v-model="page.currentPage" :indicator-list="indicatorList" :total-count="page.totalCount"
        use-navigation :slide-interval="3000">
        <template #content="{ item }">
          <div class="p-5 px-20">
            <p>{{ item.cardSno }}</p>
            <p>{{ item.cardTitle }}</p>
            <p>{{ item.cardContent }}</p>
          </div>
        </template>
      </SwiperIndicator>
    </div>
    <div class="p-5">
      <SwiperIndicator v-model="page.currentPage" :indicator-list="indicatorList" :total-count="page.totalCount"
        use-pagination :slide-interval="3000">
        <template #content="{ item }">
          <div class="p-5 px-20">
            <p>{{ item.cardSno }}</p>
            <p>{{ item.cardTitle }}</p>
            <p>{{ item.cardContent }}</p>
          </div>
        </template>
      </SwiperIndicator>
    </div>
    <div class="p-5">
      <SwiperIndicator v-model="page.currentPage" :indicator-list="indicatorList" :total-count="page.totalCount"
        :slide-interval="2000">
        <template #content="{ item }">
          <div class="p-5 px-20">
            <p>{{ item.cardSno }}</p>
            <p>{{ item.cardTitle }}</p>
            <p>{{ item.cardContent }}</p>
          </div>
        </template>
      </SwiperIndicator>
    </div>
  </div>
</template>

<style scoped></style>
