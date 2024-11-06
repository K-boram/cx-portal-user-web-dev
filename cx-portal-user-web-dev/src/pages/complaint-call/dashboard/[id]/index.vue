<script setup lang="ts">
const router = useRouter()
const route = useRoute()

</script>

<template>
  <div class="grid place-items-center">
    중분류 화면입니다. {{ route.params.id }}
    <button @click="router.push(`/complaint-call/dashboard/${route.params.id}/${20}`)">소분류 이동</button>
  </div>
</template>

<style lang="scss" scoped></style>