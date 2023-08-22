<template>
  <el-button :style="{
    ...useSizeStyle(attr),
    ...useStyle(config.style)
  }" :loading="loading" :text="text" :link="link" :type="type" :plain="plain" :round="round" :circle="circle"
    :disabled="disabled" auto-insert-space :icon="leftIcon" :color="SetType">
    {{ content }}
    <el-icon v-if="rightIcon" class="el-icon--right">
      <component :is="rightIcon"></component>
    </el-icon>
  </el-button>
</template>

<script lang='ts' setup>
import { PropType, toRefs, shallowReactive, watch } from 'vue'
import { CreateComponentType } from '@/packages/index.d'
import { useStyle } from '../../../hooks/useStyle.hook';
import { useSizeStyle } from '@/views/designer/ContentCanvas/hooks/useStyle.hook';
import { reactive } from 'vue'

const props = defineProps({
  config: {
    type: Object as PropType<CreateComponentType>,
    required: true
  }
})

const {
  content,
  type,
  SetType,
  leftIcon,
  rightIcon,
  plain,
  round,
  circle,
  disabled,
  link,
  text,
  loading
} = toRefs(props.config.option)
const { attr } = toRefs(props.config)

</script>

<style scoped></style>
