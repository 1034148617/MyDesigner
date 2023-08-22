<template>
    <n-space class="header-title" :size="25">
        <n-space>
            <n-tooltip v-for="item in btnList" :key="item.key" placement="bottom" trigger="hover">
                <template #trigger>
                    <n-button size="small" ghost @click="clickHandle(item)">
                        <component :is="item.icon"></component>
                    </n-button>
                </template>
                <span>{{ item.title }}</span>
            </n-tooltip>

            <n-input-number id="widthControl" v-model:value="editStore.getEditCanvasConfig.width" size="small"
                style="width: 140px;" :min="50" clearable>
                <!-- <template #suffix>px</template> -->
            </n-input-number>
        </n-space>
    </n-space>
</template>

<script setup lang="ts">
import { toRefs, Ref, reactive, ref } from 'vue'
import { renderIcon } from '@/utils'
import { icon } from '@/plugins'
import { useLayoutStore } from '@/store/modules/layoutStore/layoutStore'
import { DeviceTypeEnum, LayoutStoreEnum, } from '@/store/modules/layoutStore/layoutStore.d'
import { useEditStore } from '@/store/modules/editStore/editStore';
import { EditCanvasConfigEnum } from '@/store/modules/editStore/editStore.d';
const { DesktopOutlineIcon, PhonePortraitOutlineIcon, TabletLandscapeOutlineIcon } = icon.ionicons5

const { setItem } = useLayoutStore()
const { getDeviceType } = toRefs(useLayoutStore())

const editStore = useEditStore()

interface ItemType<T> {
    key: T
    title: string
    icon: any
}

const btnList = reactive<ItemType<DeviceTypeEnum>[]>([
    {
        key: DeviceTypeEnum.COMPUTER,
        title: '电脑',
        icon: renderIcon(DesktopOutlineIcon)
    },
    {
        key: DeviceTypeEnum.PAID,
        title: '平板',
        icon: renderIcon(TabletLandscapeOutlineIcon)
    },
    {
        key: DeviceTypeEnum.PHONE,
        title: '手机',
        icon: renderIcon(PhonePortraitOutlineIcon)
    }
])

// 设备类型处理
const clickHandle = (item: ItemType<DeviceTypeEnum>) => {
    const device_width = {
        "computer": 1000,
        "paid": 800,
        "phone": 400
    }

    setItem(LayoutStoreEnum.DEVICE_TYPE, item.key)

    editStore.setEditCanvasConfig(EditCanvasConfigEnum.WIDTH, device_width[item.key])
}



</script>