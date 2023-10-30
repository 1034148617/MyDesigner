<template>
  <n-button quaternary @click="changeTheme" title="切换主题">
    <n-icon size="20" :depth="1">
      <moon-icon v-if="designStore.darkTheme"></moon-icon>
      <sunny-icon v-else></sunny-icon>
    </n-icon>
  </n-button>
</template>

<script lang="ts" setup>
import { useDesignStore } from '@/store/modules/designStore/designStore'
import { setHtmlTheme } from '@/utils/style'
import { useToggle } from '@vueuse/shared'
import { useDark } from "@vueuse/core"
import { icon } from '@/plugins'

const { MoonIcon, SunnyIcon } = icon.ionicons5
const designStore = useDesignStore()

const isDark = useDark({
  // 存储到localStorage/sessionStorage中的Key 根据自己的需求更改
  storageKey: 'useDarkKEY',
  // 暗黑class名字
  valueDark: 'dark',
  // 高亮class名字
  valueLight: 'light',
})

const toggle = useToggle(isDark)

// 改变样式
const changeTheme = () => {
  designStore.changeTheme()
  setHtmlTheme()
  toggle()
}
</script>
