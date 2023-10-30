import { LangEnum } from '@/enums/styleEnum'

// 默认语言
export const lang = LangEnum.ZH

// 主题配置
export const theme = {
    // 默认是否开启深色主题
    darkTheme: false,
    //默认主题色
    appTheme: '#51d6a9',
    appThemeDetail: null,
}

// 全局边框圆角
export const borderRadius = '6px'

// 分组名称
export const groupTitle = "分组"

// 组件初始配置(px)
export const ComponentInitConfig = {
    x: 50,
    y: 50,
    // 不建议动 offset
    offsetX: 0,
    offsetY: 0,
  }

// 弹窗是否可以通过点击遮罩关闭
export const maskClosable = false

// 工作区域历史记录存储最大数量
export const editHistoryMax = 100

// 拖拽时蒙层的 z-index，需比所有图表高
export const canvasModelIndex = 9999

// 框选时蒙层的 z-index，需比所有图表高
export const selectBoxIndex = canvasModelIndex + 10

// 对话框图标宽度
export const dialogIconSize = 20

// 侧边栏宽度
export const asideWidth = '300'

// 侧边栏折叠后的宽度，支持全部折叠会覆盖为 0
export const asideCollapsedWidth = 60