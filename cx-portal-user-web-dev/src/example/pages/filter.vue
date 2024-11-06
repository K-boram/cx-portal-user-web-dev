<script setup lang="ts">
import { ref } from 'vue'
import { DatePickerMode } from '~/types/enums/date-picker-mode'
import type { IMonth, IRangeDate, ITime } from '~/types/custom-datepicker'

const initFilter = () => {
  console.log('조건 초기화')
}

const inquiry = () => {
  console.log('조회')
}

const applyReportValue = ref<boolean>(true)

const selectedServiceArea = ref('mobile')
const selectedStandard = ref('dailyAverage')
const selectedCallDivision = ref('allCall')
const selectedTarget = ref('allCate')
const selectedReportType = ref('day')
const selectedTerm = ref('currentMonth')
const customTermDate = ref(true)
const selectedSort = ref('')
const selectedAppDivision = ref('allApp')
const selectedApplication = ref('')
const selectedOpinionType = {
  mainCate: '',
  middleCate: '',
}
const emptyRangeDateValue = ref<IRangeDate>({
  startDate: '',
  endDate: '',
})

const serviceAreaList = [
  { value: 'mobile', name: '모바일' },
  { value: 'home', name: '홈' },
  { value: 'company', name: '기업' },
]
const standardList = [
  { value: 'dailyAverage', name: '일평균' },
  { value: 'callCount', name: '콜수' },
]
const callDivisionList = [
  { value: 'allCall', name: '전체1' },
  { value: 'valueCall', name: '가치콜' },
  { value: 'mgmtCall', name: '관리콜' },
]
const targetList = [
  { value: 'allCate', name: '전체2' },
  { value: 'mainCate', name: '대분류' },
  { value: 'middleCate', name: '중분류' },
]
const reportTypeList = [
  { value: 'day', name: '일별' },
  { value: 'week', name: '주별' },
  { value: 'month', name: '월별' },
]
const termList = [
  { value: 'currentMonth', name: '이번달' },
  { value: 'lastMonth', name: '지난달' },
  { value: 'threeMonths', name: '3개월' },
  { value: 'oneYear', name: '1년' },
]
const date = ref<Date>(new Date())
const sortList = []
const appDivisionList = [
  { value: 'allApp', name: '전체3' },
  { value: 'appReview', name: '앱 리뷰' },
  { value: 'voc', name: '고객의 소리' },
]
const opinionTypeList = {
  mainCate: [],
  middleCate: [],
}
</script>

<template>
  <div class="p-20">
    <h2 class="text-3xl font-semibold">
      Filter
    </h2>
    <filter-sidebar @init-filter="initFilter" @inquiry="inquiry">
      <template #content>
        <!-- 그룹 라디오 형태 -->
        <form-item row-between>
          <form-label name="보고서 기준 조회 적용" color="white" size="md" />
          <el-switch v-model="applyReportValue" />
        </form-item>

        <form-item>
          <form-label name="서비스 영역" color="white" />
          <custom-radio v-model="selectedServiceArea" :radio-list="serviceAreaList" is-group-style />
        </form-item>

        <form-item>
          <form-label name="기준" color="white" />
          <custom-radio v-model="selectedStandard" :radio-list="standardList" is-group-style />
        </form-item>

        <form-item>
          <form-label name="콜 구분" color="white" />
          <custom-radio v-model="selectedCallDivision" :radio-list="callDivisionList" is-group-style />
        </form-item>

        <form-item>
          <form-label name="대상" color="white" />
          <custom-radio v-model="selectedTarget" :radio-list="targetList" is-group-style />
        </form-item>

        <form-item>
          <form-label name="리포트 타입" color="white" />
          <custom-radio v-model="selectedReportType" :radio-list="reportTypeList" is-group-style />
        </form-item>

        <!-- 데이트피커 -->
        <form-item>
          <form-label name="조회 월" color="white" />
          <custom-datepicker v-model="date" :mode="DatePickerMode.DATE" />
        </form-item>

        <!-- 라디오 + 데이크피커 -->
        <form-item>
          <form-label name="기간" color="white" />
          <custom-radio v-model="selectedTerm" :radio-list="termList" />
          <div class="flex items-center gap-2">
            <el-checkbox v-model="customTermDate" label="직접 입력" />
            <custom-range-datepicker v-model:start-date="emptyRangeDateValue.startDate"
              v-model:end-date="emptyRangeDateValue.endDate" :is-disabled="!customTermDate" />
          </div>
        </form-item>

        <!-- 드롭다운 -->
        <form-item>
          <form-label name="정렬" color="white" />
          <custom-dropdown v-model="selectedSort" :options="sortList" placeholder="이번 달 목표 미달순" class="w-130" />
        </form-item>

        <form-item>
          <form-label name="앱 구분" color="white" />
          <custom-radio v-model="selectedAppDivision" :radio-list="appDivisionList" is-group-style />
        </form-item>

        <form-item>
          <form-label name="Application" color="white" />
          <custom-dropdown v-model="selectedApplication" :options="applicationList" placeholder="당신의 U+"
            class="w-130" />
        </form-item>

        <form-item>
          <form-label name="의견 유형" color="white" />
          <div class="flex gap-4 w-full">
            <custom-dropdown v-model="selectedOpinionType.mainCate" :options="opinionTypeList.mainCate"
              placeholder="대분류" class="is-flexible" />
            <custom-dropdown v-model="selectedOpinionType.middleCate" :options="opinionTypeList.middleCate"
              placeholder="중분류" class="is-flexible" />
          </div>
        </form-item>

        <form-item>
          <el-checkbox v-model="customTermDate" class="checkbox" label="주말 데이터 제외" />
        </form-item>
      </template>
    </filter-sidebar>
  </div>
</template>
