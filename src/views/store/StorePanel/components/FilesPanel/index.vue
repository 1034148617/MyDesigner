<template>
  <div style="width:300px;overflow-x: auto;">
    <files-tree />
  </div>
</template>

<script lang="ts" setup>
import FilesTree from './FilesTree.vue'


</script>

<style scoped>
.el-tree {
  .el-tree-node__content {
    display: block !important;
  }

  .el-tree-node__children {
    overflow: visible !important;
  }
}

:deep() .el-tree-node__label {
  width: auto;
  margin-top: 3px;
  float: right;
  font-family: “Trebuchet MS”, Arial, Helvetica, sans-serif;
  font-size: 14px;
  color: #999999;
  line-height: 25px;
  letter-spacing: 1px;
}
</style>