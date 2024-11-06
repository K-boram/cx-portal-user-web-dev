<script setup lang="ts">
const route = useRoute()
</script>

<template>
  <div class="grid place-items-center">
    소분류 화면입니다.{{ route.params.id }} {{ route.params.subId }}
  </div>
</template>

<style lang="scss" scoped></style>