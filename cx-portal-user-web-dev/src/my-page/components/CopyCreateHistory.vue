<script setup lang="ts">
import dayjs from 'dayjs'
import { h } from 'vue'
import type { IColumn, IGrid } from '~/types/grid'
import type { ICopyCreateHistoryRow } from '~/my-page/types/copy-create-history'
import type { IRangeDateValue } from '~/types/range-datepicker'
import type { ICode } from '~/types/code'
import type { IOptions } from '~/types/select-box'
import { useCopyWriteStore } from '~/store/copyWrite'
import Icon from '~/components/Icon.vue'
import NoData from '~/components/NoData.vue'

const router = useRouter()
const rowList = ref<ICopyCreateHistoryRow[]>([
  {
    id: '0',
    channel: 'App Push',
    campaignPurpose: '혜택 안내',
    prodServiceName: '사전 예약 혜택 안내',
    content: '특별 할인 행사 관련 내용 특별 할인 행사 관련 내용 특별 할인 행사 관련 내용 특별 할인 행사 관련 내용',
    targetSettingWay: 'Target Insight에서 불러오기',
    mainTarget: '성별 & 연령',
    targetDetail: '1인 가구',
    targetInsight: '',
    createdUser: '이민우',
    createDate: '2024-06-06',
  },
  {
    id: '1',
    channel: 'MMS',
    campaignPurpose: '혜택 안내',
    prodServiceName: '사전 예약 혜택 안내',
    content: '특별 할인 행사 관련 내용 특별 할인 행사 관련 내용 특별 할인 행사 관련 내용 특별 할인 행사 관련 내용',
    targetSettingWay: '직접 설정',
    mainTarget: '가구',
    targetDetail: '1인 가구',
    targetInsight: '',
    createdUser: '이민우',
    createDate: '2024-06-06',
  },
  {
    id: '2',
    channel: 'MMS',
    campaignPurpose: '혜택 안내',
    prodServiceName: '사전 예약 혜택 안내',
    content: '특별 할인 행사 관련 내용 특별 할인 행사 관련 내용 특별 할인 행사 관련 내용 특별 할인 행사 관련 내용',
    targetSettingWay: '직접 설정',
    mainTarget: '가구',
    targetDetail: '1인 가구',
    targetInsight: '',
    createdUser: '이민우',
    createDate: '2024-06-06',
  },
  {
    id: '3',
    channel: 'MMS',
    campaignPurpose: '혜택 안내',
    prodServiceName: '사전 예약 혜택 안내',
    content: '특별 할인 행사 관련 내용 특별 할인 행사 관련 내용 특별 할인 행사 관련 내용 특별 할인 행사 관련 내용',
    targetSettingWay: '직접 설정',
    mainTarget: '가구',
    targetDetail: '1인 가구',
    targetInsight: '',
    createdUser: '이민우',
    createDate: '2024-06-06',
  },
  {
    id: '4',
    channel: 'MMS',
    campaignPurpose: '혜택 안내',
    prodServiceName: '사전 예약 혜택 안내',
    content: '특별 할인 행사 관련 내용 특별 할인 행사 관련 내용 특별 할인 행사 관련 내용 특별 할인 행사 관련 내용',
    targetSettingWay: '직접 설정',
    mainTarget: '가구',
    targetDetail: '1인 가구',
    targetInsight: '',
    createdUser: '이민우',
    createDate: '2024-06-06',
  },
  {
    id: '5',
    channel: 'MMS',
    campaignPurpose: '혜택 안내',
    prodServiceName: '사전 예약 혜택 안내',
    content: '특별 할인 행사 관련 내용 특별 할인 행사 관련 내용 특별 할인 행사 관련 내용 특별 할인 행사 관련 내용',
    targetSettingWay: '직접 설정',
    mainTarget: '가구',
    targetDetail: '1인 가구',
    targetInsight: '',
    createdUser: '이민우',
    createDate: '2024-06-06',
  },
  {
    id: '6',
    channel: 'MMS',
    campaignPurpose: '혜택 안내',
    prodServiceName: '사전 예약 혜택 안내',
    content: '특별 할인 행사 관련 내용 특별 할인 행사 관련 내용 특별 할인 행사 관련 내용 특별 할인 행사 관련 내용',
    targetSettingWay: '직접 설정',
    mainTarget: '가구',
    targetDetail: '1인 가구',
    targetInsight: '',
    createdUser: '이민우',
    createDate: '2024-06-06',
  },
  {
    id: '7',
    channel: 'MMS',
    campaignPurpose: '혜택 안내',
    prodServiceName: '사전 예약 혜택 안내',
    content: '특별 할인 행사 관련 내용 특별 할인 행사 관련 내용 특별 할인 행사 관련 내용 특별 할인 행사 관련 내용',
    targetSettingWay: '직접 설정',
    mainTarget: '가구',
    targetDetail: '1인 가구',
    targetInsight: '',
    createdUser: '이민우',
    createDate: '2024-06-06',
  },
  {
    id: '8',
    channel: 'MMS',
    campaignPurpose: '혜택 안내',
    prodServiceName: '사전 예약 혜택 안내',
    content: '특별 할인 행사 관련 내용 특별 할인 행사 관련 내용 특별 할인 행사 관련 내용 특별 할인 행사 관련 내용',
    targetSettingWay: '직접 설정',
    mainTarget: '가구',
    targetDetail: '1인 가구',
    targetInsight: '',
    createdUser: '이민우',
    createDate: '2024-06-06',
  },
  {
    id: '9',
    channel: 'MMS',
    campaignPurpose: '혜택 안내',
    prodServiceName: '사전 예약 혜택 안내',
    content: '특별 할인 행사 관련 내용 특별 할인 행사 관련 내용 특별 할인 행사 관련 내용 특별 할인 행사 관련 내용',
    targetSettingWay: '직접 설정',
    mainTarget: '가구',
    targetDetail: '1인 가구',
    targetInsight: '',
    createdUser: '이민우',
    createDate: '2024-06-06',
  },
])

