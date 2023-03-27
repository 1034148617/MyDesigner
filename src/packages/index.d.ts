import { BaseEvent, EventLife } from '@/enums/eventEnum'
import { StyleType } from '@/packages/style'

// 组件配置项
export type ConfigType = {
    key: string                  // 组件类名
    name: string                 // 组件名
    type: string                 // 类型
    branch?: string              // 分支
    iconName?: string                // 图标名称
    img?: string                 // 用于拖拽渲染的图片
}

// 组件状态配置项
export interface StatusType {
    load: boolean           // 是否渲染(用于实现图层控制)
    lock: boolean           // 是否锁定
    hide: boolean           // 是否可见
    enabled: boolean        // 是否可用
}

// 画布控制属性（组件外部样式配置项）
export interface AttrType {
    x?: number
    y?: number
    w?: number               // width
    h?: number               // height
    zIndex?: number
    offsetX?: number
    offsetY?: number
}

// 组件基类接口
export interface PublicConfigType {
    id: string              // 实例化对象id
    value: string           // 实例化对象name
    isGroup: boolean        // 是否为容器
    attr: AttrType          // 基本属性
    status: StatusType      // 状态控制
    layers: number          // 图层控制
    style: StyleType        // 样式控制
    events: {               // 事件控制
        baseEvent: {
            [K in BaseEvent]?: string
        },
        advancedEvents: {
            [K in EventLife]?: string
        }
    }
}

// 数据请求接口（暂时为空）
interface RequestConfig {

}

// 单组件接口
export interface CreateComponentType extends PublicConfigType, RequestConfig {
    key: string,                         // ConfigType.key
    config: ConfigType,                  // index.ts default export
    option: { [T: string]: any }         // config.ts option
}

// 容器组件接口
export interface CreateComponentGroupType extends CreateComponentType {
    groupList: Array<CreateComponentType|CreateComponentGroupType>
}

// 获取组件实例类中某个key对应value类型的方法
export type PickCreateComponentType<T extends keyof CreateComponentType> = Pick<CreateComponentType, T>[T]

// 组件分类
export enum ComponentTypeEnum {
    COMMON = 'common',
    DATA = 'data',
    DISPLAY = 'display',
    LAYOUT = 'layout',
    STANDARD = 'standard'
}

export enum ComponentTypeNameEnum {
    COMMON = '通用',
    DATA = '数据',
    DISPLAY = '显示',
    LAYOUT = '布局',
    STANDARD = '标准'
}

export type ComponentType = {
    [ComponentTypeEnum.COMMON]: ConfigType[]   
    [ComponentTypeEnum.DATA]: ConfigType[]   
    [ComponentTypeEnum.DISPLAY]: ConfigType[]   
    [ComponentTypeEnum.LAYOUT]: ConfigType[]   
    [ComponentTypeEnum.STANDARD]: ConfigType[]   
}



