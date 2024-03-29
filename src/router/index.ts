import type { App } from 'vue'
import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import { PageEnum } from '@/enums/pageEnum'
import { createRouterGuards } from './router-guards'
import { HttpErrorPage, LoginRoute, RedirectRoute } from '@/router/base'
import { Layout } from '@/router/constants'
import modules from '@/router/modules'

const RootRoute: Array<RouteRecordRaw> = [
    {
        path: '/',
        name: 'Root',
        redirect: PageEnum.BASE_HOME,
        component: Layout,
        meta: {
            title: 'Root',
        },
        children: [
            ...HttpErrorPage,
            modules.storeRoute,
            modules.designRoute,
            modules.previewRoute,
            modules.navigateRoute
        ]
    }
]

export const constantRouter: any[] = [LoginRoute, ...RootRoute, RedirectRoute];

const router = createRouter({
    history: createWebHashHistory(''),
    routes: constantRouter,
    strict: true,
})

export function setupRouter(app: App) {
    app.use(router);
    // 创建路由守卫
    createRouterGuards(router)
  }

export default router

