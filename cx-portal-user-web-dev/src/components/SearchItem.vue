<script setup lang="ts">
const props = defineProps({
  label: {
    type: String,
    required: true,
  },
})
</script>

<template>
  <div class="search-form__item">
    <label class="search-form__label">{{ props.label }}</label>
    <slot />
  </div>
</template>
