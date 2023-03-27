import { shallowReactive, ref } from 'vue'
import { icon } from '@/plugins'
import { renderLang, renderIcon } from '@/utils'
import { themeColor, setItem, getComponents } from './useLayout.hook'
import { ComponentTypeEnum, ComponentTypeNameEnum, ComponentType } from '@/packages/index.d'
// 组件
import { usePackagesStore } from '@/store/modules/packageStore/packageStore'
import { LayoutStoreEnum } from '@/store/modules/layoutStore/layoutStore.d'

// 图标
const { BarChartIcon } = icon.ionicons5
const {
  TableSplitIcon,
  RoadmapIcon,
  SpellCheckIcon,
  GraphicalDataFlowIcon,
} = icon.carbon

export type MenuOptionsType = {
  key: string
  icon: ReturnType<typeof renderIcon>
  label: ReturnType<typeof renderLang>
  list: ComponentType
}

const { getPackagesList } = usePackagesStore()
const menuOptions: MenuOptionsType[] = []

const packagesListObj = {
  [ComponentTypeEnum.COMMON]: {
    icon: renderIcon(RoadmapIcon),
    label: ComponentTypeNameEnum.COMMON,
  },
  [ComponentTypeEnum.DATA]: {
    icon: renderIcon(SpellCheckIcon),
    label: ComponentTypeNameEnum.DATA,
  },
  [ComponentTypeEnum.DISPLAY]: {
    icon: renderIcon(TableSplitIcon),
    label: ComponentTypeNameEnum.DISPLAY,
  },
  [ComponentTypeEnum.LAYOUT]: {
    icon: renderIcon(GraphicalDataFlowIcon),
    label: ComponentTypeNameEnum.LAYOUT,
  },
  [ComponentTypeEnum.STANDARD]: {
    icon: renderIcon(GraphicalDataFlowIcon),
    label: ComponentTypeNameEnum.STANDARD,
  }
}

// 处理列表
const handlePackagesList = () => {
  for (const val in getPackagesList) {
    menuOptions.push({
      key: val,
      // @ts-ignore
      icon: packagesListObj[val].icon,
      // @ts-ignore
      label: packagesListObj[val].label,
      // @ts-ignore
      list: getPackagesList[val],
    })
  }
}
handlePackagesList()

// 记录选中值
let beforeSelect: string = menuOptions[0]['key']
const selectValue = ref<string>(menuOptions[0]['key'])

// 选中的对象值
const selectOptions = ref(menuOptions[0])

// 点击 item
const clickItemHandle = (key: string, item: any) => {
  selectOptions.value = item
  // 处理折叠
  if (beforeSelect === key) {
    setItem(LayoutStoreEnum.COMPONENTS, !getComponents.value)
  } else {
    setItem(LayoutStoreEnum.COMPONENTS, true)
  }
  beforeSelect = key
}

export {
  getComponents,
  BarChartIcon,
  themeColor,
  selectOptions,
  selectValue,
  clickItemHandle,
  menuOptions,
}
