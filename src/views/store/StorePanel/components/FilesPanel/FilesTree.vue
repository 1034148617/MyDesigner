<template>
  <div>
    <el-tree :data="datas" :props="props" :load="loadNode" lazy @node-click="handleSelect" />
  </div> 
</template>

<script lang='ts' setup>
import { ref } from 'vue'
import type Node from 'element-plus/es/components/tree/src/model/node'
import { handleSelect } from '../../hooks/useChoose.hook'

interface Tree {
  name: string
  leaf?: boolean
}

const props = {
  label: 'name',
  isLeaf: 'leaf',
}

const datas = ref([])

const loadNode = async (node: Node, resolve: (data: Tree[]) => void) => {
  // console.log(node)
  if (node.level === 0) {
    const data = await fetchRootData()
    resolve(data)
  } else {
    
  }
}

// 获取顶层节点
async function fetchRootData() {
  return [
    {
      id: 'component',
      name: '组件文件',
      children: [],
      leaf: false
    },
    {
      id: 'datasource',
      name: '数据服务文件',
      children: [],
      leaf: false
    },
    {
      id: 'resource',
      name: '第三方资源文件',
      children: [],
      leaf: false
    }
  ]
}


</script>

<style></style>
