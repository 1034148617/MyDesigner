<template>
  <div class="go-text-box" :style="{
    ...useSizeStyle(attr),
    ...useStyle(config.style)
  }">
    <el-input v-model="classOption.ellipsis1" placeholder="Please input" />
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
  dataset, textEllipsis
} = toRefs(props.config.option)

const classOption = reactive({
  ellipsis1: "1"
})

// const option = shallowReactive({
//   dataset: configOption.dataset
// })


</script>

<style lang="scss" scoped>
.go-text-box {
  display: flex;
  align-items: start;
  justify-content: center;
}

.ellipsis1 {
  display: inline-block;
  max-width: 100%;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}

.ellipsis2 {
  display: -webkit-box;
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}

.ellipsis3 {
  display: -webkit-box;
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
}
</style>
