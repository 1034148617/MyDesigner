import { BaseEvent } from '@/enums/eventEnum'
import { RequestHttpEnum, RequestDataTypeEnum } from '@/enums/httpEnum'
import { GroupModeEnum } from '@/enums/componentEnum'
import { StyleType } from '@/packages/style.d'

// 组件类型枚举
export enum ComponentModeEnum {
    "ATOM" = "atom",            // 原子组件
    "GROUP" = "group",         // 容器分子组件
    "MOLECULE" = "molecule"     // 分子组件
}

// 组件类配置项
export type ConfigType = {
    key: string                  // 组件类名
    name: string                 // 组件名
    mode: ComponentModeEnum      // 模式
    type: ComponentTypeEnum      // 类型
    branch?: string              // 二级类型
    icon?: string                // 图标名称
    img?: string                 // 用于拖拽渲染的图片
}

// 组件状态配置项
export interface StatusType {
    load: boolean           // 是否渲染
    lock: boolean           // 是否锁定
    hide: boolean           // 是否可见
    enabled: boolean        // 是否可用
}

// 画布控制属性（组件外部样式配置项）
export interface AttrType {
    w?: number               // width
    h?: number               // height
    x?: number               // x坐标
    y?: number               // y坐标
    zIndex?: number          // 层级
    offsetX?: number         // x坐标偏移
    offsetY?: number         // y坐标偏移
}

// 组件事件定义
export interface EventType {
    baseEvents: {
        [K in BaseEvent]: any
    },
    componentEvents: {
        [K: string]: any
    }
}

// 组件基类接口
export interface PublicConfigType {
    id: string              // 实例化对象id
    isGroup: boolean        // 是否为分子组件
    name: string            // 实例化对象name
    attr: AttrType          // 基本属性
    dock: GroupModeEnum     // 模式控制（兼容容器）
    status: StatusType      // 状态控制
    layers: number          // 图层控制
    style: StyleType        // 样式控制
    events: EventType       // 事件控制
}

// 数据相关接口
export type DataSetType = {
    type?: string                            // 数据类型，暂定string 使用枚举类型替换
    content?: any                            // 数据内容，暂定any 
}

export type DataServiceType = {
    dsId?: string
    params?: Array<any>
}

export type DataSourceType = {
    type: RequestDataTypeEnum                // 数据源类型
    sql?: string                             // sql 语句
    ds?: DataServiceType                     // 数据服务设置
    static?: any                             // 静态数据设置    
}

export interface RequestConfig {
    // dataSet: DataSetType
    // dataSource: DataSourceType
}

// 单组件接口
export interface CreateComponentType extends PublicConfigType, RequestConfig {
    config: ConfigType,                  // index.ts default export
    option: { [key: string]: ComponentOption }
}

// 容器组件接口
export interface CreateComponentGroupType extends CreateComponentType {
    groupList: Array<CreateComponentType | CreateComponentGroupType>
}

// 获取组件实例类中某个key对应value类型的方法
export type PickCreateComponentType<T extends keyof CreateComponentType> = Pick<CreateComponentType, T>[T]

/********************************************/
/************* 组件配置项类型 *****************/
export type ComponentOption = {
    label: string,              // 配置项名称
    type: string,               // 配置项类型
    default?: any,              // 配置项校验值（list、enum等）
    value: any                  // 配置项默认值
}

// export function GetItem(options: Array<ComponentOption>, id: string) {
//     for (const option of options) {
//         if (option.id === id) {
//             return option
//         }
//     }
//     return undefined
// }

// export function GetValue(options: Array<ComponentOption>, id: string) {
//     for (const option of options) {
//         if (option.id === id) {
//             return option.value
//         }
//     }
//     return undefined
// }

// export function UpdateValue(options: Array<ComponentOption>, id: string, newValue: any) {
//     for (const option of options) {
//         if (option.id === id) {
//             option.value = newValue;
//             return;
//         }
//     }
// }

/********************************************/
/*************** 组件分类 ********************/

export enum ComponentTypeEnum {
    COMMON = 'common',
    LAYOUT = 'layout',
}

export enum ComponentTypeNameEnum {
    COMMON = '通用',
    LAYOUT = '布局',
}

export type ComponentType = {
    [ComponentTypeEnum.COMMON]: ConfigType[]
    [ComponentTypeEnum.LAYOUT]: ConfigType[]
}
/********************************************/



