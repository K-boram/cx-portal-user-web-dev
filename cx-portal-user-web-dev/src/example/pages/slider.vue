<script setup lang="ts">
import type { ElSlider } from 'element-plus'

const sliderValue = ref<number[]>([95, 100])
const sliderMax = ref<number>(200)
const numberOfMarks = ref<number>(8)

const sliderWarningValue = ref<string>('95')
const sliderSuccessValue = ref<string>('100')

const setMark = () => {
  const step = (sliderMax.value - 0) / numberOfMarks.value

  let markList = {}

  for (let i = 0; i <= numberOfMarks.value; i++) {
    const value = 0 + step * i

    if (i === 0 || i === numberOfMarks.value) {
      markList[value] = value.toFixed(0)
    } else {
      markList[value] = ''
    }
  }

  return markList
}

const marks = ref<Record<string | number, string>>(setMark());

const sliderRef = ref<null | InstanceType<typeof ElSlider>>(null)

const updateTrackStyle = () => {
  const runway = sliderRef.value!.$el.querySelector('.el-slider__runway')
  if (runway) {
    const minPercent = (sliderValue.value[0] / sliderMax.value) * 100;
    const maxPercent = (sliderValue.value[1] / sliderMax.value) * 100;

    runway.style.background = `linear-gradient(to right, 
          red 0%, 
          red ${minPercent}%, 
          yellow ${minPercent}%, 
          yellow ${maxPercent}%, 
          green ${maxPercent}%, 
          green 100%)`;
  }
}

const updateSliderValue = (sliderInputValue: string, useLocation: string) => {
  let inputValue = Number(sliderInputValue)

  if (useLocation === 'front' && inputValue >= sliderValue.value[1]) {
    inputValue = sliderValue.value[1]
  } else if (useLocation === 'front' && (inputValue <= 0 || !inputValue)) {
    inputValue = 0
  }

  if (useLocation !== 'front' && inputValue <= sliderValue.value[0]) {
    inputValue = sliderValue.value[0]
  } else if (useLocation !== 'front' && (inputValue >= sliderMax.value || !inputValue)) {
    inputValue = sliderMax.value
  }

  if (useLocation === 'front') {
    sliderValue.value[0] = inputValue
    sliderWarningValue.value = inputValue.toString()
  } else {
    sliderValue.value[1] = inputValue
    sliderSuccessValue.value = inputValue.toString()
  }
  updateTrackStyle()
}

const debouncedUpdateSliderValue = debounce((newValue: string) => {
  updateSliderValue(newValue, 'front')
}, 500)

watch(() => sliderWarningValue.value, (newValue, oldValue) => {
  if (newValue !== oldValue) {
    debouncedUpdateSliderValue(newValue)
  }
})
watch(() => sliderSuccessValue.value, (newValue, oldValue) => {
  if (newValue !== oldValue) {
    debouncedUpdateSliderValue(newValue)
  }
})

watch(() => sliderValue.value, (newValue, oldValue) => {
  sliderWarningValue.value = newValue[0].toString()
  sliderSuccessValue.value = newValue[1].toString()
})
onMounted(async () => {
  try {
    await nextTick()
    updateTrackStyle(); // 초기화
  } catch (error) {
    console.error(error)
  }
})
</script>

<template>
  <div class="p-20">
    <h2 class="text-3xl font-semibold">
      slider
    </h2>
    <div class="my-10 slider-demo-block">
      <div class="input-wrap mr-2">
        <custom-input class="custom-input" v-model="sliderWarningValue" type="number"
          @blur="updateSliderValue(sliderWarningValue, 'front')"
          @keypress-enter="updateSliderValue(sliderWarningValue, 'front')" />
      </div>

      <el-slider v-model="sliderValue" ref="sliderRef" range :min="0" :max="sliderMax" :step="1" :marks="marks"
        @input="updateTrackStyle" />

      <div class="input-wrap ml-2">
        <custom-input class="custom-input" v-model="sliderSuccessValue" type="number"
          @blur="updateSliderValue(sliderSuccessValue, 'end')"
          @keypress-enter="updateSliderValue(sliderSuccessValue, 'end')" />
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.slider-demo-block {
  display: flex;
  width: 600px;
}

.input-wrap {
  width: 100px;
}

.el-slider {
  .el-slider {
    &__bar {
      background-color: yellow;
    }

  }
}
</style>
