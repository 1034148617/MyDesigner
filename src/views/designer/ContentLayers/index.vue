<template>
  <content-box class="my-content-layers" :class="{ scoped: !layoutStore.getLayers }" title="图层" :depth="2"
    @back="backHandle">
    <template #icon>
      <n-icon size="16" :depth="2" :component="LayersIcon" />
    </template>

    <div>
      <el-tabs v-model="selectLayers" type="card" editable @tab-add="editStore.addLayers" @tab-remove="editStore.deleteLayers"
       @tab-click="editStore.setTargetLayers">
        <el-tab-pane v-for="item in editStore.getLayers" :key="item.name" :label="item.name" :name="item.name">
          <layers-tree :nodes="editStore.getLayersTree"></layers-tree>
        </el-tab-pane>
      </el-tabs>
      <div class="my-layers-toolbar">
        <svg-icon v-for="item in operateList" :name="item.iconName" :size="30" class="my-operate-icon" @click="item.action()"></svg-icon>
      </div>
    </div>
  </content-box>
</template>

<script lang='ts' setup>
import { ref } from 'vue'
import { ContentBox } from '../ContentBox'
import { useEditStore } from '@/store/modules/editStore/editStore';
import { useLayoutStore } from '@/store/modules/layoutStore/layoutStore';
import { LayoutStoreEnum } from '@/store/modules/layoutStore/layoutStore.d';
import { delSelected, moveUp, moveDown, moveLeft, moveRight } from './hooks/useMove.hook'
import { LayersTree } from './components/LayersTree'
import { icon } from '@/plugins'

const editStore = useEditStore()
const layoutStore = useLayoutStore()
const { LayersIcon } = icon.ionicons5

const selectLayers = ref(editStore.getTargetLayers.name)

// 图层操作
const operateList = [
  {
    title: "删除",
    iconName: "LayersDelete",
    action: delSelected
  },
  {
    title: "上移",
    iconName: "LayersUp",
    action: moveUp
  },
  {
    title: "下移",
    iconName: "LayersDown",
    action: moveDown
  },
  {
    title: "左移",
    iconName: "LayersLeft",
    action: moveLeft
  },
  {
    title: "右移", 
    iconName: "LayersRight",
    action: moveRight
  }
]


// 缩小
const backHandle = () => {
  layoutStore.setItem(LayoutStoreEnum.LAYERS, false)
}

</script>

<style lang="scss" scoped>
$wight: 220px;

@include go(content-layers) {
  width: $wight;
  flex-shrink: 0;
  overflow: hidden;
  @extend .my-transition;

  .not-layer-text {
    position: relative;
    top: 10px;
    white-space: nowrap;
    opacity: 0.4;
  }

  &.scoped {
    width: 0;
  }

  .ghost {
    opacity: 0;
  }

  .go-layer-mode-active {
    color: #51d6a9;
  }


  @include go(layers-toolbar) {
    position: absolute;
    bottom: 5px;
    border-top: 2px rgba(111, 111, 111, 0.13) solid;
    // border-bottom: 2px rgba(111, 111, 111, 0.13) solid;

    @include go(operate-icon) {
      width: 20%;

      &:hover {
        background-color: rgba(111, 111, 111, 0.3)
      }
    }

  }

}
</style>

