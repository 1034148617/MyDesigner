import { ResultEnum } from '@/enums/httpEnum'

export enum ComponenctEnum {
  // 图表创建
  COMPONENT_HOME = '/component/home/:id(.*)*',
  COMPONENT_HOME_NAME = 'ComponentHome',
}

export enum PreviewEnum {
  //  图表预览
  COMPONENT_PREVIEW = '/component/preview/:id(.*)*',
  COMPONENT_PREVIEW_NAME = 'ComponentPreview',
}

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

  // 平台外
  BASE_HOME_ITEMS = '/store/items',
  BASE_HOME_ITEMS_NAME = 'Store-Items',

  // 平台
  BASE_HOME_PLATFORM = '/store/platform',
  BASE_HOME_PLATFORM_NAME = 'Store-Platform',

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
