import { ref } from 'vue'
import { icon } from '@/plugins'
import { renderIcon } from '@/utils'
import { StorePanelTypeEnum, StorePanelNameEnum } from '../index.d'

// 图标
const { SearchIcon, FolderIcon } = icon.ionicons5
const { DevicesIcon } = icon.carbon

export type MenuOptionsType = {
    key: string
    icon: ReturnType<typeof renderIcon>
    label: string
}

// 左侧导航栏
const menuOptions: MenuOptionsType[] = [
    {
        key: StorePanelTypeEnum.PROJECT,
        icon: renderIcon(DevicesIcon),
        label: StorePanelNameEnum.PROJECT
    },
    {
        key: StorePanelTypeEnum.FILES,
        icon: renderIcon(FolderIcon),
        label: StorePanelNameEnum.FILES
    },
    {
        key: StorePanelTypeEnum.SEARCH,
        icon: renderIcon(SearchIcon),
        label: StorePanelNameEnum.SEARCH
    }
]


// 记录选中值
const selectValue = ref<string>(menuOptions[1]['key'])
const currentPanel = ref<string>('FilesPanel')

// 选中的对象值
const selectOptions = ref(menuOptions[0])

// 点击 item
const clickItemHandle = (key: string, item: any) => {
    selectOptions.value = item

    // 切换路由
    switch (selectOptions.value.key) {
        case StorePanelTypeEnum.FILES: currentPanel.value = 'FilesPanel'; break;
        case StorePanelTypeEnum.SEARCH: currentPanel.value = 'SearchPanel'; break;
        case StorePanelTypeEnum.PROJECT: currentPanel.value = 'ProjectPanel'; break;
    }
}

export {
    selectOptions,
    selectValue,
    currentPanel,
    clickItemHandle,
    menuOptions,
}
