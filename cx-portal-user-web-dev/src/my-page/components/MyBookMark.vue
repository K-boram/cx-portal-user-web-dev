<script setup lang="ts">
// swiper 를 사용하기 위해 필요
import { register } from 'swiper/element/bundle'
import type { IBookMarkPage } from '~/my-page/types/my-page'
import type { IAiCopyWrite } from '~/copy-create/types/copy-create'
import type { ISaveContentData, IBookMarkChangedData } from '~/types/content-card'
import type { Swiper } from 'swiper'

register()

const swiperEl = ref<HTMLElement | null>(null)

const demoBookMarkList = [
  {
    copySno: '0',
    sentiment: '불안',
    copy: '나만 모르는 갤럭시 S24 사전 예약 혜택 \n 취향에 맞게 선택하는 할인 혜택, 놓치면 손해!',
    isBookMark: true,
    copyLen: 53
  },
  {
    copySno: '1',
    sentiment: '공감',
    copy: '지금 유플러스 매장에서 갤럭시 S24 \n 사정 예약하면 푸짐한 사은품이 \n 쏟아집니다.',
    isBookMark: true,
    copyLen: 3530
  },
  {
    copySno: '2',
    sentiment: '공감',
    copy: '지금 유플러스 매장에서 갤럭시 S24 \n 사정 예약하면 푸짐한 사은품이 \n 쏟아집니다.',
    isBookMark: true,
    copyLen: 53
  },
  {
    copySno: '3',
    sentiment: '공감',
    copy: '지금 유플러스 매장에서 갤럭시 S24 \n 사정 예약하면 푸짐한 사은품이 \n 쏟아집니다.',
    isBookMark: true,
    copyLen: 53
  },
  {
    copySno: '4',
    sentiment: '공감',
    copy: '지금 유플러스 매장에서 갤럭시 S24 \n 사정 예약하면 푸짐한 사은품이 \n 쏟아집니다.',
    isBookMark: true,
    copyLen: 53
  },
  {
    copySno: '5',
    sentiment: '공감',
    copy: '지금 유플러스 매장에서 갤럭시 S24 \n 사정 예약하면 푸짐한 사은품이 \n 쏟아집니다.',
    isBookMark: true,
    copyLen: 53
  },
  {
    copySno: '6',
    sentiment: '공감',
    copy: '지금 유플러스 매장에서 갤럭시 S24 \n 사정 예약하면 푸짐한 사은품이 \n 쏟아집니다.',
    isBookMark: true,
    copyLen: 53
  },
  {
    copySno: '7',
    sentiment: '공감',
    copy: '지금 유플러스 매장에서 갤럭시 S24 \n 사정 예약하면 푸짐한 사은품이 \n 쏟아집니다.',
    isBookMark: true,
    copyLen: 53
  },
  {
    copySno: '8',
    sentiment: '공감',
    copy: '지금 유플러스 매장에서 갤럭시 S24 \n 사정 예약하면 푸짐한 사은품이 \n 쏟아집니다.',
    isBookMark: true,
    copyLen: 53
  },
]

const bookMarkList = ref<IAiCopyWrite[]>([])

const page: IBookMarkPage = reactive({
  currentPage: 1,
  totalCount: 0,
})
const getBookMarkList = async () => {
  const params = {
    currentPage: page.currentPage,
  }
  try {
    // TODO: API 연결 필요
    // await
    bookMarkList.value = demoBookMarkList
    page.totalCount = 36
  }
  catch (error) {
    console.error(error)
  }
}

const swiperCount = ref<number>(0)
const getSwiperCount = () => {
  swiperCount.value = Math.ceil(page.totalCount / 12)
}

const editedId = ref<string>('')
const changeEditedId = (contentId: string) => {
  editedId.value = contentId
}

const saveContent = (saveData: ISaveContentData) => {
  const result = bookMarkList.value.map(bookMarkItem => {
    if (bookMarkItem.copySno === saveData.copySno) {
      bookMarkItem.copy = saveData.copy
    }
    return bookMarkItem
  })

  bookMarkList.value = result
}

const changeBookMark = (bookMarkData: IBookMarkChangedData) => {
  page.currentPage = 1
  const swiperInstance = (swiperEl.value as any).swiper as Swiper
  swiperInstance.slideTo(page.currentPage - 1)
  getBookMarkList()
}

const changeSlider = (swiper: Swiper) => {
  page.currentPage = swiper.activeIndex + 1
  getBookMarkList()
}

const init = async () => {
  await getBookMarkList()
  getSwiperCount()
}
init()
onMounted(async () => {
  await nextTick()
  const swiperInstance = (swiperEl.value as any).swiper as Swiper
  // 슬라이드 변경될때 실행 이벤트
  swiperInstance.on('slideChange', changeSlider)
})
</script>

<template>
  <div>
    <!--
        화살표 Element 변경 가능
          :navigation-next-el="'.custom-next-button'" :navigation-prev-el="'.custom-prev-button'"
        페이지 숫자 노출 가능
      :pagination="true" :pagination-type="'fraction'"
    -->
    <swiper-container ref="swiperEl" :style="{ '--swiper-navigation-color': '#000', '--swiper-pagination-color': '#fff' }"
      :navigation="true" class="swiper-container">
      <swiper-slide v-for="i in swiperCount" :key="`myBookMark-swiper-${i}`">
        <ul class="my-book-mark__card--area">
          <li v-for="bookMark in bookMarkList" :key="`myBookMark-ContentCard-${bookMark.copySno}`">
            <content-card :copy-sno="bookMark.copySno" :sentiment="bookMark.sentiment" :copy="bookMark.copy"
              :is-book-mark="bookMark.isBookMark" :use-location-book-mark="true" :edited-id="editedId"
              :copy-len="bookMark.copyLen" @change-edited-id="changeEditedId" @save-content="saveContent"
              @change-book-mark="changeBookMark" />
          </li>
        </ul>
      </swiper-slide>
    </swiper-container>
    <!-- <div class="custom-next-button">
      다음 버튼
    </div>
    <div class="custom-prev-button">
      이전 버튼
    </div> -->
  </div>
</template>

<style scoped></style>
