<script setup lang="ts">
const checkboxOptions = reactive([
  {
    value: 'Option1',
    name: '옵션1',
    isChecked: false,
  },
  {
    value: 'Option2',
    name: '옵션2',
    isChecked: false,
  },
  {
    value: 'Option3',
    name: '옵션3',
    isChecked: false,
  },
])

const form = reactive({
  input: 'Hi~ this is example',
  error: 'Hi~ this is example',
  textarea: 'Hi~ this is example',
  checkbox1: true,
  checkbox2: '',
  radio: 'A',
})

const seletedRadioG = ref<string>('GOption1')
const radioOptionsG = reactive([
  {
    value: 'GOption1',
    name: '그룹형 옵션1',
  },
  {
    value: 'GOption2',
    name: '그룹형 옵션2',
  },
  {
    value: 'GOption3',
    name: '그룹형 옵션3',
  },
])

const seletedRadioS = ref<string>('SOption1')
const radioOptionsS = reactive([
  {
    value: 'SOption1',
    name: '개별형 옵션1',
  },
  {
    value: 'SOption2',
    name: '개별형 옵션2',
  },
  {
    value: 'SOption3',
    name: '개별형 옵션3',
  },
  {
    value: 'SOption4',
    name: '개별형 옵션4',
  },
])

const selectedOption = ref<string>('Option1')
const radioOptions = reactive([
  {
    value: 'Option1',
    name: '일반 옵션1',
  },
  {
    value: 'Option2',
    name: '일반 옵션2',
  },
  {
    value: 'Option3',
    name: '일반 옵션3',
  },
])
</script>

<template>
  <div class="p-20">
    <h2 class="text-3xl font-semibold">
      TextField
    </h2>
    <!-- input -->
    <div class="my-10 space-y-5">
      <mark class="inline-block mb-5 text-xl font-bold" style="background:#F0E4FF">
        input
      </mark>
      <div class="flex gap-3">
        <CustomInput v-model="form.input" placeholder="10글자 내로 입력하세요." size="sm" label="&quot;size=sm&quot;" />
        <CustomInput v-model="form.input" placeholder="10글자 내로 입력하세요." label="&quot;size=md&quot;" />
        <CustomInput v-model="form.input" placeholder="10글자 내로 입력하세요." size="lg" label="&quot;size=lg&quot;" />
      </div>
      <CustomInput v-model="form.input" placeholder="10글자 내로 입력하세요." use-delete label="Use delete btn" />
      <CustomInput v-model="form.input" max-length="10" placeholder="10글자 내로 입력하세요." disabled label="Disabled" />
      <CustomInput v-model="form.input" max-length="10" placeholder="10글자 내로 입력하세요." readonly label="Readonly" />
      <CustomInput v-model="form.error" max-length="10" valid-message="10글자 내로 입력하세요." use-delete label="Error"
        label-position="row" />
      <CustomInput v-model="form.input" placeholder="10글자 내로 입력하세요." required use-delete label="Form row"
        label-position="row" />
    </div>
    <hr>

    <!-- textarea -->
    <div class="my-10 space-y-5">
      <mark class="inline-block mb-5 text-xl font-bold" style="background:#F0E4FF">
        textarea
      </mark>
      <CustomTextarea v-model="form.textarea" placeholder="20자 내로 설명을 입력해주세요." label="Basic" />
      <CustomTextarea v-model="form.textarea" placeholder="20자 내로 설명을 입력해주세요." use-resize label="Use Resize" />
      <CustomTextarea v-model="form.textarea" placeholder="20자 내로 설명을 입력해주세요." disabled label="Disabled" />
      <CustomTextarea v-model="form.textarea" placeholder="20자 내로 설명을 입력해주세요." readonly label="Readonly" />
      <CustomTextarea v-model="form.error" valid-message="20자 내로 설명을 입력해주세요." label="Error" />
      <!-- <CustomTextarea v-model="form.textarea" placeholder="20자 내로 설명을 입력해주세요." required label="Form row"
        label-position="row" /> -->
    </div>
    <hr>

    <!-- checkbox -->
    <div class="my-10 space-y-5">
      <mark class="inline-block mb-5 text-xl font-bold" style="background:#F0E4FF">
        checkbox
      </mark>
      <div class="flex gap-3">
        <!-- <input id="aCheckbox" v-model="form.checkbox1" type="checkbox"> -->
        <!-- <label for="aCheckbox">A</label> -->
        <!-- <input id="bCheckbox" v-model="form.checkbox2" type="checkbox"> -->
        <!-- <label for="bCheckbox">B</label> -->
        <!-- <input id="disabledAcheckbox" v-model="form.checkbox1" type="checkbox" disabled> -->
        <!-- <label for="disabledAcheckbox">A</label> -->
        <!-- <input id="disabledBcheckbox" v-model="form.checkbox2" type="checkbox" disabled> -->
        <!-- <label for="disabledBcheckbox">B</label> -->

        <ul>
          <li v-for="option in checkboxOptions" :key="`checkbox-option-${option.value}`"
            class="flex itemx-center gap-1 mb-2">
            <label :for="option.name" class="w-9">{{ option.name }}</label>
            <input :id="option.name" v-model="option.isChecked" type="checkbox">
          </li>
        </ul>
      </div>
    </div>
    <hr>

    <!-- radio -->
    <div class="my-10 space-y-5">
      <mark class="inline-block mb-5 text-xl font-bold" style="background:#F0E4FF">
        radio
      </mark>
      <div style="background-color: #a0a0a0;" class="px-5">
        <h2 class="py-3 font-bold text-white">
          공통 컴포넌트 radio button 사용 예제
        </h2>
        <div class="p-2">
          <div class="mb-5">
            <p class="text-white">
              스타일 1 (그룹형)
            </p>
            <custom-radio v-model="seletedRadioG" :radio-list="radioOptionsG" is-group-style />
          </div>
          <div>
            <p class="text-white">
              스타일 2 (개별형)
            </p>
            <custom-radio v-model="seletedRadioS" :radio-list="radioOptionsS" />
          </div>
        </div>
      </div>

      <div class="pl-5">
        <h2 class="py-3 font-bold">
          일반 Radio button 사용 예제
        </h2>
        <ul class="flex gap-3 p-2">
          <li v-for="radio in radioOptions" :key="`radio-${radio.value}`" class="flex gap-1 items-center">
            <input :id="radio.name" v-model="selectedOption" type="radio" :name="radio.name" :value="radio.value">
            <label :for="radio.name">{{ radio.name }}</label>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss"></style>
