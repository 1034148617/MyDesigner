import { RouteRecordRaw } from 'vue-router'
import { PageEnum } from '@/enums/pageEnum'

// 引入路径
const importPath = {
  'PageEnum.ROUTER_HOME_NAME': () => import('@/views/navigate/index.vue')
}

const RouterRoute: RouteRecordRaw = {
  path: PageEnum.ROUTER_HOME,
  name: PageEnum.ROUTER_HOME_NAME,
  component: importPath['PageEnum.ROUTER_HOME_NAME'],
  meta: {
    title: '导航配置',
    isRoot: true,
    noKeepAlive: true,
  }
}

export default RouterRoute