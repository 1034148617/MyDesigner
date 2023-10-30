import { RouteRecordRaw } from 'vue-router'
import { PageEnum } from '@/enums/pageEnum'

// 引入路径
const importPath = {
  'PageEnum.COMPONENT_HOME_NAME': () => import('@/views/designer/index.vue')
}

const componentRoute: RouteRecordRaw = {
  path: PageEnum.COMPONENT_HOME,
  name: PageEnum.COMPONENT_HOME_NAME,
  component: importPath['PageEnum.COMPONENT_HOME_NAME'],
  meta: {
    title: '工作空间',
    isRoot: true,
    noKeepAlive: true,
  }
}

export default componentRoute