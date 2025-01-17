import { ViteSSG } from 'vite-ssg'
import { setupLayouts } from 'virtual:generated-layouts'
import dayjs from 'dayjs'
import ko from 'element-plus/es/locale/lang/ko'

import ElementPlus from 'element-plus'
import type { UserModule } from './types'
import { logger } from './modules/logger'
import 'dayjs/locale/ko'
import App from './App.vue'
import generatedRoutes from '~pages'

dayjs.locale('ko')

if (typeof window !== 'undefined') {
  window.onerror = function (message, source, lineno, colno, error) {
    logger.error('window.onerror: ', message, 'source: ', source, 'line/col no: ', lineno, colno, error)
    // stop bubble when return true
    return import.meta.env.PROD
  }
}
const routes = setupLayouts(generatedRoutes)
// https://github.com/antfu/vite-ssg
export const createApp = ViteSSG(
  App,
  { routes, base: import.meta.env.BASE_URL },
  (ctx) => {
    // install all modules under `modules/`
    Object.values(import.meta.glob<{ install: UserModule }>('./modules/*.ts', { eager: true }))
      .forEach(i => i.install?.(ctx))

    ctx.app.use(ElementPlus, {locale: ko})
  },
)
