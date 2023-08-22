import { RouteRecordRaw } from 'vue-router'
import { PreviewEnum } from '@/enums/pageEnum'

// 引入路径
const importPath = {
  'PreviewEnum.COMPONENT_PREVIEW_NAME': () => import('@/views/preview/index.vue')
}

const previewRoute: RouteRecordRaw = {
  path: PreviewEnum.COMPONENT_PREVIEW,
  name: PreviewEnum.COMPONENT_PREVIEW_NAME,
  component: importPath['PreviewEnum.COMPONENT_PREVIEW_NAME'],
  meta: {
    title: '预览',
    isRoot: true
  }
}

export default previewRoute