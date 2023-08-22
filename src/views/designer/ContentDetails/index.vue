<template>
    <n-layout has-sider sider-placement="right">
        <n-layout-content>
            <!-- 画布 -->
            <content-canvas></content-canvas>
        </n-layout-content>
        <!-- 工具栏 -->
        <n-layout-sider collapse-mode="transform" :collapsed-width="0" :width="350" :collapsed="collapsed"
            :native-scrollbar="false" show-trigger="bar" @collapse="collapsedHandle" @expand="expandHandle">
            <content-box class="my-content-configurations my-boderbox" :show-top="false" :depth="2">
                <!-- 页面配置 -->
                <n-tabs v-if="!selectTarget" class="tabs-box" size="small" type="segment">
                    <n-tab-pane v-for="item in globalTabList" :key="item.key" :name="item.key" size="small"
                        display-directive="show:lazy">
                        <template #tab>
                            <n-space>
                                <span>{{ item.title }}</span>
                                <n-icon size="16" class="icon-position">
                                    <component :is="item.icon"></component>
                                </n-icon>
                            </n-space>
                        </template>
                        <component :is="item.render"></component>
                    </n-tab-pane>
                </n-tabs>
                <!-- 编辑 -->
                <n-tabs v-if="selectTarget" v-model:value="tabsSelect" class="tabs-box" size="small" type="segment">
                    <n-tab-pane v-for="item in componentTabList" :key="item.key"
                        :name="item.key" size="small" display-directive="show:lazy">
                        <template #tab>
                            <n-space>
                                <n-icon size="16" class="icon-position">
                                    <component :is="item.icon"></component>
                                </n-icon>
                                <span>{{ item.title }}</span>
                            </n-space>
                        </template>
                        <component :is="item.render"></component>
                    </n-tab-pane>
                </n-tabs>
            </content-box>
        </n-layout-sider>
    </n-layout>
</template>
  
<script setup lang="ts">
import { ref, toRefs, watch, computed } from 'vue'
import { loadAsyncComponent } from '@/utils'
import { ContentBox } from '../ContentBox/index'
import { TabsEnum } from './index.d'
import { icon } from '@/plugins'
import { useLayoutStore } from '@/store/modules/layoutStore/layoutStore'
import { LayoutStoreEnum } from '@/store/modules/layoutStore/layoutStore.d'
import { useEditStore } from '@/store/modules/editStore/editStore'

const { getDetails } = toRefs(useLayoutStore())
const { setItem } = useLayoutStore()
const editStore = useEditStore()
const { ConstructIcon, FlashIcon, DesktopOutlineIcon, LeafIcon, RocketIcon } = icon.ionicons5

const ContentCanvas = loadAsyncComponent(() => import('../ContentCanvas/index.vue'))
const CanvasPage = loadAsyncComponent(() => import('./components/CanvasPage/index.vue'))
const CanvasAttr = loadAsyncComponent(() => import('./components/CanvasAttr/index.vue'))
const CanvasStyle = loadAsyncComponent(() => import('./components/CanvasStyle/index.vue'))
// const CanvasData = loadAsyncComponent(() => import('./components/CanvasData/index.vue'))
const CanvasEvent = loadAsyncComponent(() => import('./components/CanvasEvent/index.vue'))

const collapsed = ref<boolean>(getDetails.value)
const tabsSelect = ref<TabsEnum>(TabsEnum.COMPONENT_ATTR_SETTING)

const collapsedHandle = () => {
    collapsed.value = true
    setItem(LayoutStoreEnum.DETAILS, true)
}

const expandHandle = () => {
    collapsed.value = false
    setItem(LayoutStoreEnum.DETAILS, false)
}

const selectTarget = computed(() => {
    const selectId = editStore.getTargetComponent.selectId

    if (!selectId.length) return undefined
    const target = editStore.getComponetById(selectId[selectId.length - 1])
    // tabsSelect.value = TabsEnum.COMPONENT_ATTR_SETTING

    return target
})

watch(getDetails, newData => {
    if (newData) {
        collapsedHandle()
    } else {
        expandHandle()
    }
})

// 页面设置
const globalTabList = [
    {
        key: TabsEnum.PAGE_SETTING,
        title: '页面配置',
        icon: DesktopOutlineIcon,
        render: CanvasPage
    }
]

// 组件设置
const componentTabList = [
    {
        key: TabsEnum.COMPONENT_ATTR_SETTING,
        title: '属性',
        icon: ConstructIcon,
        render: CanvasAttr
    },
    {
        key: TabsEnum.COMPONENT_STYLE_SETTING,
        title: '样式',
        icon: RocketIcon,
        render: CanvasStyle
    },
    // {
    //     key: TabsEnum.COMPONENT_DATA,
    //     title: '数据',
    //     icon: LeafIcon,
    //     render: CanvasData
    // },
    {
        key: TabsEnum.COMPONENT_EVENT,
        title: '事件',
        icon: FlashIcon,
        render: CanvasEvent
    }
]

</script>
  
<style lang="scss" scoped>
@include go(content-configurations) {
    overflow: hidden;

    .tabs-box {
        padding: 10px;

        .icon-position {
            padding-top: 2px;
        }
    }
}

@include go(boderbox) {
    border: 1px solid rgba(111, 111, 111, 0.3);
}
</style>
  