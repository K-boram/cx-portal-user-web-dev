<script setup lang="ts">
import { reactive } from 'vue'

const form = reactive({
  checkbox1: true,
  checkbox2: '',
  checkbox3: true,
  checkbox4: '',

})
</script>

<template>
  <div class="p-20">
    <h2 class="text-3xl font-semibold">
      Checkbox
    </h2>

    <!-- checkbox -->
    <div class="my-10">
      <mark class="inline-block mb-5 text-xl font-bold" style="background:#F0E4FF">
        Basic
      </mark>
      <form class="p-4 bg-black">
        <el-checkbox v-model="form.checkbox1" class="checkbox" value="A" label="주말 데이터 제외" />
        <el-checkbox v-model="form.checkbox2" class="checkbox" value="B" />
      </form>
    </div>
    <hr>
    <div class="my-10">
      <mark class="inline-block mb-5 text-xl font-bold" style="background:#F0E4FF">
        Large size
      </mark>
      <div class="p-4 bg-black">
        <el-checkbox v-model="form.checkbox3" class="checkbox--lg" label="주말 데이터 제외" value="C" />
        <el-checkbox v-model="form.checkbox4" class="checkbox--lg" value="D" />
      </div>
    </div>
    <hr>
  </div>
</template>

<style></style>
