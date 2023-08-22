<template>
  <div>
    <el-tree class="project-tree" :data="data" :props="defaultProps" />
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { useHttpStore } from "@/store/modules/httpStore/httpStore";
const httpStore = useHttpStore();

console.log(httpStore.getUserConfig.selectProject);

const defaultProps = {
  id: "ProjectiD",
  children: "children",
  label: "ProjectName",
};

const data = ref(httpStore.getUserConfig.projects);
  
</script>

<style scoped>
.project-tree {
  overflow: scroll;
  width: 300px;
  height: 800px;
}

.el-tree {
  .el-tree-node {
    min-width: 100%;
    display: inline-block;
  }
  .el-tree-node__content {
    display: none;
  }
}
</style>
  