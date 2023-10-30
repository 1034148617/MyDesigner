<template>
  <n-layout class="my-script-panel">
    <n-layout-header class="my-script-panel-header">
      <n-space>
        <el-button @click="saveScript">保存</el-button>
        <!-- TODO: 保存至后端平台提供预览效果 -->
        <el-button>预览</el-button>
        <el-divider direction="vertical" />
        <el-button @click="editorRef.editorFind()">查找</el-button>
        <!-- <el-button>替换</el-button> -->
        <el-button @click="editorRef.undo()"><el-icon><Back /></el-icon></el-button>
        <el-button @click="editorRef.redo()"><el-icon><Right /></el-icon></el-button>
        <el-divider direction="vertical" />
        <el-select v-model="selectFontSize" class="m-2" style="width: 80px;" @change="updateFontSize">
          <el-option v-for="item in fontSizes" :key="item" :value="item" :label="`${item}px`" />
        </el-select>
        <el-select v-model="selectTheme" class="m-2" placeholder="主题" @change="setTheme">
          <el-option
            v-for="item in theme"
            :key="item"
            :label="item"
            :value="item"
          />
        </el-select>
      </n-space>
    </n-layout-header>
    <n-layout-content class="my-script-panel-content">
      <n-layout has-sider>
        <n-layout-content>
          <monaco-editor ref="editorRef" v-model:modelValue="editorContent" height="780px" :language="editorLanguage"
            :editor-options="editorOptions" />
        </n-layout-content>
        <n-layout-sider>
          可用参数
          <n-list>
            <n-list-item v-for="item in value.paramList" key="item.paramID">
              {{ '@' + item.paramID + ' ' + item.paramName }}
            </n-list-item>
          </n-list>
        </n-layout-sider>
      </n-layout>
    </n-layout-content>
  </n-layout>
</template>

<script lang='ts' setup>
import { ref, PropType } from 'vue'
import { DataSourceFileType, dsTypeEnum } from '../index.d'
import { MonacoEditor } from '@/components/Base/MonacoEditor'
import { useMonacoEditor } from '@/components/Base/MonacoEditor/index.hook'

const props = defineProps({
  value: {
    type: Object as PropType<DataSourceFileType>,
    required: true
  }
})

const editorRef = ref()
const editorContent = ref(props.value.script || '')
const editorLanguage = ref(props.value.baseInfo.dsType == dsTypeEnum.CSHARP_MODEL ? 'csharp' : 'sql')
const editorOptions = ref({ fontSize: 14 })

// 编辑器主题
const { getTheme, setTheme } = useMonacoEditor()
const theme = ['vs', 'vs-dark', 'hc-black'].concat(getTheme())
const selectTheme = ref('vs')


// 更改字体大小
const fontSizes = ['10', '12', '14', '16', '18', '20', '24']
const selectFontSize = ref('14px')
const updateFontSize = (value: any) => {
  editorOptions.value.fontSize = value
}

/* 保存脚本 */
const saveScript = () => {
  props.value.script = editorContent.value
  window['$message'].info('保存成功', {
    duration: 3000,
    closable: true
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
</style>

