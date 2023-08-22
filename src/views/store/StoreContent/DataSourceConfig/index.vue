<template>
    <n-tabs v-model:value="panel" type="card" tab-style="min-width: 80px;">
        <n-tab-pane v-for="panel in panels" :key="panel.name" :tab="panel.name" :name="panel.name">
            <component :is="panel.component" :value="value" />
        </n-tab-pane>
    </n-tabs>
</template>

<script lang='ts' setup>
import { ref, PropType } from 'vue'
import BaseInfoPanel from './components/BaseInfoPanel.vue'
import ParamsPanel from './components/ParamsPanel.vue'
import ScriptPanel from './components/ScriptPanel.vue'
import HistroyPanel from './components/HistroyPanel.vue'
import { DataSourceFileType } from './index.d'

const props = defineProps({
    value: {
        type: Object as PropType<DataSourceFileType>,
        require: false
    }
})

// * 页签
const panels = [
    {
        name: '基本信息',
        component: BaseInfoPanel
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


</script>
