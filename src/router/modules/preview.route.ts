import { RouteRecordRaw } from 'vue-router'
import { PageEnum } from '@/enums/pageEnum'

// 引入路径
const importPath = {
  'PageEnum.COMPONENT_PREVIEW_NAME': () => import('@/views/preview/index.vue')
}

const previewRoute: RouteRecordRaw = {
  path: PageEnum.COMPONENT_PREVIEW,
  name: PageEnum.COMPONENT_PREVIEW_NAME,
  component: importPath['PageEnum.COMPONENT_PREVIEW_NAME'],
  meta: {
    title: '预览',
    isRoot: true
  }
}

export default previewRoute