<script setup lang="ts">
import type { ISelectProps, ITreeData } from '~/types/custom-dropdown'

const props = withDefaults(defineProps<ISelectProps<ITreeData>>(), {
  options: () => [],
  clearable: false,
  filterable: false,
  multiple: false,
  readonly: false,
  disabled: false,
  placeholder: '선택해 주세요',
  // useSelectLabel: false,
  // selectLabel: '',
  code: '',
  searchPopover: false,
  class: '',
  collapseTags: false,
  maxCollapseTags: 1,
})

const emit = defineEmits<{
  (e: 'change', value: string): void
}>()

const selectBoxRef = defineModel<string | number>()

const selectOptions = ref(makeDeepCopy(props.options))
const searchWord = ref<string>('')

const searchOptions = () => {
  selectOptions.value = makeDeepCopy(props.options)
  if (!searchWord)
    return
  selectOptions.value = selectOptions.value.filter((item: { [key: string]: any }) => item.label.includes(searchWord.value))
}

// searchPopover가 활성화된 경우 이벤트 전파를 막아 드롭다운이 닫히지 않도록 함
const handleInputClick = (event: Event) => {
  event.stopPropagation()
}

// 드롭다운 열림/닫힘 감지하여 검색어 초기화
const handleVisibleChange = (isVisible: boolean) => {
  if (!isVisible)
    searchWord.value = '' // 드롭다운이 닫히면 검색어 초기화
  else
    selectOptions.value = makeDeepCopy(props.options)
}
</script>

<template>
  <!-- TODO 퍼블리싱 : clearable이 활성화 되어도 아이콘이 변경되지 않음 -->
  <el-select v-model="selectBoxRef" :placeholder="props.placeholder" :clearable="props.clearable"
    :filterable="props.filterable" :multiple="props.multiple" :disabled="props.disabled || props.readonly"
    :class="[{ 'is-readonly': props.readonly }, { 'is-searchable': props.filterable }, props.class]" :teleported="false"
    :collapse-tags="props.collapseTags" :collapse-tags-tooltip="props.collapseTags"
    :max-collapse-tags="props.collapseTags ? props.maxCollapseTags : 0" @change="(value) => emit('change', value)"
    @visible-change="handleVisibleChange">
    <template v-if="props.searchPopover" #header>
      <input v-model="searchWord" type="text" @keyup.enter="searchOptions" @click="handleInputClick">
      <button type="button" @click="searchOptions">
        <Icon name="search__line--999" width="20" height="20" alt="검색" />
      </button>
    </template>
    <el-option v-for="item in selectOptions" :key="item.value" :label="item.label" :value="item.value"
      :disabled="item.disabled">
      <!-- <div v-if="props.filterable" class="flex">
        <span class="el-select-dropdown__item-code">{{ item.code }}</span>
        <span class="el-select-dropdown__item-label">{{ item.label }}</span>
      </div>
      <span v-else>{{ item.label }}</span> -->
    </el-option>
    <!-- TODO 개발자: 검색 결과가 없을 경우 아래 li 태그가 안보이도록 처리 부탁드립니다. (확인필요) -->
    <!-- <template v-if="props.filterable" #footer>
      <button type="button" title="더보기">
        ...
      </button>
    </template> -->
  </el-select>
</template>

<style lang="scss"></style>
