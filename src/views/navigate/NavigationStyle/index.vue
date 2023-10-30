<template>
  <n-layout class="my-navigation-style">
    <n-layout-header bordered class="my-navigation-style-header">
      <n-space>
        <div class="button-group">
          <el-button text size="large">方案</el-button>
        </div>
      </n-space>
    </n-layout-header>
    <n-layout class="my-navigation-style-main">

    </n-layout>
  </n-layout>
</template>

<script lang='ts' setup>
import { ref, PropType } from 'vue'
import { ElTree } from 'element-plus'
import { Select } from '@element-plus/icons-vue'


</script>

<style lang="scss" scoped>
@include go(navigation-style) {
  margin: 0 10px;

  &-header {
    height: 50px;
    line-height: 50px;

    .button-group {
      font-size: 14px;
      margin-left: 10px;
    }
  }

  &-main {
    margin: 10px 0;
  }


}
</style>
