<script setup lang="ts">
import VueDatePicker from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'
import { DatePickerMode } from '~/types/enums/date-picker-mode'
import type { IMonth, ITime } from '~/types/custom-datepicker'

const props = withDefaults(defineProps<{
  mode: string // enum : DatePickerMode.YEAR, MONTH, DATE, TIME
}>(), {
})

const modelValue = defineModel<Date | number | IMonth | ITime>({ required: true })
</script>

<template>
  <div class="datepicker">
    <VueDatePicker
      v-if="props.mode === DatePickerMode.DATE" v-model="modelValue" :month-change-on-scroll="false"
      format="yyyy-MM-dd" auto-apply :enable-time-picker="false" locale="ko" week-start="0" :year-first="true"
      :teleport="true"
      :ui="{ menu: 'is-single' }"
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
    <VueDatePicker v-if="props.mode === DatePickerMode.YEAR" v-model="modelValue" year-picker auto-apply />
    <VueDatePicker
      v-if="props.mode === DatePickerMode.MONTH" v-model="modelValue" month-picker format="yyyy-MM"
      auto-apply locale="ko"
    />
    <VueDatePicker v-if="props.mode === DatePickerMode.TIME" v-model="modelValue" time-picker />
  </div>
</template>

<style scoped lang="scss">
::deep(.dp__menu) {
  border: 1px solid red;
}
</style>
