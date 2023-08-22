<template>
  <div class="go-text-box" :style="{
    ...useSizeStyle(attr),
    ...useStyle(config.style)
  }">
    <span class="ellipsis" :style="{ 'color': 'var(--el-color-' + type + ')' }">{{ content }}</span>
  </div>
</template>

<script lang='ts' setup>
import { CreateComponentType } from '@/packages/index.d';
import { toRefs, PropType, reactive, ref, computed, watch } from 'vue';
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
  content, textEllipsis, type
} = toRefs(props.config.option)

</script>

<style lang="scss" scoped>
.go-text-box {
  box-sizing: border-box;
}

.ellipsis {
  display: -webkit-box;
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-line-clamp: v-bind('textEllipsis');
  -webkit-box-orient: vertical;
}
</style>
