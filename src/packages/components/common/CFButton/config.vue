<template>
  <my-panel-item title="元素属性">
    <my-setting-item v-for="item in config.option" :name="item.label">
      <my-option-setting :item="item" :target="config" />
    </my-setting-item>
  </my-panel-item>
</template>

<script lang="ts" setup>
import { PropType } from "vue"
import { MyOptionSetting } from "@/components/Common/MyOptionSetting"
import { MyPanelItem } from "@/components/Common/MyPanelItem"
import { MySettingItem } from "@/components/Common/MyPanelItem/Components/MySettingItem"
import { CreateComponentType, GetValue } from "@/packages/index.d"

const props = defineProps({
  config: {
    type: Object as PropType<CreateComponentType>,
    required: true,
  },
})
</script>

<style></style>
