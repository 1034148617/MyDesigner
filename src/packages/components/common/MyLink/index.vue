<template>
  <div :style="{
    ...useSizeStyle(attr),
    ...useStyle(config.style)
  }">
    <el-link :type="type" :disabled="disabled" :href="link" :underline="underline" :target="target ? '_blank' : ''">
      {{ content }}
    </el-link>
  </div>
</template>

<script lang='ts' setup>
import { CreateComponentType } from '@/packages/index.d';
import { toRefs, PropType, shallowReactive, ref, computed, watch } from 'vue';
import { useStyle } from '../../../hooks/useStyle.hook';
import { useSizeStyle } from '@/views/designer/ContentCanvas/hooks/useStyle.hook';
import { option as configOption } from './config'
const props = defineProps({
  config: {
    type: Object as PropType<CreateComponentType>,
    required: true
  },

})
const { attr } = toRefs(props.config)
const { } = toRefs(props.config.style)

const {
  content, type, disabled, link, underline, target
} = toRefs(props.config.option)


// const option = shallowReactive({
//   dataset: configOption.dataset
// })


</script>

<style lang="scss" scoped>
.go-text-box {
  display: flex;
  box-sizing: border-box;
}

.el-link {
  justify-content: left;
  align-items: normal;
  box-sizing: border-box;

  @include deep() {
    .el-link__inner {
      justify-content: left;
      align-items: normal;
    }
  }
}
</style>
