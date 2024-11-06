<script setup lang="ts">
import type { IInputProps } from '../types/custom-input'

const props = withDefaults(defineProps<IInputProps>(), {
  modelValue: '',
  type: 'text',
  width: '100%',
  maxLength: '',
  placeholder: '',
  readonly: false,
  disabled: false,
  useBtn: false,
  useComma: false,
  useCount: false,
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: string | number): void
  (e: 'blur'): void
  (e: 'keypressEnter'): void
  (e: 'focus'): void
  (e: 'search'): void
}>()
const inputModelValueRef = ref<HTMLInputElement | null>(null)

const getInputType = computed(() => {
  if (props.type === 'text')
    return 'text'

  if (props.type === 'number')
    return 'text'
})

const getInputValue = (e: Event) => {
  const event = e.target as HTMLInputElement
  let formatValue: string | number = event.value
  if (props.type === 'number')
    formatValue = onlyNumbers(event.value)

  if (props.type === 'number' && props.useComma)
    formatValue = convertThousandComma(event.value)

  emit('update:modelValue', formatValue)
}

const focusInput = () => {
  inputModelValueRef.value?.focus()
}

defineExpose({
  focusInput,
})
</script>

<template>
  <div :style="{ width: `${props.width}` }" class="input" :class="{ input__search: props.useBtn }">
    <input ref="inputModelValueRef" :value="modelValue" :type="getInputType" :readonly="props.readonly"
      :disabled="props.disabled" :maxlength="props.maxLength" :placeholder="props.placeholder" :title="modelValue"
      @blur="emit('blur')" @keypress.enter="emit('keypressEnter')" @focus="emit('focus')" @input="getInputValue">
    <button v-if="props.useBtn && !props.readonly" type="button" :class="{ 'input__search--focus': modelValue }"
      title="검색" @click="emit('search')">
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g clip-path="url(#clip0_621_146344)">
          <path
            d="M8.7487 14.1654C11.7402 14.1654 14.1654 11.7402 14.1654 8.7487C14.1654 5.75716 11.7402 3.33203 8.7487 3.33203C5.75716 3.33203 3.33203 5.75716 3.33203 8.7487C3.33203 11.7402 5.75716 14.1654 8.7487 14.1654Z"
            stroke="#999999" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
          <path d="M15.418 15L12.918 12.5" stroke="#999999" stroke-width="1.5" stroke-linecap="round"
            stroke-linejoin="round" />
        </g>
        <defs>
          <clipPath id="clip0_621_146344">
            <rect width="20" height="20" fill="white" />
          </clipPath>
        </defs>
      </svg>
    </button>
    <!-- <div v-if="props.useCount && props.maxLength">
        <em>{{ props.modelValue.toString().length }}</em>/<span>{{ props.maxLength }}</span>
      </div> -->
  </div>
</template>
