<script lang="ts" setup>
import type { ITreeData } from '~/types/custom-dropdown'

export interface CellSelectOption extends ITreeData {
  groupKey?: string
}
const props = defineProps({
  options: {
    type: Array,
    default: () => [],
  },
  groupKey: {
    type: String,
  },
})
const emit = defineEmits<{
  (e: 'change', value: string): void
}>()
const value = defineModel<string | number>()
const filterdOptions = computed(() => {
  return props.options.filter((item) => {
    return item.groupKey === props.groupKey
  })
})
</script>

<template>
  <el-select v-model="value" @change="(value) => {
    emit('change', value)
  }">
    <el-option v-for="item in filterdOptions" :key="item.value" :label="item.label" :value="item.value">
      <p>{{ item.label }}</p>
    </el-option>
  </el-select>
</template>

<style lang="scss" scoped></style>
