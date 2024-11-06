<script setup lang="ts">
import type { IOptions } from '~/types/custom-dropdown'
import mockOptions from '~/example/mock/options.js'

// import TreeSelectBox from '~/example/components/select-box/TreeSelectBox.vue'
// import mockTreeData from '~/example/mock/selectTreeData.js'

const options = ref<IOptions[]>(mockOptions)
// const treeData = ref<ITreeData[]>(mockTreeData)
const searchable = [
  { label: '문의_중가보 단말기 반납후_처리현황 문의', value: 'deviceInquiry', code: '0209100' },
  { label: '모바일_유족홈페이지/앱 이용_문의', value: 'appInquiry', code: '0209101' },
  { label: '공통_명의도용 문의', value: 'theftInquiry', code: '0209102' },
]

const initData = ref(3)
// const initMultiData = ref([1, 2])
// const initTreeData = ref('1-1-1')

const dropdown = ref({
  default: '',
  searchable: '',
})
</script>

<template>
  <div class="p-20">
    <h2 class="text-3xl font-semibold">
      Dropdown
    </h2>
    <div class="my-10">
      <mark class="inline-block text-xl font-bold" style="background:#F0E4FF">
        Basic
      </mark>
      <div class="flex gap-4 mt-4">
        <custom-dropdown v-model="dropdown.default" :options="options" placeholder="월별" />
        <custom-dropdown v-model="initData" :options="options" />
        <custom-dropdown v-model="initData" :options="options" disabled />
        <custom-dropdown v-model="dropdown.default" :options="options" readonly />
      </div>
    </div>
    <hr>
    <div class="my-10">
      <mark class="inline-block text-xl font-bold" style="background:#F0E4FF; color: red;">
        Has search input function in dropdown popover
      </mark>
      <div class="flex gap-4 mt-4">
        <custom-dropdown v-model="dropdown.default" :options="options" search-popover placeholder="월별" clearable />
        <custom-dropdown v-model="initData" :options="options" search-popover clearable />
        <custom-dropdown v-model="initData" :options="options" disabled search-popover />
        <custom-dropdown v-model="dropdown.default" :options="options" readonly search-popover />
      </div>
    </div>
    <hr>
    <div class="my-10">
      <mark class="inline-block text-xl font-bold" style="background:#F0E4FF">
        Dropdown has search function
      </mark>
      <div class="flex gap-4 mt-4">
        <custom-dropdown v-model="dropdown.searchable" placeholder="서비스 코드를 입력하세요" :options="searchable" filterable />
      </div>
    </div>
    <hr>
    <div class="my-10">
      <mark class="inline-block text-xl font-bold" style="background:#F0E4FF">
        Dropdown in filter
      </mark>
      <div class="flex gap-4 mt-4 filter">
        <custom-dropdown v-model="dropdown.default" placeholder="선택" :options="options" class="w-156" />
      </div>
    </div>
    <hr>
    <div class="my-10">
      <mark class="inline-block text-xl font-bold" style="background:#F0E4FF">
        Multiple Select box
      </mark>
      <div class="flex gap-4 mt-4">
        <custom-dropdown v-model="dropdown.default" :options="options" placeholder="다중 선택" multiple collapse-tags
          clearable />
      </div>
    </div>
    <div class="my-10">
      <mark class="inline-block text-xl font-bold" style="background:#F0E4FF">
        검색 input, 멀티 선택 중첩 기능
      </mark>
      <div class="flex gap-4 mt-4">
        <custom-dropdown v-model="dropdown.default" :options="options" placeholder="다중 선택" search-popover multiple
          collapse-tags clearable />
      </div>
    </div>
  </div>
</template>

<style scoped></style>
