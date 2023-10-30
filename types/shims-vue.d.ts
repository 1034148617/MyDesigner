declare module "*.vue" {
  import { DefineComponent } from "vue"
  const component: DefineComponent<{}, {}, any>
  export default component
}

declare module "lodash/*"
declare module "dom-helpers"
// declare module 'mssql'
declare module "qs"
declare module "fs-extra"
// declare module 'monaco-editor'
// declare module "browserify-fs"
