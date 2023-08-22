import { defineStore } from 'pinia'
import {
    ParamsTypeEnum,
    GlobalParamsType,
    VariableType,
    FunctionType,
    ApiType
} from './paramsStore.d'
import { RequestHttpEnum } from '@/enums/httpEnum'
import { getUUID } from '@/utils'
import _ from 'lodash'

export const useParamsStore = defineStore({
    id: 'useParamsStore',
    state: (): GlobalParamsType => ({
        user: {},
        system: {},
        record: {
            Page: {},                // Global 
            Api:{},                  // 绑定变量的API
            Component: {}            // 组件绑定记录               
        }
    }),
    getters: {
        getUserParams(): { [key: string]: any } {
            return this.user
        },
        getSystemParams(): { [key: string]: any } {
            return this.system
        },
        getGlobalParams(): { [key: string]: VariableType | FunctionType | ApiType } {
            return { ...this.user, ...this.system }
        },
        getGlobalVariable(): { [key: string]: VariableType } {
            const params = { ...this.user, ...this.system }
            return Object.entries(params).filter(([key, value]) => {
                return value.type == ParamsTypeEnum.VARIABLE
            }).reduce((result, [key, value]) => {   
                result[key] = value
                return result
            }, {})

        },
        getGlobalApi(): { [key: string]: ApiType } {
            const params = { ...this.user, ...this.system }
            return Object.entries(params).filter(([key, value]) => {
                return value.type == ParamsTypeEnum.API
            }).reduce((result, [key, value]) => {
                result[key] = value
                return result
            }, {})
        },
        getGlobalFunction(): { [key: string]: FunctionType } {
            const params = { ...this.user, ...this.system }
            return Object.entries(params).filter(([key, value]) => {
                return value.type == ParamsTypeEnum.API
            }).reduce((result, [key, value]) => {
                result[key] = value
                return result
            }, {})
        }
    },
    actions: {
        // * 添加变量-Variable
        addVariable(): void {
            const _id = getUUID()
            const name = 'variable_' + _id.slice(0, 4)
            this.user[name] = {
                type: ParamsTypeEnum.VARIABLE,
                id: _id,
                name: name,
                description: '',
                isExpanded: false,
                isDelete: true,
                isEdit: true,
                value: ''
            }
        },
        // * 添加变量-Function
        addFunction(): void {
            const _id = getUUID()
            const name = 'function_' + _id.slice(0, 4)
            this.user[name] = {
                type: ParamsTypeEnum.FUNCTION,
                id: _id,
                name: name,
                description: '',
                isExpanded: false,
                isDelete: true,
                isEdit: true,
                value: ''
            }
        },
        // * 添加变量-Api
        addApi(): void {
            const _id = getUUID()
            const name = 'api_' + _id.slice(0, 4)
            this.user[name] = {
                type: ParamsTypeEnum.API,
                id: _id,
                name: name,
                description: '',
                isExpanded: false,
                isDelete: true,
                isEdit: true,
                isAutoLoad: true,
                dsId: '',
                method: RequestHttpEnum.GET,
                params: [],
                default_value: '',
                value: null
            }
        },
        // * 根据id，从所有变量中获取相关变量对象
        getParamById(_id: string): VariableType | FunctionType | ApiType | undefined {
            const params = this.getGlobalParams
            for (const key in params) {
                const param = params[key]
                if (param.id == _id) return param
            }
            return undefined
        },
        // * 根据name，从所有变量中获取相关变量对象
        getParamByName(_name: string): VariableType | FunctionType | ApiType | undefined {
            const params = this.getGlobalParams
            return params[_name]
        },
        // * 根据id，从所有变量中获取name
        getNameById(_id: string): string | undefined {
            const params = this.getGlobalParams
            for (const key in params) {
                const param = params[key]
                if (param.id == _id) return key
            }
            return undefined
        },
        // * 根据id，从用户变量中删除相关变量对象
        deleteParamById(_id: string): void {
            const params = this.user
            const filiterParams = Object.entries(params).filter(([key, value]) => value.id != _id)
            this.user = Object.fromEntries(filiterParams)
        },
        // * 根据name，从用户变量中删除相关变量对象
        deleteParamByName(_name: string): void {
            const params = this.user
            if (params.hasOwnProperty(_name)) {
                delete params[_name]
            }
        },
        // * 获取用户变量中某个类型变量的数量   
        getNumberByType(_type: ParamsTypeEnum): any {
            let count = 0
            const params = this.user
            for (const key in params) {
                const param = params[key]
                if (param.type == _type) count++
            }
            return count
        },
        // * 切换显示（展开详情）
        changeExpanded(id: string): void {
            const param = this.getParamById(id)
            if (param == undefined) return
            param.isExpanded = !param.isExpanded
        },
        // * 处理自动加载的Api
        fillValueByAutoApi(): void {

        },
        // * 触发加载Api Value（刷新） 
        fillValueByTriggerApi(key: string): void {

        },
        // * 绑定变量记录
        recordBand(): boolean {
            


            return true
        },
        // * 解除变量绑定
        clearBand(): void {

        }
    }
})
