export enum ToolsStatusEnum {
    DOCK = 'dock',
    ASIDE = 'aside',
}

export enum SettingStoreEnums {
    // 侧边栏折叠是否隐藏全部
    ASIDE_ALL_COLLAPSED = 'asideAllCollapsed',
    // 组件移动时按方向键移动的距离
    COMPONENT_MOVE_DISTANCE = 'componentMoveDistance',
    // 组件拖拽时的吸附距离（px）
    COMPONENT_ALIGN_RANGE = 'componentAlignRange',
    // 组件工具栏状态（侧边工具状态）
    COMPONENT_TOOLS_STATUS = 'componentToolsStatus',
    // 组件工具栏状态隐藏
    COMPONENT_TOOLS_STATUS_HIDE = 'componentToolsStatusHide'
}

export interface SettingStoreType {
    [SettingStoreEnums.ASIDE_ALL_COLLAPSED]: boolean
    [SettingStoreEnums.COMPONENT_MOVE_DISTANCE]: number
    [SettingStoreEnums.COMPONENT_ALIGN_RANGE]: number
    [SettingStoreEnums.COMPONENT_TOOLS_STATUS]: ToolsStatusEnum
    [SettingStoreEnums.COMPONENT_TOOLS_STATUS_HIDE]: boolean
}
