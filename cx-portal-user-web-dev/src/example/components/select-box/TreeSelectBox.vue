<script setup lang="ts">
import type { ITreeSelectProps } from '~/types/select-box'
import type { ITreeData } from '~/types/select-box'

const props = withDefaults(defineProps<ITreeSelectProps<ITreeData>>(), {
  treeData: () => [],
  renderAfterExpand: false,
  showCheckbox: false,
  checkStrictly: false,
  multiple: false,
  placeholder: 'Select',
})

const emit = defineEmits([
  'update:modelValue',
])

const treeSelectBoxRef = computed({
  get() {
    return props.modelValue
  },
  set(val) {
    emit('update:modelValue', val)
  },
})
</script>

<template>
  <div>
    <el-tree-select v-model="treeSelectBoxRef" :placeholder="props.placeholder" :data="props.treeData"
      :render-after-expand="props.renderAfterExpand" :show-checkbox="props.showCheckbox"
      :check-strictly="props.checkStrictly" :multiple="props.multiple" />
  </div>
</template>

<style scoped></style>
