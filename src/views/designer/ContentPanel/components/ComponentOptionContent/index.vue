<template>
    <n-scrollbar>
        <div v-for="(item, index) in props.selectOptions.list" style="margin-left:10px;height: 50px;line-height: 50px;" :key="index"
            draggable="true" @dblclick="dblclickHandle(item)" @dragstart="dragStartHandle($event, item)"
            @dragend="dragendHandle">
            <svg-icon  :name="item.icon || 'Default'" :size="20"></svg-icon>
            <n-text>{{ item.name }}</n-text>
        </div>
    </n-scrollbar>
</template>

<script lang='ts' setup>
import { ConfigType, CreateComponentType, CreateComponentGroupType } from '@/packages/index.d';
import { getComponent, createComponent } from '@/packages'
import { componentInstall, JSONStringify } from '@/utils'
import { DragKeyEnum } from '@/enums/editPageEnum'
import { useEditStore } from '@/store/modules/editStore/editStore'
import { EditCanvasTypeEnum } from '@/store/modules/editStore/editStore.d'
const editStore = useEditStore()

const props = defineProps({
    selectOptions: {
        type: Object,
        default: () => { }
    }
})

// 双击添加
const dblclickHandle = async (item: ConfigType) => {
    try {
        // 动态注组件
        componentInstall(item.key, getComponent(item))
        // 创建新组件
        let newComponent: CreateComponentType | CreateComponentGroupType = await createComponent(item)
        
        // 添加
        editStore.addComponentList(newComponent, false, true)
        // 选中
        editStore.setTargetSelectComponent(newComponent.id)
    } catch (error) {
        console.log(error)
        window['$message'].warning(`组件正在研发中, 敬请期待...`)
    }
}
 
// 拖拽处理
const dragStartHandle = (e: DragEvent, item: ConfigType) => {
    // 动态注册图表组件
    componentInstall(item.key, getComponent(item))
    // 将配置项绑定到拖拽属性上
    e!.dataTransfer!.setData(DragKeyEnum.DRAG_KEY, JSONStringify(item))
    // 修改状态
    editStore.setEditCanvas(EditCanvasTypeEnum.IS_CREATE, true)
}

// 拖拽结束
const dragendHandle = () => {
    editStore.setEditCanvas(EditCanvasTypeEnum.IS_CREATE, false)
}

</script>

<style></style>
