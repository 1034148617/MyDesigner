<template>
  <edit-group v-if="item.isGroup" class="my-edit-group" :item="item" 
    :style="{...useDockStyle(item.option.Dock, item.attr)}"
    @click="mouseClickHandle($event, item)"
    @mousedown="mousedownHandle($event, item)" 
    @mouseenter="mouseenterHandle($event, item)"
    @mouseleave="mouseleaveHandle($event, item)">
    <component :is="item.key" :config="item">
      <edit-element :item="child" v-for="(child, index) in item.groupList"></edit-element>
    </component>  
  </edit-group>
  <edit-shape-box v-else :style="{ ...useComponentStyle(item.attr, 1) }" :item="item"
    @click="mouseClickHandle($event, item)" @mousedown="mousedownHandle($event, item)"
    @mouseenter="mouseenterHandle($event, item)" @mouseleave="mouseleaveHandle($event, item)">
    <component :is="item.key" :config="item"></component>
  </edit-shape-box>
</template>
      
<script lang='ts' setup>
import { PropType } from 'vue'
import { CreateComponentType, CreateComponentGroupType } from '@/packages/index.d'
import { EditGroup } from '../EditGroup';
import { EditShapeBox } from '../EditShapeBox';
import { useMouseHandle } from '../../hooks/useDrag.hook'
import { useComponentStyle } from '../../hooks/useStyle.hook'
import { useDockStyle } from '@/packages/hooks/useStyle.hook';
import { useEditStore } from '@/store/modules/editStore/editStore'
const editStore = useEditStore()

// 点击事件
const { mouseenterHandle, mouseleaveHandle, mousedownHandle, mouseClickHandle } = useMouseHandle()

const props = defineProps({
  item: {
    type: Object as PropType<CreateComponentType | CreateComponentGroupType>,
    required: true
  }
})

</script>

<script lang="ts">
// 递归组件定义非setup script导出name防止报错
export default {
  name: "EditElement"
}
</script>

<style lang="scss" scpoed>
@include go(edit-group) {
  position: absolute;

}
</style>
