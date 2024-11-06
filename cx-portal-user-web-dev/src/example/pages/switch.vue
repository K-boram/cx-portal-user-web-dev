<script lang="ts" setup>
const value1 = ref(false)
const value2 = ref(true)
const value3 = ref(false)
</script>

<template>
  <div class="p-20">
    <h2 class="text-3xl font-semibold">
      Switch
    </h2>

    <div class="my-10">
      <ul class="flex gap-8">
        <li class="flex flex-col items-center">
          <h2 class="py-3 font-bold">
            Default
          </h2>
          <el-switch v-model="value1" />
        </li>
        <li class="flex flex-col items-center">
          <h2 class="py-3 font-bold">
            Selected
          </h2>
          <el-switch v-model="value2" />
        </li>
        <li class="flex flex-col items-center">
          <h2 class="py-3 font-bold">
            Disabled
          </h2>
          <el-switch v-model="value3" disabled />
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped lang="scss"></style>
