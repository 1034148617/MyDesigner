import { ResultEnum } from '@/enums/httpEnum'

// export enum EditEnum {
//   //  图表JSON编辑
//   COMPONENT_EDIT = '/component/edit/:id(.*)*',
//   COMPONENT_EDIT_NAME = 'ComponentEdit',
// }

export enum PageEnum {
  // 模拟登录(单点登录)
  BASE_LOGIN = '/login',
  BASE_LOGIN_NAME = 'Login',

  //重定向
  REDIRECT = '/redirect',
  REDIRECT_NAME = 'Redirect',
  RELOAD = '/reload',
  RELOAD_NAME = 'Reload',

  // 仓库
  BASE_HOME = '/store',
  BASE_HOME_NAME = 'Store',

  // 导航配置
  // ROUTER_HOME = '/navigate',
  ROUTER_HOME = '/router',
  // ROUTER_HOME_NAME = 'Navigate',
  ROUTER_HOME_NAME = 'Router',

  // 页面创建
  BASE_COMPONENT_HOME = '/design',
  COMPONENT_HOME = '/design/:id(.*)*',
  COMPONENT_HOME_NAME = 'ComponentHome',

  //  页面预览
  BASE_COMPONENT_PREVIEW = '/preview',
  COMPONENT_PREVIEW = '/preview/:id(.*)*',
  COMPONENT_PREVIEW_NAME = 'ComponentPreview',

  // 错误
  ERROR_PAGE_NAME_403 = 'ErrorPage403',
  ERROR_PAGE_NAME_404 = 'ErrorPage404',
  ERROR_PAGE_NAME_500 = 'ErrorPage500'
}

export const ErrorPageNameMap = new Map([
  [ResultEnum.NOT_FOUND, PageEnum.ERROR_PAGE_NAME_404],
  [ResultEnum.SERVER_FORBIDDEN, PageEnum.ERROR_PAGE_NAME_403],
  [ResultEnum.SERVER_ERROR, PageEnum.ERROR_PAGE_NAME_500]
])