const historyGrid: IGrid<ICopyCreateHistoryRow> = reactive({
  name: 'copyCreateHistoryGrid',
  checkboxInfo: {
    name: '선택',
    visible: true,
    width: '4%',
  },
  rowId: 'id',
  columns: ref<IColumn[]>([
    {
      name: '채널',
      width: '6%',
    },
    {
      name: '캠페인 목적',
      width: '6%',
    },
    {
      name: '상품/서비스 명',
      width: '10%',
    },
    {
      name: '설명',
      width: '18%',
    },
    {
      name: '타겟 설정 방법',
      width: '10%',
    },
    {
      name: '주요 타겟',
      width: '8%',
    },
    {
      name: '타겟 상세',
      width: '10%',
    },
    {
      name: 'Target insight',
      width: '10%',
    },
    {
      name: '생성자',
      width: '8%',
    },
    {
      name: '생성 일자',
      width: '10%',
    },
  ]),
  rows: ref<ICopyCreateHistoryRow[]>([]),
  noDataText: '카피 생성 이력이 없습니다.',
  totalCount: 0,
})

const targetSettingWayOptions = ref<IOptions[]>([
  {
    value: 'noSetting',
    label: '설정하지 않음',
  },
  {
    value: 'directlySetting',
    label: '직접 설정하기',
  },
  {
    value: 'loadInTargetInsight',
    label: 'Target Insight에서 불러오기',
  },
])

const historyGridPagination = reactive({
  currentPage: 1,
  limit: 10,
})

const historyGridSelectedList = ref<string[]>([])

const requestDate = ref<IRangeDateValue>({
  startDate: '',
  endDate: '',
})

const productServiceName = ref<string>('')

const description = ref<string>('')

const targetSettingWay = ref<string>('')

const getCopyCreateHistoryList = async () => {
  const params = {
    startDate: requestDate.value.startDate,
    endDate: requestDate.value.endDate,
    targetSettingWay: targetSettingWay.value,
    productServiceName: productServiceName.value,
    content: description.value,
    currentPage: historyGridPagination.currentPage,
    limit: historyGridPagination.limit,
  }
  try {
    // const response = await getCopyCreateHistoryListApi(params)
    historyGrid.rows = rowList.value
    // historyGrid.totalCount = rowList.value.length
    historyGrid.totalCount = 17
  }
  catch (error) {
    console.error(error)
  }
}

// TODO: API 적용 필요
const getCommonCode = async () => {
  try {
    // const response = await getCommonCodeApi()
    targetSettingWayOptions.value.unshift({
      value: '',
      label: '전체',
    })
  }
  catch (error) {
    console.error(error)
  }
}

const setDefaultDateValue = () => {
  const today = dayjs().format('YYYY-MM-DD')
  const threeMonthsAgo = dayjs().subtract(3, 'month').format('YYYY-MM-DD')

  requestDate.value.endDate = today
  requestDate.value.startDate = threeMonthsAgo
}

