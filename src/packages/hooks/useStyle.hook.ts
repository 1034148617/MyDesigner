import {
  GroupModeEnum,
  BackgroundModeEnum,
  BorderStyleEnum,
  ScrollBarsTypeEnum,
  DisplayEnum,
  CursorEnum,
  FontWeightEnum,
  FontFamilyEnum,
  FontStyleEnum,
  HorizontalAlignment,
  TextDecorationEnum
} from "@/enums/componentEnum";
import {
  BackgroundType,
  BorderType,
  BorderRadiusType,
  PaddingType,
  MarginType,
  FontType,
  StyleType
} from '@/packages/style.d'
import { CreateComponentGroupType, AttrType } from '@/packages/index.d';
import { useDesignStore } from '@/store/modules/designStore/designStore'
import { useEditStore } from '@/store/modules/editStore/editStore'
const designStore = useDesignStore()
const editStore = useEditStore()
const directions = ["", "Top", "Right", "Bottom", "Left"]
const styles = ["Width", "Color", "Style"]

// 容器获取实际宽高(待修改 2023.4.4)
const getGroupStyle = (item: CreateComponentGroupType) => {
  const [path, index] = editStore.computePath(item.id)
  const position = getGroupPosition(item.id) || { top: 0, left: 0, bottom: 0, right: 0 }

  if (path.length == 1) {
    if (item.dock == GroupModeEnum.FILL) {
      return { w: editStore.getEditCanvasConfig.width, h: editStore.getEditCanvasConfig.height }
    } else if (item.dock == GroupModeEnum.TOP || item.dock == GroupModeEnum.BOTTOM) {
      return { w: editStore.getEditCanvasConfig.width - position.left - position.right, h: item.attr.h }
    } else if (item.dock == GroupModeEnum.LEFT || item.dock == GroupModeEnum.RIGHT) {
      return { w: item.attr.w, h: editStore.getEditCanvasConfig.height - position.top - position.bottom }
    }
    return { w: item.attr.w, h: item.attr.h }
  } else if (path.length > 1) {
    const parentComponent = editStore.getComponetById(path[path.length - 2])
    const parentGroupStyle: any = getGroupStyle(parentComponent)
    if (item.dock == GroupModeEnum.FILL) {
      return { w: parentGroupStyle.w, h: parentGroupStyle.h }
    } else if (item.dock == GroupModeEnum.TOP || item.dock == GroupModeEnum.BOTTOM) {
      return { w: parentGroupStyle.w - position.left - position.right, h: item.attr.h }
    } else if (item.dock == GroupModeEnum.LEFT || item.dock == GroupModeEnum.RIGHT) {
      return { w: item.attr.w, h: parentGroupStyle.h - position.top - position.bottom }
    }
    return { w: item.attr.w, h: item.attr.h }
  }
}

// 容器锚点
export const usePointStyle = (
  point: string,
  index: number,
  obj: CreateComponentGroupType,
  cursorResize: string[]
) => {
  const { w: width, h: height } = getGroupStyle(obj)

  const isTop = /t/.test(point)
  const isBottom = /b/.test(point)
  const isLeft = /l/.test(point)
  const isRight = /r/.test(point)

  const point_radius = 2;   // 锚点半径

  let newLeft = 0
  let newTop = 0

  // 四个角的点
  if (point.length === 2) {
    newLeft = isLeft ? 0 : width
    newTop = isTop ? 0 : height
  } else {
    // 上下两点的点，宽度居中
    if (isTop || isBottom) {
      newLeft = width / 2
      newTop = isTop ? 0 : height
    }

    // 左右两边的点，高度居中
    if (isLeft || isRight) {
      newLeft = isLeft ? 0 : width
      newTop = Math.floor(height / 2)
    }
  }

  // top减去锚点半径
  if (isTop || isBottom) {
    newTop -= point_radius
  }

  // 右方线上的点 left减去锚点半径
  if (isLeft || isRight) {
    newLeft -= point_radius
  }

  const style = {
    left: `${newLeft}px`,
    top: `${newTop}px`,
    cursor: cursorResize[index] + '-resize'
  }

  return style
}

