import { toRaw } from 'vue'
import { DragKeyEnum, MouseEventButton } from '@/enums/editPageEnum'
import { createComponent } from '@/packages'
import { AttrType, ConfigType, CreateComponentType, CreateComponentGroupType } from '@/packages/index.d'
import { useContextMenu } from '@/views/designer/hooks/useContextMenu.hook'
import { useEditStore } from '@/store/modules/editStore/editStore'
import { EditCanvasTypeEnum } from '@/store/modules/editStore/editStore.d'
import { loadingStart, loadingFinish, loadingError, setComponentPosition, JSONParse } from '@/utils'
import { throttle, cloneDeep } from 'lodash'
import { GroupModeEnum } from '@/enums/componentEnum';

const editStore = useEditStore()
const { onClickOutSide } = useContextMenu()

// * 拖拽到编辑区域里
export const dragHandle = async (e: DragEvent) => {
  e.preventDefault()

  try {
    // 获取拖拽数据
    const drayDataString = e!.dataTransfer!.getData(DragKeyEnum.DRAG_KEY)
    if (!drayDataString) {
      return
    }

    // 修改状态
    editStore.setEditCanvas(EditCanvasTypeEnum.IS_CREATE, false)
    const dropData: Exclude<ConfigType, ['image']> = JSONParse(drayDataString)

    // 创建新组件
    let newComponent: CreateComponentType = await createComponent(dropData)

    setComponentPosition(newComponent, e.offsetX - newComponent.attr.w / 2, e.offsetY - newComponent.attr.h / 2)
    editStore.addComponentList(newComponent, false, true)
    editStore.setTargetSelectComponent(newComponent.id)

  } catch (error) {
    // window['$message'].warning(`组件正在研发中, 敬请期待...`)
    console.log(error)
  }
}

// * 进入拖拽区域
export const dragoverHandle = (e: DragEvent) => {
  e.preventDefault()
  e.stopPropagation()

  if (e.dataTransfer) e.dataTransfer.dropEffect = 'copy'
}

// * 不拦截默认行为点击
export const mousedownHandleUnStop = (e: MouseEvent, item?: CreateComponentType | CreateComponentGroupType) => {
  if (item) {
    editStore.setTargetSelectComponent(item.id)
    return
  }
  editStore.setTargetSelectComponent(undefined)
}

// * 框选
export const mousedownBoxSelect = (e: MouseEvent, item?: CreateComponentType | CreateComponentGroupType) => {
  if (e.which == 2) return
  if (window.$KeyboardActive?.space) return

  mousedownHandleUnStop(e)

  // 记录点击初始位置
  const startOffsetX = e.offsetX
  const startOffsetY = e.offsetY
  const startScreenX = e.screenX
  const startScreenY = e.screenY

  editStore.setMousePosition(undefined, undefined, startOffsetX, startOffsetY)

  // 移动框选
  const mousemove = throttle((moveEvent: MouseEvent) => {
    // 取消当前选中
    editStore.setTargetSelectComponent()
    editStore.setEditCanvas(EditCanvasTypeEnum.IS_SELECT, true)

    // 这里先把相对值算好，不然组件无法获取 startScreenX 和 startScreenY 的值
    const currX = startOffsetX + moveEvent.screenX - startScreenX
    const currY = startOffsetY + moveEvent.screenY - startScreenY
    editStore.setMousePosition(currX, currY)

    // 计算框选的左上角和右下角
    const selectAttr = {
      // 左上角
      x1: 0,
      y1: 0,
      // 右下角
      x2: 0,
      y2: 0
    }
    if (currX > startOffsetX && currY > startOffsetY) {
      // 右下方向
      selectAttr.x1 = startOffsetX
      selectAttr.y1 = startOffsetY
      selectAttr.x2 = Math.round(startOffsetX + (moveEvent.screenX - startScreenX))
      selectAttr.y2 = Math.round(startOffsetY + (moveEvent.screenY - startScreenY))
    } else if (currX > startOffsetX && currY < startOffsetY) {
      // 右上方向
      selectAttr.x1 = startOffsetX
      selectAttr.y1 = Math.round(startOffsetY - (startScreenY - moveEvent.screenY))
      selectAttr.x2 = Math.round(startOffsetX + (moveEvent.screenX - startScreenX))
      selectAttr.y2 = startOffsetY
    } else if (currX < startOffsetX && currY > startOffsetY) {
      selectAttr.x1 = Math.round(startOffsetX - (startScreenX - moveEvent.screenX))
      selectAttr.y1 = startOffsetY
      selectAttr.x2 = startOffsetX
      selectAttr.y2 = Math.round(startOffsetY + (moveEvent.screenY - startScreenY))
      // 左下方向
    } else {
      // 左上方向
      selectAttr.x1 = Math.round(startOffsetX - (startScreenX - moveEvent.screenX))
      selectAttr.y1 = Math.round(startOffsetY - (startScreenY - moveEvent.screenY))
      selectAttr.x2 = startOffsetX
      selectAttr.y2 = startOffsetY
    }

    // 遍历组件
    editStore.getComponentList.forEach(item => {
      if (!editStore.getTargetComponent.selectId.includes(item.id)) {
        // 处理左上角
        let isSelect = false
        const { x, y, w, h } = item.attr
        const targetAttr = {
          // 左上角
          x1: x,
          y1: y,
          // 右下角
          x2: x + w,
          y2: y + h
        }
        // 全包含则选中
        if (
          targetAttr.x1 - selectAttr.x1 >= 0 &&
          targetAttr.y1 - selectAttr.y1 >= 0 &&
          targetAttr.x2 - selectAttr.x2 <= 0 &&
          targetAttr.y2 - selectAttr.y2 <= 0 &&
          !item.status.lock &&
          !item.status.hide
        ) {
          isSelect = true
          editStore.setTargetSelectComponent(item.id, true)
        }
      }
    })
  }, 30)

  // 鼠标抬起
  const mouseup = () => {
    // 鼠标抬起时，结束mousemove的节流函数，避免选框不消失问题
    mousemove.cancel()
    editStore.setEditCanvas(EditCanvasTypeEnum.IS_SELECT, false)
    editStore.setMousePosition(0, 0, 0, 0)
    document.removeEventListener('mousemove', mousemove)
    document.removeEventListener('mouseup', mouseup)
  }
  document.addEventListener('mousemove', mousemove)
  document.addEventListener('mouseup', mouseup)
}

