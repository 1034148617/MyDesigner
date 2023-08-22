<template>
  <n-space vertical>
    <my-panel-item title="基础设置">
      <my-setting-item name="透明度" :isBind="true" v-model:value="targetComponent.style.Opacity">
        <n-slider v-model:value="targetComponent.style.Opacity" :step="0.05" :max="1" :default-value="1" />
      </my-setting-item>
      <my-setting-item name="滚动条" :isBind="true" v-model:value="targetComponent.style.ScrollBars">
        <n-select v-model:value="targetComponent.style.ScrollBars" :options="options_from_enum2(ScrollBarsTypeEnum)" />
      </my-setting-item>
    </my-panel-item>

    <my-panel-item title="背景设置">
      <my-setting-item name="模式" :isBind="true" v-model:value="targetComponent.style.Background.Mode">
        <n-select v-model:value="targetComponent.style.Background.Mode"
          :options="options_from_enum(BackgroundModeEnum)" />
      </my-setting-item>
      <my-setting-item name="颜色" :isBind="true" v-model:value="targetComponent.style.Background.Color">
        <el-color-picker v-model="targetComponent.style.Background.Color" show-alpha />
      </my-setting-item>
      <my-setting-item name="图片url" :isBind="true" v-model:value="targetComponent.style.Background.ImageUrl">
        <n-input v-model:value="targetComponent.style.Background.ImageUrl" placeholder="url" />
      </my-setting-item>
    </my-panel-item>

    <my-panel-item title="边框设置">
      <my-setting-item name="宽度" :isBind="true" v-model:value="targetComponent.style.Border.Width">
        <n-input-number v-model:value="targetComponent.style.Border.Width" :min="0" clearable>
          <template #suffix>px</template>
        </n-input-number>
      </my-setting-item>
      <my-setting-item name="样式" :isBind="true" v-model:value="targetComponent.style.Border.Style">
        <n-select v-model:value="targetComponent.style.Border.Style" :options="options_from_enum(BorderStyleEnum)" />
      </my-setting-item>
      <my-setting-item name="颜色" :isBind="true" v-model:value="targetComponent.style.Border.Color">
        <el-color-picker v-model="targetComponent.style.Border.Color" show-alpha />
      </my-setting-item>
      <my-setting-item name="圆角" :isBind="true" v-model:value="targetComponent.style.BorderRadius.Radius">
        <n-input v-model:value="targetComponent.style.BorderRadius.Radius" placeholder="请输入数字或者百分比" />
      </my-setting-item>

    </my-panel-item>

    <my-panel-item title="字体设置" :expanded="false">
      <my-setting-item name="颜色" :isBind="true" v-model:value="targetComponent.style.Font.Color">
        <el-color-picker v-model="targetComponent.style.Font.Color" show-alpha />
      </my-setting-item>
      <my-setting-item name="大小" :isBind="true" v-model:value="targetComponent.style.Font.Size">
        <n-input-number v-model:value="targetComponent.style.Font.Size" :min="1" clearable placeholder="20" />
      </my-setting-item>
      <my-setting-item name="行高" :isBind="true" v-model:value="targetComponent.style.Font.LineHeight">
        <n-input-number v-model:value="targetComponent.style.Font.LineHeight" :min="1" clearable placeholder="20" />
      </my-setting-item>
      <my-setting-item name="粗细" :isBind="true" v-model:value="targetComponent.style.Font.Weight">
        <n-select v-model:value="targetComponent.style.Font.Weight" :options="options_from_enum(FontWeightEnum)" />
      </my-setting-item>
      <my-setting-item name="字体" :isBind="true" v-model:value="targetComponent.style.Font.Family">
        <n-select v-model:value="targetComponent.style.Font.Family" :options="options_from_enum(FontFamilyEnum)" />
      </my-setting-item>
      <my-setting-item name="斜体" :isBind="true" v-model:value="targetComponent.style.Font.Style">
        <n-select v-model:value="targetComponent.style.Font.Style" :options="options_from_enum(FontStyleEnum)" />
      </my-setting-item>
      <my-setting-item name="下划线" :isBind="true" v-model:value="targetComponent.style.Font.TextDecoration">
        <n-select v-model:value="targetComponent.style.Font.TextDecoration"
          :options="options_from_enum(TextDecorationEnum)" />
      </my-setting-item>
      <my-setting-item name="对齐方式" :isBind="true" v-model:value="targetComponent.style.Font.TextAlign">
        <n-select v-model:value="targetComponent.style.Font.TextAlign"
          :options="options_from_enum(HorizontalAlignment)" />
      </my-setting-item>
    </my-panel-item>

    <my-panel-item title="内边距设置" :expanded="false">
      <my-setting-item name="宽度" :isBind="true" v-model:value="targetComponent.style.Padding.Width">
        <n-input-number v-model:value="targetComponent.style.Padding.Width" :min="0" clearable placeholder="0">
          <template #suffix>px</template>
        </n-input-number>
      </my-setting-item>
      <my-setting-item name="Top" :isBind="true" v-model:value="targetComponent.style.Padding.Top">
        <n-input-number v-model:value="targetComponent.style.Padding.Top" :min="0" clearable placeholder="0">
          <template #suffix>px</template>
        </n-input-number>
      </my-setting-item>
      <my-setting-item name="Right" :isBind="true" v-model:value="targetComponent.style.Padding.Right">
        <n-input-number v-model:value="targetComponent.style.Padding.Right" :min="0" clearable placeholder="0">
          <template #suffix>px</template>
        </n-input-number>
      </my-setting-item>
      <my-setting-item name="Bottom" :isBind="true" v-model:value="targetComponent.style.Padding.Bottom">
        <n-input-number v-model:value="targetComponent.style.Padding.Bottom" :min="0" clearable placeholder="0">
          <template #suffix>px</template>
        </n-input-number>
      </my-setting-item>
      <my-setting-item name="Left" :isBind="true" v-model:value="targetComponent.style.Padding.Left">
        <n-input-number v-model:value="targetComponent.style.Padding.Left" :min="0" clearable placeholder="0">
          <template #suffix>px</template>
        </n-input-number>
      </my-setting-item>
    </my-panel-item>
    
    <my-panel-item title="外边距设置" :expanded="false">
      <my-setting-item name="宽度" :isBind="true" v-model:value="targetComponent.style.Margin.Width">
        <n-input-number v-model:value="targetComponent.style.Margin.Width" :min="0" clearable placeholder="0">
          <template #suffix>px</template>
        </n-input-number>
      </my-setting-item>
      <my-setting-item name="Top" :isBind="true" v-model:value="targetComponent.style.Margin.Top">
        <n-input-number v-model:value="targetComponent.style.Margin.Top" :min="0" clearable placeholder="0">
          <template #suffix>px</template>
        </n-input-number>
      </my-setting-item>
      <my-setting-item name="Right" :isBind="true" v-model:value="targetComponent.style.Margin.Right">
        <n-input-number v-model:value="targetComponent.style.Margin.Right" :min="0" clearable placeholder="0">
          <template #suffix>px</template>
        </n-input-number>
      </my-setting-item>
      <my-setting-item name="Bottom" :isBind="true" v-model:value="targetComponent.style.Margin.Bottom">
        <n-input-number v-model:value="targetComponent.style.Margin.Bottom" :min="0" clearable placeholder="0">
          <template #suffix>px</template>
        </n-input-number>
      </my-setting-item>
      <my-setting-item name="Left" :isBind="true" v-model:value="targetComponent.style.Margin.Left">
        <n-input-number v-model:value="targetComponent.style.Margin.Left" :min="0" clearable placeholder="0">
          <template #suffix>px</template>
        </n-input-number>
      </my-setting-item>
    </my-panel-item>
  </n-space>
</template>

<script lang='ts' setup>
import {
  BackgroundModeEnum,
  BorderStyleEnum,
  ScrollBarsTypeEnum,
  FontWeightEnum,
  FontFamilyEnum,
  FontStyleEnum,
  TextDecorationEnum,
  HorizontalAlignment
} from '@/enums/componentEnum'
import { MyPanelItem } from '@/components/Common/MyPanelItem'
import { MySettingItem } from '@/components/Common/MyPanelItem/components/MySettingItem'
import { useTargetComponent } from '../../hooks/useTargetData.hook'


const { targetComponent } = useTargetComponent()

// 下拉框样式(带null值)
function options_from_enum(value: any) {
  const options: Array<any> = [{ label: ' ', value: undefined }]
  Object.entries(value).forEach(item => {
    options.push({
      label: item[1],
      value: item[1]
    })
  })
  return options
}

// 下拉框样式(不带null值)
function options_from_enum2(value: any) {
  const options: Array<any> = []
  Object.entries(value).forEach(item => {
    options.push({
      label: item[1],
      value: item[1]
    })
  })
  return options
}

</script>

<style></style>
