import { h } from "vue"
import { NIcon } from "naive-ui"
import { excludeParseEventKeyList } from "@/enums/eventEnum"
import {
  CreateComponentType,
  CreateComponentGroupType,
} from "@/packages/index.d"
import { WinKeyboard } from "@/enums/editPageEnum"
import { scriptTypeEnum, scriptTypeNameEnum } from "@/views/store/StoreContent/FrameworkConfig/index.d"

/**
 * * 生成一个不重复的ID
 * @param { Number } randomLength
 */
export const getUUID = (randomLength = 10) => {
  return Number(
    Math.random().toString().substring(2, randomLength) + Date.now()
  ).toString(36)
}

/**
 * * 随机生成一个数字字符串
 */
export const getRandomNum = (length = 12) => {
  let random = Math.random()
  random *= 100000000000
  random = Math.floor(random)
  return random.toString().padStart(12, "0")
}

/**
 * 格式化时间
 * @param mf 格式化字符串
 * @param time 时间
 * @returns 
 */
export function getTime(mf: string, time?: Date) {
  //@ts-ignore
  Date.prototype.Format = function (fmt: string) {
    let o = {
      "M+": this.getMonth() + 1, //月份
      "d+": this.getDate(), //日
      "H+": this.getHours(), //小时
      "m+": this.getMinutes(), //分
      "s+": this.getSeconds(), //秒
      "q+": Math.floor((this.getMonth() + 3) / 3), //季度
      S: this.getMilliseconds() //毫秒
    };
    if (/(y+)/.test(fmt))
      fmt = fmt.replace(
        RegExp.$1,
        (this.getFullYear() + "").substr(4 - RegExp.$1.length)
      );
    for (let k in o)
      if (new RegExp("(" + k + ")").test(fmt))
        fmt = fmt.replace(
          RegExp.$1,
          RegExp.$1.length === 1
            ? o[k]
            : ("00" + o[k]).substr(("" + o[k]).length)
        );
    return fmt;
  }

  mf = mf || "yyyy-MM-dd HH:mm:ss"

  if (!time) time = new Date()
  //@ts-ignore
  return time.Format(mf)
}


/**
 * * 生成一个项目文件ID
 * @param { Number } randomLength
 */
export const getComponentID = (randomLength = 32) => {
  let t = "ABCDEFGHIJKLMNOPQRSTWUVXYZ123456789",
    a = t.length,
    n = ""
  for (let i = 0; i < randomLength; i++) {
    n += t.charAt(Math.floor(Math.random() * a))
  }
  return n
}

/**
 * * render 图标
 *  @param icon 图标
 *  @param set 设置项
 */
export const renderIcon = (icon: any, set = {}) => {
  return () => h(NIcon, set, { default: () => h(icon) })
}

/**
 * * render 语言
 *  @param lang 语言标识
 *  @param set 设置项
 *  @param tag 要渲染成的标签
 */
export const renderLang = (lang: string, set = {}, tag = "span") => {
  return () => h(tag, set, { default: () => window["$t"](lang) })
}

/**
 * * JSON序列化，支持函数和 undefined
 * @param data
 */
export const JSONStringify = <T>(data: T) => {
  return JSON.stringify(
    data,
    (key, val) => {
      // 处理函数丢失问题
      if (typeof val === "function") {
        return `${val}`
      }
      // 处理 undefined 丢失问题
      if (typeof val === "undefined") {
        return null
      }
      return val
    },
    2
  )
}

/**
 * * JSON反序列化，支持函数和 undefined
 * @param data
 */
export const JSONParse = (data: string) => {
  return JSON.parse(data, (k, v) => {
    if (excludeParseEventKeyList.includes(k)) return v
    if (
      typeof v === "string" &&
      v.indexOf &&
      (v.indexOf("function") > -1 || v.indexOf("=>") > -1)
    ) {
      return eval(`(function(){return ${v}})()`)
    } else if (
      typeof v === "string" &&
      v.indexOf &&
      v.indexOf("return ") > -1
    ) {
      const baseLeftIndex = v.indexOf("(")
      if (baseLeftIndex > -1) {
        const newFn = `function ${v.substring(baseLeftIndex)}`
        return eval(`(function(){return ${newFn}})()`)
      }
    }
    return v
  })
}

/**
 * 修改元素位置
 * @param target 对象
 * @param x X轴
 * @param y Y轴
 */
export const setComponentPosition = (
  target: CreateComponentType | CreateComponentGroupType,
  x?: number,
  y?: number
) => {
  x && (target.attr.x = x)
  y && (target.attr.y = y)
}

/**
 * * 设置按下键盘按键的底部展示
 * @param keyCode
 * @returns
 */
export const setKeyboardDressShow = (keyCode?: number) => {
  const code = new Map([
    [17, WinKeyboard.CTRL],
    [32, WinKeyboard.SPACE],
  ])

  const dom = document.getElementById("keyboard-dress-show")
  if (!dom) return
  if (!keyCode) {
    window.onKeySpacePressHold?.(false)
    dom.innerText = ""
    return
  }
  if (keyCode && code.has(keyCode)) {
    if (keyCode == 32) window.onKeySpacePressHold?.(true)
    dom.innerText = `按下了「${code.get(keyCode)}」键`
  }
}

/**
 * * url字符串中提取ID信息
 * @param {string} str
 * @returns  id
 */
export function fetchID(str: string): string | null {
  const match = str.match(/\/(\w+)$/)
  const id = match ? match[1] : null // 页面ID
  return id
}

/**
 * 变量名校验1
 * @param name
 * @returns
 */
export function checkParamCode(name: string): boolean {
  if (!name) return false

  const variableNameRegex = /^[a-zA-Z_$][0-9a-zA-Z_$]*$/

  if (!variableNameRegex.test(name)) return false

  return true
}

/**
 * Monaco-Editor Diff-Model Content Format String
 * @param setting 
 * @param value 
 * @returns 
 */
export function formatParamStr(setting: Object, value: any) {
  let fmt = ""

  if (setting && setting['base']) {
    fmt += "//--1.基本信息\n"
    fmt += JSON.stringify(value.baseInfo)
    fmt += "\n\n"
  }

  if (setting && setting['params']) {
    fmt += "//--2.参数列表\n"
    fmt += JSON.stringify(value.paramList)
    fmt += "\n\n"
  }

  if (setting && setting['script']) {
    const obj = value['script']
    fmt += "//--3.脚本\n"
    if (typeof obj === 'string') {
      fmt += value.script
    } else if (typeof obj === 'object') {
      Object.keys(scriptTypeEnum).forEach(key => {
        const cnt = obj[scriptTypeEnum[key]] || ''
        fmt += `// ${scriptTypeNameEnum[key]}\n`
        fmt += cnt
        fmt += '\n'
      })
    }
  }

  return fmt
}

/**
 * 路由跳转
 * @param route 
 * @param _blank 
 */
export function navigateTo(route: string, _blank = false) {
  if (_blank) {
    window.open(route, "_blank")
  } else {
    import('@/router').then(module => {
      module.default.push(route)
    })
  }
}