// * 移动锚点
export const useMousePointHandle = (e: MouseEvent, point: string, attr: AttrType) => {
  e.stopPropagation()
  e.preventDefault()

  // 设置拖拽状态
  editStore.setEditCanvas(EditCanvasTypeEnum.IS_DRAG, true)

  const itemAttrX = attr.x
  const itemAttrY = attr.y
  const itemAttrW = attr.w
  const itemAttrH = attr.h

  // 记录点击初始位置
  const startX = e.screenX
  const startY = e.screenY

  // 记录初始位置
  editStore.setMousePosition(startX, startY)

  const mousemove = throttle((moveEvent: MouseEvent) => {
    editStore.setMousePosition(moveEvent.screenX, moveEvent.screenY)

    let currX = Math.round(moveEvent.screenX - startX)
    let currY = Math.round(moveEvent.screenY - startY)

    const isTop = /t/.test(point)
    const isBottom = /b/.test(point)
    const isLeft = /l/.test(point)
    const isRight = /r/.test(point)

    const newHeight = itemAttrH + (isTop ? -currY : isBottom ? currY : 0)
    const newWidth = itemAttrW + (isLeft ? -currX : isRight ? currX : 0)

    attr.h = newHeight > 0 ? newHeight : 0
    attr.w = newWidth > 0 ? newWidth : 0
    attr.x = itemAttrX + (isLeft ? currX : 0)
    attr.y = itemAttrY + (isTop ? currY : 0)
  }, 50)

  const mouseup = () => {
    editStore.setEditCanvas(EditCanvasTypeEnum.IS_DRAG, false)
    editStore.setMousePosition(0, 0, 0, 0)
    document.removeEventListener('mousemove', mousemove)
    document.removeEventListener('mouseup', mouseup)
  }

  document.addEventListener('mousemove', mousemove)
  document.addEventListener('mouseup', mouseup)
}