// 容器选择遮罩层样式
export const useDockModelStyle = (value: GroupModeEnum, attr: AttrType) => {
  const w = attr.w + 2
  const h = attr.h + 2
  if (!value) return {}
  if (value == GroupModeEnum.NONE) {
    return {
      width: `${w}px`,
      height: `${h}px`
    }
  } else if (value == GroupModeEnum.FILL) {
    return {
      top: 0,
      right: 0,
      bottom: 0,
      left: 0
    }
  } else if (value == GroupModeEnum.TOP) {
    return {
      top: 0,
      right: 0,
      left: 0,
      height: `${h}px`
    }
  } else if (value == GroupModeEnum.RIGHT) {
    return {
      top: 0,
      right: 0,
      bottom: 0,
      width: `${w}px`
    }
  } else if (value == GroupModeEnum.BOTTOM) {
    return {
      right: 0,
      bottom: 0,
      left: 0,
      height: `${h}px`
    }
  } else if (value == GroupModeEnum.LEFT) {
    return {
      top: 0,
      bottom: 0,
      left: 0,
      width: `${w}px`
    }
  }
}

// 容器获取实际位置
const getGroupPosition = (id: string) => {
  // 获取组件
  const component = editStore.getComponetById(id)
  // 获取容器模式（容器固有属性）
  const dock = component.dock
  // 获取父组件的子组件列表和当前组件索引
  const [path, _index] = editStore.computePath(id)
  const siblingList = path.length == 1 ? editStore.getComponentList : editStore.getComponetById(path[1]).groupList
  // const index = _index.length == 1 ? _index[0] : _index[1]
  const index = _index[0]
  // 用于存储组件位置
  const position = {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0
  }

  if (dock == GroupModeEnum.TOP) {
    for (let i = 0; i < index; i++) {
      if (!siblingList[i].isGroup) continue
      if (siblingList[i].dock == GroupModeEnum.TOP) {
        position.top += siblingList[i].attr.h
      }
      if (siblingList[i].dock == GroupModeEnum.LEFT) {
        position.left += siblingList[i].attr.w
      }
      if (siblingList[i].dock == GroupModeEnum.RIGHT) {
        position.right += siblingList[i].attr.w
      }
    }
  } else if (dock == GroupModeEnum.BOTTOM) {
    for (let i = 0; i < index; i++) {
      if (!siblingList[i].isGroup) continue
      if (siblingList[i].dock == GroupModeEnum.BOTTOM) {
        position.bottom += siblingList[i].attr.h
      }
      if (siblingList[i].dock == GroupModeEnum.LEFT) {
        position.left += siblingList[i].attr.w
      }
      if (siblingList[i].dock == GroupModeEnum.RIGHT) {
        position.right += siblingList[i].attr.w
      }
    }
  } else if (dock == GroupModeEnum.LEFT) {
    for (let i = 0; i < index; i++) {
      if (!siblingList[i].isGroup) continue
      if (siblingList[i].dock == GroupModeEnum.LEFT) {
        position.left += siblingList[i].attr.w
      }
      if (siblingList[i].dock == GroupModeEnum.TOP) {
        position.top += siblingList[i].attr.h
      }
      if (siblingList[i].dock == GroupModeEnum.BOTTOM) {
        position.bottom += siblingList[i].attr.h
      }
    }
  } else if (dock == GroupModeEnum.RIGHT) {
    for (let i = 0; i < index; i++) {
      if (!siblingList[i].isGroup) continue
      if (siblingList[i].dock == GroupModeEnum.RIGHT) {
        position.right += siblingList[i].attr.w
      }
      if (siblingList[i].dock == GroupModeEnum.TOP) {
        position.top += siblingList[i].attr.h
      }
      if (siblingList[i].dock == GroupModeEnum.BOTTOM) {
        position.bottom += siblingList[i].attr.h
      }
    }
  }

  return position
}

// 容器模式
export const useDockStyle = (id: string) => {
  if (!id) return {}

  const component = editStore.getComponetById(id)   // 获取组件对象
  const value = component.dock               // 容器option Dock属性
  const attr = component.attr

  const position = getGroupPosition(id) || { top: 0, left: 0, bottom: 0, right: 0 }            // 获取预处理的组件位置

  if (value == GroupModeEnum.NONE) {
    return {
      width: `${attr.w}px`,
      height: `${attr.h}px`,
      left: `${attr.x}px`,
      top: `${attr.y}px`
    }
  } else if (value == GroupModeEnum.FILL) {
    return {
      top: 0,
      right: 0,
      bottom: 0,
      left: 0
    }
  } else if (value == GroupModeEnum.TOP) {
    return {
      top: `${position.top}px`,
      right: `${position.right}px`,
      left: `${position.left}px`,
      height: `${attr.h}px`
    }
  } else if (value == GroupModeEnum.RIGHT) {
    return {
      top: `${position.top}px`,
      right: `${position.right}px`,
      bottom: `${position.bottom}px`,
      width: `${attr.w}px`
    }
  } else if (value == GroupModeEnum.BOTTOM) {
    return {
      right: `${position.right}px`,
      bottom: `${position.bottom}px`,
      left: `${position.left}px`,
      height: `${attr.h}px`
    }
  } else if (value == GroupModeEnum.LEFT) {
    return {
      top: `${position.top}px`,
      bottom: `${position.bottom}px`,
      left: `${position.left}px`,
      width: `${attr.w}px`
    }
  }
}

