<script setup lang="ts">
import type { IColumn, IGrid } from '~/types/grid'

interface IRowInfo {
  id: string
  campaignPurpose: string
  prodServiceName: string
  content: string
}
const rowList = ref<IRowInfo[]>([
  {
    id: '0',
    campaignPurpose: 'Sales',
    prodServiceName: '갤럭시S23',
    content: '특별 할인 행사 관련 내용 특별 할인 행사 관련 내용 특별 할인 행사 관련 내용 특별 할인 행사 관련 내용',
  },
  {
    id: '1',
    campaignPurpose: 'Sales',
    prodServiceName: '갤럭시S23',
    content: '특별 할인 행사 관련 내용',
  },
  {
    id: '2',
    campaignPurpose: 'Sales',
    prodServiceName: '갤럭시S23',
    content: '특별 할인 행사 관련 내용',
  },
  {
    id: '3',
    campaignPurpose: 'Sales',
    prodServiceName: '갤럭시S23',
    content: '특별 할인 행사 관련 내용',
  },
  {
    id: '4',
    campaignPurpose: 'Sales',
    prodServiceName: '갤럭시S23',
    content: '특별 할인 행사 관련 내용',
  },
  {
    id: '5',
    campaignPurpose: 'Sales',
    prodServiceName: '갤럭시S23',
    content: '특별 할인 행사 관련 내용',
  },
  {
    id: '6',
    campaignPurpose: 'Sales',
    prodServiceName: '갤럭시S23',
    content: '특별 할인 행사 관련 내용',
  },
  {
    id: '7',
    campaignPurpose: 'Sales',
    prodServiceName: '갤럭시S23',
    content: '특별 할인 행사 관련 내용',
  },
  {
    id: '8',
    campaignPurpose: 'Sales',
    prodServiceName: '갤럭시S23',
    content: '특별 할인 행사 관련 내용',
  },
  {
    id: '9',
    campaignPurpose: 'Sales',
    prodServiceName: '갤럭시S23',
    content: '특별 할인 행사 관련 내용',
  },
])

const grid: IGrid<IRowInfo> = reactive({
  name: 'exampleGrid',
  checkboxInfo: {
    name: '선택',
    visible: true,
    width: '5%',
  },
  rowId: 'id',
  columns: ref<IColumn[]>([
    {
      name: '캠페인 목적',
      width: '30%',
    },
    {
      name: '상품/서비스 명',
      width: '30%',
    },
    {
      name: '설명',
      width: '40%',
    },
  ]),
  rows: ref<IRowInfo[]>([]),
  noDataText: '상품/서비스가 없습니다.',
  totalCount: 0,
})

const gridPagination = reactive({
  currentPage: 1,
  limit: 5,
})
const radioGrid: IGrid<IRowInfo> = reactive({
  name: 'exampleGrid2',
  radioInfo: {
    name: '선택',
    visible: true,
    width: '5%',
  },
  rowId: 'id',
  columns: ref<IColumn[]>([
    {
      name: '캠페인 목적',
      width: '30%',
    },
    {
      name: '상품/서비스 명',
      width: '30%',
    },
    {
      name: '설명',
      width: '40%',
    },
  ]),
  rows: ref<IRowInfo[]>([]),
  noDataText: '상품/서비스가 없습니다.',
  totalCount: 0,
})

const radioGridPagination = reactive({
  currentPage: 1,
  limit: 5,
})

const getRowList = async () => {
  try {
    grid.rows = rowList.value
    grid.totalCount = rowList.value.length

    radioGrid.rows = rowList.value
    radioGrid.totalCount = rowList.value.length
  } catch (error) {
    console.error(error)
  }
}

const gridSelectedList = ref<string[]>([])
const gridRadioSelected = ref<string>('')

onMounted(() => {
  getRowList()
})
</script>

<template>
  <div class="p-20">
    <h2 class="text-3xl font-semibold">
      Grid
    </h2>
    <div class="my-10">
      <mark class="inline-block mb-5 text-xl font-bold" style="background:#F0E4FF">
        Checkbox Grid
      </mark>
      <common-grid v-model:selectedList="gridSelectedList" :name="grid.name" :row-id="grid.rowId"
        :columns="grid.columns" :rows="grid.rows" :checkbox-info="grid.checkboxInfo" :no-data-text="grid.noDataText">
        <template #colgroup="{ width }">
          <col :width="width">
        </template>
        <template #header="{ column }">
          <th>
            {{ column.name }}
          </th>
        </template>
        <template #content="{ row }">
          <td>{{ row.campaignPurpose }}</td>
          <td class="text--underline">
            {{ row.prodServiceName }}
          </td>
          <td class="align-left">
            {{ row.content }}
          </td>
        </template>
      </common-grid>
      <pagination v-model="gridPagination.currentPage" :total-count="grid.totalCount" :limit="gridPagination.limit" />
    </div>
    <hr>
    <div class="my-10">
      <mark class="inline-block mb-5 text-xl font-bold" style="background:#F0E4FF">
        Radio Grid
      </mark>
      <common-grid v-model:radioSelected="gridRadioSelected" :name="radioGrid.name" :row-id="radioGrid.rowId"
        :columns="radioGrid.columns" :rows="radioGrid.rows" :radio-info="radioGrid.radioInfo"
        :no-data-text="radioGrid.noDataText">
        <template #colgroup="{ width }">
          <col :width="width">
        </template>
        <template #header="{ column }">
          <th>
            {{ column.name }}
          </th>
        </template>
        <template #content="{ row }">
          <td>{{ row.campaignPurpose }}</td>
          <td>{{ row.prodServiceName }}</td>
          <td>{{ row.content }}</td>
        </template>
      </common-grid>
      <pagination v-model="radioGridPagination.currentPage" :total-count="radioGrid.totalCount"
        :limit="radioGridPagination.limit" />
    </div>
  </div>
</template>

<style scoped></style>

<!-- <route lang="yaml">
meta:
  layout: empty
</route> -->
