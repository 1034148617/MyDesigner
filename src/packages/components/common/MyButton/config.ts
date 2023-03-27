import { PublicConfigClass } from '@/packages/config'
import { CreateComponentType } from '@/packages/index.d'
import config from './index'
import cloneDeep from 'lodash/cloneDeep'
import { StyleType } from '@/packages/style.d';

export const option = {
    content: '自定义按钮'
}

export const style: StyleType = {
}

export default class Config extends PublicConfigClass implements CreateComponentType {
    public key = config.key
    public config = cloneDeep(config)
    public option = cloneDeep(option)

    constructor() {
        super(config.key, {w:100,h:50}, style)
    }

}