export const useInnerDockStyle = (id: string) => {
  if (!id) return {}

  const component = editStore.getComponetById(id)   // 获取组件对象
  const value = component.dock                      // 组件dock属性
  const attr = component.attr

  if (value == GroupModeEnum.NONE) {
    return {
      width: `${attr.w}px`,
      height: `${attr.h}px`,
    }
  } else if (value == GroupModeEnum.FILL) {
    return {
      top: 0,
      right: 0,
      bottom: 0,
      left: 0
    }
  } else if (value == GroupModeEnum.TOP) {
    return {
      top: 0,
      right: 0,
      left: 0,
      bottom: 'auto',
      height: `${attr.h}px`
    }
  } else if (value == GroupModeEnum.RIGHT) {
    return {
      top: 0,
      right: 0,
      bottom: 0,
      width: `${attr.w}px`
    }
  } else if (value == GroupModeEnum.BOTTOM) {
    return {
      right: 0,
      bottom: 0,
      left: 0,
      height: `${attr.h}px`
    }
  } else if (value == GroupModeEnum.LEFT) {
    return {
      top: 0,
      bottom: 0,
      left: 0,
      width: `${attr.w}px`
    }
  }
}

/********************************    通用设置    ************************ */
/**
 * 通用
 */
export const useStyle = (value: StyleType | undefined) => {
  if (!value) {
    return {
      ...useBackgroundStyle(undefined),
      ...useBorderStyle(undefined),
      ...useScrollBarsStyle(undefined),
      ...useMarginStyle(undefined),
      ...usePaddingStyle(undefined),
      ...useFontStyle(undefined)
    }
  }

  const detail_style = {}

  if ("Opacity" in value) {
    Object.assign(detail_style, { opacity: value["Opacity"] })
  }

  if ("Cursor" in value) {
    if (!value["Cursor"]) {
      Object.assign(detail_style, { cursor: value["Cursor"] })
    }
  }

  if ("Background" in value) {
    Object.assign(detail_style, useBackgroundStyle(value["Background"]))
  }

  if ("Border" in value) {
    Object.assign(detail_style, useBorderStyle(value["Border"]))
  }

  if ("BorderRadius" in value) {
    Object.assign(detail_style, useBorderRadiusStyle(value["BorderRadius"]))
  }

  if ("ScrollBars" in value) {
    Object.assign(detail_style, useScrollBarsStyle(value["ScrollBars"]))
  }

  if ("Margin" in value) {
    Object.assign(detail_style, useMarginStyle(value["Margin"]))
  }

  if ("Padding" in value) {
    Object.assign(detail_style, usePaddingStyle(value["Padding"]))
  }

  if ("Font" in value) {
    Object.assign(detail_style, useFontStyle(value["Font"]))
  }

  return detail_style
}

/**
 * 背景
 */
export const useBackgroundStyle = (value: BackgroundType | undefined) => {
  if (!value) return {}
  if (!value.Mode || value.Mode == BackgroundModeEnum.THEME) {
    return {
      backgroundColor: designStore.getDarkTheme ? '#666666' : 'white'
    }
  } else if (value.Mode == BackgroundModeEnum.IMAGE) {
    const image = value.ImageUrl
    if (!image) return {}
    return {
      backgroundImage: 'url(' + image + ')',
      backgroundSize: 'cover'
    }
  } else if (value.Mode == BackgroundModeEnum.COLOR) {
    const color = value.Color
    if (!color) return {}
    return {
      backgroundColor: color
    }
  } else if (value.Mode == BackgroundModeEnum.TRANSPARENT) {
    return {
      backgroundColor: designStore.getDarkTheme ? 'rgba(66,66,66,0)' : 'rgba(255,255,255,0)'
    }
  }
}

