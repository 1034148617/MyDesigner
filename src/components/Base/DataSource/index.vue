<template>
  <my-panel-item :title="label" :value="value">
    <n-space vertical>
      <n-text>数据服务ID</n-text>
      <n-input v-model:value="value.dsId" type="text" placeholder="data-service id" clearable />
      <n-text>参数配置</n-text>
      <my-dynamic-input v-model:data="value.params" content="新增参数" :default="onCreate()">
        <template #default="{ item }">
          <n-input v-model:value="item.key" type="text" />
          <n-input v-model:value="item.value" type="text" />
        </template>
      </my-dynamic-input>
      <n-text>是否自动加载</n-text>
      <n-switch v-model:value="value.isAutoLoad"></n-switch>
    </n-space>
  </my-panel-item>
</template>

<script lang='ts' setup>
import { ref, computed, PropType } from 'vue'
import { useMessage } from 'naive-ui'
import { MyPanelItem } from '@/components/Common/MyPanelItem'
import { MyDynamicInput } from '@/components/Common/MyDynamicInput'
import { useDesignStore } from '@/store/modules/designStore/designStore'
import { useHttpStore } from '@/store/modules/httpStore/httpStore'
import { DataSrouceType } from '@/store/modules/paramsStore/paramsStore.d'
const designStore = useDesignStore()
const httpStore = useHttpStore
const message = useMessage()

const props = defineProps({
  value: {
    type: Object as PropType<DataSrouceType>,
    require: false,
    default: {
      dsId: "",
      params: [],
      isAutoLoad: true
    }
  },
  label: {
    type: String,
    reuqire: false,
    default: "数据服务"
  }
})

// 数据服务参数动态录入
const onCreate = () => {
  return {
    key: '',
    value: ''
  }
}


</script>

<style lang="scss" scoped></style>
