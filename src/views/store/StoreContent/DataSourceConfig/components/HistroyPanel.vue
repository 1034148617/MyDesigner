<template>
  <n-layout class="my-script-panel">
    <n-layout-header class="my-script-panel-header">
      <n-space>
        <span style="margin-left:10px;line-height: 32px;">源版本:</span>
        <el-select v-model="originalVersion" value-key="index" class="m-2" style="width: 280px;" placeholder="请选择源版本"
          @change="updateOriginal">
          <el-option v-for="item in history.versions" :key="item" :value="item" :label="getFormatVersionStr(item)" />
        </el-select>
        <span style="margin-left:10px;line-height: 32px;">目标版本:</span>
        <el-select v-model="modifiedVersion" value-key="index" class="m-2" style="width: 280px;" placeholder="请选择目标版本"
          @change="updateModified">
          <el-option value="0" label="当前版本"></el-option>
          <el-option v-for="item in history.versions" :key="item.index" :value="item.index"
            :label="getFormatVersionStr(item)" />
        </el-select>
        <el-dropdown trigger="click">
          <el-button :icon="Setting" />
          <template #dropdown>
            <el-dropdown-menu>
              <n-checkbox v-model:checked="isAll" @update:checked="handleChangeAll">全部</n-checkbox>
              <n-checkbox v-model:checked="checkedItems.base">基本信息</n-checkbox>
              <n-checkbox v-model:checked="checkedItems.params">参数列表</n-checkbox>
              <n-checkbox v-model:checked="checkedItems.script">脚本</n-checkbox>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
        <el-divider direction="vertical" />
        <el-button @click="release">保存</el-button>
        <el-button @click="restore">还原</el-button>
        <el-divider direction="vertical" />
        <el-select v-model="selectFontSize" class="m-2" style="width: 80px;" @change="updateFontSize">
          <el-option v-for="item in fontSizes" :key="item" :value="item" :label="`${item}px`" />
        </el-select>
        <!-- <n-switch v-model:value="editorOptions.readOnly" :disabled="isAllowChange" style="margin-top:7px;">
          <template #checked>只读</template>
          <template #unchecked>编辑</template>
        </n-switch> -->
      </n-space>
    </n-layout-header>
    <n-layout-content class="my-script-panel-content">
      <monaco-diff-editor height="780px" :language="editorLanguage" :editor-options="editorOptions"
        :original-value="original" :modified-value="modified" />
    </n-layout-content>
  </n-layout>
</template>

<script lang='ts' setup>
import { ref, PropType, watch, h } from 'vue'
import { Setting } from '@element-plus/icons-vue'
import { DataSourceFileType, versionType } from '../index.d'
import { MonacoDiffEditor } from '@/components/Base/MonacoDiffEditor'
import { useHttpStore } from '@/store/modules/httpStore/httpStore'
import { getTime, formatParamStr } from '@/utils'
import _ from 'lodash'

const props = defineProps({
  value: {
    type: Object as PropType<DataSourceFileType>,
    required: true
  }
})

const { baseInfo, paramList, script, history } = props.value
const editorLanguage = ref('json')
const editorOptions = ref({ fontSize: 14, readOnly: true })
// const isAllowChange = ref(false)      // 是否允许修改只读状态（仅操作当前版本允许）

/* 用于存放比对的版本解析的字符串 */
const originalVersion = ref<versionType>()
const modifiedVersion = ref<versionType | string>()
const original = ref<string>('')
const modified = ref<string>('')

/* 更新源版本编辑器 */
const updateOriginal = (value: any) => {
  original.value = formatParamStr(checkedItems.value, value)
}

/* 更新目标版本编辑器 */
const updateModified = (value: any) => {
  if (value == '0') {
    modified.value = formatParamStr(checkedItems.value, getNowVersion())
  } else {
    history.versions.forEach(item => {
      if (item.index == value) {
        modified.value = formatParamStr(checkedItems.value, item)
      }
    })
  }
}

/* 更改字体大小 */
const fontSizes = ['10', '12', '14', '16', '18', '20', '24']
const selectFontSize = ref('14px')
const updateFontSize = (value: any) => {
  editorOptions.value.fontSize = value
}

/* 选项复选框 */
const checkedItems = ref({
  base: true,
  params: true,
  script: true
})
const isAll = ref(true)

const handleChangeAll = (isChecked: boolean) => {
  checkedItems.value.base = isChecked
  checkedItems.value.params = isChecked
  checkedItems.value.script = isChecked
}

watch(
  () => [checkedItems.value.base, checkedItems.value.params, checkedItems.value.script],
  (newVals) => {
    isAll.value = newVals.every(v => v)
    updateOriginal(originalVersion.value)
    updateModified(modifiedVersion.value)
  }
)

/* 获取当前版本 */
const getNowVersion = (version?: string): versionType => {
  const versions = history.versions
  const ver = version || ((versions.length + 1).toString() + '.0')
  return {
    index: versions.length + 1,
    version: ver,
    storageTime: new Date(),
    operator: useHttpStore().getUserConfig.userName,
    baseInfo: baseInfo,
    paramList: _.cloneDeep(paramList),
    script: script
  }
}

/* 发布当前版本 */
const release = (version?: string) => {
  history.versions.push(getNowVersion(version))
  history.targetVersion = history.versions.length - 1
  window['$message'].info('发布当前版本成功')
}

/* 获取版本格式化字符串 */
const getFormatVersionStr = (version: versionType) => {
  return ` ${version.index} - ${getTime('yyyy-MM-dd HH:mm:ss', version.storageTime)} - ${version.operator} `
}

/* 还原版本 */
const restore = () => {
  window['$dialog'].info({
    title: '还原',
    content: () => {
      return h('div', [
        h('label', '选择版本'),
        h('select', {})  
    ])},
    positiveText: '确定',
    negativeText: '取消',
    onPositiveClick: () => {
      window['$message'].info('还原成功')
    }
  })
}

</script>

<style lang="scss" scoped>
@include go('script-panel') {
  padding: 4px;

  &-header {
    display: flex;
  }

  &-content {
    padding-top: 8px;
  }

}

.el-dropdown-menu {
  margin: 5px;
}
</style>

