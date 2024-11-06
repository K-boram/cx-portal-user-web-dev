<script setup lang="ts">
const tagList = defineModel<string[]>()

// 태그 삭제
const removeTag = (index: number) => {
  tagList.value!.splice(index, 1)
}
</script>

<template>
  <ul class="custom-tag">
    <li v-for="(tag, index) in tagList" :key="index" class="custom-tag__tag">
      {{ tag }}
      <button class="custom-tag__btn" @click="removeTag(index)">
        <Icon name="delete__line-999" width="12" height="12" />
      </button>
    </li>
  </ul>
</template>

<style lang="scss"></style>
