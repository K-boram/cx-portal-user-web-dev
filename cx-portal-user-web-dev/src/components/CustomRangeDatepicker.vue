<script setup lang="ts">
import dayjs from 'dayjs'
import VueDatePicker from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'

const props = withDefaults(defineProps<{
  startDate: Date | string
  endDate: Date | string
  isDisabled?: boolean
}>(), {
  isDisabled: false,
})

const emit = defineEmits<{
  (e: 'update:startDate', startDate: Date): void
  (e: 'update:endDate', endDate: Date): void
}>()

const selectedStartDate = ref<Date | string>(props.startDate)
const selectedEndDate = ref<Date | string>(props.endDate)

const popoverVisible = ref<boolean>(false)

// 팝업 열기/닫기
const handlePopover = (isClose: boolean) => {
  if (isClose) {
    selectedStartDate.value = props.startDate
    selectedEndDate.value = props.endDate
    popoverVisible.value = !popoverVisible.value
  }
  else if (!popoverVisible.value) {
    popoverVisible.value = !popoverVisible.value
  }
}

// 선택 해제
const unselect = () => {
  selectedStartDate.value = ''
  selectedEndDate.value = ''
}

// 적용
const applySelect = () => {
  emit('update:startDate', selectedStartDate.value as Date)
  emit('update:endDate', selectedEndDate.value as Date)
  popoverVisible.value = !popoverVisible.value
}

// 시작일/종료일 비활성화
const disabledStartDates = (date: Date): boolean => {
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  return date >= today
}
const disabledEndDates = (date: Date): boolean => {
  const today = new Date()
  today.setHours(23, 59, 59, 999)
  return date > today
}

watch(() => props.startDate,
  (newVal) => {
    selectedStartDate.value = newVal
  })
watch(() => props.endDate,
  (newVal) => {
    selectedEndDate.value = newVal
  })
</script>

