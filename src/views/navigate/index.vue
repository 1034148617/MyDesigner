<template>
    <div class="my-page">
        <n-layout>
            <layout-header>
                <template #left>
                    <navigation-config-title v-if="pageConfigRef" />
                    <navigation-style-title v-if="!pageConfigRef" />
                </template>
                <template #center>
                    <el-breadcrumb :separator-icon="ArrowRight">
                        <el-breadcrumb-item :to="{ path: '/store' }">项目管理</el-breadcrumb-item>
                        <el-breadcrumb-item>导航配置</el-breadcrumb-item>
                        <el-breadcrumb-item>{{ httpStore.getUserConfig.projects.find(p => p.ProjectID ==
                            httpStore.getUserConfig.selectProject)?.ProjectName }}</el-breadcrumb-item>
                    </el-breadcrumb>
                </template>
                <template #ri-left>
                    <el-button-group>
                        <el-button @click="switchPage" text size="large" :icon="Switch">切换</el-button>
                        <el-button text size="large" :icon="Position">预览</el-button>
                    </el-button-group>
                </template>
                <template #ri-right>
                    <theme-select></theme-select>
                </template>
            </layout-header>
            <n-layout-content content-style="overflow:hidden; display: flex">
                <navigation-config v-if="pageConfigRef" v-model:value="navigationNodes" />
                <navigation-style v-if="!pageConfigRef" />
            </n-layout-content>
        </n-layout>
    </div>
</template>

<script lang='ts' setup>
import { ref, onMounted } from 'vue'
import _ from 'lodash'  
import { Switch, Position, ArrowRight } from '@element-plus/icons-vue'
import { LayoutHeader } from '@/layout/LayoutHeader'
import { ThemeSelect } from '@/components/Base/ThemeSelect'
import { NavigationConfig, NavigationConfigTitle } from './NavigationConfig'
import { NavigationStyle, NavigationStyleTitle } from './NavigationStyle'
import { NavigationNode } from './index.d'
import { useHttpStore } from '@/store/modules/httpStore/httpStore'
const httpStore = useHttpStore()

const navigationNodes = ref<NavigationNode[]>([
    {
        nodeID: '9J5CFO6HAGIRLXYRPIGJRFICE5Q4FBPC',
        nodeName: '项目管理',
        children: [
            {
                nodeID: 'IE4LC2OMOGU4JCD4HXNCPFD5D4TCGQD4',
                nodeName: '项目基本信息',
            },
            {
                nodeID: '7FNW55DFYHLDYK2DLRPTSRX82IMB33BR',
                nodeName: '模板管理',
            },
            {
                nodeID: '2ZGX8BJQG8HC5T5I2VD7TP5SFC8LWRWP',
                nodeName: '任务反馈',
            },
            {
                nodeID: 'A7K97KEMKTAVZDEOFGI1PZTKWJR9GCDI',         
                nodeName: '项目看板',
            },
        ]
    }
])

/* 初始化当前项目的导航配置 */
onMounted(() => {
    // console.log(httpStore.getUserConfig)
})

const pageConfigRef = ref(true)
const switchPage = () => {
    pageConfigRef.value = !pageConfigRef.value
}




</script>

<style></style>
