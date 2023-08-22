<template>
  <el-button :style="{
    ...useSizeStyle(attr),
    ...useStyle(config.style)
  }"></el-button>
</template>

<script lang='ts' setup>
import { PropType, toRefs } from 'vue'
import { CreateComponentType } from '@/packages/index.d'
import { useStyle } from '../../../hooks/useStyle.hook'
import { useSizeStyle } from '@/views/designer/ContentCanvas/hooks/useStyle.hook'
import { useHttpStore } from '@/store/modules/httpStore/httpStore';
const httpStore = useHttpStore()


const props = defineProps({
  config: {
    type: Object as PropType<CreateComponentType>,
    required: true
  }
})
const { attr } = toRefs(props.config)

</script>

<style scoped></style>
