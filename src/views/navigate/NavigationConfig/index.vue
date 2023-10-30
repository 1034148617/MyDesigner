<template>
  <n-layout class="my-navigation-config">
    <n-layout-header bordered class="my-navigation-config-header">
      <n-space>
        <div class="button-group">
          <el-button text size="large">新增</el-button>
          <el-button text size="large">删除</el-button>
          <el-button text size="large">导入</el-button>
          <el-button text size="large">方案</el-button>
        </div>
      </n-space>
    </n-layout-header>
    <n-layout class="my-navigation-config-main" has-sider>
      <n-layout-sider bordered content-style="padding:12px;">
        <el-tree ref="treeRef" :data="nodeList" :props="defaultProps" node-key="nodeID" @node-click="handleNodeClick"
          @node-expand="handleNodeClick" />
      </n-layout-sider>
      <n-layout content-style="padding: 12px 20px;">
        <n-form v-if="targetNode" label-placement="left" label-width="auto" style="maxWidth: 540px;margin: 20px 40px;">
          <n-form-item label="节点编码">
            <n-input v-model:value="targetNode.nodeID" placeholder="" />
          </n-form-item>
          <n-form-item label="显示名称">
            <n-input v-model:value="targetNode.nodeName" placeholder="" />
          </n-form-item>
          <n-form-item label="功能URL">
            <n-input v-model:value="targetNode.targetUrl" placeholder="" />
          </n-form-item>
          <n-form-item label=" ">
            <n-space>
              <n-button>功能设置</n-button>
              <n-button>更改功能</n-button>
            </n-space>                                                                                  
          </n-form-item>
          <n-form-item label="功能备注">
            <n-input v-model:value="targetNode.targetUrl" placeholder="" />
          </n-form-item>
          <n-form-item label="打开方式">
            <n-radio-group v-model:value="targetNode.openModel" name="openModelRadioGroup">
              <n-space>
                <n-radio v-for="item in pageOpenTypeEnum" :key="item" :value="item">
                  {{ pageOpenNameEnum[item] }}
                </n-radio>
              </n-space>
            </n-radio-group>
          </n-form-item>
          <n-form-item label="是否启用">
            <n-switch v-model:value="targetNode.isUse" /> 
          </n-form-item>
          <n-form-item label="显示顺序">
            <n-input-number v-model:value="targetNode.index" placeholder="" :min="1" />
          </n-form-item>
          <n-form-item label="显示图标">
            <my-icon-picker />
          </n-form-item>
          <n-form-item label=" ">
            <n-space>
              <n-button type="primary" style="width:200px;">保存</n-button>
            </n-space>
          </n-form-item>
        </n-form>
      </n-layout>
    </n-layout>
  </n-layout>
</template>

<script lang='ts' setup>
import { ref, PropType, watch } from 'vue'
import _ from 'lodash'
import { ElTree } from 'element-plus'
import { Select } from '@element-plus/icons-vue'
import type Node from 'element-plus/es/components/tree/src/model/node'
import type { DragEvents } from 'element-plus/es/components/tree/src/model/useDragNode'
import type { AllowDropType, NodeDropType } from 'element-plus/es/components/tree/src/tree.type'
import { NavigationNode, pageOpenTypeEnum, pageOpenNameEnum } from '../index.d'
import { MyIconPicker} from '@/components/Common/MyIconPicker'

const props = defineProps({
  value: {
    type: Object as PropType<NavigationNode[]>,
    required: true
  }
})

const nodeList = ref<NavigationNode[]>([])      // 导航菜单节点列表
watch(
  () => props.value,
  (newValue) => {
    nodeList.value = _.cloneDeep(newValue)

    function standardNode(node: NavigationNode, index = 1) {
      let newNode = Object.assign({
        targetUrl: null,
        description: null,
        openModel: pageOpenTypeEnum.BLANK,  
        index: index,
        icon: 'default',
        isUse: true
      }, node)

      if (newNode.children) {
        for (let i = 0; i < newNode.children.length; i++) {
          newNode.children[i] = standardNode(newNode.children[i], i + 1)
        }
      } 

      return newNode
    }

    for (let i = 0; i < nodeList.value.length; i++) {
      nodeList.value[i] = standardNode(nodeList.value[i], i + 1)
    }
  },
  {
    immediate: true,
    deep: true
  }
)

const treeRef = ref<InstanceType<typeof ElTree>>()
const defaultProps = {
  label: 'nodeName'
}

const targetNode = ref()
const handleNodeClick = (item: any) => {
  console.log(item)
  targetNode.value = item
}

</script>

<style lang="scss" scoped>
@include go(navigation-config) {
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
