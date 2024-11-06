<script setup lang="ts">
// swiper 를 사용하기 위해 필요
import { register } from 'swiper/element/bundle'
import type { Swiper } from 'swiper'
import type { IIndeicatorList } from '~/types/swiper-indicator'

const props = withDefaults(defineProps<{
  indicatorList: IIndeicatorList[]
  totalCount: number
  slideInterval?: number
  useNavigation?: boolean
  usePagination?: boolean
  slidesPerView?: number
}>(), {
  slideInterval: 3000,
  useNavigation: false,
  usePagination: false,
  slidesPerView: 1,
})

register()

const currentPage = defineModel<number>({ required: true })

const swiperRef = ref<HTMLElement | null>(null)
let swiperInstance: Swiper | null = null

const changeSlider = (swiper: Swiper) => {
  currentPage.value = swiper.realIndex + 1
}

const onPaginationClick = () => {
  if (swiperInstance)
    currentPage.value = swiperInstance.realIndex + 1
}

const stopAutoplay = () => {
  if (swiperInstance)
    swiperInstance.autoplay.stop() // 모든 상호작용에 대해 자동 재생 멈춤
}

onMounted(() => {
  if (swiperRef.value) {
    swiperInstance = (swiperRef.value as any).swiper as Swiper

    // 슬라이드 변경될때 실행 이벤트
    if (swiperInstance) {
      swiperInstance.on('slideChange', changeSlider)

      swiperInstance.on('click', stopAutoplay)
      swiperInstance.on('sliderMove', stopAutoplay)

      const paginationEl = swiperInstance.pagination.el
      if (props.usePagination && paginationEl)
        paginationEl.addEventListener('click', onPaginationClick)
    }
  }
})

onBeforeUnmount(() => {
  if (swiperInstance) {
    swiperInstance.off('slideChange', changeSlider)

    swiperInstance.off('click', stopAutoplay)
    swiperInstance.off('sliderMove', stopAutoplay)

    const paginationEl = swiperInstance.pagination.el
    if (props.usePagination && paginationEl)
      paginationEl.removeEventListener('click', onPaginationClick)
  }
})
</script>

<template>
  <div>
    <swiper-container ref="swiperRef" :style="{
      '--swiper-navigation-color': '#999',
      '--swiper-pagination-color': '#999',
    }" :navigation="props.useNavigation" :pagination="props.usePagination ? { clickable: true } : false"
      :autoplay-delay="props.slideInterval" :slides-per-view="props.slidesPerView" :loop="false"
      class="swiper-container">
      <swiper-slide v-for="(item, index) in indicatorList" :key="`swiper-${item.copySno}`">
        <slot name="content" :item="item" :index="index" />
      </swiper-slide>
    </swiper-container>
  </div>
</template>

<style scoped></style>
