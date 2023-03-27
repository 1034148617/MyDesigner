import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'

// import modules from '@/router/modules'

const constantRouter: RouteRecordRaw[] = [
    {
        path: '/',
        name: 'home',
        redirect: '/designer',
        component: import('@/layout/index.vue'),
        children: []
    },
    {
        path: '/designer',
        name: 'designer',
        component: () => import('@/views/designer/index.vue')
    },
    {
        path: "/:catchAll(.*)",
        redirect: '/',
    },
]

export const router = createRouter({
    history: createWebHashHistory(''),
    routes: constantRouter,
    strict: true,
})
