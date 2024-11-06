<script setup lang="ts">
import { VueAwesomePaginate } from 'vue-awesome-paginate'
import type { ILimitOptions, IPaginationOptions } from '~/types/pagination'

const props = withDefaults(defineProps<IPaginationOptions>(), {
  limitOptions: () => [50, 100],
  maxPagesShown: 10,
  limitOptionsShown: false,
})

const emits = defineEmits<{
  (e: 'changeLimit', newLimit: number): void
}>()

const currentPage = defineModel<number>({ required: true })

const pageLimit = ref<number>(props.limit)
const pageLimitOptions = ref<ILimitOptions[]>([
  {
    label: `${props.limit}개씩 보기`,
    value: props.limit,
  },
])

const getLimitOptions = () => {
  for (const option of props.limitOptions) {
    pageLimitOptions.value.push({
      label: `${option}개씩 보기`,
      value: option,
    })
  }
}
getLimitOptions()

const changeLimit = () => {
  currentPage.value = 1
  emits('changeLimit', pageLimit.value)
}

// 페이지 수 계산
const totalPages = computed(() => Math.ceil(props.totalCount / props.limit))

const goToFirstPage = () => {
  currentPage.value = 1
}

const goToPreviousSet = () => {
  const newPage = Math.max(1, currentPage.value! - 10)
  currentPage.value = newPage
}

const goToLastPage = () => {
  currentPage.value = totalPages.value
}

const goToNextSet = () => {
  const newPage = Math.min(totalPages.value, currentPage.value! + 10)
  currentPage.value = newPage
}
</script>

<template>
  <div class="w-full flex justify-center items-center gap-3">
    <!-- n개씩 보기(Select) -->
    <div v-if="props.limitOptionsShown" class="w-36">
      <el-select v-if="props.totalCount > pageLimitOptions[0].value" v-model="pageLimit" size="large"
        @change="changeLimit">
        <el-option v-for="option in pageLimitOptions" :key="option.value" :label="option.label" :value="option.value" />
      </el-select>
    </div>

    <!-- Pagination -->
    <div class="pagination-container">
      <button :disabled="currentPage <= 1" @click="goToFirstPage">
        <!-- <Icon name="double-arrow-l__line--222" width="25" height="25" alt="첫 페이지" /> -->
      </button>
      <button :disabled="currentPage <= 1" @click="goToPreviousSet">
        <!-- <Icon name="arrow-l__line--222" width="25" height="25" alt="이전 10페이지" /> -->
      </button>

      <VueAwesomePaginate v-model="currentPage" :total-items="props.totalCount" :max-pages-shown="props.maxPagesShown"
        :items-per-page="props.limit" :show-breakpoint-buttons="false" class="custom-pagination" :hide-prev-next="true"
        :below-limit-shown="false" />

      <button :disabled="currentPage >= totalPages" @click="goToNextSet">
        <!-- <Icon name="arrow-l__line--222" width="25" height="25" alt="다음 10페이지" class="rotate-180" /> -->
      </button>
      <button :disabled="currentPage >= totalPages" @click="goToLastPage">
        <!-- <Icon name="double-arrow-l__line--222" width="25" height="25" alt="마지막 페이지" class="rotate-180" /> -->
      </button>
    </div>
  </div>
</template>

<style scoped>
.pagination-container {
  display: flex;
  gap: 5px;
  align-items: start;
}

button:disabled {
  cursor: not-allowed;
  opacity: 0.5;
}
</style>
