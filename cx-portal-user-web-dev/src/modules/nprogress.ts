import NProgress from 'nprogress'
import { type UserModule } from '~/types'
import 'nprogress/nprogress.css'

const menuDumyList = [
  {
    menuId: 'question-call',
    menuName: '문의콜',
    menuIndex: '0',
    children: [
      {
        menuId: 'question-call-my-view',
        menuName: 'My view',
        menuIndex: '0-1',
        menuUrl: '/question-call/my-view',
      },
      {
        menuId: 'question-call-dashboard',
        menuName: 'Dashboard',
        menuIndex: '0-2',
        menuUrl: '/question-call/dashboard',
      },
      {
        menuId: 'question-call-management-performance',
        menuName: '관리실적',
        menuIndex: '0-3',
        menuUrl: '/question-call/management-performance',
      },
      {
        menuId: 'question-call-original-text-view',
        menuName: '원문 보기',
        menuIndex: '0-4',
        menuUrl: '/question-call/original-text-view',
      },
    ],
  },
  {
    menuId: 'complaint-call',
    menuName: '불만콜',
    menuIndex: '1',
    children: [
      {
        menuId: 'complaint-call-my-view',
        menuName: 'My view',
        menuIndex: '1-1',
        menuUrl: '/complaint-call/my-view',
      },
      {
        menuId: 'complaint-call-dashboard',
        menuName: 'Dashboard',
        menuIndex: '1-2',
        menuUrl: '/complaint-call/dashboard',
      },
      {
        menuId: 'complaint-call-management-performance',
        menuName: '관리실적',
        menuIndex: '1-3',
        menuUrl: '/complaint-call/management-performance',
      },
      {
        menuId: 'complaint-call-original-text-view',
        menuName: '원문 보기',
        menuIndex: '1-4',
        menuUrl: '/complaint-call/original-text-view',
      },
    ],
  },
  {
    menuId: 'all-nps',
    menuName: '통합 NPS',
    menuIndex: '2',
  },
  {
    menuId: 'j-nps',
    menuName: 'j-NPS',
    menuIndex: '3',
  },
  {
    menuId: 'customer-voice',
    menuName: '고객의 소리',
    menuIndex: '4',
    children: [
      {
        menuId: 'complaint-call-dashboard',
        menuName: 'Dashboard',
        menuIndex: '1-2',
        menuUrl: '/complaint-call/dashboard',
      },
      {
        menuId: 'complaint-call-management-performance',
        menuName: '관리실적',
        menuIndex: '1-3',
        menuUrl: '/complaint-call/management-performance',
      },
      {
        menuId: 'complaint-call-original-text-view',
        menuName: '원문 보기',
        menuIndex: '1-4',
        menuUrl: '/complaint-call/original-text-view',
      },
    ],
  },
  {
    menuId: 'example',
    menuName: '테이블 샘플',
    menuIndex: '5',
    children: [{
      menuId: 'table-data-test',
      menuName: '테이블 샘플',
      menuIndex: '1-1',
      menuUrl: '/example/table-data-test',
    },
    {
      menuId: 'table-chart-test',
      menuName: '테이블 챠트 샘플',
      menuIndex: '1-2',
      menuUrl: '/example/table-chart-test',
    },
    {
      menuId: 'table-dropdown-test',
      menuName: '테이블 드랍다운 샘플',
      menuIndex: '1-3',
      menuUrl: '/example/table-dropdown-test',
    },
    {
      menuId: 'table-svg-chart-test',
      menuName: '테이블 SVG 챠트 샘플',
      menuIndex: '1-4',
      menuUrl: '/example/table-svg-chart-test',
    },
  ],
  },
]

const whiteList = [
  '/dev-login',
  '/unAuthorized',
  '/forbidden',
  '/example',
  '/blank',
  '/not-available',
]

export const install: UserModule = ({ isClient, router }) => {
  if (isClient) {
    router.beforeEach((to, from) => {
      if (to.path !== from.path)
        NProgress.start()

      // TODO: session 조회
      const menuStore = useMenuStore()
      const menuList = menuStore.allMenuList
      if (isEmpty(menuList) && !whiteList.map(url => to.path.toLowerCase().includes(url.toLowerCase())).find(x => x)) {
        // TODO: 메뉴 조회 API 실행
        menuStore.setAllMenuList(menuDumyList)
      }
    })
    router.afterEach(() => { NProgress.done() })
  }
}
