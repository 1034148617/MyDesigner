import { RouteRecordRaw } from 'vue-router'
import { PageEnum } from '@/enums/pageEnum'

// 引入路径
const importPath = {
    'PageEnum.BASE_HOME_NAME': () => import('@/views/store/index.vue'),
}

const storeRoute: RouteRecordRaw = {
    path: PageEnum.BASE_HOME,
    name: PageEnum.BASE_HOME_NAME,
    component: importPath['PageEnum.BASE_HOME_NAME'],
    meta: {
        title: '项目管理',
        isRoot: true,
        noKeepAlive: true,
    },
    children: []
}


export default storeRoute