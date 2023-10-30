<template>
  <el-button
    :style="{
      ...useSizeStyle(props.config.attr),
      ...useStyle(config.style),
    }"
    :loading="GetValue(props.config.option, 'loading')"
    :type="GetValue(props.config.option, 'type')"
    :text="GetValue(props.config.option, 'text')"
    :link="GetValue(props.config.option, 'link')"
    :plain="GetValue(props.config.option, 'plain')"
    :round="GetValue(props.config.option, 'round')"
    :circle="GetValue(props.config.option, 'circle')"
    :disabled="GetValue(props.config.option, 'disabled')"
    :icon="GetValue(props.config.option, 'icon')"
    :color="GetValue(props.config.option, 'color')"
    auto-insert-space
  >
    {{ GetValue(props.config.option, "content") }}
  </el-button>
</template>

<script lang="ts" setup>
import { PropType } from "vue"
import {
  CreateComponentType,
  GetValue,
} from "@/packages/index.d"
import { useStyle } from "../../../hooks/useStyle.hook"
import { useSizeStyle } from "@/views/designer/ContentCanvas/hooks/useStyle.hook"

const props = defineProps({
  config: {
    type: Object as PropType<CreateComponentType>,
    required: true,
  },
})
</script>

<style scoped></style>
