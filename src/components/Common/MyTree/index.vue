<template>
    <div class="tree">
        <ul>
            <li v-for="node in treeData" :key="node.id">
                <span @click="toggleNode(node)">{{ node.name }}</span>
                <my-tree :treeData="node.children" v-if="node.expanded" @node-click="handleNodeClick" />
            </li>
        </ul>
    </div>
</template>
  
<script setup lang="ts">
import { ref } from 'vue'

// 定义树节点类型
interface TreeNode {
    id: number
    name: string
    children: TreeNode[]
    expanded: boolean
}

// 定义树组件的 props 和 emits
const { treeData } = defineProps(['treeData']);
const emit = defineEmits(['node-click'])

// 定义组件逻辑
const toggleNode = (node: TreeNode) => {
    node.expanded = !node.expanded
};

const handleNodeClick = (node: TreeNode) => {
    emit('node-click', node)
};
</script>

<script lang="ts">
export default {
  name: "MyTree"
}
</script>

<style scoped>
.tree {
    padding-left: 20px;
}

ul {
    list-style-type: none;
}
</style>