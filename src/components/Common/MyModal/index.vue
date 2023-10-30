<template>
  <el-dialog
    v-model="dialogVisible"
    :top="top"
    :width="widthRef"
    :center="center"
    :close-on-click-modal="closable"
    :close-on-press-escape="closable"
    :show-close="showClose"   
    :fullscreen="fullscreen"
    :draggable="draggable"
    append-to-body
  >
    <template #header>
      <div style="position: relative">
        <slot name="header">
          <span role="heading" class="el-dialog__title">{{ title }}</span>
        </slot>
        <div
          v-if="showSwitch"
          style="position: absolute; right: 55px; bottom: 3px"
          @click="miniHandle"
        >
          <svg-icon name="Mini" :size="12" style="cursor: pointer" />
        </div>
        <div
          v-if="showSwitch"
          style="position: absolute; right: 20px; bottom: 3px"
          title="切换"
          @click="switchHandle"
        >
          <svg-icon name="Switcher" :size="12" style="cursor: pointer" />
        </div>
      </div>
    </template>
    <div :style="{ height: heightRef + 'px' }">
      <slot></slot>
    </div>
    <template #footer>
      <div style="position: relative">
        <slot name="footer"></slot>
        <div
          v-if="resizable"
          style="
            position: absolute;
            right: -3px;
            bottom: 1px;
            transform: translate(100%, 100%);
          "
        >
          <svg-icon
            name="Resizer"
            :size="iconSize"
            style="cursor: se-resize"
            @mousedown="mousedownHandle"
          />
        </div>
      </div>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import { ref, watch, onMounted } from "vue"
import { throttle } from "lodash"

const props = defineProps({
  modelValue: {
    // 控制模态框是否显示
    type: Boolean,
    default: false,
  },
  top: {
    // 模态框与顶部的距离 (px/vh)
    type: String,
    default: "15vh",
  },
  width: {
    // 模态框宽度
    type: Number,
    default: 640,
  },
  height: {
    // 模态框内容部分高度
    type: Number,
    default: 360,
  },
  minWidth: {
    // 模态框最小宽度
    type: Number,
    default: 320,
  },
  minHeight: {
    // 模态框最小高度
    type: Number,
    default: 180,
  },
  title: {
    // 模态框标题，使用header插槽将覆盖
    type: String,
    default: "My Modal",
  },
  center: {
    // header 和 footer 部分是否居中排列
    type: Boolean,
    default: false,
  },
  iconSize: {
    // 特殊功能图标大小
    type: Number,
    default: 15,
  },
  fullscreen: {
    // 是否为全屏模态框
    type: Boolean,
    default: false,
  },
  showClose: {
    // 是否显示关闭按钮
    type: Boolean,
    default: true,
  },
  showSwitch: {
    // 是否显示切换大小按钮
    type: Boolean,
    default: false,
  },
  closable: {
    // 是否允许点击模态层或者使用ESC关闭模态框
    type: Boolean,
    default: false,
  },
  draggable: {
    // 是否可拖拽调整模态框位置
    type: Boolean,
    default: false,
  },
  resizable: {
    // 是否可以拖拽调整模态框大小
    type: Boolean,
    default: false,
  },
})

const dialogVisible = ref(false)
const widthRef = ref(props.width)
const heightRef = ref(props.height) 
watch(
  () => props.modelValue,
  (newValue) => {
    dialogVisible.value = newValue
  }
)

/**
 * 调整对话框逻辑
 */
const mousedownHandle = (e: MouseEvent) => {
  e.preventDefault()
  e.stopPropagation()

  // 记录点击初始位置
  const startX = e.screenX
  const startY = e.screenY

  // 移动-计算偏移量
  const mousemove = throttle((moveEvent: MouseEvent) => {
    let offsetX = moveEvent.screenX - startX
    let offsetY = moveEvent.screenY - startY

    if (offsetX > 5) offsetX = 5
    if (offsetX < -5) offsetX = -5
    if (offsetY > 5) offsetY = 5
    if (offsetY < -5) offsetY = -5

    if (widthRef.value + offsetX < props.minWidth) {
      widthRef.value = props.minWidth
    } else {
      widthRef.value += offsetX
    }

    if (heightRef.value + offsetY < props.minHeight) {
      heightRef.value = props.minHeight
    } else {
      heightRef.value += offsetY
    }

    return
  }, 20)

  const mouseup = () => {
    try {
      document.removeEventListener("mousemove", mousemove)
      document.removeEventListener("mouseup", mouseup)
    } catch (err) {
      console.log(err)
    }
  }

  document.addEventListener("mousemove", mousemove)
  document.addEventListener("mouseup", mouseup)
}

/**
 * 切换对话框大小
 */
const switchRef = ref({
  status: ["min", "normal", "fullscreen"],
  way: "normal",
  size: {
    width: props.width,
    height: props.height,
  },
})

const switchHandle = (func: any) => {
  console.log(1)

}

/**
 * 最小化对话框
 */
const miniHandle = () => {
  console.log(2)
}

</script>
