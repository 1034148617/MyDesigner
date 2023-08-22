<template>
  <div class="my-panel" :title="Hint || ''" :style="{
    ...useInnerDockStyle(id),
    ...useStyle(style)
  }">
    <my-text :text="config.value"></my-text>
    <slot></slot>
  </div>
</template>

<script lang='ts' setup>
import { PropType, toRefs, toRaw } from 'vue'
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

const { Hint } = toRefs(props.config.option)
const { id, style } = toRaw(props.config)

</script>

<style lang="scss" scoped>
@include go("panel") {
  position: absolute;
  display: block;

}
</style>