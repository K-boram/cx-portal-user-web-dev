<script setup lang="ts">
import CustomInput from '../../components/CustomInput.vue'

// select-box
// import type { IOptions } from '../types/select-box'

// import mockOptions from '../mock/options.js'
// File
// import FileUpload from '../../components/FileUpload.vue'

const form = {
  input: 'Hi~ this is example',
  checkbox1: ['A'],
  radio: 'A',
}

// select-box
// const options = ref<IOptions[]>(mockOptions)
const initData = ref(3)

// SearchForm
const handleSearch = () => { }
const handleReset = () => { }

// File
const onFileChange = (file: File[]) => {
  console.log('ee', file)
}

// form-col-group
const formColRowList = [
  {
    id: 1,
    input: '',
  },
  {
    id: 2,
    input: '',
  },
  {
    id: 3,
    input: '',
  },
]
onMounted(() => {
})
</script>

<template>
  <div class="p-20">
    <h2 class="text-3xl font-semibold">
      Form
    </h2>
    <div class="flex flex-col gap-2 mt-10 p-10 bg-white rounded-3xl">
      <p><em class="font-bold">use-col-group</em>은 <em class="font-bold">:list</em> 사용이 가능합니다. 아래 예제는 list를 사용했습니다.</p>
      <p><em class="font-bold">form-col</em> 일때만 <em class="font-bold">use-btn</em>사용이 가능합니다.</p>
      <p class="text-rose-500">
        &#8251; 아래 예제 중 <em class="font-bold">타겟 테이블의 형태</em>는 <em class="font-bold">form-col</em>로만
        사용합니다.
      </p>
    </div>
    <!-- Form row -->
    <div class="my-10">
      <mark class="inline-block mb-5 text-xl font-bold" style="background:#F0E4FF">
        Form row (Default)
      </mark>
      <!-- 복사영역 -->
      <form class="form content-box">
        <FormItem label="Basic">
          <CustomInput v-model="form.input" max-length="10" placeholder="10글자 내로 입력하세요." use-btn />
        </FormItem>
        <FormItem label="Required" required>
          <CustomInput v-model="form.input" max-length="10" placeholder="10글자 내로 입력하세요." />
        </FormItem>
        <FormItem label="Radio">
          <el-radio-group v-model="form.radio">
            <el-radio value="A">
              A
            </el-radio>
            <el-radio value="B">
              B
            </el-radio>
          </el-radio-group>
        </FormItem>
        <FormItem label="Checkbox">
          <el-checkbox-group v-model="form.checkbox1">
            <el-checkbox label="A" value="A" />
            <el-checkbox label="B" value="B" />
          </el-checkbox-group>
        </FormItem>
        <FormItem label="첨부파일" />
        <FormItem label="&quot;use-group&quot;" use-group>
          <CustomInput v-model="form.input" max-length="10" placeholder="10글자 내로 입력하세요." />
        </FormItem>
        <FormItem label="&quot;use-group&quot;" use-group>
          <FormItem label="label이 있는 경우">
            <CustomInput v-model="form.input" max-length="10" placeholder="10글자 내로 입력하세요." />
          </FormItem>
          <FormItem label="이렇게 보입니다">
            <CustomInput v-model="form.input" max-length="10" placeholder="10글자 내로 입력하세요." />
          </FormItem>
        </FormItem>
      </form>
    </div>
    <hr>
  </div>
</template>

<style scoped lang="scss"></style>
