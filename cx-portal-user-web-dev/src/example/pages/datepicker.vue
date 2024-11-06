<script setup lang="ts">
import { DatePickerMode } from '~/types/enums/date-picker-mode'
import type { IMonth, IRangeDate, ITime } from '~/types/custom-datepicker'

const year = ref<number>(new Date().getFullYear())
const month = ref<IMonth>({
  month: new Date().getMonth(),
  year: new Date().getFullYear(),
})
const date = ref<Date>(new Date())
const time = ref<ITime>({
  hours: new Date().getHours(),
  minutes: new Date().getMinutes(),
})

const rangeDateValue = ref<IRangeDate>({
  startDate: new Date(),
  endDate: new Date(),
})

const emptyRangeDateValue = ref<IRangeDate>({
  startDate: '',
  endDate: '',
})
</script>

<template>
  <div class="p-20">
    <h2 class="text-3xl font-semibold">
      Datepicker
    </h2>

    <div class="my-10">
      <mark class="inline-block mb-5 text-xl font-bold" style="background:#F0E4FF">
        Single DatePicker
      </mark>
      <div class="flex flex-col gap-8">
        <div class="flex gap-3 items-center">
          <label class="font-bold text-lg">년</label>
          <custom-datepicker v-model="year" :mode="DatePickerMode.YEAR" />
        </div>
        <div class="flex gap-3 items-center">
          <label class="font-bold text-lg">월</label>
          <custom-datepicker v-model="month" :mode="DatePickerMode.MONTH" />
        </div>
        <div class="flex gap-3 items-center">
          <label class="font-bold text-lg">일</label>
          <custom-datepicker v-model="date" :mode="DatePickerMode.DATE" />
        </div>
        <div class="flex gap-3 items-center">
          <label class="font-bold text-lg">시간</label>
          <custom-datepicker v-model="time" :mode="DatePickerMode.TIME" />
        </div>
      </div>
    </div>
    <hr>

    <div class="my-10">
      <mark class="inline-block mb-5 text-xl font-bold" style="background:#F0E4FF">
        Range DatePicker
      </mark>
      <div class="flex flex-col gap-8">
        <div class="flex gap-3 items-center">
          <label class="font-bold text-lg">기간 (비활성화)</label>
          <custom-range-datepicker
            v-model:start-date="rangeDateValue.startDate"
            v-model:end-date="rangeDateValue.endDate" is-disabled
          />
        </div>
        <div class="flex gap-3 items-center">
          <label class="font-bold text-lg">기간 (활성화 / 직접 입력인 경우)</label>
          <custom-range-datepicker
            v-model:start-date="rangeDateValue.startDate"
            v-model:end-date="rangeDateValue.endDate"
          />
        </div>
        <div class="flex gap-3 items-center">
          <label class="font-bold text-lg">기간 (입력값 없는 경우)</label>
          <custom-range-datepicker
            v-model:start-date="emptyRangeDateValue.startDate"
            v-model:end-date="emptyRangeDateValue.endDate"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
