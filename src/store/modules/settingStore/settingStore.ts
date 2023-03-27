import {defineStore} from 'pinia'
import {systemSetting} from '@/settings/systemSetting'
import {asideCollapsedWidth} from '@/settings/designSetting'
import {ToolsStatusEnum, SettingStoreType} from './settingStore.d'
import {setLocalStorage, getLocalStorage} from '@/utils'
import {StorageEnum} from '@/enums/storageEnum'

const {SYSTEM_SETTING_STORE} = StorageEnum

const storageSetting: SettingStoreType = getLocalStorage(
    SYSTEM_SETTING_STORE
)

// 全局设置
export const useSettingStore = defineStore({
    id: 'useSettingStore',
    state: (): SettingStoreType => storageSetting || systemSetting,
    getters: {
        getAsideAllCollapsed(): boolean {
            return this.asideAllCollapsed
        },
        getAsideCollapsedWidth(): number {
            return this.asideAllCollapsed ? 0 : asideCollapsedWidth
        },
        getComponentMoveDistance(): number {
            return this.componentMoveDistance
        },
        getComponentAlignRange(): number {
            return this.componentAlignRange
        },
        getComponentToolsStatus(): ToolsStatusEnum {
            return this.componentToolsStatus
        },
        getComponentToolsStatusHide(): boolean {
            return this.componentToolsStatusHide
        },
    },
    actions: {
        setItem<T extends keyof SettingStoreType, K extends SettingStoreType[T]>(
            key: T,
            value: K
        ): void {
            this.$patch(state => {
                state[key] = value
            })
            setLocalStorage(SYSTEM_SETTING_STORE, this.$state)
        }
    }
})
