<template>
    <div class="my-store">
        <n-layout position="absolute">
            <layout-header>
                <template #left>
                    <el-select v-model="httpStore.getUserConfig.selectProject" filterable placeholder="请选择项目"
                        style="width:300px;" @change="httpStore.setSelectProject">
                        <el-option v-for="item in projects" :key="item.ProjectID" :label="item.ProjectName"
                            :value="item.ProjectID" />
                    </el-select>
                </template>
                <template #center></template>
                <template #ri-left></template>
                <template #ri-right></template>
            </layout-header>
            <n-layout-content content-style="overflow:hidden; display: flex">
                <store-panel></store-panel>
                <data-source-config></data-source-config>
            </n-layout-content>
        </n-layout>
    </div>
</template>

<script lang='ts' setup>
import _ from 'lodash'
import { LayoutHeader } from '@/layout/LayoutHeader'
import { StorePanel } from './StorePanel'
import { DataSourceConfig } from './StoreContent/DataSourceConfig'
import { useHttpStore } from '@/store/modules/httpStore/httpStore'
const httpStore = useHttpStore()

const projects = _.concat([{
    ProjectID: '',
    ProjectName: ''
}], httpStore.getUserConfig.projects)


</script>

<style lang="scss" scoped>
@include go(store) {
    .content-top {
        top: $--header-height;
        margin-top: 1px;
    }


}
</style>
./StoreContent/DataSourceConfig