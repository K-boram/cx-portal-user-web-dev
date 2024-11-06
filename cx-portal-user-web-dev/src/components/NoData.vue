<script setup lang="ts">
withDefaults(defineProps<{
  message?: string

}>(), {
  message: '',
})
</script>

<template>
  <div class="status nodata">
    <icon name="info__line--222" width="64" height="64" alt="" />

    <span class="status__message"> {{ message }}</span>
  </div>
</template>

<style lang="scss"></style>
