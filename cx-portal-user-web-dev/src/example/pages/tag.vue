<script setup lang="ts">
import { ref } from 'vue'

const tags = ref<string[]>(
  ['태그1', '태그2', '태그3'],
)

const newTag = ref<string>('')

const addTag = () => {
  tags.value.push(newTag.value)
  newTag.value = ''
}
</script>

<template>
  <div>
    <h2 class="py-3 font-bold">
      커스텀 태그 예제
    </h2>

    <div class="flex  gap-2 items-center mb-2">
      <label class="text-base w-16">태그 추가</label>
      <div>
        <CustomInput v-model="newTag" />
      </div>
      <button type="button" class="btn__line--negative-md" @click="addTag">
        Add Tag
      </button>
    </div>

    <div class="border border-solid border-gray-400 p-3" style="height: 70px">
      <custom-tag v-model="tags" />
    </div>
  </div>
</template>

<style scoped></style>
