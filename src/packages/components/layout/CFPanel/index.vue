<template>
  <div class="my-panel" :style="{
    ...useInnerDockStyle(config.id),
    ...useStyle(config.style)
  }">
    <my-text :text="config.name"></my-text>
    <slot></slot>
  </div>
</template>

<script lang='ts' setup>
import { PropType } from 'vue'
import { CreateComponentGroupType } from '@/packages/index.d'
import {
  useInnerDockStyle,
  useStyle
} from '@/packages/hooks/useStyle.hook'
import { MyText } from '@/components/Common/MyText'
import { useDesignStore } from '@/store/modules/designStore/designStore'
const designStore = useDesignStore()

const props = defineProps({
  config: {
    type: Object as PropType<CreateComponentGroupType>,
    required: true
  }
})

</script>

<style lang="scss" scoped>
@include go("panel") {
  position: absolute;
  display: block;

}
</style>