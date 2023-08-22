import {defineStore} from 'pinia'
import {LayoutType, DeviceTypeEnum} from './layoutStore.d'
import {setLocalStorage, getLocalStorage} from '@/utils'
import {StorageEnum} from '@/enums/storageEnum'
import {useEditStore} from "@/store/modules/editStore/editStore";

const editStore = useEditStore()

const {LAYOUT_STORE} = StorageEnum

const storageLayout: Partial<LayoutType> = getLocalStorage(LAYOUT_STORE)

// 编辑区域布局和静态设置
export const useLayoutStore = defineStore({
    id: 'useLayoutStore',
    state: (): LayoutType => ({
        // 图层控制
        layers: false,
        // 组件库
        components: true,
        // 详情设置（收缩为true）
        details: true,
        // 布局类型设置
        deviceType: DeviceTypeEnum.COMPUTER,
        // 是否重置当前画布位置
        rePositionCanvas: false,
        // 防止值不存在
        ...storageLayout
    }),
    getters: {
        getLayers(): boolean {
            return this.layers
        },
        getComponents(): boolean {
            return this.components
        },
        getDetails(): boolean {
            return this.details
        },
        getRePositionCanvas(): boolean {
            return this.rePositionCanvas
        },
        getDeviceType(): DeviceTypeEnum {
            return this.deviceType
        }
    },
    actions: {
        setItem<T extends keyof LayoutType, K extends LayoutType[T]>(key: T, value: K): void {
            this.$patch(state => {
                state[key] = value
            })
            // 存储本地 
            setLocalStorage(LAYOUT_STORE, this.$state)

        },
        setItemUnHandle<T extends keyof LayoutType, K extends LayoutType[T]>(key: T, value: K): void {
            this.$patch(state => {
                state[key] = value
            })
        }
    }
})


