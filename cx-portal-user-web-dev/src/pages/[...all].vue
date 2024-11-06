<script setup lang="ts">
const router = useRouter()
</script>

<template>
  <div class="status error">
    <div class="flex items-end z-50">
      <icon name="holeman--landing" width="160" height="160" alt="" extension="png" aria-hidden="true" />
      <div>
        <p class="status__message">
          접근할 수 없는 페이지입니다.
        </p>
        <button type="button" class="btn__full--primary-lg" @click="router.push('/')">
          홈으로 가기
        </button>
      </div>
    </div>
  </div>
</template>

<route lang="yaml">
meta:
  layout: status
</route>