// * 鼠标事件
export const useMouseHandle = () => {
  // *  Click 事件, 松开鼠标触发
  const mouseClickHandle = (e: MouseEvent, item: CreateComponentType | CreateComponentGroupType) => {
    e.preventDefault()
    e.stopPropagation()
    if (item.status.lock) return
    // 若此时按下了 CTRL, 表示多选
    if (window.$KeyboardActive?.ctrl) {
      // 若已选中，则去除
      if (editStore.targetComponent.selectId.includes(item.id)) {
        const exList = editStore.targetComponent.selectId.filter(e => e !== item.id)
        editStore.setTargetSelectComponent(exList)
      } else {
        editStore.setTargetSelectComponent(item.id, true)
      }
    }
  }

  // * 按下事件（包含移动事件）
  const mousedownHandle = (e: MouseEvent, item: CreateComponentType | CreateComponentGroupType) => {
    e.preventDefault()
    e.stopPropagation()
    if (item.status.lock) return
    onClickOutSide()
    // 按下左键 + CTRL
    if (e.buttons === MouseEventButton.LEFT && window.$KeyboardActive?.ctrl) return

    // 按下右键 + 选中多个 + 目标元素是多选子元素
    const selectId = editStore.getTargetComponent.selectId
    if (e.buttons === MouseEventButton.RIGHT && selectId.length > 1 && selectId.includes(item.id)) return

    // 选中当前目标组件
    editStore.setTargetSelectComponent(item.id)

    // 按下右键
    if (e.buttons === MouseEventButton.RIGHT) return

    // 记录初始位置和大小
    const targetMap = new Map()
    editStore.getTargetComponent.selectId.forEach(id => {
      const { x, y, w, h } = toRaw(editStore.getComponetById(id)).attr
      targetMap.set(id, { x, y, w, h })
    })

    // 记录点击初始位置
    const startX = e.screenX
    const startY = e.screenY

    // 记录历史位置
    let prevComponentInstance: Array<CreateComponentType | CreateComponentGroupType> = []
    editStore.getTargetComponent.selectId.forEach(id => {
      if (!targetMap.has(id)) return

      // 拿到初始位置数据
      prevComponentInstance.push(cloneDeep(editStore.getComponetById(id)))
    })

    // 记录初始位置
    editStore.setMousePosition(undefined, undefined, startX, startY)

    // 移动-计算偏移量
    const mousemove = throttle((moveEvent: MouseEvent) => {
      editStore.setEditCanvas(EditCanvasTypeEnum.IS_DRAG, true)
      editStore.setMousePosition(moveEvent.screenX, moveEvent.screenY)

      let offsetX = moveEvent.screenX - startX
      let offsetY = moveEvent.screenY - startY

      editStore.getTargetComponent.selectId.forEach(id => {
        if (!targetMap.has(id)) return

        // 设置移动范围
        let canvasWidth = editStore.getEditCanvasConfig.width
        let canvasHeight = editStore.getEditCanvasConfig.height
        const [path, index] = editStore.computePath(id)
        if (path.length > 1) {
          const parentComponent = editStore.getComponetById(path[path.length - 2])
          switch (parentComponent.dock) {
            case GroupModeEnum.TOP:
            case GroupModeEnum.BOTTOM:
              canvasHeight = parentComponent.attr.h; break;
            case GroupModeEnum.RIGHT:
            case GroupModeEnum.LEFT:
              canvasWidth = parentComponent.attr.w; break;
            case GroupModeEnum.NONE:
              canvasWidth = parentComponent.attr.w; canvasHeight = parentComponent.attr.h; break;
          }
        }

        // 拿到初始位置数据
        const { x, y, w, h } = targetMap.get(id)
        const componentInstance = editStore.getComponetById(id)

        let currX = Math.round(x + offsetX)
        let currY = Math.round(y + offsetY)

        // 要预留的距离
        const distanceX = Math.round(componentInstance.attr.w / 2)
        const distanceY = Math.round(componentInstance.attr.h / 2)

        // 基于左上角位置检测
        currX = currX < -w + distanceX ? -w + distanceX : currX
        currY = currY < -h + distanceY ? -h + distanceY : currY

        // 基于右下角位置检测
        // currX = currX > canvasWidth - distance ? canvasWidth - distance : currX
        // currY = currY > canvasHeight - distance ? canvasHeight - distance : currY

        if (componentInstance) {
          componentInstance.attr = Object.assign(componentInstance.attr, {
            x: currX,
            y: currY
          })
        }
      })
      return
    }, 20)

    const mouseup = () => {
      try {
        editStore.setMousePosition(0, 0, 0, 0)
        editStore.setEditCanvas(EditCanvasTypeEnum.IS_DRAG, false)
        // 加入历史栈
        if (prevComponentInstance.length) {
          editStore.getTargetComponent.selectId.forEach(id => {
            if (!targetMap.has(id)) return
            const curComponentInstance = editStore.getComponetById(id)
            // 找到记录的所选组件
            prevComponentInstance.forEach(preItem => {
              if (preItem.id === id) {
                preItem.attr = Object.assign(preItem.attr, {
                  offsetX: curComponentInstance.attr.x - preItem.attr.x,
                  offsetY: curComponentInstance.attr.y - preItem.attr.y
                })
              }
            })
          })
        }
        document.removeEventListener('mousemove', mousemove)
        document.removeEventListener('mouseup', mouseup)
      } catch (err) {
        console.log(err)
      }
    }

    document.addEventListener('mousemove', mousemove)
    document.addEventListener('mouseup', mouseup)
  }

  // * 进入事件
  const mouseenterHandle = (e: MouseEvent, item: CreateComponentType | CreateComponentGroupType) => {
    e.preventDefault()
    e.stopPropagation()
    if (!editStore.getEditCanvas.isSelect) {
      editStore.setTargetHoverComponent(item.id)
    }
  }

  // * 移出事件
  const mouseleaveHandle = (e: MouseEvent, item: CreateComponentType | CreateComponentGroupType) => {
    e.preventDefault()
    e.stopPropagation()
    editStore.setEditCanvas(EditCanvasTypeEnum.IS_DRAG, false)
    editStore.setTargetHoverComponent(undefined)
  }

  return { mouseClickHandle, mousedownHandle, mouseenterHandle, mouseleaveHandle }
}

