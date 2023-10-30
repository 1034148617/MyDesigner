<template>
    <n-tabs v-model:value="panel" type="card" tab-style="min-width: 80px;">
        <n-tab-pane v-for="panel in panels" :key="panel.name" :tab="panel.name" :name="panel.name">
            <component :is="panel.component" :value="value" />
        </n-tab-pane>
        <template #suffix>
            <n-space style="margin-right: 20px;">
                <el-button text type="primary" @click="toDesign">设计</el-button>
                <el-button text type="primary" @click="toPreview">预览</el-button>
            </n-space>
        </template>
    </n-tabs>
</template>

<script lang='ts' setup>
import { ref, PropType } from 'vue'

import BaseInfoPanel from './components/BaseInfoPanel.vue'
import ImportPanel from './components/ImportPanel.vue'
import ParamsPanel from '../DataSourceConfig/components/ParamsPanel.vue'
import ScriptPanel from './components/ScriptPanel.vue'
import HistroyPanel from '../DataSourceConfig/components/HistroyPanel.vue'
import { FrameworkFileType } from './index.d'
import { navigateTo } from '@/utils'
import { PageEnum } from '@/enums/pageEnum'

const props = defineProps({
    value: {
        type: Object as PropType<FrameworkFileType>,
        require: false,
        default: {
            baseInfo: {
                fileID: 'D6080759054B4CEF8B96C591495D5CAB',
                fileName: '页面文件测试',
                tags: ['界面', '加载'],
            },
            paramList: [
                {
                    paramID: 'Username',
                    paramName: '用户名',
                    paramType: 'string',
                    index: 10
                }
            ],
            script: {

            },
            history: {
                targetVersion: 1,
                versions: []
            }
        }
    }
})

// * 页签
const panels = [
    {
        name: '基本信息',
        component: BaseInfoPanel
    },
    {
        name: '引用',
        component: ImportPanel
    },
    {
        name: '参数',
        component: ParamsPanel
    },
    {
        name: '脚本',
        component: ScriptPanel
    },
    {
        name: '修改记录',
        component: HistroyPanel
    }
]
const panel = ref('基本信息')

const toDesign = () => {
    const path = `/#${PageEnum.BASE_COMPONENT_HOME}/${props.value.baseInfo.fileID}`
    navigateTo(path, true)
}

const toPreview = () => {
    const path = `/#${PageEnum.BASE_COMPONENT_PREVIEW}/${props.value.baseInfo.fileID}`
    navigateTo(path, true)
}

</script>
