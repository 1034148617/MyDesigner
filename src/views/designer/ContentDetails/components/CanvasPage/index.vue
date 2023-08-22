<template>
    <div class="my-canvas-setting">
        <n-space vertical>
            <my-panel-item title="页面配置">
                <my-setting-item name="宽度" :isBind="true" v-model:value="canvasConfig.width">
                    <n-input-number size="small" v-model:value="canvasConfig.width" :validator="validator"></n-input-number>
                </my-setting-item>
                <my-setting-item name="高度" :isBind="true" v-model:value="canvasConfig.height">
                    <n-input-number size="small" v-model:value="canvasConfig.height"
                        :validator="validator"></n-input-number>
                </my-setting-item>
                <my-setting-item name="滚动条" :isBind="true" v-model:value="canvasConfig.scrollbar">
                    <n-select v-model:value="canvasConfig.scrollbar" :options="scroll_options"></n-select>
                </my-setting-item>
            </my-panel-item>
            <my-panel-item title="图层配置">
                <my-setting-item name="是否加载" :isBind="true" v-model:value="layersConfig.statue.load">
                    <n-switch v-model:value="layersConfig.statue.load" />
                </my-setting-item>
                <my-setting-item name="是否锁定" :isBind="true" v-model:value="layersConfig.statue.lock">
                    <n-switch v-model:value="layersConfig.statue.lock" />
                </my-setting-item>
                <my-setting-item name="是否隐藏" :isBind="true" v-model:value="layersConfig.statue.hide">
                    <n-switch v-model:value="layersConfig.statue.hide" />
                </my-setting-item>
                <my-setting-item name="是否启用" :isBind="true" v-model:value="layersConfig.statue.enable">
                    <n-switch v-model:value="layersConfig.statue.enable" />
                </my-setting-item>
            </my-panel-item>
        </n-space>
    </div>
</template>

<script lang='ts' setup>
import { ScrollBarsTypeEnum } from '@/enums/componentEnum'
import { MyPanelItem } from '@/components/Common/MyPanelItem'
import { MySettingItem } from '@/components/Common/MyPanelItem/components/MySettingItem'
import { useEditStore } from '@/store/modules/editStore/editStore'
const editStore = useEditStore()

const canvasConfig = editStore.getEditCanvasConfig  
const editCanvas = editStore.getEditCanvas
const layersConfig = editStore.getTargetLayers

// 滚动条下拉框
const scroll_options = (() => {
    const options: Array<any> = []
    Object.entries(ScrollBarsTypeEnum).forEach(item => {
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
