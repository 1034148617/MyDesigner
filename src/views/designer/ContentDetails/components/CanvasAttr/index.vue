<template>
  <div class="my-attr-setting">
    <n-space vertical>
      <my-panel-item title="画板属性">
        <my-setting-item
          name="组件名"
          :isBind="true"
          v-model:value="targetComponent.name"
        >
          <n-input v-model:value="targetComponent.name" placeholder="name" />
        </my-setting-item>
        <my-setting-item
          name="宽度"
          :isBind="true"
          v-model:value="targetComponent.attr.w"
        >
          <n-input-number
            size="small"
            v-model:value="targetComponent.attr.w"
            :validator="validator"
          />
        </my-setting-item>
        <my-setting-item
          name="高度"
          :isBind="true"
          v-model:value="targetComponent.attr.h"
        >
          <n-input-number
            size="small"
            v-model:value="targetComponent.attr.h"
            :validator="validator"
          />
        </my-setting-item>
        <my-setting-item
          name="x轴"
          :isBind="true"
          v-model:value="targetComponent.attr.x"
        >
          <n-input-number
            size="small"
            v-model:value="targetComponent.attr.x"
            :validator="validator"
          />
        </my-setting-item>
        <my-setting-item
          name="y轴"
          :isBind="true"
          v-model:value="targetComponent.attr.y"
        >
          <n-input-number
            size="small"
            v-model:value="targetComponent.attr.y"
            :validator="validator"
          />
        </my-setting-item>
        <my-setting-item
          name="对齐模式"
          :isBind="true"
          v-model:value="targetComponent.dock"
        >
          <n-select
            v-model:value="targetComponent.dock"
            :options="options_from_enum(GroupModeEnum)"
          />
        </my-setting-item>
      </my-panel-item>

      <my-panel-item title="元素属性">
        <my-setting-item
          v-for="item in targetComponent.option"
          :name="item.label"
        >
          <my-option-setting :item="item" :target="targetComponent" />
        </my-setting-item>
      </my-panel-item>

      <div v-if="isConfig">
        <component-config :config="targetComponent" />
      </div>
    </n-space>
  </div>
</template>

<script lang="ts" setup>
import _ from "lodash"
import { ref, computed, watch } from "vue"
import { loadAsyncComponent } from "@/utils"
import { settingModules, getConfigVue } from "@/packages/index"
import { MyOptionSetting } from "@/components/Common/MyOptionSetting"
import { MyPanelItem } from "@/components/Common/MyPanelItem"
import { MySettingItem } from "@/components/Common/MyPanelItem/Components/MySettingItem"
import { GroupModeEnum } from "@/enums/componentEnum"
import { useEditStore } from "@/store/modules/editStore/editStore"

// 获取当前选择组件（属性面板需重新定义）3
const editStore = useEditStore()
const targetComponent: any = computed(() => {
  const targetId = _.last(editStore.getTargetComponent.selectId)
  return editStore.getComponetById(targetId)
})

// 尺寸规则
const validator = (x: number) => x >= 0

// 下拉框样式
function options_from_enum(value: any) {
  const options: Array<any> = []
  //   const options: Array<any> = [{ label: ' ', value: undefined }]
  Object.entries(value).forEach((item) => {
    options.push({
      label: item[1],
      value: item[1],
    })
  })
  return options
}

let addr: string
let ComponentConfig: any
let isConfig = ref(false)
watch(
  () => editStore.getTargetComponent,
  (newValue) => {
    const config = targetComponent.value.config
    if (config.branch == null || config.branch == undefined) {
      addr = `/src/packages/components/${config.type}/${config.key}/config.vue`
    } else {
      addr = `/src/packages/components/${config.type}/${config.branch}/${config.key}/config.vue`
    }
    ComponentConfig = loadAsyncComponent(() => import(addr))
    isConfig.value = addr in settingModules
  },
  { immediate: true, deep: true }
)
</script>

<style lang="scss" scoped>
$uploadWidth: 251px;
$uploadHeight: 193px;

@include go(attr-setting) {
  padding-top: 10px;
}
</style>
