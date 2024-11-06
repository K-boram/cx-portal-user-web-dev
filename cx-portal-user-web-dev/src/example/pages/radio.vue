<script setup lang="ts">
const seletedRadioG = ref<string>('GOption1')
const radioOptionsG = reactive([
  {
    value: 'GOption1',
    name: '전체',
  },
  {
    value: 'GOption2',
    name: '공통',
  },
  {
    value: 'GOption3',
    name: '모바일',
  },
  {
    value: 'GOption4',
    name: '홈',
  },
  {
    value: 'GOption5',
    name: '기업',
  },
])

const seletedRadioS = ref<string>('SOption1')
const radioOptionsS = reactive([
  {
    value: 'SOption1',
    name: '이번 달',
  },
  {
    value: 'SOption2',
    name: '지난달',
  },
  {
    value: 'SOption3',
    name: '3개월',
  },
  {
    value: 'SOption4',
    name: '1년',
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
      radio
    </h2>

    <!-- radio -->
    <div class="my-10">
      <mark class="inline-block  mb-5 text-xl font-bold" style="background:#F0E4FF">
        Group
      </mark>
      <div class="p-4 bg-black">
        <custom-radio v-model="seletedRadioG" :radio-list="radioOptionsG" is-group-style />
      </div>
    </div>
    <div class="my-10">
      <mark class="inline-block  mb-5 text-xl font-bold" style="background:#F0E4FF">
        Individual
      </mark>
      <div class="mb-5">
        <h2 class="mb-5 font-bold">
          type 1
        </h2>
        <div class="p-4 bg-black">
          <custom-radio v-model="seletedRadioS" :radio-list="radioOptionsS" />
        </div>
      </div>
      <div>
        <h2 class="mb-5 font-bold">
          type 2
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
