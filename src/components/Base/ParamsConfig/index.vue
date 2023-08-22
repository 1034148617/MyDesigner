<template>
  <n-button quaternary title="全局变量">
    <svg-icon :size="iconSize" name="Data" style="margin-top:3px" @click="showModal = true"></svg-icon>
  </n-button>
  <n-modal v-model:show="showModal" :mask-closable="false">
    <n-card :bordered="false" role="dialog" size="small" aria-modal="true" style="width: 1000px; height: 600px;">
      <template #header>
        <n-space>
          <n-text>全局变量</n-text>
        </n-space>
      </template>

      <div class="my-modal-content">
        <div class="my-modal-content-left" @click="isEditPanel = false">
          <n-space>
            <n-select v-model:value="paramType" style="width:110%;" :options="paramTypeOptions" />
            <n-dropdown :options="addOptions" style="width:410%;" placement="bottom-start" @select="handleSelect">
              <n-button style="width:410%;">添加</n-button>
            </n-dropdown>
          </n-space>
          <vue-draggable-next v-model="paramsList" animation="200" handle=".dragger"
            style="height:90%;margin-top: 3%;overflow-y:auto;">
            <transition-group name="fade">
              <div v-for="item, index in paramsList" :key="index" @click.stop>
                <div class="draggable-item">
                  <n-button text class="dragger">
                    <n-icon size="16">
                      <AppSwitcher />
                    </n-icon>
                  </n-button>
                  <span title="描述" :class="['collapse', { active: item.param.isExpanded }]"
                    @click="toggleCollapse(item.param)"></span>
                  <n-text>{{ getTypeName(item.param.type) }}</n-text>
                  <n-text>{{ item.name }}</n-text>
                  <span class="right">
                    <n-button v-if="item.param.isEdit" title="编辑" text @click="onItemEdit(item.param)">
                      <n-icon size="16">
                        <Edit />
                      </n-icon>
                    </n-button>
                    <n-button v-if="item.param.isDelete" title="删除" text @click="onItemDelete(item.param)">
                      <n-icon size="16">
                        <Delete />
                      </n-icon>
                    </n-button>
                  </span>
                </div>
                <div class="collapse-panel" v-show="item.param.isExpanded">
                  描述: {{ item.param.description || '暂无描述' }}
                </div>
              </div>
            </transition-group>
          </vue-draggable-next>
        </div>
        <div class="my-modal-content-right">
          <div class="config-panel" v-if="configData" v-show="isEditPanel">
            <my-setting-item name="变量名">
              <n-input v-model:value="configData.name" :on-change="onChangeName" />
            </my-setting-item>
            <my-setting-item name="描述">
              <n-input v-model:value="configData.description" />
            </my-setting-item>
            <div v-if="configData.type == ParamsTypeEnum.API">
              <my-panel-item title="自动加载" :collapsible="false">
                <n-switch v-model:value="configData.isAutoLoad" />
              </my-panel-item>
              <my-panel-item title="请求地址" :collapsible="false">
                <n-input v-model:value="configData.dsId" placeholder="DataSoure ID" />
              </my-panel-item>
              <my-panel-item title="请求方式" :collapsible="false">
                <n-radio-group v-model:value="configData.method">
                  <n-radio-button v-for="method in Object.values(RequestHttpEnum)" :key="method" :value="method"
                    :label="method" />
                </n-radio-group>
              </my-panel-item>
              <my-panel-item title="请求参数" :collapsible="false" :value="true">
                <my-dynamic-input v-model:data="configData.params" content="新增一项" :default="onCreate()">
                  <template #default="{ item }">
                    <n-input v-model:value="item.key" type="text" />
                    <n-input v-model:value="item.value" type="text" />
                  </template>
                </my-dynamic-input>
              </my-panel-item>
              <my-panel-item title="数据处理" :collapsible="false"></my-panel-item>
              <my-panel-item title="默认数据" :collapsible="false">
                <monaco-editor language="javascript" v-model:modelValue="configData.default_value"
                  :editorOptions="{ lineNumbers: 'on' }" width="100%" height="320px" />
              </my-panel-item>
            </div>
            <div v-else>
              <my-panel-item title="数据" :collapsible="false">
                <monaco-editor language="javascript" v-model:modelValue="configData.value"
                  :editorOptions="{ lineNumbers: 'on' }" width="100%" height="320px" />
              </my-panel-item>
            </div>

          </div>
        </div>
      </div>

      <template #action>
        <n-space justify="space-between">
          <div class="my-flex-items-center"></div>
          <n-space>
            <n-button size="medium" @click="showModal = false">关闭</n-button>
          </n-space>
        </n-space>
      </template>
    </n-card>
  </n-modal>
</template>

