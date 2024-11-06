<script setup lang="ts">
import type { IOptions } from '~/types/custom-dropdown'

const props = withDefaults(defineProps<{
  title: string
  viewDate: string
  useRowCount?: boolean
  useFileDownload?: boolean
  rowCountCode?: string
  rowCountOptions?: IOptions[]
}>(), {
  useRowCount: false,
  useFileDownload: false
})

const emit = defineEmits<{
  (e: 'changeRowCount', value: string): void
  (e: 'clickFileDownload'): void
}>()

// 목록 보기 선택한 값
const selectedRowCountCode = defineModel<string>('rowCountCode')

const changeRowCountOptions = (value: string) => emit('changeRowCount', value)

const clickFileDownload = () => {
  emit('clickFileDownload')
}
</script>

<template>
  <div class="page-title-wrap">
    <div class="flex">
      <h2 class="mr-2">{{ title }}</h2>
      <p>{{ viewDate }}</p>
    </div>
    <div class="flex">
      <custom-dropdown v-if="useRowCount" class="w-40 mr-2" v-model="selectedRowCountCode" :options="rowCountOptions"
        :placeholder="'목록 보기'" :use-select-label="true" :select-label="'목록 보기'" @change="changeRowCountOptions" />
      <button v-if="useFileDownload" type="button" @click="clickFileDownload">파일 다운로드</button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.page-title-wrap {
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding: 10px;
}
</style>