/**
 * 边框
 */
export const useBorderStyle = (value: BorderType | undefined) => {
  const default_border = {
    border: designStore.getDarkTheme ? '1px rgba(255,255,255,0.3) solid' : '1px rgba(66,66,66,0.3) solid'
  }

  if (!value) return default_border

  const detail_border: Record<string, any> = {}
  for (const direction of directions) {
    for (const style of styles) {
      const detail = `${direction}${style}`
      if (detail in value) {
        const style_name = "border" + detail
        const style_value = value[detail]
        if (!style_value) continue
        if (style == "Width") {
          detail_border[style_name] = `${style_value}px`
        } else if (style == "Color" || style == "Style") {
          detail_border[style_name] = style_value
        }
      }
    }
  }

  return detail_border
}

/**
 * 边框圆角
 */
export const useBorderRadiusStyle = (value: BorderRadiusType | undefined) => {
  if (!value) return {}

  const detail_radius: Record<string, any> = {}

  for (const key in value) {
    const style_name = "border" + key
    const style_value = value[key]

    if (!style_value) continue

    if (style_value.endsWith("%")) {
      detail_radius[style_name] = style_value
    } else if (!isNaN(parseInt(style_value))) {
      detail_radius[style_name] = `${style_value}px`
    } else {
      detail_radius[style_name] = style_value
    }
  }
  return detail_radius
}

/**
 * 滚动条
 */
export const useScrollBarsStyle = (value: ScrollBarsTypeEnum | undefined) => {
  if (value == ScrollBarsTypeEnum.BOTH) {
    return {
      overflow: "auto"
    }
  } else if (value == ScrollBarsTypeEnum.VERTICAL) {
    return {
      overflow: "auto,hidden"
    }
  } else if (value == ScrollBarsTypeEnum.HORIZONTAL) {
    return {
      overflow: "hidden,auto"
    }
  }

  return {
    overflow: "hidden"
  }
}

/**
 * 外边距
 */
export const useMarginStyle = (value: MarginType | undefined) => {
  if (!value) return {}

  const detail_margin: Record<string, any> = {}
  if ("Width" in value) {
    const style_value = value["Width"]
    if (typeof (style_value) == "number") {
      detail_margin["margin"] = `${style_value}px`
    } else {
      detail_margin["margin"] = style_value?.map(item => item + "px").join(" ")
    }
  }

  for (const direction of directions.slice(1)) {
    if (direction in value) {
      const style_name = "margin" + direction
      detail_margin[style_name] = `${value[direction]}px`
    }
  }

  return detail_margin
}

/**
 * 内边距
 */
export const usePaddingStyle = (value: PaddingType | undefined) => {
  if (!value) return {}

  const detail_padding: Record<string, any> = {}
  if ("Width" in value) {
    const style_value = value["Width"]
    if (typeof (style_value) == "number") {
      detail_padding["padding"] = `${style_value}px`
    } else {
      detail_padding["padding"] = style_value?.map(item => item + "px").join(" ")
    }
  }

  for (const direction of directions.slice(1)) {
    if (direction in value) {
      const style_name = "padding" + direction
      detail_padding[style_name] = `${value[direction]}px`
    }
  }

  return detail_padding
}

/**
 * 字体
 */
export const useFontStyle = (value: FontType | undefined) => {
  if (!value) return {}

  const detail_font: Record<string, any> = {}

  if ("Color" in value) {
    detail_font["color"] = value["Color"]
  }

  if ("Size" in value) {
    detail_font["fontSize"] = `${value["Size"]}px`
  }

  if ("Weight" in value) {
    detail_font["fontWeight"] = value["Weight"]
  }

  if ("Family" in value) {
    const style_value = value["Family"]
    if (Array.isArray(style_value)) {
      detail_font["fontFamily"] = style_value.join(",")
    } else {
      detail_font["fontFamily"] = style_value
    }
  }

  if ("Style" in value) {
    detail_font["fontStyle"] = value["Style"]
  }

  if ("LineHeight" in value) {
    detail_font["lineHeight"] = `${value["LineHeight"]}px`
  }

  if ("TextAlign" in value) {
    detail_font["textAlign"] = value["TextAlign"]
  }

  if ("TextDecoration" in value) {
    detail_font["textDecoration"] = value["TextDecoration"]
  }

  return detail_font
}