<script lang='ts' setup>
import { ref, computed } from 'vue'
import { VueDraggableNext } from "vue-draggable-next"
import { useMessage } from 'naive-ui'
import { Edit, Delete, AppSwitcher } from '@vicons/carbon'
import { MySettingItem } from '@/components/Common/MyPanelItem/components/MySettingItem'
import { MyPanelItem } from '@/components/Common/MyPanelItem'
import { MyDynamicInput } from '@/components/Common/MyDynamicInput'
import { MonacoEditor } from '@/components/Base/MonacoEditor'
import { RequestHttpEnum } from '@/enums/httpEnum'
import { JSONStringify, JSONParse } from '@/utils'
import { useParamsStore } from '@/store/modules/paramsStore/paramsStore'
import { ParamsTypeEnum } from '@/store/modules/paramsStore/paramsStore.d'
import { useDesignStore } from '@/store/modules/designStore/designStore'
const paramsStore = useParamsStore()
const designStore = useDesignStore()
const message = useMessage()

// 控制颜色变化
const themeColor = computed(() => {
  return designStore.getDarkTheme ? 'rgb(24, 24, 28)' : '#f1f1f1'
})

// 控制模态框显示隐藏
const showModal = ref(false)
const iconSize = ref(20)

// 用于保存当前编辑的数据
const configData = ref()

// 下拉框相关参数
const paramType = ref('.')
const paramTypeOptions = [
  {
    label: '全部',
    value: '.'
  },
  {
    label: '变量',
    value: ParamsTypeEnum.VARIABLE
  },
  {
    label: '接口',
    value: ParamsTypeEnum.API
  },
  {
    label: '函数',
    value: ParamsTypeEnum.FUNCTION
  }
]

// 显示的全局变量列表
const paramsList = computed(() => {
  let params = null
  switch (paramType.value) {
    case '.': params = paramsStore.getGlobalParams; break;
    case ParamsTypeEnum.VARIABLE: params = paramsStore.getGlobalVariable; break;
    case ParamsTypeEnum.FUNCTION: params = paramsStore.getGlobalFunction; break;
    case ParamsTypeEnum.API: params = paramsStore.getGlobalApi; break;
  }

  const infos = []
  for (const key in params) {
    const param = params[key]
    infos.push({
      name: key,
      param: param
    })
  }

  return infos
})
// 翻译类型名
const getTypeName = (_type: ParamsTypeEnum) => {
  switch (_type) {
    case ParamsTypeEnum.VARIABLE: return "变量"
    case ParamsTypeEnum.API: return "接口"
    case ParamsTypeEnum.FUNCTION: return "函数"
  }
}

// 添加按钮
const addOptions = [
  {
    label: '变量',
    key: ParamsTypeEnum.VARIABLE
  },
  {
    label: '函数',
    key: ParamsTypeEnum.FUNCTION
  },
  {
    label: '接口',
    key: ParamsTypeEnum.API
  },
]
const handleSelect = (key: string) => {
  switch (key) {
    case ParamsTypeEnum.VARIABLE: paramsStore.addVariable(); break;
    case ParamsTypeEnum.FUNCTION: paramsStore.addFunction(); break;
    case ParamsTypeEnum.API: paramsStore.addApi(); break;
  }
}

// 编辑面板
const isEditPanel = ref(false)
const onCreate = () => {
  return {
    ket: '',
    value: ''
  }
}

// 展开描述按钮
const toggleCollapse = (item: any) => {
  paramsStore.changeExpanded(item.id)
}

// 编辑按钮
const onItemEdit = (item: any) => {
  configData.value = item
  isEditPanel.value = true
}

// 删除按钮
const onItemDelete = (item: any) => {
  if (configData.value == item) configData.value = null
  paramsStore.deleteParamById(item.id)
  message.info(`删除变量${item.name}成功`, { duration: 3000, closable: true })
} 

// 修改变量名回调
const onChangeName = (value: any) => {
  const params = paramsStore.getUserParams
  const oldName = paramsStore.getNameById(configData.value.id)

  if (oldName == undefined) return

  if (value in params) {
    message.error("变量名已存在", { duration: 3000, closable: true })
    configData.value.name = oldName
  } else {
    params[value] = configData.value
    paramsStore.deleteParamByName(oldName)
  }
}


</script>

<style lang="scss" scoped>
@include go("modal-content") {
  display: flex;
  max-height: 500px;

  &-left {
    flex: 1 0 37%;

    .draggable-item {
      display: flex;
      align-items: center;
      border: 1px solid #f1f1f1;
      border-radius: 4px;
      margin: 10px 45px 10px 3px;
      padding: 3px 6px;
      background-color: v-bind('themeColor');
      column-gap: 4px;

      .right {
        margin-left: auto;
      }

      .collapse {
        position: relative;
        display: inline-block;
        width: 0;
        height: 0;
        border-top: 6px solid transparent;
        border-bottom: 6px solid transparent;
        border-left: 10px solid black;
        cursor: pointer;
        transition: transform 0.3s ease;
        margin: 0 4px;
      }

      .collapse.active {
        transform: rotate(90deg);
      }
    }

    .collapse-panel {
      margin: 0 30px;
    }
  }

  &-right {
    flex: 0 1 63%;
    height: 480px;
    margin: 0 20px;
    border: 1px solid #f1f1f1;
    border-radius: 10px;
    overflow-y: auto;

    .config-panel {
      margin: 10px 30px;
    }
  }
}
</style>
