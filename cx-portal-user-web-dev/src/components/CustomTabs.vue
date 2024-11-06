<script setup lang="ts">
import type { ITabs } from '~/types/custom-tabs'

const props = withDefaults(defineProps<{
  tabList: ITabs[]
}>(), {})

const emit = defineEmits<{
  (e: 'changeTab', tab: string): void
}>()

const currentTab = defineModel<string>()

const clickTab = (tabId: string) => {
  emit('changeTab', tabId)
}
</script>

<template>
  <div class="tab">
    <ul class="tab__menu">
      <li
        v-for="tab in props.tabList" :key="`tabList-${tab.tabId}`"
        class="tab__item"
        @click="clickTab(tab.tabId)"
      >
        <span
          :class="currentTab === tab.tabId ? 'is-active' : ''"
        >
          {{ tab.tabName }}
        </span>
      </li>
    </ul>
  </div>
</template>

<style scoped></style>
