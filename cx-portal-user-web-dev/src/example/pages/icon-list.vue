<script setup lang="ts">
const icons = [
  { fileName: 'logo' },
  { fileName: 'logo--sm' },
  { fileName: 'side-bg-path__full--fff' },
  { fileName: 'side-chart__full--fff' },
  { fileName: 'side-chart__full--ec0' },
  { fileName: 'side-chat__full--fff' },
  { fileName: 'side-chat__full--ec0' },
  { fileName: 'side-dashboard__full--ec0' },
  { fileName: 'side-dashboard__full--fff' },
  { fileName: 'side-filter__full--ec0' },
  { fileName: 'side-filter__full--fff' },
  { fileName: 'side-notes__full--fff' },
  { fileName: 'side-notes__full--ec0' },
  { fileName: 'arrow-d__line--333' },
  { fileName: 'loud-speaker__line--999' },
  { fileName: 'search__line--333' },
  { fileName: 'search__line--999' },
  { fileName: 'download__line--ec0' },
  { fileName: 'add__line--333' },
  { fileName: 'check__line--fff' },
  { fileName: 'delete__line--333' },
  { fileName: 'upload-img__line--999' },
  { fileName: 'upload-file__line--999' },
  { fileName: 'delete__line-999' },
  { fileName: 'arrow-b__line--999' },
  { fileName: 'arrow-t__line--333' },
  { fileName: 'arrow-b__line--ccc' },
  { fileName: 'check__line--ec0' },
  { fileName: 'check__bold-line--ec0' },
  { fileName: 'arrow-b__line-e8e' },
  { fileName: 'arrow-t__line--e8e' },
  { fileName: 'check__line--e8e' },
  { fileName: 'd-arrow-r__line--ec0' },
  { fileName: 'exit__line--333' },
  { fileName: 'arrow-l__line--999' },
  { fileName: 'd-arrow-l__line--999' },
  { fileName: 'calendar__line--333' },
  { fileName: 'calendar__line--999' },
  { fileName: 'close__line--9ea' },
]
</script>

<template>
  <div class="p-20">
    <h2 class="text-3xl font-semibold">
      Icon List
    </h2>
    <ul class="flex flex-wrap gap-5 my-10">
      <li v-for="ic in icons" :key="`pages-${ic.fileName}`" class="example__icon">
        <div class="example__icon-image">
          <icon :name="`${ic.fileName}`" width="100" height="100" class="p-2" />
        </div>
        <div class="example__icon-name">
          <span>
            {{ ic.fileName }}
          </span>
        </div>
      </li>
    </ul>
  </div>
</template>

<style lang="scss" scoped>
.example {
  &__icon {
    overflow: hidden;
    width: 140px;
    border: 1px solid #c7c7c7;
    border-radius: 10px;

    &-image {
      @apply flex items-center justify-center;
      width: 100%;
      padding: 10px;
      background: #D5D5D5;
    }

    &-name {
      @apply flex items-center justify-center;
      min-height: 60px;
      padding: 5px;
      border-top: 1px solid #c7c7c7;
      word-break: break-all;
      font-weight: 500;
    }
  }
}
</style>
