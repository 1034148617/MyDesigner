<template>
    <el-tree 
        :data="props.nodes" 
        highlight-current 
        check-on-click-node node-key="id" 
        :props="defaultProps"
        :current-node-key="editStore.getTargetComponent.selectId[0] || '.'"
        :default-expand-all="props.isAutoExpand" 
        :style="{ ...useTreeTheme() }" 
        @node-click="componentSelect">
        <template #default="{ node, data }">
            <svg-icon :name="getIconName(data.id)"></svg-icon>
            <span>{{ data.label }}</span>
        </template>
    </el-tree>
</template>

<script lang='ts' setup>
import { PropType, toRaw } from 'vue'
import { useEditStore } from '@/store/modules/editStore/editStore';
import { useDesignStore } from '@/store/modules/designStore/designStore'
const editStore = useEditStore()
const designStore = useDesignStore()

interface Tree {
    id: string
    label: string
    children?: Tree[]
}

const defaultProps = {
    label: 'label',
    children: 'children',
}

const props = defineProps({
    nodes: {
        type: Object as PropType<Array<Tree>>,
        required: true,
    },
    isAutoExpand: {
        type: Boolean,
        required: false,
        default: true
    }
})

const getIconName = (id: string) => {
    return editStore.getComponetById(id)?.config.icon || "Default"
}

const useTreeTheme = () => {
    return {
        backgroundColor: designStore.getDarkTheme ? '#666666' : 'white',
        color: designStore.getDarkTheme ? 'white' : 'black',
    }
}

const componentSelect = (node: any) => {
    if (node.id == ".") return
    editStore.setTargetSelectComponent(node.id)
}

</script>

<style lang="scss" scoped></style>
