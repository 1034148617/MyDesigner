<template>
    <!-- 容器组件 -->
    <render-item v-if="item.isGroup" class="my-preview-render" :item="item"
        :style="{ ...useComponentStyle(item.attr, 1), ...useDockStyle(item.id) }">
        <component :is="item.key" :config="item">
            <template v-for="(child, index) in item.groupList">
                <preview-render :item="child"></preview-render>
            </template>
        </component>
    </render-item>      
    <!-- 非容器组件 -->
    <render-item v-else :item="item" :style="{ ...useComponentStyle(item.attr, 1) }">
        <component :is="item.key" :config="item"></component>
    </render-item>
</template>

<script lang='ts' setup>
import { PropType } from 'vue'
import { RenderItem } from '../RenderItem'
import { CreateComponentType, CreateComponentGroupType } from '@/packages/index.d'
import { useComponentStyle } from '../../hooks/useStyle.hook'
import { useDockStyle } from '@/packages/hooks/useStyle.hook'

const props = defineProps({
    item: {
        type: Object as PropType<CreateComponentType | CreateComponentGroupType>,
        required: true
    }
})

</script>

<script lang="ts">
export default {
    name: "PreviewRender"
}
</script>

<style lang="scss" scpoed>
@include go(preview-render) {
    position: absolute;

}
</style>
