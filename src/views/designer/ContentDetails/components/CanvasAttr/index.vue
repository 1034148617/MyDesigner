<template>
  <div class="my-attr-setting">
    <n-space vertical>
      <my-panel-item title="画板属性">
        <my-setting-item name="组件名" :isBind="true" v-model:value="targetComponent.value">
          <n-input v-model:value="targetComponent.value" placeholder="name" />
        </my-setting-item>
        <my-setting-item name="宽度" :isBind="true" v-model:value="targetComponent.attr.w">
          <n-input-number size="small" v-model:value="targetComponent.attr.w" :validator="validator" />
        </my-setting-item>
        <my-setting-item name="高度" :isBind="true" v-model:value="targetComponent.attr.h">
          <n-input-number size="small" v-model:value="targetComponent.attr.h" :validator="validator" />
        </my-setting-item>
        <my-setting-item name="x轴" :isBind="true" v-model:value="targetComponent.attr.x">
          <n-input-number size="small" v-model:value="targetComponent.attr.x" :validator="validator" />
        </my-setting-item>
        <my-setting-item name="y轴" :isBind="true" v-model:value="targetComponent.attr.y">
          <n-input-number size="small" v-model:value="targetComponent.attr.y" :validator="validator" />
        </my-setting-item>
        <my-setting-item name="对齐模式" :isBind="true" v-model:value="targetComponent.dock">
          <n-select v-model:value="targetComponent.dock" :options="options_from_enum(GroupModeEnum)" />
        </my-setting-item>
      </my-panel-item>

      <my-panel-item title="元素属性">
        <my-setting-item v-for="item in targetComponent.optionConfig" :name="item.name">
          <my-option-setting :item="item" :target="targetComponent" />
        </my-setting-item>
      </my-panel-item>
    </n-space>
  </div>
</template>

<script lang='ts' setup>
import { MyOptionSetting } from '@/components/Common/MyOptionSetting'
import { MyPanelItem } from '@/components/Common/MyPanelItem'
import { MySettingItem } from '@/components/Common/MyPanelItem/Components/MySettingItem'
import { GroupModeEnum } from '@/enums/componentEnum'
import { useTargetComponent } from '../../hooks/useTargetData.hook'
const { targetComponent } = useTargetComponent()

// 尺寸规则
const validator = (x: number) => x >= 0

// 下拉框样式
function options_from_enum(value: any) {
  const options: Array<any> = []
  //   const options: Array<any> = [{ label: ' ', value: undefined }]
  Object.entries(value).forEach(item => {
    options.push({
      label: item[1],
      value: item[1]
    })
  })
  return options
}

</script>

<style lang="scss" scoped>
$uploadWidth: 251px;
$uploadHeight: 193px;

@include go(attr-setting) {
  padding-top: 10px;
}
</style>