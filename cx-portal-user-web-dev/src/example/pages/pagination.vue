<script setup lang="ts">
const paginationOptions = reactive({
  currentPage: 1,
  totalCount: 1000,
  limit: 10,
  maxPagesShown: 10,
})

// 예제 데이터
const data = Array.from({ length: paginationOptions.totalCount }, (_, i) => ({ id: i + 1, name: `Item ${i + 1}` }))

const paginatedData = computed(() => {
  const start = (paginationOptions.currentPage - 1) * paginationOptions.limit
  return data.slice(start, start + paginationOptions.limit)
})
</script>

<template>
  <div>
    <h2 class="text-xl mb-5">
      Pagination 예제
    </h2>

    <div class="border border-solid p-5 mb-5">
      <p class="font-bold mb-3">
        현재 페이지: {{ paginationOptions.currentPage }}
      </p>
      <!-- 페이지네이션에 따른 데이터 표시 예제 -->
      <div v-for="item in paginatedData" :key="item.id">
        {{ item.name }}
      </div>
    </div>

    <pagination v-model="paginationOptions.currentPage" :total-count="paginationOptions.totalCount"
      :limit="paginationOptions.limit" :max-pages-shown="paginationOptions.maxPagesShown" />
  </div>
</template>
