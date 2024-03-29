<template>
    <div v-if="load" class="my-group" :class="{ lock, hide }">
        <slot></slot>
        <!-- 锚点 -->
        <template v-if="!hiddenPoint">
            <div :class="`shape-point ${point}`" v-for="(point, index) in select ? pointList : []" :key="index"
                :style="usePointStyle(point, index, item, cursorResize)"
                @mousedown="useMousePointHandle($event, point, item.attr)"></div>
        </template>
        <!-- 选中 -->
        <div class="shape-modal" :style="useDockModelStyle(item.dock, item.attr)">
            <div class="shape-modal-select" :class="{ active: select }"></div>
            <div class="shape-modal-change" :class="{ selectActive: select, hoverActive: hover }"></div>
        </div>
    </div>
</template>

<script lang='ts' setup>
import { computed, PropType } from 'vue'
import { CreateComponentType, CreateComponentGroupType } from '@/packages/index.d'
import { useDockModelStyle, usePointStyle } from '@/packages/hooks/useStyle.hook'
import { useMousePointHandle } from '../../hooks/useDrag.hook'
import { useEditStore } from '@/store/modules/editStore/editStore'
import { useDesignStore } from '@/store/modules/designStore/designStore'
const designStore = useDesignStore()
const editStore = useEditStore()

const props = defineProps({
    item: {
        type: Object as PropType<CreateComponentGroupType>,
        required: true
    },
    hiddenPoint: {
        type: Boolean,
        required: false
    }
})

// 锚点 
const pointList = ['t', 'r', 'b', 'l', 'lt', 'rt', 'lb', 'rb']

// 光标朝向
const cursorResize = ['n', 'e', 's', 'w', 'nw', 'ne', 'sw', 'se']


// 颜色
const themeColor = computed(() => {
    return designStore.getAppTheme
})

// 计算当前选中目标
const hover = computed(() => {
    if (props.item.status.lock) return false
    return props.item.id === editStore.getTargetComponent.hoverId
})

// 兼容多值场景
const select = computed(() => {
    const id = props.item.id
    if (props.item.status.lock) return false
    return editStore.getTargetComponent.selectId.find((e: string) => e === id)
})

// 是否渲染
const load = computed(() => {
    return props.item.status.load
})

// 是否锁定
const lock = computed(() => {
    return props.item.status.lock
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
@include go(group) {
    position: absolute;
    // inset: 0;

    &.lock {
        cursor: default !important;
    }

    &.hide {
        display: none;
    }

    /* 锚点 */
    .shape-point {
        z-index: 1;
        position: absolute;
        width: 4px;
        height: 4px;
        border: 3px solid v-bind('themeColor');
        border-radius: 2px;
        background-color: #fff;
        transform: translate(-40%, -30%);

        &.l,
        &.r {
            margin-top: 2px;
        }

        &.r {
            transform: translate(-20%, -50%);
        }

        &.l {
            transform: translate(-45%, -50%);
        }

        &.rt,
        &.rb {
            transform: translate(-30%, -30%);
        }
    }

    /* 选中 */
    .shape-modal {
        position: absolute;
        top: 0;
        left: 0;


        .shape-modal-select,
        .shape-modal-change {
            position: absolute;
            inset: 0;
            border-radius: 8px;
        }

        .shape-modal-select {
            opacity: 0.1;
            top: 2px;
            left: 2px;

            &.active {
                background-color: v-bind('themeColor');
            }
        }

        .shape-modal-change {
            border: 2px solid rgba(0, 0, 0, 0);

            &.selectActive,
            &.hoverActive {
                border-color: v-bind('themeColor');
                border-width: 2px;
                top: -2px;
                left: -2px;
            }

            &.hoverActive {
                border-style: dotted;
            }

            &.selectActive {
                border-style: solid;
            }
        }
    }
}
</style>
