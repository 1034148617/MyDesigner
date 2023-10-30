<template>
    <div class="my-store">
        <n-layout>
            <layout-header>
                <template #left>
                    <el-select v-model="httpStore.getUserConfig.selectProject" filterable placeholder="请选择项目"
                        style="width:300px;" @change="httpStore.setSelectProject">
                        <el-option v-for="item in projects" :key="item.ProjectID" :label="item.ProjectName"
                            :value="item.ProjectID" />
                    </el-select>
                    <el-button @click="routerConfig">导航配置</el-button>
                </template>
                <template #center></template>
                <template #ri-left></template>
                <template #ri-right>
                    <theme-select></theme-select>
                </template>
            </layout-header>
            <n-layout-content content-style="overflow:hidden; display: flex">
                <store-panel></store-panel>
                <!-- <data-source-confi g></data-source-confi> -->
                <framework-config></framework-config>
            </n-layout-content>
        </n-layout>
    </div>
</template>

<script lang='ts' setup>
import _ from 'lodash'
import { LayoutHeader } from '@/layout/LayoutHeader'
import { StorePanel } from './StorePanel'
import { ThemeSelect } from '@/components/Base/ThemeSelect'
import { DataSourceConfig } from './StoreContent/DataSourceConfig'
import { FrameworkConfig } from './StoreContent/FrameworkConfig'
import { navigateTo } from '@/utils'
import { PageEnum } from '@/enums/pageEnum'
import { useHttpStore } from '@/store/modules/httpStore/httpStore'
const httpStore = useHttpStore()

const projects = _.concat([{
    ProjectID: '',
    ProjectName: ''
}], httpStore.getUserConfig.projects)

const routerConfig = () => {
    const path = `/#${PageEnum.ROUTER_HOME}`
    navigateTo(path, true)
}

</script>

<style lang="scss" scoped>
@include go(store) {
    height: 100vh;
    width: 100vw;
    overflow: hidden;

    // .content-top {
    //     top: $--header-height;
    //     margin-top: 1px;
    // }
}
</style>