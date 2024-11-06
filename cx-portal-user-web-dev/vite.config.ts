import path from 'node:path'
import { defineConfig } from 'vite'
import Vue from '@vitejs/plugin-vue'
import generateSitemap from 'vite-ssg-sitemap'
import Layouts from 'vite-plugin-vue-layouts'
import Components from 'unplugin-vue-components/vite'
import AutoImport from 'unplugin-auto-import/vite'
import Pages from 'vite-plugin-pages'

// import VueI18n from '@intlify/vite-plugin-vue-i18n'
import VueI18nPlugin from '@intlify/unplugin-vue-i18n/vite'
import Inspect from 'vite-plugin-inspect'

// Elements Plus auto import 사용을 위해 추가
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

// TSX 사용을 위해 추가
import vueJsx from '@vitejs/plugin-vue-jsx'

export default defineConfig({
  resolve: {
    alias: {
      '~/': `${path.resolve(__dirname, 'src')}/`,
      '@/': `${path.resolve(__dirname, 'api')}/`, // API 파일 경로
    },
    // 여기에 명시되어 있는 모듈은 중복 모듈 해석을 방지함.(codemirror 를 명시하지 않으면 codemirror/state 중복으로 인해 만들어지지 않음)
    dedupe: ['@codemirror/basic-setup', '@codemirror/theme-one-dark', '@codemirror/view', '@codemirror/state'],
  },

  server: {
    host: true,
    port: 8080,
    open: true,
    proxy: {
      '/api': {
        target: 'http://172.31.120.187:50004',
        changeOrigin: true,
      },
    },
  },

  plugins: [
    Pages({
      dirs: [
        { dir: 'src/pages', baseRoute: '' },
        { dir: 'src/example/pages', baseRoute: 'example/' },
      ],
    }),
    // https://github.com/JohnCampionJr/vite-plugin-vue-layouts
    Layouts({
      layoutsDirs: 'src/layouts',
    }),

    // https://github.com/antfu/unplugin-auto-import
    AutoImport({
      imports: [
        'vue',
        'vue-i18n',
        'vue-router',
        'vue/macros',
        '@vueuse/head',
        '@vueuse/core',
        {
          'vue-logger-plugin': [
            'useLogger', // import { useLogger } from 'vue-logger-plugin',
          ],
        },
      ],
      dts: 'src/auto-imports.d.ts',
      dirs: ['src/composables/**', 'src/store', 'src/utils'],
      vueTemplate: true,
      resolvers: [ElementPlusResolver()],
    }),

    vueJsx({
      // options are passed on to @vue/babel-plugin-jsx
    }),

    // https://github.com/antfu/unplugin-vue-components
    Components({
      // allow auto load markdown components under `./src/components/`
      // extensions: ["vue", "md"],
      // allow auto import and register components used in markdown
      include: [/\.vue$/, /\.vue\?vue/, /\.tsx$/],
      // dirs: ["src/components", "src/view"],
      // globs: ['src/**/components/**/*.(vue|tsx|ts|js)'],
      deep: true,
      dts: 'src/components.d.ts',
      resolvers: [ElementPlusResolver()],
      directoryAsNamespace: true,
    }),
    // https://github.com/antfu/vite-plugin-vue-markdown
    // Don't need this? Try vitesse-lite: https://github.com/antfu/vitesse-lite

    // https://github.com/intlify/bundle-tools/tree/main/packages/vite-plugin-vue-i18n
    // VueI18n({
    //   runtimeOnly: true,
    //   compositionOnly: true,
    //   include: [path.resolve(__dirname, 'locales/**')],
    // }),
    VueI18nPlugin({
      runtimeOnly: true,
      compositionOnly: true,
      include: [path.resolve(__dirname, 'locales/**')],
    }),

    // https://github.com/antfu/vite-plugin-inspect
    // Visit http://localhost:3333/__inspect/ to see the inspector
    Inspect(),
    Vue({
      include: [/\.vue$/],
      reactivityTransform: true,
      // 컴파일 할때 swiper tag 를 건너뛰도록 적용
      template: {
        compilerOptions: {
          isCustomElement: (tag) => tag === "swiper-container" || tag.startsWith("swiper-"),
        },
      },
    }),
  ],
  // https://github.com/vitest-dev/vitest
  test: {
    include: ['test/**/*.test.ts'],
    environment: 'jsdom',
    deps: {
      inline: ['@vue', '@vueuse', 'vue-demi'],
    },
  },

  // https://github.com/antfu/vite-ssg
  ssgOptions: {
    script: 'async',
    formatting: 'minify',
    onFinished() {
      generateSitemap()
    },
  },

  ssr: {
    // TODO: workaround until they support native ESM
    noExternal: ['workbox-window', /vue-i18n/, /element-plus/, /quill/],
  },
})
