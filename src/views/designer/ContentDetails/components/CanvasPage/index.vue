<template>
    <div class="my-canvas-setting">
        <n-space vertical>
            <n-card title="页面配置" size="small">
                <n-form :label-width="60" size="small" label-placement="left" label-align="left">
                    <n-form-item label="宽度">
                        <n-input-number size="small" v-model:value="canvasConfig.width" :validator="validator"></n-input-number>
                    </n-form-item>
                    <n-form-item label="高度">
                        <n-input-number size="small" v-model:value="canvasConfig.height" :validator="validator"></n-input-number>
                    </n-form-item>
                    <n-form-item label="滚动条">
                        <n-select v-model:value="canvasConfig.scrollbar" :options="scroll_options"></n-select>
                    </n-form-item>
                </n-form>
            </n-card>
            <n-card title="图层配置" size="small">
                <n-form :label-width="80" size="small" label-placement="left" label-align="left">
                    <n-form-item label="是否加载">
                        <n-switch v-model:value="layersConfig.statue.load" />
                    </n-form-item>
                    <n-form-item label="是否锁定">
                        <n-switch v-model:value="layersConfig.statue.lock" />
                    </n-form-item>
                    <n-form-item label="是否隐藏">
                        <n-switch v-model:value="layersConfig.statue.hide" />
                    </n-form-item>
                    <n-form-item label="是否启用">
                        <n-switch v-model:value="layersConfig.statue.enable" />
                    </n-form-item>
                </n-form>
            </n-card>
        </n-space>
    </div>
</template>

<script lang='ts' setup>
import { ref } from "vue"
import { ScrollBarsTypeEnum } from '@/enums/componentEnum'
import { useEditStore } from '@/store/modules/editStore/editStore';

const editStore = useEditStore()
const canvasConfig = editStore.getEditCanvasConfig
const editCanvas = editStore.getEditCanvas
const layersConfig = editStore.getTargetLayers

// 滚动条下拉框
const scroll_options = (() => {
    const options: Array<any> = []
    Object.entries(ScrollBarsTypeEnum).forEach(item=>{
        options.push({
            label: item[1],
            value: item[1]
        })
    })
    return options
})()

// 画布尺寸规则
const validator = (x: number) => x > 50

</script>

<style lang="scss" scoped>
$uploadWidth: 251px;
$uploadHeight: 193px;

@include go(canvas-setting) {
    padding-top: 10px;
}
</style>
