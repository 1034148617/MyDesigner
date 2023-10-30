import { ref, onBeforeUnmount, nextTick } from "vue"
import { useDesignStore } from "@/store/modules/designStore/designStore"
import * as monaco from "monaco-editor"

export const useMonacoDiffEditor = (language = "javascript") => {
  let monacoEditor: monaco.editor.IStandaloneDiffEditor | null = null
  let modifiedEditor: monaco.editor.IStandaloneCodeEditor | null = null
  let originalEditor: monaco.editor.IStandaloneCodeEditor | null = null
  let initReadOnly = false
  const el = ref<HTMLElement | null>(null)

  /* 创建实例 */
  const createEditor = (
    editorOption: monaco.editor.IStandaloneDiffEditorConstructionOptions = {}
  ) => {
    if (!el.value) return
    initReadOnly = !!editorOption.readOnly
    monacoEditor = monaco.editor.createDiffEditor(el.value, {
      // 是否启用预览图
      minimap: { enabled: false },
      // 圆角
      roundedSelection: true,
      // 主题
      theme: useDesignStore().getDarkTheme ? "vs-dark" : "vs",
      // 主键
      multiCursorModifier: "ctrlCmd",
      // 滚动条
      scrollbar: {
        verticalScrollbarSize: 8,
        horizontalScrollbarSize: 8,
      },
      // 行号
      lineNumbers: "on",
      //字体大小
      fontSize: 16,
      // 控制编辑器在用户键入、粘贴、移动或缩进行时是否应自动调整缩进
      autoIndent: "advanced",
      // 自动布局
      automaticLayout: true,
      // 输入格式化
      formatOnType: true,
      // 代码折叠
      folding: true,
      // 括号配对
      bracketPairColorization: {
        enabled: true,
        independentColorPoolPerBracketType: true,
      },
      ...editorOption,
    })

    //设置original和modified
    monacoEditor.setModel(
      {       
        original: monaco.editor.createModel('', language),
        modified: monaco.editor.createModel('', language),
      }
    )

    modifiedEditor = monacoEditor.getModifiedEditor()
    originalEditor = monacoEditor.getOriginalEditor()

    return monacoEditor
  }

  /* 更新 */
  const updateModified = (val: string) => {
    nextTick(async () => {
      modifiedEditor?.setValue(val)
      initReadOnly && modifiedEditor?.updateOptions({ readOnly: false })
      await modifiedEditor?.getAction("editor.action.formatDocument")?.run()
      initReadOnly && modifiedEditor?.updateOptions({ readOnly: true })
    })
  }

  const updateOriginalVal = (val: string) => {
    nextTick(async () => {
      originalEditor?.setValue(val)
      initReadOnly && originalEditor?.updateOptions({ readOnly: false })
      await originalEditor?.getAction("editor.action.formatDocument")?.run()
      initReadOnly && originalEditor?.updateOptions({ readOnly: true })
    })
  }

  /* 是否只读 */
  const switchReadOnly = (isReadOnly: boolean) => {
    initReadOnly = isReadOnly
    monacoEditor?.updateOptions({
      readOnly: isReadOnly
    })
  }

  /* 卸载 */
  onBeforeUnmount(() => {
    if (monacoEditor) monacoEditor.dispose()
  })


  return {
    el,
    getEditor: () => monacoEditor,
    getModififed: () => modifiedEditor,
    getOriginal: () => originalEditor,
    createEditor,
    switchReadOnly,
    updateModified,
    updateOriginalVal
  }
}
