<template>
  <div class="my-attr-setting">
    <n-space vertical>
      <n-card title="外部属性" size="small">
        <n-form :label-width="60" size="small" label-placement="left" label-align="left">
          <n-form-item label="组件名">
            <n-input v-model:value="targetComponent.value" placeholder="name" />
          </n-form-item>
          <n-form-item label="宽度">
            <n-input-number size="small" v-model:value="targetComponent.attr.w" :validator="validator"></n-input-number>
          </n-form-item>
          <n-form-item label="高度">
            <n-input-number size="small" v-model:value="targetComponent.attr.h" :validator="validator"></n-input-number>
          </n-form-item>
          <n-form-item label="X轴">
            <n-input-number size="small" v-model:value="targetComponent.attr.x" :validator="validator"></n-input-number>
          </n-form-item>
          <n-form-item label="Y轴">
            <n-input-number size="small" v-model:value="targetComponent.attr.y" :validator="validator"></n-input-number>
          </n-form-item>
        </n-form>
      </n-card>
      <n-card v-if="targetComponent.option_config" title="内部属性" size="small">
        <n-form :label-width="60" size="small" label-placement="left" label-align="left">
          <n-form-item v-for="item in targetComponent.option_config" :label="item.name">
            <my-option-setting :item="item" :target="targetComponent" />
          </n-form-item>
        </n-form>
      </n-card>
    </n-space>
  </div>
</template>

<script lang='ts' setup>
import { MyOptionSetting } from '@/components/Common/MyOptionSetting'
import { useTargetComponent } from '../../hooks/useTargetData.hook';

const { targetComponent } = useTargetComponent()

// 尺寸规则
const validator = (x: number) => x >= 0


</script>

<style lang="scss" scoped>
$uploadWidth: 251px;
$uploadHeight: 193px;

@include go(attr-setting) {
  padding-top: 10px;
}
</style>