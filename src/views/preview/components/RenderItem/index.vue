<template>
    <div v-if="load" class="my-render-item" :class="{ hide }">
        <slot></slot>
    </div>
</template>

<script lang='ts' setup>
import { computed, PropType } from 'vue'
import { CreateComponentType, CreateComponentGroupType } from '@/packages/index.d'

const props = defineProps({
    item: {
        type: Object as PropType<CreateComponentType | CreateComponentGroupType>,
        required: true
    }
})

// 是否渲染
const load = computed(() => {
    return props.item.status.load
})

// 是否隐藏
const hide = computed(() => {
    return props.item.status.hide
})

// 是否可用
const enabled = computed(() => {
    return props.item.status.enabled
})

</script>

<style lang="scss" scoped>
@include go(render-item) {
    position: absolute;

    &.lock {
        cursor: default !important;
    }

    &.hide {
        display: none;
    }
}
</style>