<template>
  <div>
    <button style="overflow:hidden;" :style="{...useSizeStyle(props.config.attr)}">
      <my-text :text="content" />
    </button>
  </div>
</template>

<script lang='ts' setup>
import { PropType, toRefs} from 'vue'
import { CreateComponentType } from '@/packages/index.d'
import { useSizeStyle } from '@/views/designer/ContentCanvas/hooks/useStyle.hook';
import { useStyle } from '@/packages/hooks/useStyle.hook';
import { MyText } from '@/components/Common/MyText'

const props = defineProps({
  config: {
    type: Object as PropType<CreateComponentType>,
    required: true
  }
})

const { content } = toRefs(props.config.option)
</script>

<style></style>
