import axios from "axios"
import { defineStore } from "pinia"
import { Buffer } from "buffer"
import { HttpStoreEnum, HttpStoreType } from "./httpStore.d"
import { getLocalStorage, setLocalStorage } from "@/utils"
import { StorageEnum } from "@/enums/storageEnum"
import { url_loadProjectList } from "@/api/api"

const { LOGIN_INFO_STORE } = StorageEnum

const storageHttp: Partial<HttpStoreType> = getLocalStorage(LOGIN_INFO_STORE)

export const useHttpStore = defineStore({
  id: "useHttpStore",
  state: (): HttpStoreType => ({
    userConfig: {
      userName: null, // 用户名
      isLogin: false, // 是否登录
      projects: [], // 用户权限内的项目信息
      selectProject: "", // 选择的项目（默认为空）
    },
    // sqlServerConfig: {
    //     user: 'sa',
    //     password: '123',
    //     server: '127.0.0.1\\CFSOFT',
    //     database: 'ksyy',
    //     // port: 1433,
    //     options: {
    //         encrypt: false, //使用windows azure，需要设置次配置。
    //         enableArithAbort: false
    //     },
    //     pool: {
    //         min: 0,
    //         max: 10,
    //         idleTimeoutMillis: 3000
    //     }
    // },
    sqlServerConfig: {
      api: "http://192.168.7.53/ksyy/api/577B16ADE06145969DF18C1E6B298B48.ds",
      sql: "select top 10 A0101 from A01",
    },
    ajaxConfig: {
      isConnect: false, // 是否获取Cookie
      baseUrl: "http://192.168.7.53/ksyy", // 根域名
      loginPage:
        "/Login/Standard/Default.aspx?loginaction=uilogin&encodepwdmode=base64", // 登录页url
      testDs: "4FC2491DF7C748368BD4AA7EC21BF219",
      username: "develop", // 用户名
      password: "123", // 密码
      timeout: 10000, // 超时时间
      isCrossDomain: true, // 是否允许跨域
    },
    ...storageHttp,
  }),
  getters: {
    getUserConfig(): any {
      return this.userConfig
    },
    getMssqlConfig(): any {
      return this.sqlServerConfig
    },
    getAjaxConfig(): any {
      return this.ajaxConfig
    },
    getLoginState(): boolean {
      return this.userConfig.isLogin
    },
  },
  actions: {
    setItem<T extends keyof HttpStoreType, K extends HttpStoreType[T]>(
      key: T,
      value: K
    ): void {
      this.$patch((state) => {
        state[key] = value
      })
      // 存储本地
      setLocalStorage(LOGIN_INFO_STORE, this.$state)
    },
    // 当ajax中关键信息修改后重置连接状态
    resetConnect(statue: boolean): void {
      this.ajaxConfig.isConnect = statue
    },
    // 通过登录页登录并为页面设置Cookie
    async setConnection(): Promise<any> {
      const username =
        "A" + Buffer.from(this.ajaxConfig.username).toString("base64")
      const password =
        "A" + Buffer.from(this.ajaxConfig.password).toString("base64")
      const instance = axios.create({
        baseURL: this.ajaxConfig.baseUrl,
        withCredentials: true,
        //设置axios为form-data
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        transformRequest: [
          function (data) {
            let ret = ""
            for (let it in data) {
              ret +=
                encodeURIComponent(it) +
                "=" +
                encodeURIComponent(data[it]) +
                "&"
            }
            return ret
          },
        ],
      })
      return instance.post(this.ajaxConfig.loginPage, {
        txtUser: username,
        txtPwd: password,
      })
    },
    // 登录页登录后加载用户信息
    async setUserConfig(username: string): Promise<any> {
      this.userConfig.userName = username
      this.userConfig.isLogin = true

      // 加载项目列表
      const api = url_loadProjectList + `?Username=${username}`
      const res = await axios.get(api)
      this.userConfig.projects = res.data

      // 更新缓存
      this.setItem(
        HttpStoreEnum.USER_CONFIG,
        Object.assign(this.userConfig, {
          userName: username,
          isLogin: true,
          projects: res.data,
        })
      )
    },
    setSelectProject(projectId: string): void {
      this.userConfig.selectProject = projectId
      // 更新缓存
      this.setItem(
        HttpStoreEnum.USER_CONFIG,
        Object.assign(this.userConfig, {
            selectProject: projectId,
        })
      )
    },
  },
})
