/**
 * 基础事件类型（所有组件通用）
 */
export enum BaseEvent {
  ON_LOADING = 'loading',                     // 加载完成
  ON_CLICK = 'click',                         // 单击
  ON_MOUSEENTER = 'mouseenter',               // 鼠标移入
  ON_MOUSELEAVE = 'mouseleave',               // 鼠标移出
  ON_RESIZE = 'resize',                       // 大小改变
}

// 内置字符串函数对象列表
export const excludeParseEventKeyList = [

]