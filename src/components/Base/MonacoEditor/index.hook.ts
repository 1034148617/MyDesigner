import { ref, onBeforeUnmount, nextTick } from "vue"
import { useDesignStore } from "@/store/modules/designStore/designStore"
// import * as monaco from 'monaco-editor/esm/vs/editor/editor.api'
import * as monaco from "monaco-editor"
// @ts-ignore
import { language as sqlLanguage } from "monaco-editor/esm/vs/basic-languages/sql/sql.js"
// @ts-ignore
import { language as csharpLanguage } from "monaco-editor/esm/vs/basic-languages/csharp/csharp.js"

export const useMonacoEditor = (language = "javascript") => {
  const designStore = useDesignStore()

  let monacoEditor: monaco.editor.IStandaloneCodeEditor | null = null
  let initReadOnly = false
  const el = ref<HTMLElement | null>(null)

  // 格式化
  const onFormatDoc = async () => {
    await monacoEditor?.getAction("monacoEditor.action.formatDocument")?.run()
  }

  // 更新
  const updateVal = (val: string) => {
    nextTick(async () => {
      monacoEditor?.setValue(val)
      initReadOnly && monacoEditor?.updateOptions({ readOnly: false })
      await onFormatDoc()
      initReadOnly && monacoEditor?.updateOptions({ readOnly: true })
    })
  }

  // 注册SQL代码补全
  monaco.languages.registerCompletionItemProvider("sql", {
    provideCompletionItems: function () {
      let suggestions: any[] = []
      sqlLanguage.keywords.forEach((item: any) => {
        suggestions.push({
          label: item,
          kind: monaco.languages.CompletionItemKind.Keyword,
          insertText: item,
        })
      })
      sqlLanguage.operators.forEach((item: any) => {
        suggestions.push({
          label: item,
          kind: monaco.languages.CompletionItemKind.Operator,
          insertText: item,
        })
      })
      sqlLanguage.builtinFunctions.forEach((item: any) => {
        suggestions.push({
          label: item,
          kind: monaco.languages.CompletionItemKind.Function,
          insertText: item,
        })
      })
      sqlLanguage.builtinVariables.forEach((item: any) => {
        suggestions.push({
          label: item,
          kind: monaco.languages.CompletionItemKind.Variable,
          insertText: item,
        })
      })
      return {
        suggestions: suggestions,
      }
    },
  })

  // 注册C#代码补全
  monaco.languages.registerCompletionItemProvider("csharp", {
    provideCompletionItems: function () {
      let suggestions: any[] = []
      csharpLanguage.keywords.forEach((item: any) => {
        suggestions.push({
          label: item,
          kind: monaco.languages.CompletionItemKind.Keyword,
          insertText: item,
        })
      })
      csharpLanguage.operators.forEach((item: any) => {
        suggestions.push({
          label: item,
          kind: monaco.languages.CompletionItemKind.Operator,
          insertText: item,
        })
      })
      csharpLanguage.builtinFunctions.forEach((item: any) => {
        suggestions.push({
          label: item,
          kind: monaco.languages.CompletionItemKind.Function,
          insertText: item,
        })
      })
      csharpLanguage.builtinVariables.forEach((item: any) => {
        suggestions.push({
          label: item,
          kind: monaco.languages.CompletionItemKind.Variable,
          insertText: item,
        })
      })
      return {
        suggestions: suggestions,
      }
    },
  })

  // 获取主题
  const getTheme = () => {
    const files: any[] = []
    const module = import.meta.globEager("@/assets/themes/*.json")

    for (const key in module) {
      files.push(key.replace(/(\/src\/assets\/themes\/|\.json)/g, ""))
    }

    return files
  }

  // 切换主题
  const setTheme = (theme: string) => {
    if (['vs', 'vs-dark', 'hc-black'].indexOf(theme) > -1) {
      monaco.editor.setTheme(theme)
    } else {
      const jsonFilePath = new URL(
        `../../../assets/themes/${theme}.json`,
        import.meta.url
      ).href
      fetch(jsonFilePath)
        .then((data) => data.json())
        .then((data) => {
          monaco.editor.defineTheme(theme, data)
          monaco.editor.setTheme(theme)
        })
    }
  }

  // 创建实例
  const createEditor = (
    editorOption: monaco.editor.IStandaloneEditorConstructionOptions = {}
  ) => {
    if (!el.value) return
    const languageModel = monaco.editor.createModel("", language)
    initReadOnly = !!editorOption.readOnly
    // 创建
    monacoEditor = monaco.editor.create(el.value, {
      model: languageModel,
      // 是否启用预览图
      minimap: { enabled: false },
      // 圆角
      roundedSelection: true,
      // 主题
      theme: designStore.getDarkTheme ? "vs-dark" : "vs",
      // 主键
      multiCursorModifier: "ctrlCmd",
      // 滚动条
      scrollbar: {
        verticalScrollbarSize: 8,
        horizontalScrollbarSize: 8,
      },
      // 行号
      lineNumbers: "on",
      // tab大小
      tabSize: 2,
      //字体大小
      fontSize: 16,
      // 控制编辑器在用户键入、粘贴、移动或缩进行时是否应自动调整缩进
      autoIndent: "advanced",
      // 自动布局
      automaticLayout: true,
      // 代码折叠
      folding: true,
      // 括号配对
      bracketPairColorization: {
        enabled: true,
        independentColorPoolPerBracketType: true,
      },
      ...editorOption,
    })

    return monacoEditor
  }

  // 卸载
  onBeforeUnmount(() => {
    if (monacoEditor) monacoEditor.dispose()
  })

  return {
    el,
    updateVal,
    getEditor: () => monacoEditor,
    createEditor,
    onFormatDoc,
    getTheme,
    setTheme,
  }
}
