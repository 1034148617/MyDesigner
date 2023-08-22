import { StatusType, CreateComponentType, CreateComponentGroupType, StatueType } from '@/packages/index.d';
import { HistoryActionTypeEnum } from '@/store/modules/historyStore/historyStore.d'
import { ScrollBarsTypeEnum } from '@/enums/componentEnum'

export enum EditCanvasTypeEnum {
    EDIT_LAYOUT_DOM = 'editLayoutDom',
    EDIT_CONTENT_DOM = 'editContentDom',
    OFFSET = 'offset',
    IS_CREATE = 'isCreate',
    IS_DRAG = 'isDrag',
    IS_SELECT = 'isSelect'
}

// 编辑区域
export type EditCanvasType = {
    // 编辑区域 DOM
    [EditCanvasTypeEnum.EDIT_LAYOUT_DOM]: HTMLElement | null
    [EditCanvasTypeEnum.EDIT_CONTENT_DOM]: HTMLElement | null
    // 偏移大小
    [EditCanvasTypeEnum.OFFSET]: number
    // 初始化创建
    [EditCanvasTypeEnum.IS_CREATE]: boolean
    // 拖拽中
    [EditCanvasTypeEnum.IS_DRAG]: boolean
    // 框选中
    [EditCanvasTypeEnum.IS_SELECT]: boolean
}

// 页面状态
export enum PageStateEnum {
    DESIGN = 'design',
    PREVIEW = 'preview'
}

// 画布
export enum EditCanvasConfigEnum {
    WIDTH = 'width',
    HEIGHT = 'height',
    SCROLLBAR = 'scrollbar'
}

export interface EditCanvasConfigType {
    // 宽度
    [EditCanvasConfigEnum.WIDTH]: number
    // 高度
    [EditCanvasConfigEnum.HEIGHT]: number
    // 滚动条
    [EditCanvasConfigEnum.SCROLLBAR]: ScrollBarsTypeEnum
}

// 坐标轴信息
export enum EditCanvasTypeEnum {
    START_X = 'startX',
    START_Y = 'startY',
    X = 'x',
    Y = 'y'
}

// 鼠标位置
export type MousePositionType = {
    // 开始 X
    [EditCanvasTypeEnum.START_X]: number
    // 开始 Y
    [EditCanvasTypeEnum.START_Y]: number
    // X
    [EditCanvasTypeEnum.X]: number
    // y
    [EditCanvasTypeEnum.Y]: number
}

// 操作目标
export type TargetComponentType = {
    hoverId?: string
    selectId: string[]
}

// 数据记录
export type RecordComponentType = {
    component: CreateComponentType | CreateComponentGroupType | Array<CreateComponentType | CreateComponentGroupType>
    type: HistoryActionTypeEnum.CUT | HistoryActionTypeEnum.COPY
}

// 图层操作
export type LayersType = {
    name: string
    statue: StatueType
}

// Store 枚举
export enum ComponentEditStoreEnum {
    PAGE_STATE = 'pageState',
    EDIT_RANGE = 'editRange',
    EDIT_CANVAS = 'editCanvas',
    RIGHT_MENU_SHOW = 'rightMenuShow',
    MOUSE_POSITION = 'mousePosition',
    COMPONENT_LIST = 'componentList',
    TARGET_COMPONENT = 'targetComponent',
    RECORD_COMPONENT = 'recordComponent',
    EDIT_CANVAS_CONFIG = 'editCanvasConfig',
    LAYERS_LIST = 'layersList',
    TARGET_LAYERS = 'targetLayers'
}

// Store 类型
export interface ComponentEditStoreType {
    [ComponentEditStoreEnum.PAGE_STATE]: PageStateEnum
    [ComponentEditStoreEnum.EDIT_CANVAS]: EditCanvasType
    [ComponentEditStoreEnum.RIGHT_MENU_SHOW]: boolean
    [ComponentEditStoreEnum.MOUSE_POSITION]: MousePositionType
    [ComponentEditStoreEnum.COMPONENT_LIST]: Array<CreateComponentType | CreateComponentGroupType>
    [ComponentEditStoreEnum.TARGET_COMPONENT]: TargetComponentType
    [ComponentEditStoreEnum.RECORD_COMPONENT]?: RecordComponentType
    [ComponentEditStoreEnum.EDIT_CANVAS_CONFIG]: EditCanvasConfigType
    [ComponentEditStoreEnum.LAYERS_LIST]: Array<LayersType>
    [ComponentEditStoreEnum.TARGET_LAYERS]: number
}

