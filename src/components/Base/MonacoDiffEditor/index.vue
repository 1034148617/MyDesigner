<template>
    <div ref="el" class="my-editor-area" :style="{ width, height }"></div>
</template>
  
<script lang="ts" setup>
import { onMounted, watch, PropType } from 'vue'
import { useMonacoDiffEditor } from './index.hook'

const props = defineProps({
    width: {
        type: String as PropType<string>,
        default: '100%'
    },
    height: {
        type: String as PropType<string>,
        default: '90vh'
    },
    language: {
        type: String as PropType<string>,
        default: 'typescript'
    },
    originalValue: {
        type: String as PropType<string>,
        default: ''
    },
    modifiedValue: {
        type: String as PropType<string>,
        default: ''
    },
    editorOptions: {
        type: Object as PropType<object>,
        default: () => ({})
    }
})

const {
    el,
    getEditor,
    createEditor,
    updateModified,
    updateOriginalVal,
    switchReadOnly,
    getModififed,
    getOriginal
} = useMonacoDiffEditor(props.language)

onMounted(() => {
    const monacoEditor = createEditor(props.editorOptions)

    const { modifiedValue, originalValue } = props
    updateOriginalVal(originalValue)
    updateModified(modifiedValue)
})

/* 更改字体大小 */
watch(
    // @ts-ignore
    () => props.editorOptions?.fontSize,
    newValue => {
        getEditor()?.updateOptions({ fontSize: newValue })
    }
)

/* 只读 */
watch(
    // @ts-ignore
    () => props.editorOptions?.readOnly,
    newValue => {
        switchReadOnly(newValue)
    }
)

/* 更新编辑器内容 */
watch(
    () => props.modifiedValue,
    (val: string) => {
        val !== getModififed()?.getValue() && updateModified(val)
    }
)

watch(
    () => props.originalValue,
    (val: string) => {
        val !== getOriginal()?.getValue() && updateOriginalVal(val)
    }
)


</script>
  
<style lang="scss" scoped>
.my-editor-area {
    position: relative;
    border-radius: 4px;
    overflow: hidden;
    padding: 5px;
    padding-left: 0;
    box-sizing: border-box;
    background-color: rgba(0, 0, 0, 0);

    @include deep() {

        .margin,
        .monaco-editor,
        .inputarea.ime-input {
            background-color: rgba(0, 0, 0, 0);
        }

        .monaco-editor-background {
            background-color: rgba(0, 0, 0, 0);
            @include fetch-bg-color('filter-color-shallow');
        }

        .margin {
            @include fetch-bg-color('filter-color-shallow');
        }
    }
}
</style>
  