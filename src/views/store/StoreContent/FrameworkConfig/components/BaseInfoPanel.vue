<template>
  <n-form label-placement="left" label-width="auto" style="maxWidth: 540px;margin: 20px 40px;">
    <n-form-item label="*ID">
      <n-input v-model:value="baseInfo.fileID" placeholder="id" />
    </n-form-item>
    <n-form-item label="*名称">
      <n-input v-model:value="baseInfo.fileName" placeholder="name" />
    </n-form-item>
    <n-form-item label="标签">
      <n-dynamic-tags v-model:value="baseInfo.tags" />
    </n-form-item>
    <n-form-item label="所属模块ID">
      <n-input v-model:value="baseInfo.modultID" />
    </n-form-item>
    <n-form-item label="描述信息">
      <n-input v-model:value="baseInfo.description" type="textarea" :autosize="{minRows: 2}" />
    </n-form-item>
    <n-form-item label="访问模式">
      <n-select v-model:value="baseInfo.accessModel" :options="accessModelOptions" clearable />
    </n-form-item>
    <n-form-item label="访问超时地址">
      <n-input v-model:value="baseInfo.timeoutAddress" />
    </n-form-item>
    <n-form-item label="主题类型">
      <n-input v-model:value="baseInfo.theme" />
    </n-form-item>
    <n-form-item label=" ">
      <n-button style="width:200px;" @click="saveBaseInfo">保存</n-button>
    </n-form-item>
  </n-form>
</template>

<script lang='ts' setup>
import { ref, PropType, watch } from 'vue'
import { FrameworkFileType } from '../index.d'
import { accessModelEnum } from '../../DataSourceConfig/index.d'
import _ from 'lodash'

const props = defineProps({
  value: {
    type: Object as PropType<FrameworkFileType>,
    required: false,
    default: {
      baseInfo: {}
    }
  }
})

const baseInfo = ref()
watch(
  () => props.value.baseInfo,
  (newValue) => {
    baseInfo.value = Object.assign({
      fileID: '',
      fileName: '',
      tags: [],
      modultID: null,
      description: null,
      theme: null,
      accessModel: null,
      timeoutAddress: null
    }, newValue)
  },
  {
    immediate: true,
    deep: true
  }
)

// * 访问模式 
const accessModelOptions = [
  {
    label: '匿名访问',
    value: accessModelEnum.ANONYMITY
  },
  {
    label: '登录后访问',
    value: accessModelEnum.AFTERLOGIN
  },
  {
    label: '用户名密码访问',
    value: accessModelEnum.CIPHER
  },
  {
    label: 'TOKEN访问',
    value: accessModelEnum.TOKEN
  }
]

// * 保存基本信息
const saveBaseInfo = () => {
  if (!baseInfo.value.fileID) {
    window['$message'].error('文件ID不能为空')
    return
  }
  if (!baseInfo.value.fileName) {
    window['$message'].error('文件名不能为空')
    return
  }
  props.value.baseInfo = _.cloneDeep(baseInfo.value)
  window['$message'].info('保存成功')

  // TODO: 对更新时间和更新人字段的更新
}


</script>

<style></style>
