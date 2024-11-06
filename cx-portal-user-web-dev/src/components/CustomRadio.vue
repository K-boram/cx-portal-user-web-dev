<script setup lang="ts">
import type { IRadio } from '~/types/custom-radio'

const props = withDefaults(defineProps<{
  radioList: IRadio[]
  isGroupStyle?: boolean
}>(), {
  isGroupStyle: false,
})

const defaultValue = defineModel<string>()
</script>

<template>
  <ul :class="{ 'radio-group': props.isGroupStyle, 'radio': !props.isGroupStyle }">
    <li v-for="radio in props.radioList" :key="`radio-${radio.value}`">
      <input :id="radio.name" v-model="defaultValue" type="radio" :name="radio.name" :value="radio.value">
      <label :for="radio.name">{{ radio.name }}</label>
    </li>
  </ul>
</template>

<style lagn="scss" scoped></style>
