<template>
  <n-layout class="my-param-panel">
    <n-layout-header class="my-param-panel-header">
      <n-space>
        <el-button type="primary">新增参数</el-button>
        <el-button type="primary">修改参数</el-button>
        <el-button type="primary">删除参数</el-button>
        <el-divider direction="vertical" />
      </n-space>
    </n-layout-header>
    <n-layout-content class="my-param-panel-content">

    </n-layout-content>
  </n-layout>
</template>

<script lang='ts' setup>
import { ref, PropType } from 'vue'
import { DataSourceFileType } from '../index.d'

const prop = defineProps({
  value: {
        type: Object as PropType<DataSourceFileType>,
        require: false
    }
})

console.log(prop.value)

</script>

<style lang="scss" scoped>
@include go('param-panel') {
  padding: 8px;

  &-header {
    display: flex;
  }

  &-content {
    padding: 16px;
  }

}
</style>
