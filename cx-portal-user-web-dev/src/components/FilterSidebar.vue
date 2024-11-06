<script setup lang="ts">
const emits = defineEmits<{
  (e: 'initFilter'): void
  (e: 'inquiry'): void
}>()

const isFilterSidebarOpen = ref(true)

const toggleFilterSidebar = () => {
  isFilterSidebarOpen.value = !isFilterSidebarOpen.value
}

const initFilter = () => {
  emits('initFilter')
}

const inquiry = () => {
  emits('inquiry')
}
</script>

<template>
  <div class="filter">
    <button type="button" class="filter__toggle" :class="{ 'is-open': isFilterSidebarOpen }"
      @click="toggleFilterSidebar">
      <Icon name="d-arrow-r__line--ec0" width="16" height="16" :alt="isFilterSidebarOpen ? '필터 닫기' : '필터 열기'" />
    </button>

    <transition name="slide">
      <div v-if="isFilterSidebarOpen" class="filter__box">
        <!-- =================== Header =================== -->
        <div class="filter__header">
          <span>조회 조건</span>
          <!-- Todo 지은 :: 아이콘 역할 확인 필요 -->
          <button type="button">
            <Icon name="exit__line--333" width="12" height="12" alt="" />
          </button>
        </div>

        <div class="filter__content">
          <slot name="content" />
        </div>
        <!-- =================== Footer =================== -->
        <div class="btn__group">
          <button type="button" class="btn__primary-line is-flexible" @click="initFilter">
            <span>조건 초기화</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="13" height="12" viewBox="0 0 13 12" fill="none">
              <g clip-path="url(#clip0_2082_20344)">
                <path fill-rule="evenodd" clip-rule="evenodd"
                  d="M6.76748 2C4.54686 2 2.75 3.79269 2.75 6C2.75 8.20731 4.54686 10 6.76748 10C7.77196 10 8.65426 9.56315 9.29164 9.00023C9.60949 8.71952 9.85646 8.41582 10.0209 8.13675C10.1911 7.84801 10.25 7.6254 10.25 7.5C10.25 7.22386 10.4739 7 10.75 7C11.0261 7 11.25 7.22386 11.25 7.5C11.25 7.8746 11.099 8.27699 10.8824 8.6445C10.6601 9.02168 10.3434 9.40548 9.95361 9.74976C9.17565 10.4368 8.06669 11 6.76748 11C3.99823 11 1.75 8.76325 1.75 6C1.75 3.23675 3.99823 1 6.76748 1C7.64226 1 8.60001 1.27884 9.40823 1.75734C10.2139 2.23436 10.9246 2.94288 11.2243 3.84207C11.3117 4.10404 11.1701 4.3872 10.9081 4.47452C10.6461 4.56185 10.363 4.42027 10.2757 4.1583C10.0754 3.55749 9.57115 3.01592 8.89877 2.61784C8.2289 2.22125 7.44539 2 6.76748 2Z"
                  fill="#EC008B" />
                <path fill-rule="evenodd" clip-rule="evenodd"
                  d="M6.9635 3.57691C7.02758 3.3083 7.29727 3.1425 7.56587 3.20658L10.7808 3.97348L10.9554 0.672974C10.97 0.397217 11.2053 0.185498 11.4811 0.200085C11.7569 0.214673 11.9686 0.450044 11.954 0.7258L11.7477 4.62547C11.7399 4.77366 11.6666 4.9107 11.5478 4.99954C11.4289 5.08839 11.2767 5.11985 11.1324 5.08541L7.33384 4.17928C7.06523 4.11521 6.89943 3.84552 6.9635 3.57691Z"
                  fill="#EC008B" />
              </g>
              <defs>
                <clipPath id="clip0_2082_20344">
                  <rect width="12" height="12" fill="white" transform="translate(0.75)" />
                </clipPath>
              </defs>
            </svg>
          </button>
          <button type="button" class="btn__primary is-flexible" @click="inquiry">
            조회
          </button>
        </div>
      </div>
    </transition>
  </div>
</template>

<style scoped></style>
