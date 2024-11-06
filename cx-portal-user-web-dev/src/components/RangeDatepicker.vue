<script setup lang="ts">
import dayjs from 'dayjs'
import type { IRangeDateValue } from '~/types/range-datepicker'

const props = withDefaults(defineProps<{
  startPlaceholder?: string
  endPlaceholder?: string
  defaultMonth?: number
}>(), {
  startPlaceholder: '시작일',
  endPlaceholder: '종료일',
  defaultMonth: 12,
})

const dateValue = defineModel<IRangeDateValue>({ required: true })

const disabledStartDate = (date: Date) => {
  if (dateValue.value.endDate && props.defaultMonth) {
    const targetDate = dayjs(date)
    const endDate = dayjs(dateValue.value.endDate)
    const startRange = endDate.add(-props.defaultMonth, 'month')
    return targetDate < startRange || targetDate > endDate
  }
  return false
}

const disabledEndDate = (date: Date) => {
  if (dateValue.value.startDate && props.defaultMonth) {
    const targetDate = dayjs(date)
    const startDate = dayjs(dateValue.value.startDate)
    const endRange = startDate.add(props.defaultMonth, 'month')
    return targetDate < startDate || targetDate > endRange
  }
  return false
}
</script>

<template>
  <div class="el-datepicker--range">
    <el-date-picker
      v-model="dateValue.startDate" type="date" :placeholder="startPlaceholder" format="YYYY-MM-DD"
      value-format="YYYY-MM-DD" :clearable="false" :editable="false" :disabled-date="disabledStartDate"
    />
    <span class="el-datepicker__tilde">~</span>
    <el-date-picker
      v-model="dateValue.endDate" type="date" :placeholder="endPlaceholder" format="YYYY-MM-DD"
      value-format="YYYY-MM-DD" :clearable="false" :editable="false" :disabled-date="disabledEndDate"
    />
  </div>
</template>

<style scoped></style>
