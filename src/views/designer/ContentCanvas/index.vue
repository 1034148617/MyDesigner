<template>
  <content-box id="my-canvas" :flex="true" :showTop="false" :showBottom="true" :depth="1" :xScroll="true"
    @mousedown="mousedownHandleUnStop" @drop="dragHandle" @dragover="dragoverHandle" @dragenter="dragoverHandle">

    <div id="my-edit-content">
      <div class="my-edit-range my-transition" :style="rangeStyle" @mousedown="mousedownBoxSelect($event, undefined)">
        <!-- 组件显示 -->
        <div v-for="(item, index) in editStore.getComponentList" :key="item.id">
          <edit-element :item="item"></edit-element>
        </div>
        <!-- 框选时的样式框 -->
        <edit-select></edit-select>
        <!-- 拖拽时的遮罩 -->
        <div class="my-edit-range-model" :style="rangeModelStyle"></div>
      </div>
    </div>

    <template #aside></template>
    <template #bottom></template>
  </content-box>
</template>

<script lang='ts' setup>
import { onMounted, toRefs, computed } from 'vue'
import { ContentBox } from '../ContentBox'
import { EditSelect } from './components/EditSelect'
import { EditElement } from './components/EditElement'
import { dragHandle, dragoverHandle, mousedownHandleUnStop, mousedownBoxSelect } from './hooks/useDrag.hook'
import { useLayout } from './hooks/useLayout.hook'
import { useSizeStyle } from './hooks/useStyle.hook'
import { useAddKeyboard } from '../hooks/useKeyboard.hook'
import { useEditStore } from '@/store/modules/editStore/editStore'
const editStore = useEditStore()
const { getEditCanvasConfig, getEditCanvas } = toRefs(editStore)

// 布局处理
useLayout()

const size = computed(() => {
  return {
    w: getEditCanvasConfig.value.width,
    h: getEditCanvasConfig.value.height
  }
})

const rangeStyle = computed(() => {

  // @ts-ignore
  return { ...useSizeStyle(size.value) }
})

// 模态层
const rangeModelStyle = computed(() => {
  const dragStyle = getEditCanvas.value.isCreate && { 'z-index': 99999 }
  // @ts-ignore
  return { ...useSizeStyle(size.value), ...dragStyle }
})

// 键盘事件
onMounted(() => {
  useAddKeyboard()
})

</script>

<style lang="scss" scoped>
@include goId('canvas') {
  width: 100%;
  overflow: hidden;

  // background-color: rgba($color: #ffffff, $alpha: 1);
  @include fetch-bg-color('background-color2');

  @include go(edit-range) {
    position: relative;
    // display: flex;

    border: 3px solid;
    margin: 7px 15px 15px 7px;

    @include fetch-border-color('hover-border-color');
    @extend .my-point-bg;
    @include background-image('background-point');

    @include go(edit-range-model) {
      z-index: -1;
      position: absolute;
      left: 0;
      top: 0;
    }
  }
}
</style>

