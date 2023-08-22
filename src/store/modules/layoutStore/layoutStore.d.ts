export enum LayoutStoreEnum {
    LAYERS = 'layers',
    COMPONENTS = 'components',
    DETAILS = 'details',
    RE_POSITION_CANVAS = 'rePositionCanvas',
    DEVICE_TYPE = 'deviceType'
}

export enum DeviceTypeEnum {
    COMPUTER = 'computer',
    PAID = 'paid',
    PHONE = 'phone'
}

export interface LayoutType {
    // 图层控制
    [LayoutStoreEnum.LAYERS]: boolean
    // 组件面板控制
    [LayoutStoreEnum.COMPONENTS]: boolean
    // 详情设置
    [LayoutStoreEnum.DETAILS]: boolean
    // 是否重置当前画布位置
    [LayoutStoreEnum.RE_POSITION_CANVAS]: boolean
    // 布局类型设置
    [LayoutStoreEnum.DEVICE_TYPE]: DeviceTypeEnum
}

