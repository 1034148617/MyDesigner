import { BaseEvent, ComponentEvent } from '@/enums/eventEnum'
import { RequestHttpEnum, RequestDataTypeEnum } from '@/enums/httpEnum'
import { GroupModeEnum } from '@/enums/componentEnum'
import { StyleType } from '@/packages/style.d'

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
    load: boolean           // 是否渲染
    lock: boolean           // 是否锁定
    hide: boolean           // 是否可见
    enabled: boolean        // 是否可用
}

// 画布控制属性（组件外部样式配置项）
export interface AttrType {
    x?: number
    y?: number
    w: number               // width
    h: number               // height
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
    dock: GroupModeEnum     // 模式控制
    status: StatusType      // 状态控制
    layers: number          // 图层控制
    style: StyleType        // 样式控制
    events: {               // 事件控制
        baseEvents: {
            [K in BaseEvent]?: any
        },
        componentEvents: {
            [K in ComponentEvent]?: any
        }
    }
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
    key: string,                         // ConfigType.key
    config: ConfigType,                  // index.ts default export
    option?: { [T: string]: any }         // config.ts option
    optionConfig?: { [T: string]: any }   // config.ts optionConfig
}

// 容器组件接口
export interface CreateComponentGroupType extends CreateComponentType {
    groupList: Array<CreateComponentType | CreateComponentGroupType>
}

// 获取组件实例类中某个key对应value类型的方法
export type PickCreateComponentType<T extends keyof CreateComponentType> = Pick<CreateComponentType, T>[T]


// 组件分类
export enum ComponentTypeEnum {
    COMMON = 'common',
    DATA_OUT = "dataOut",
    DATA_IN = 'dataIn',
    NAVIGATION = 'navigation',
    LAYOUT = 'layout',
    FEEDBACK = "feedback",
    STANDARD = 'standard'
}

export enum ComponentTypeNameEnum {
    COMMON = '通用',
    DATA_IN = "数据录入",
    DATA_OUT = '数据展示',
    NAVIGATION = '导航',
    LAYOUT = '布局',
    FEEDBACK = "反馈",
    STANDARD = '标准'
}

export type ComponentType = {
    [ComponentTypeEnum.COMMON]: ConfigType[]
    [ComponentTypeEnum.DATA_OUT]: ConfigType[]
    [ComponentTypeEnum.DATA_IN]: ConfigType[]
    [ComponentTypeEnum.NAVIGATION]: ConfigType[]
    [ComponentTypeEnum.LAYOUT]: ConfigType[]
    [ComponentTypeEnum.FEEDBACK]: ConfigType[]
    [ComponentTypeEnum.STANDARD]: ConfigType[]
}





