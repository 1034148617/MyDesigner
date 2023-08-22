import { defineStore } from 'pinia'
import { PackageStoreType, ComponentType } from './packageStore.d'
import { ComponentsList } from '@/packages/index'

// 获取所有组件
export const usePackagesStore = defineStore({
    id: 'usePackagesStore',
    state: (): PackageStoreType => ({
        packagesList: Object.freeze(ComponentsList)
    }),
    getters: {
        getPackagesList(): ComponentType {
            return this.packagesList
        }
    }
})