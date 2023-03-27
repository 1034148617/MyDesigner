<template>
  <n-collapse :default-expanded-names="['1']" style="margin-top:10px;" accordion>
    <n-collapse-item title="基础设置" name="1">
      <n-form :label-width="60" size="small" label-placement="left" label-align="left">
        <n-form-item label="透明度">
          <n-slider v-model:value="targetComponent.style.Opacity" :step="0.05" :max="1" :default-value="1" />
        </n-form-item>
        <n-form-item label="滚动条">
          <n-select v-model:value="targetComponent.style.ScrollBars" :options="options_from_enum(ScrollBarsTypeEnum)" />
        </n-form-item>
      </n-form>
    </n-collapse-item>
    <n-collapse-item title="背景设置" name="2">
      <n-form :label-width="60" size="small" label-placement="left" label-align="left">
        <n-form-item label="模式">
          <n-select v-model:value="targetComponent.style.Background.Mode"
            :options="options_from_enum(BackgroundModeEnum)" />
        </n-form-item>
        <n-form-item label="颜色">
          <!-- <n-color-picker v-model:value="targetComponent.style.Background.Color" :actions="['clear']" /> -->
          <el-color-picker v-model="targetComponent.style.Background.Color" show-alpha />
        </n-form-item>
        <n-form-item label="图片url">
          <n-input v-model:value="targetComponent.style.Background.ImageUrl" placeholder="url" />
        </n-form-item>
      </n-form>
    </n-collapse-item>
    <n-collapse-item title="边框设置" name="3">
      <n-form :label-width="60" size="small" label-placement="left" label-align="left">
        <n-form-item label="宽度">
          <n-input-number v-model:value="targetComponent.style.Border.Width" :min="0" clearable>
            <template #suffix>px</template>
          </n-input-number>
        </n-form-item>
        <n-form-item label="样式">
          <n-select v-model:value="targetComponent.style.Border.Style" :options="options_from_enum(BorderStyleEnum)" />
        </n-form-item>
        <n-form-item label="颜色">
          <!-- <n-color-picker v-model:value="targetComponent.style.Border.Color" :actions="['clear']" /> -->
          <el-color-picker v-model="targetComponent.style.Border.Color" show-alpha />
        </n-form-item>
        <n-form-item label="圆角">
          <n-input v-model:value="targetComponent.style.BorderRadius.Radius" placeholder="请输入数字或者百分比" />
        </n-form-item>
        
      </n-form>
    </n-collapse-item>
    <n-collapse-item title="字体设置" name="4">
      <n-form :label-width="60" size="small" label-placement="left" label-align="left">
        <n-form-item label="颜色">
          <!-- <n-color-picker v-model:value="targetComponent.style.Font.Color" :actions="['clear']" /> -->
          <el-color-picker v-model="targetComponent.style.Font.Color" show-alpha />
        </n-form-item>
        <n-form-item label="大小">
          <n-input-number v-model:value="targetComponent.style.Font.Size" :min="1" clearable placeholder="20" />
        </n-form-item>
        <n-form-item label="行高">
          <n-input-number v-model:value="targetComponent.style.Font.LineHeight" :min="1" clearable placeholder="20" />
        </n-form-item>
        <n-form-item label="粗细">
          <n-select v-model:value="targetComponent.style.Font.Weight" :options="options_from_enum(FontWeightEnum)" />
        </n-form-item>
        <n-form-item label="字体">
          <n-select v-model:value="targetComponent.style.Font.Family" :options="options_from_enum(FontFamilyEnum)" />
        </n-form-item>
        <n-form-item label="斜体">
          <n-select v-model:value="targetComponent.style.Font.Style" :options="options_from_enum(FontStyleEnum)" />
        </n-form-item>
        <n-form-item label="下划线">
          <n-select v-model:value="targetComponent.style.Font.TextDecoration"
            :options="options_from_enum(TextDecorationEnum)" />
        </n-form-item>
        <n-form-item label="对齐方式">
          <n-select v-model:value="targetComponent.style.Font.TextAlign"
            :options="options_from_enum(HorizontalAlignment)" />
        </n-form-item>
      </n-form>
    </n-collapse-item>
    <n-collapse-item title="内边距设置" name="5">
      <n-form :label-width="60" size="small" label-placement="left" label-align="left">
        <n-form-item label="宽度">
          <n-input-number v-model:value="targetComponent.style.Padding.Width" :min="0" clearable placeholder="0">
            <template #suffix>px</template>
          </n-input-number>
        </n-form-item>
        <n-form-item label="Top">
          <n-input-number v-model:value="targetComponent.style.Padding.Top" :min="0" clearable placeholder="0">
            <template #suffix>px</template>
          </n-input-number>
        </n-form-item>
        <n-form-item label="Right">
          <n-input-number v-model:value="targetComponent.style.Padding.Right" :min="0" clearable placeholder="0">
            <template #suffix>px</template>
          </n-input-number>
        </n-form-item>
        <n-form-item label="Bottom">
          <n-input-number v-model:value="targetComponent.style.Padding.Bottom" :min="0" clearable placeholder="0">
            <template #suffix>px</template>
          </n-input-number>
        </n-form-item>
        <n-form-item label="Left">
          <n-input-number v-model:value="targetComponent.style.Padding.Left" :min="0" clearable placeholder="0">
            <template #suffix>px</template>
          </n-input-number>
        </n-form-item>
      </n-form>
    </n-collapse-item>
    <n-collapse-item title="外边距设置" name="6">
      <n-form :label-width="60" size="small" label-placement="left" label-align="left">
        <n-form-item label="宽度">
          <n-input-number v-model:value="targetComponent.style.Margin.Width" :min="0" clearable placeholder="0">
            <template #suffix>px</template>
          </n-input-number>
        </n-form-item>
        <n-form-item label="Top">
          <n-input-number v-model:value="targetComponent.style.Margin.Top" :min="0" clearable placeholder="0">
            <template #suffix>px</template>
          </n-input-number>
        </n-form-item>
        <n-form-item label="Right">
          <n-input-number v-model:value="targetComponent.style.Margin.Right" :min="0" clearable placeholder="0">
            <template #suffix>px</template>
          </n-input-number>
        </n-form-item>
        <n-form-item label="Bottom">
          <n-input-number v-model:value="targetComponent.style.Margin.Bottom" :min="0" clearable placeholder="0">
            <template #suffix>px</template>
          </n-input-number>
        </n-form-item>
        <n-form-item label="Left">
          <n-input-number v-model:value="targetComponent.style.Margin.Left" :min="0" clearable placeholder="0">
            <template #suffix>px</template>
          </n-input-number>
        </n-form-item>
      </n-form>
    </n-collapse-item>
  </n-collapse>
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
import { useTargetComponent } from '../../hooks/useTargetData.hook';

const { targetComponent } = useTargetComponent()

// 下拉框样式
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


</script>

<style></style>
