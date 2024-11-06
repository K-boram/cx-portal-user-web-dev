<script setup lang="ts">
import type { IOptions } from '~/types/custom-dropdown'
const title = ref<string>('Main Title')

const viewDate = ref<string>('xx월 xx일 ~ xx일')

// 옵션 목록
const options = ref<IOptions[]>([
  { value: 'option1', label: '옵션 1' },
  { value: 'option2', label: '옵션 2' },
  { value: 'option3', label: '옵션 3' },
]);

const getList = (rowCount: string) => {
  console.log('rowCount>>>', rowCount)
}

const downloadFile = () => {
  console.log('파일 다운로드>>>');

}
</script>

<template>
  <div class="w-full">
    <title-header :title="title" :view-date="viewDate" :use-row-count="true" :use-file-download="true"
      :row-count-options="options" @change-row-count="getList" @click-file-download="downloadFile" />
  </div>
</template>

<style lang="scss" scoped></style>