<template>
  <div class="datepicker">
    <el-popover :visible="popoverVisible" placement="bottom" :width="630" :disabled="props.isDisabled" :show-arrow="false" popper-class="datepicker__popover">
      <template #default>
        <div class="datepicker__header" @click="handlePopover(true)">
          <icon name="close__line--9ea" width="24" height="24" alt="닫기" />
        </div>

        <div class="datepicker__body">
          <div class="datepicker__date">
            <p class="datepicker__title is-bold">
              시작일
            </p>
            <VueDatePicker
              v-model="selectedStartDate" :month-change-on-scroll="false" inline auto-apply
              format="yyyy-MM-dd" :enable-time-picker="false" locale="ko" :year-first="true" week-start="0"
              :disabled-dates="disabledStartDates"
            >
              <template #month-year="{ month, year, updateMonthYear, handleMonthYearChange }">
                <div class="flex items-center gap-2">
                  <button type="button" @click="month !== undefined ? updateMonthYear?.(month, year - 1, true) : null">
                    <Icon name="d-arrow-l__line--999" width="16" height="16" alt="이전 년도" />
                  </button>
                  <button type="button" @click="handleMonthYearChange?.(false)">
                    <Icon name="arrow-l__line--999" width="16" height="16" alt="이전 월" />
                  </button>
                </div>

                <div class="datepicker__title--date">
                  <span>
                    {{ year }}
                  </span>
                  <em>
                    {{ month! + 1 }}
                  </em>
                </div>

                <div class="flex items-center gap-2">
                  <button type="button" @click="handleMonthYearChange?.(true)">
                    <Icon name="arrow-l__line--999" width="16" height="16" class="rotate-180" alt="다음 월" />
                  </button>
                  <button type="button" @click="month !== undefined ? updateMonthYear?.(month, year + 1, true) : null">
                    <Icon name="d-arrow-l__line--999" width="16" height="16" class="rotate-180" alt="다음 년도" />
                  </button>
                </div>
              </template>
            </VueDatePicker>
          </div>

          <div class="datepicker__date">
            <p class="datepicker__title">
              종료일
            </p>
            <VueDatePicker
              v-model="selectedEndDate" :month-change-on-scroll="false" inline auto-apply
              format="yyyy-MM-dd" :enable-time-picker="false" locale="ko" :year-first="true" week-start="0"
              :disabled-dates="disabledEndDates"
            >
              <template #month-year="{ month, year, updateMonthYear, handleMonthYearChange }">
                <div class="flex items-center gap-2">
                  <button type="button" @click="month !== undefined ? updateMonthYear?.(month, year - 1, true) : null">
                    <Icon name="d-arrow-l__line--999" width="16" height="16" alt="이전 년도" />
                  </button>
                  <button type="button" @click="handleMonthYearChange?.(false)">
                    <Icon name="arrow-l__line--999" width="16" height="16" alt="이전 월" />
                  </button>
                </div>

                <div class="datepicker__title--date">
                  <span>
                    {{ year }}
                  </span>
                  <em>
                    {{ month! + 1 }}
                  </em>
                </div>

                <div class="flex items-center gap-2">
                  <button type="button" @click="handleMonthYearChange?.(true)">
                    <Icon name="arrow-l__line--999" width="16" height="16" class="rotate-180" alt="다음 월" />
                  </button>
                  <button type="button" @click="month !== undefined ? updateMonthYear?.(month, year + 1, true) : null">
                    <Icon name="d-arrow-l__line--999" width="16" height="16" class="rotate-180" alt="다음 년도" />
                  </button>
                </div>
              </template>
            </VueDatePicker>
          </div>
        </div>

        <div class="datepicker__current-date">
          <p>
            <span>시작일</span>
            <span>{{ !selectedStartDate ? '' : dayjs(selectedStartDate).format('YYYY-MM-DD') }}</span>
          </p>
          <span>&#126;</span>
          <p>
            <span>종료일</span>
            <span>{{ !selectedEndDate ? '' : dayjs(selectedEndDate).format('YYYY-MM-DD') }}</span>
          </p>
        </div>

        <div class="datepicker__footer">
          <button
            type="button" class="btn__primary-line" :disabled="!selectedStartDate && !selectedEndDate"
            @click="unselect"
          >
            선택 해제
          </button>
          <button
            type="button" class="btn__primary" :disabled="!selectedStartDate || !selectedEndDate"
            @click="applySelect"
          >
            적용
          </button>
        </div>
      </template>

      <template #reference>
        <div class="datepicker__input" :class="{ 'is-disabled': isDisabled, 'is-focus': popoverVisible }"@click="handlePopover(false)">
          <p class="datepicker__input-text" :class="!selectedStartDate && !selectedEndDate ? 'is-empty' : ''">
            {{ !selectedStartDate ? '시작일' : dayjs(selectedStartDate).format('YYYY-MM-DD') }}
            ~
            {{ !selectedEndDate ? '종료일' : dayjs(selectedEndDate).format('YYYY-MM-DD') }}
          </p>
          <button type="button" :disabled="props.isDisabled" @click="handlePopover(false)">
            <button type="button" :disabled="props.isDisabled" class="datepicker__icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" fill="none">
                <g clip-path="url(#clip0_37_267)">
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M2 1H10C11.1046 1 12 1.89543 12 3V10C12 11.1046 11.1046 12 10 12H2C0.895431 12 0 11.1046 0 10V3C0 1.89543 0.895431 1 2 1ZM2 2C1.44772 2 1 2.44772 1 3V10C1 10.5523 1.44772 11 2 11H10C10.5523 11 11 10.5523 11 10V3C11 2.44772 10.5523 2 10 2H2Z" fill="#333333" />
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M3.5 -1.36598e-08C3.77614 -6.1157e-09 4 0.223858 4 0.5L4 2.5C4 2.77614 3.77614 3 3.5 3C3.22386 3 3 2.77614 3 2.5L3 0.5C3 0.223858 3.22386 -2.12039e-08 3.5 -1.36598e-08Z" fill="#333333" />
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M8.5 -1.36598e-08C8.77614 -6.1157e-09 9 0.223858 9 0.5L9 2.5C9 2.77614 8.77614 3 8.5 3C8.22386 3 8 2.77614 8 2.5L8 0.5C8 0.223858 8.22386 -2.12039e-08 8.5 -1.36598e-08Z" fill="#333333" />
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M12 5.5C12 5.77614 11.7015 6 11.3333 6L0.666666 6C0.298475 6 0 5.77614 0 5.5C0 5.22386 0.298475 5 0.666666 5L11.3333 5C11.7015 5 12 5.22386 12 5.5Z" fill="#333333" />
                </g>
                <defs>
                  <clipPath id="clip0_37_267">
                    <rect width="12" height="12" fill="white" />
                  </clipPath>
                </defs>
              </svg>
            </button>
          </button>
        </div>
      </template>
    </el-popover>
  </div>
</template>

<style lang="scss" scoped>
</style>