const isSearched = ref<boolean>(false)
const searchGridList = async () => {
  isSearched.value = true
  historyGridPagination.currentPage = 1
  historyGridSelectedList.value = []
  await getCopyCreateHistoryList()
  isSearched.value = false
}

const deleteCopyCreateHistory = async () => {
  const data = {
    deletedCopyCreateHistoryList: historyGridSelectedList.value,
  }
  try {
    await openCustomConfirm(
      h('div', { class: 'use-icon' }, [
        h(Icon, { name: 'success__line--03b', width: '52', height: '52', class: 'popup__icon' }),
        h('p', { class: 'popup__title' }, '정말 삭제 하시겠습니까? 삭제 시 복구되지 않습니다.'),
      ]),
      {
        center: true,
        hideCancelButton: false,
        closeOnPressEscape: true,
        showClose: true,
        title: '',
      },
    )
    // await deleteCopyCreateHistoryApi(data)
    historyGridSelectedList.value = []
    isSearched.value = true
    historyGridPagination.currentPage = 1
    await getCopyCreateHistoryList()
    isSearched.value = false

    openToast({
      message: '삭제되었습니다.',
      showClose: true,
    })
  }
  catch (error) {
    if (error !== 'cancel')
      console.error(error)
  }
}

const copyWriteStore = useCopyWriteStore()
const moveCopyCrateDetail = (copyId: string) => {
  copyWriteStore.setCopyWriteId(copyId)
  router.push('/copy-create')
}

const init = async () => {
  await getCommonCode()
  setDefaultDateValue()
  getCopyCreateHistoryList()
}
init()

watch(() => historyGridPagination.currentPage, () => {
  if (!isSearched.value)
    getCopyCreateHistoryList()
})
</script>

<template>
  <div>
    <!-- FIXME: 퍼블리싱 단계에서 임의로 나눈 no data 조건입니다. 개발 시 변경이 필요합니다. -->
    <template v-if="true">
      <!-- 검색 영역 -->
      <SearchForm @search="searchGridList">
        <SearchItem label="생성 일자">
          <range-datepicker v-model="requestDate" />
        </SearchItem>
        <SearchItem label="타겟 설정 방법" class="flex-1">
          <custom-dropdown v-model="targetSettingWay" :options="targetSettingWayOptions" label-position="row" />
        </SearchItem>
        <SearchItem label="품/서비스 명">
          <custom-input v-model="productServiceName" placeholder="검색어를 검색하세요." @keypress-enter="searchGridList" />
        </SearchItem>
        <SearchItem label="설명">
          <custom-input v-model="description" placeholder="검색어를 검색하세요." @keypress-enter="searchGridList" />
        </SearchItem>
      </SearchForm>

      <div class="page-table">
        <div class="page-table__header">
          <button type="button" class="btn__line--primary-md" :disabled="!historyGridSelectedList.length"
            @click="deleteCopyCreateHistory">
            선택 삭제
          </button>
        </div>
        <common-grid v-model:selectedList="historyGridSelectedList" :name="historyGrid.name" :row-id="historyGrid.rowId"
          :columns="historyGrid.columns" :rows="historyGrid.rows" :checkbox-info="historyGrid.checkboxInfo"
          :no-data-text="historyGrid.noDataText">
          <template #colgroup="{ width }">
            <col :width="width">
          </template>
          <template #header="{ column }">
            <th>
              {{ column.name }}
            </th>
          </template>
          <template #content="{ row }">
            <td>{{ row.channel }}</td>
            <td>{{ row.campaignPurpose }}</td>
            <td class="text--underline" @click="moveCopyCrateDetail(row.id)">
              {{ row.prodServiceName }}
            </td>
            <td class="align-left">
              {{ row.content }}
            </td>
            <td>
              {{ row.targetSettingWay }}
            </td>
            <td>{{ row.mainTarget ? row.mainTarget : '-' }}</td>
            <td>{{ row.targetDetail ? row.targetDetail : '-' }}</td>
            <td>{{ row.targetInsight ? row.targetInsight : '-' }}</td>
            <td>{{ row.createdUser }}</td>
            <td>{{ row.createDate }}</td>
          </template>
        </common-grid>
        <pagination v-model="historyGridPagination.currentPage" :total-count="historyGrid.totalCount"
          :limit="historyGridPagination.limit" />
      </div>
    </template>
    <template v-else>
      <NoData message="카피 생성 이력이 없습니다." />
    </template>
  </div>
</template>

<style scoped></style>
