<script setup lang="ts">
const props = defineProps({
  name: {
    type: String,
    required: true,
  },
  color: {
    type: String,
    required: false,
  },
  size: {
    type: String,
    default: 'sm',
    required: true,
  },
})
</script>

<template>
  <label
    class="form__label" :class="[
      { [`color-${color}`]: color },
      { 'size-md': size === 'md' },
    ]"
  >
    {{ name }}
  </label>
</template>
