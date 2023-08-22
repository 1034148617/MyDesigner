import { ref, toRefs } from 'vue'

// 布局
import { useLayoutStore } from '@/store/modules/layoutStore/layoutStore'
// 样式
import { useDesignStore } from '@/store/modules/designStore/designStore'

// 全局颜色
const designStore = useDesignStore()
const themeColor = ref(designStore.getAppTheme)

// 结构控制
const { setItem } = useLayoutStore()
const { getComponents } = toRefs(useLayoutStore())

export {
  themeColor,
  setItem,
  getComponents
}