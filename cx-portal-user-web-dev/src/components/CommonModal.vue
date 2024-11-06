<script setup lang="ts">
import type { IModalProps } from '~/types/modal'
import { MODAL_SIZE } from '~/types/modal'

const props = withDefaults(defineProps<IModalProps>(), {
  title: '',
  size: MODAL_SIZE.MEDIUM,
  closeOnClickModal: true,
  confirmText: '확인',
  cancelText: '취소',
  showClose: true,
  useFooter: true
})
const emit = defineEmits<{
  (e: 'update:modelValue', modelValue: boolean): void
  (e: 'cancel'): void
  (e: 'confirm'): void
}>()

const modalShow = computed({
  get() {
    return props.modelValue
  },
  set(value) {
    emit('update:modelValue', value)
  },
})

const calculateModalWidth = computed(() => {
  if (props.size === MODAL_SIZE.SMALL)
    return 'var(--modal-width-sm)'
  else if (props.size === MODAL_SIZE.MEDIUM)
    return 'var(--modal-width-md)'
  else if (props.size === MODAL_SIZE.LARGE)
    return 'var(--modal-width-lg)'
  else if (props.size === MODAL_SIZE.XLARGE)
    return 'var(--modal-width-xl)'
  else return 'var(--modal-width-md)'
})

const cancel = () => {
  emit('cancel')
}

const confirm = () => {
  emit('confirm')
}
</script>

<template>
  <el-dialog v-model="modalShow" :class="{ 'has-header': title !== '' }" :close-on-click-modal="closeOnClickModal"
    :width="calculateModalWidth" align-center destroy-on-close :show-close="showClose" @close="cancel">
    <template v-if="title !== ''" #header>
      <h2>
        {{ title }}
      </h2>
    </template>
    <slot name="content" />

    <template #footer>
      <slot v-if="useFooter" name="footer">
        <button type="button" class="btn__line--negative-lg" @click="cancel">
          {{ props.cancelText }}
        </button>
        <button type="button" class="btn__full--primary-lg" @click="confirm">
          {{ props.confirmText }}
        </button>
      </slot>
    </template>
  </el-dialog>
</template>

<style scoped></style>
