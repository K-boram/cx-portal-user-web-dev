<script setup lang="ts">
import Pagination from '../../components/Pagination.vue'
import type { IPaginationOptions } from '../../types/pagination'

const tableData = [
  {
    date: '2016-05-03',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-02',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-04',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-01',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
]

const paginationOptions: IPaginationOptions = reactive({
  currentPage: 1,
  totalCount: 1000,
  limit: 20,
  limitOptions: [50, 100, 150, 200],
  maxPagesShown: 10,
})

function changeLimit(newLimit: number) {
  paginationOptions.limit = newLimit
}
</script>

<template>
  <div class="p-20">
    <h2 class="mb-10 text-3xl font-semibold">
      Table
    </h2>
    <div class="my-10">
      <mark class="inline-block mb-5 text-xl font-bold" style="background:#F0E4FF">
        Basic
      </mark>
      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="date" label="Date" width="180" align="center" />
        <el-table-column prop="name" label="Name" width="180" align="center" />
        <el-table-column prop="address" label="Address" />
      </el-table>
      <Pagination v-model="paginationOptions.currentPage" :total-count="paginationOptions.totalCount"
        :limit="paginationOptions.limit" :limit-options="paginationOptions.limitOptions"
        :max-pages-shown="paginationOptions.maxPagesShown" below-limit-shown limit-options-shown
        @change-limit="changeLimit" />
    </div>
    <div class="my-10">
      <mark class="inline-block mb-5 text-xl font-bold" style="background:#F0E4FF">
        Size = "small"
      </mark>
      <el-table :data="tableData" style="width: 100%" size="small">
        <el-table-column type="index" label="No" width="60" align="center" />
        <el-table-column prop="name" label="Name" width="180" align="center" />
        <el-table-column prop="address" label="Address" />
      </el-table>
    </div>
    <hr>
  </div>
</template>
