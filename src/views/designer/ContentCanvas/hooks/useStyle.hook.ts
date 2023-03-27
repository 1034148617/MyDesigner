import { PickCreateComponentType } from '@/packages/index.d'

type AttrType = PickCreateComponentType<'attr'>

export const useComponentStyle = (attr: AttrType, index: number) => {
  if (!attr) return {}
  const componentStyle = {
    zIndex: index + 1,
    left: `${attr.x}px`,
    top: `${attr.y}px`
  }
  return componentStyle
}

export const useSizeStyle = (attr: AttrType) => {
  if (!attr) return {}
  return {
    width: `${attr.w}px`,
    height: `${attr.h}px`
  }
}

// 锚点位置
export const usePointStyle = (
  point: string,
  index: number,
  attr: PickCreateComponentType<'attr'>,
  cursorResize: string[]
) => {
  const { w: width, h: height } = attr

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
