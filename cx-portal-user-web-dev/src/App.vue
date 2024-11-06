<script setup lang="ts">
import '~/styles/main.scss'

// https://github.com/vueuse/head
// you can use this to manipulate the document head in any components,
// they will be rendered correctly in the html results with vite-ssg
useHead({
  title: 'CX 포탈',
  meta: [
    { name: 'description', content: 'CX 포탈' },
    {
      name: 'theme-color',
      content: computed(() => isDark.value ? '#00aba9' : '#ffffff'),
    },
  ],
  link: [
    // {
    //   rel: 'icon',
    //   type: 'image/svg+xml',
    //   href: '',
    //   // href: '/favicon.ico',
    //   // href: computed(() => preferredDark.value ? '/favicon-dark.svg' : '/favicon.svg'),
    // },
  ],
})
const log = useLogger()
onErrorCaptured((hook, instance, message) => {
  log.error('Vue Global Error: hook: ', hook, '\n instance: ', instance, 'message: ', message)
})
</script>

<template>
  <RouterView />
</template>
