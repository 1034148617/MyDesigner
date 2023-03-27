<template>
    <n-space class="header-left-btn" :size="25">
        <n-space>
            <!-- 模块展示按钮 -->
            <n-tooltip v-for="item in btnList" :key="item.key" placement="bottom" trigger="hover">
                <template #trigger>
                    <n-button size="small" ghost :type="styleHandle(item)" @click="clickHandle(item)">
                        <component :is="item.icon"></component>
                    </n-button>
                </template>
                <span>{{ item.title }}</span>
            </n-tooltip>

            <n-divider vertical />

            <!-- 历史记录按钮 -->

        </n-space>
    </n-space>
</template>
  
<script setup lang="ts">
import { toRefs, Ref, reactive } from 'vue'
import { renderIcon } from '@/utils'
import { icon } from '@/plugins'

import { useLayoutStore } from '@/store/modules/layoutStore/layoutStore'
import { LayoutStoreEnum } from '@/store/modules/layoutStore/layoutStore.d'

const { LayersIcon, BarChartIcon, PrismIcon} = icon.ionicons5
const { setItem } = useLayoutStore()
const { getLayers, getComponents, getDetails } = toRefs(useLayoutStore())

interface ItemType<T> {
    key: T
    select: Ref<boolean> | boolean
    title: string
    icon: any
}

const btnList = reactive<ItemType<LayoutStoreEnum>[]>([
    {
        key: LayoutStoreEnum.COMPONENTS,
        select: getComponents,
        title: '组件库',
        icon: renderIcon(BarChartIcon)
    },
    {
        key: LayoutStoreEnum.LAYERS,
        select: getLayers,
        title: '图层控制',
        icon: renderIcon(LayersIcon)
    },
    {
        key: LayoutStoreEnum.DETAILS,
        select: getDetails,
        title: '详情设置',
        icon: renderIcon(PrismIcon)
    }
])


// store 描述的是展示的值，所以和 ContentConfigurations 的 collapsed 是相反的
const styleHandle = (item: ItemType<LayoutStoreEnum>) => {
    if (item.key === LayoutStoreEnum.DETAILS) {
        return item.select ? '' : 'primary'
    }
    return item.select ? 'primary' : ''
}

// 布局处理
const clickHandle = (item: ItemType<LayoutStoreEnum>) => {
    setItem(item.key, !item.select)
}


</script>

<style lang="scss" scoped>
.header-left-btn {
    margin-left: -37px;
}
</style>
  