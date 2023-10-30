import { createApp } from "vue"
import App from "./App.vue"

import { svgIcon } from "@/components/Base/SvgIcon"
import { setupStore } from "@/store"
import router, { setupRouter } from "@/router"
import { setupComponents, setupNaive, setupElementPlus } from "@/plugins"
import { setHtmlTheme } from "@/utils"

async function init() {
  const app = createApp(App)

  // 注册全局常用的 naive-ui 组件
  setupNaive(app)

  // 注册element-plus
  setupElementPlus(app)

  // 注册自定义组件
  setupComponents(app)

  // 注册svg组件
  app.component("svg-icon", svgIcon)

  // 挂载状态管理
  setupStore(app)

  // 挂载路由
  setupRouter(app)

  // 路由准备就绪后挂载APP实例
  await router.isReady()

  // 处理主题色
  setHtmlTheme()

  // 挂载到页面
  app.mount("#app")

  // 挂载到 window
  window["$vue"] = app
}

void init()
