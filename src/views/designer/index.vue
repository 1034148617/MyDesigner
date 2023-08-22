<template>
    <div class="my-page">
        <n-layout>
            <layout-header>
                <template #left>
                    <header-left-btn></header-left-btn>
                </template>
                <template #center>
                    <header-title></header-title>
                </template>
                <template #ri-left>
                    <header-right-btn></header-right-btn>
                </template>
                <template #ri-right>
                    <params-config></params-config>
                    <setting></setting>
                    <theme-select></theme-select>
                </template>
            </layout-header>
            <n-layout-content content-style="overflow:hidden; display: flex">
                <!-- 组件面板 -->
                <content-panel></content-panel>
                <!-- 图层 -->
                <content-layers></content-layers>
                <!-- 画布 -->
                <content-details></content-details>
            </n-layout-content>
        </n-layout>
    </div>
</template>

<script lang="ts" setup>
import { LayoutHeader } from '@/layout/LayoutHeader'
import { loadAsyncComponent } from '@/utils'
import { useComInstall } from '@/hooks/useComInstall.hook'
import { ThemeSelect } from '@/components/Base/ThemeSelect'
import { ParamsConfig } from '@/components/Base/ParamsConfig'
import { Setting } from '@/components/Base/Setting'

// 初始化状态并且注册相应的组件
const { isShow } = useComInstall()

const HeaderLeftBtn = loadAsyncComponent(() => import('./ContentHeader/headerLeftBtn/index.vue'))
const HeaderTitle = loadAsyncComponent(() => import('./ContentHeader/headerTitle/index.vue'))
const HeaderRightBtn = loadAsyncComponent(() => import('./ContentHeader/headerRightBtn/index.vue'))
const ContentPanel = loadAsyncComponent(() => import('./ContentPanel/index.vue'))
const ContentLayers = loadAsyncComponent(() => import('./ContentLayers/index.vue'))
const ContentDetails = loadAsyncComponent(() => import('./ContentDetails/index.vue'))



</script>

<style lang="scss" scoped>
@include go("page") {
    height: 100vh;
    width: 100vw;
    overflow: hidden;
    // @include background-image("background-image");
}
</style>