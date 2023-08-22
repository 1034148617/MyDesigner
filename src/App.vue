<template>
  <n-config-provider :theme="darkTheme" :hljs="hljsTheme" :locale="zhCN" :date-locale="dateZhCN"
    :theme-overrides="overridesTheme">
    <app-provider>
      <router-view></router-view>
    </app-provider>
  </n-config-provider>
</template>

<script lang="ts" setup>
import { NConfigProvider, zhCN, dateZhCN } from 'naive-ui'
import { useDarkThemeHook, useThemeOverridesHook, useCode } from '@/hooks'
import { AppProvider } from '@/components/Base/AppProvider'

// 暗黑主题
const darkTheme = useDarkThemeHook()

// 主题配置
const overridesTheme = useThemeOverridesHook()

// 代码主题
const hljsTheme = useCode()

</script>
