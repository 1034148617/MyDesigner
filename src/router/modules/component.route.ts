import { RouteRecordRaw } from 'vue-router'
import { ComponenctEnum } from '@/enums/pageEnum'

// 引入路径
const importPath = {
  'ComponenctEnum.COMPONENT_HOME_NAME': () => import('@/views/designer/index.vue')
}

const componentRoute: RouteRecordRaw = {
  path: ComponenctEnum.COMPONENT_HOME,
  name: ComponenctEnum.COMPONENT_HOME_NAME,
  component: importPath['ComponenctEnum.COMPONENT_HOME_NAME'],
  meta: {
    title: '工作空间',
    isRoot: true,
    noKeepAlive: true,
  }
}

export default componentRoute