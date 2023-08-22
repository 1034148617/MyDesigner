import { Router } from "vue-router"
import { PageEnum } from "@/enums/pageEnum"
import { getComponentID } from "@/utils"
import { useHttpStore } from "@/store/modules/httpStore/httpStore"

function componentUrlFormat(to: any) {
  const componentPath = "/component"
  const fullPath = to.fullPath
  const params = to.params

  if (!fullPath || !fullPath.startsWith(componentPath)) return

  if (typeof params["id"] == "string") {
    const newId = getComponentID()
    to.fullPath = `${to.fullPath}/${newId}`
    to.params["id"] = [newId]
  } else if (params["id"] && params["id"].length > 1) {
    to.params["id"] = [to.params["id"][0]]
  }
}

export function createRouterGuards(router: Router) {
  const httpStore = useHttpStore()

  router.beforeEach(async (to, from, next) => {
    const isErrorPage = router
      .getRoutes()
      .findIndex((item) => item.name === to.name)
    if (isErrorPage === -1) {
      next({ name: PageEnum.ERROR_PAGE_NAME_404 })
    }

    if (!httpStore.getLoginState) {
      if (to.name === PageEnum.BASE_LOGIN_NAME) {
        next()
        return 
      }
      next({ name: PageEnum.BASE_LOGIN_NAME })
      return 
    }

    componentUrlFormat(to)
    next()
  })

  router.afterEach((to, _, failure) => {
    document.title = (to?.meta?.title as string) || document.title

    const url = document.URL
    if (url.includes("/component")) {
      const id = to.params["id"][0]
      if (!url.includes(id)) {
        // @ts-ignore
        window.history.pushState(null, null, `${url}/${id}`)
      }
    }
  })

  router.onError((error) => {
    console.log(error, "路由错误")
  })
}
