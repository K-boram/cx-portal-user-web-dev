<script setup lang="ts">
const props = defineProps({
  label: {
    type: String,
    required: true,
  },
  required: {
    type: Boolean,
    required: false,
  },
  useBtn: {
    type: Boolean,
    required: false,
  },
  useGroup: {
    type: Boolean,
    required: false,
  },
  rowBetween: {
    type: Boolean,
    required: false,
  },
})
</script>

<template>
  <div class="form__item" :class="{ 'row-between': rowBetween }">
    <div v-if="useGroup" class="form__group">
      <slot />
    </div>
    <slot v-else />
  </div>
</template>
