<template>
  <div v-if="target.option">
    <!-- 文本输入框 -->
    <n-input v-if="item.type == 'string'" v-model:value="target.option[item.key]" />
    <!-- 数字输入框 -->
    <n-input-number v-else-if="item.type == 'number'" v-model:value="target.option[item.key]" />
    <!-- 文本域 -->
    <n-input v-else-if="item.type == 'textarea'" v-model="target.option[item.key]" type="textarea"
      :placeholder="item.default" :autosize="{minRows: 2}" />
    <!-- 单选下拉框 -->
    <n-select v-else-if="item.type == 'enum'" v-model:value="target.option[item.key]"
      :options="options_from_enum(item.default)" />
    <!-- 单选按钮 -->
    <n-radio-group v-else-if="item.type == 'select'" v-model:value="target.option[item.key]">
      <n-radio-button v-for="btn in item.default" :key="btn.value" :value="btn.value" :label="btn.label" />
    </n-radio-group>
    <!-- 开关 -->   
    <n-switch v-else-if="item.type == 'switch'" v-model:value="target.option[item.key]">
      <template #checked>{{ item.default.checked }}</template>
      <template #unchecked>{{ item.default.unchecked }}</template>
    </n-switch>
    <!-- 颜色选择器 -->
    <el-color-picker v-else-if="item.type == 'color'" v-model="target.option[item.key]" show-alpha />
    <!-- 复选框 -->
    <n-checkbox-group v-else-if="item.type == 'checkbox'" v-model:value="target.option[item.key]">
      <n-checkbox v-for="value in item.default" :label="value" :value="value"></n-checkbox>
    </n-checkbox-group>
  </div>
</template>

<script lang='ts' setup>
import { PropType } from 'vue'
import { CreateComponentType, CreateComponentGroupType } from '@/packages/index.d'

const props = defineProps({
  item: {
    type: Object,
    required: true
  },
  target: {
    type: Object as PropType<CreateComponentType | CreateComponentGroupType>,
    required: true
  }
})

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

<style></style>
