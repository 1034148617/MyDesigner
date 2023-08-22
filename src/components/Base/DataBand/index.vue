<template>
  <div>
    <n-popover trigger="hover">
      <template #trigger>
        <span class="data-band" :class="{ isBand: isDataBand }" @click.stop="toggleModal">
          <svg-icon class="data-namd-icon" name="DataBand" :size="iconSize" @click="showModal = true"></svg-icon>
        </span>
      </template>
      <span>变量绑定</span>
    </n-popover>

    <n-modal v-model:show="showModal" :mask-closable="false">
      <n-card :bordered="false" role="dialog" size="small" aria-modal="true" style="width: 1000px; height: 600px;">
        <template #header>
          <n-space>
            <n-text>变量绑定</n-text>
          </n-space>
        </template>
        <div class="my-data-modal">
          <div class="my-data-modal-left">
            <n-text class="title">变量列表</n-text>
            <div class="content">
              <div style="width:160px;">
                <n-menu v-model:value="activeKey" :options="menuOptions" />
              </div>
              <div style="width:240px;border-left: 1px solid #f1f1f1;">
                <n-list hoverable clickable :show-divider="false">
                  <n-list-item v-for="item, index in paramsList" :key="index" @dblclick="addParams(item)">
                    {{ item.name }}
                  </n-list-item>
                </n-list>
              </div>
            </div>
          </div>
          <div class="my-data-modal-right">
            <n-text class="title">变量</n-text>
            <div class="content">
              <n-space vertical>
                <div>
                  <monaco-editor language="javascript" v-model:modelValue="data" width="100%" height="220px" />
                </div>
                <div style="height:220px;overflow-y:auto;">
                  <n-h4>用法</n-h4>
                  <n-p>你可以通过点击左侧区域绑定变量或处理函数，当然你也可以在上方输入复杂的表达式。</n-p>
                  <n-p>输入框内默认支持变量，写法和 JS 写法完全一致。</n-p>
                  <n-p>数据源: state.xxx</n-p>
                  <n-p>字符串: "string"</n-p>
                  <n-p>数字: 123</n-p>
                  <n-p>布尔值: true / false</n-p>
                  <n-p>对象: {`{ name: "张三" }`}</n-p>
                  <n-p>数组: ["1", "2"]</n-p>
                  <n-p>空值: null</n-p>
                </div>
              </n-space>
            </div>
          </div>
        </div>
        <template #action>
          <n-space justify="space-between">
            <div class="my-flex-items-center">
              <n-button size="medium" @click="onClearBand">解除绑定</n-button>
            </div>
            <n-space>
              <n-button size="medium" @click="onConfrim">确定</n-button>  
              <n-button size="medium" @click="showModal = false">关闭</n-button>
            </n-space>
          </n-space>
        </template>
      </n-card>
    </n-modal>
  </div>
</template>

<script lang='ts' setup>
import { ref, computed, watch } from 'vue'
import { useMessage } from 'naive-ui'
import type { MenuOption } from 'naive-ui'
import _ from 'lodash'
import { MonacoEditor } from '@/components/Base/MonacoEditor'
import { useParamsStore } from '@/store/modules/paramsStore/paramsStore'
import { ParamsTypeEnum } from '@/store/modules/paramsStore/paramsStore.d'
const paramsStore = useParamsStore()
const message = useMessage()

const props = defineProps({
  value: {
    type: null,
    require: true
  },
  iconSize: {
    type: Number,
    require: false,
    default: 20
  }
})

const emit = defineEmits(['update:value'])
const data = ref("")

// 是否绑定数据
const isDataBand = ref(false)

// 控制模态框显示/隐藏
const showModal = ref(false)
const toggleModal = () => {
  showModal.value = true
} 

// 变量模式
const activeKey = ref(ParamsTypeEnum.VARIABLE)
const menuOptions: MenuOption[] = [
  {
    label: '变量',
    key: ParamsTypeEnum.VARIABLE
  },
  {
    label: '接口',
    key: ParamsTypeEnum.API
  },
  {
    label: '函数',
    key: ParamsTypeEnum.FUNCTION
  }
]

const paramsList = computed(() => {
  let params = null
  switch (activeKey.value) {
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

// 双击添加变量至编辑器
const addParams = (item: any) => {
  data.value += item.name
}

// 保存绑定
const codeEval = (code: string) => {
  const params = paramsStore.getGlobalParams
  
}

// 确认绑定 
const onConfrim = () => {
  emit('update:value', eval(data.value))
  showModal.value = false
  isDataBand.value = true

  message.info('变量保存成功', { duration: 3000, closable: true })
}

// 清空绑定
const onClearBand = () => {
  showModal.value = false
  isDataBand.value = false

  message.info('变量绑定解除成功', { duration: 3000, closable: true })
}

</script>

<style lang="scss" scoped>
@include go(data-modal) {
  display: flex;
  max-height: 500px;

  &-left {
    flex: 1 0 40%;
  }

  &-right {
    margin: 0 20px;
    flex: 1 0 56%;
  }

  .title {
    font-weight: bold;
  }

  .content {
    height: 450px;
    border: 1px solid #f1f1f1;
    border-radius: 10px;
    display: flex;
  }
}

.data-band {
  margin-left: 10px;
}

.data-band:hover {
  background-color: rgba(68, 182, 239, 0.524);
}

.isBand {
  background-color: rgba(0, 0, 255, 0.306);
}
</style>
