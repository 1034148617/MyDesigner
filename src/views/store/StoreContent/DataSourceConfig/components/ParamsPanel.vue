<template>
  <n-layout class="my-param-panel">
    <n-layout-header class="my-param-panel-header">
      <n-space>
        <el-button @click="showAddParamModal = true">新增参数</el-button>
        <el-divider direction="vertical" />
        <el-dropdown @command="handleCommand">
          <el-button>导入参数<el-icon class="el-icon--right"><arrow-down /></el-icon></el-button>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item command="base">导入常用参数</el-dropdown-item>
              <el-dropdown-item command="model">从数据模型导入</el-dropdown-item>
              <el-dropdown-item command="service">从数据服务导入</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
        <el-button>存为常用参数</el-button>
      </n-space>
      <n-space>
        <add-param-modal :show-modal="showAddParamModal" :params="paramList" @add="addParam"
          @close="showAddParamModal = false" :key="paramList.length" />
        <edit-param-modal :show-modal="showEditParamModal" :param="chooseParam" @update="updateParam"
          @close="showEditParamModal = false" />
      </n-space>
    </n-layout-header>
    <n-layout-content class="my-param-panel-content">
      <el-table :data="paramList" border style="width: auto;" :header-cell-style="{ textAlign: 'center' }">
        <el-table-column type="index" label="行号" :index="indexMethod" width="60px" />
        <el-table-column prop="paramID" label="编码" width="210" />
        <el-table-column prop="paramName" label="名称" width="320" />
        <el-table-column label="参数类型" align="center" width="130">
          <template #default="scope">
            {{ typeOptions[scope.row.paramType] }}
          </template>
        </el-table-column>
        <el-table-column prop="defaultValue" label="默认值" width="130" align="center" />
        <el-table-column prop="testDefaultValue" label="测试默认值" width="130" align="center" />
        <el-table-column prop="comment" label="备注" width="130" />
        <el-table-column prop="index" label="顺序" width="60" align="center" />
        <el-table-column fixed="right" label="操作" align="center">
          <template #default="scope">
            <el-button link type="primary" @click="editParam(scope.row)">编辑</el-button>
            <el-button link type="primary" @click="deleteParam(scope.row.paramID)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </n-layout-content>
  </n-layout>
</template>

<script lang='ts' setup>
import { ref, PropType, watch, defineAsyncComponent } from 'vue'
import _ from 'lodash'
import { DataSourceFileType, paramTypeEnum, } from '../index.d'
// import AddParamModal from './modals/AddParamModal.vue'
// import EditParamModal from './modals/EditParamModal.vue'

const AddParamModal = defineAsyncComponent(() => import('./modals/AddParamModal.vue'))
const EditParamModal = defineAsyncComponent(() => import('./modals/EditParamModal.vue'))

const props = defineProps({
  value: {
    type: Object as PropType<DataSourceFileType>,
    required: false,
  }
})

/* 参数列表 */
const paramList = ref(_.cloneDeep(props.value?.paramList) || [])

/* 模态框控制 */
const showAddParamModal = ref(false)
const showEditParamModal = ref(false)
const chooseParam = ref()

/* 行号 */
const indexMethod = (index: number) => {
  return index + 1
}

/* 参数类型转换 */
const typeOptions = {
  [paramTypeEnum.STRING]: '字符型',
  [paramTypeEnum.NUMBER]: '数字型',
  [paramTypeEnum.DATETIME]: '日期型',
  [paramTypeEnum.MULTIMEDIA]: '多媒体型',
}

/* 新增参数 */
const addParam = (newParam: any) => {
  paramList.value.push(_.cloneDeep(newParam))
  // 参数列表根据index排序
  paramList.value = _.sortBy(paramList.value, 'index')
}
watch(paramList, (newList) => {
  if (props.value) {
    props.value.paramList = newList
  }
}, {
  immediate: true,
  deep: true
}
)

/* 下拉按钮事件 */
const handleCommand = (command: any) => {
  if (command === 'model') {
    console.log(command)
  } else if (command === 'service') {
    console.log(command)
  } else if (command === 'base') {
    console.log(command)
  }
}

/* 删除参数 */
const deleteParam = (value: string) => {
  window['$dialog'].info({
    title: '确认',
    content: `是否删除参数${value}`,
    positiveText: '确定',
    onPositiveClick: () => {
      const index = paramList.value.findIndex(x => x.paramID === value)
      if (index && index !== -1) {
        paramList.value.splice(index, 1)
      }
      window['$message'].info('删除成功')
    },
    negativeText: '取消',
    // onNegativeClick: () => {
    //   window['$message'].info('取消删除')
    // }
  })
  window['$message'].error('111')
}

/* 编辑参数 */
const editParam = (value: any) => {
  chooseParam.value = value
  showEditParamModal.value = true
}

/* 更新参数 */
const updateParam = (param: any) => {
  if (paramList.value.map(item => item.paramID).filter(item => item != chooseParam.value.paramID).indexOf(param.paramID) > -1) {
    window['$message'].error(`编辑参数${chooseParam.value.paramName}失败，参数编号已存在`)
    return
  }

  // 更新参数内容
  const updateParam = paramList.value.find(item => item.paramID == chooseParam.value.paramID)
  if (updateParam) {
    Object.assign(updateParam, param)
  }

  // 更新参数顺序
  paramList.value = _.sortBy(paramList.value, 'index')
}

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
