<script setup lang="ts">
const router = useRouter()

</script>

<template>
  <div class="grid place-items-center">
    대분류 화면입니다.
    <button @click="router.push(`/complaint-call/dashboard/${1}`)">중분류 이동</button>
  </div>
</template>

<style lang="scss" scoped></style>