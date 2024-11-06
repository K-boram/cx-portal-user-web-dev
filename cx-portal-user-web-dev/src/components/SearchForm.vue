<script setup lang="ts">
const props = defineProps({
  useReset: {
    type: Boolean,
    default: false,
  },
  resetText: {
    type: String,
    default: '초기화',
  },
  searchText: {
    type: String,
    default: '조회',
  },
})
const emit = defineEmits(['clear', 'search'])
</script>

<template>
  <div class="search-form">
    <div class="search-form__form-area">
      <div class="search-form__items">
        <slot />
      </div>
    </div>
    <div class="search-form__btn-area">
      <button v-if="useReset" type="button" class="btn__line--negative-md" @click="emit('clear')">
        {{ resetText }}
      </button>
      <button type="button" class="btn__full--secondary-md" @click="emit('search')">
        <Icon name="search__line--fff" width="24" height="24" alt="" />
        {{ searchText }}
      </button>
      <slot name="search-form__btn" />
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
