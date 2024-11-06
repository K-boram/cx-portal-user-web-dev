<script setup lang="ts">
const props = withDefaults(defineProps<{
  title: string
  message: string
  confirmText?: string
  cancelText?: string
  isShowConfirmBtn?: boolean
  isShowCancelBtn?: boolean
}>(), {
  confirmText: '확인',
  cancelText: '취소',
  isShowConfirmBtn: true,
  isShowCancelBtn: true
})

const emit = defineEmits<{
  (e: 'confirm'): void
  (e: 'cancel'): void
}>()

const cancel = () => {
  emit('cancel')
}
const confirm = () => {
  emit('confirm')
}
</script>

<template>
  <div class="dialog">
    <div class="text-left">
      <div class="title">
        {{ title }}
      </div>
      <div class="message">
        {{ message }}
      </div>
    </div>
    <div class="dialog__footer">
      <button v-if="isShowCancelBtn" type="button" @click="cancel">
        {{ cancelText }}
      </button>
      <button v-if="isShowConfirmBtn" type="button" @click="confirm">
        {{ confirmText }}
      </button>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
