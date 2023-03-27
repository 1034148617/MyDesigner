<template>
    <!-- 通用模块容器 -->
    <div class="my-content-box" :class="[`bg-depth${depth}`, flex && 'flex']">
        <div v-if="showTop" class="top my-mt-0 my-flex-no-wrap">
            <n-space class="my-flex-no-wrap" :size="5">
                <n-ellipsis>
                    <n-text>{{ title }}</n-text>
                </n-ellipsis>
                <div class="mt-1">
                    <slot name="icon"></slot>
                </div>
            </n-space>
            <n-space align="center" style="gap: 4px">
                <slot name="top-right"></slot>
                <svg-icon name="back" v-show="showBackIcon" :size="20" class="my-cursor-pointer my-d-block"
                    @click="backHandle"></svg-icon>
            </n-space>
        </div>

        <div class="content" :class="{
            'content-height-show-top-bottom': showBottom || showTop,
            'content-height-show-both': showBottom && showTop
        }">
            <template v-if="disabledScroll">
                <slot></slot>
            </template>
            <template v-else-if="xScroll">
                <n-scrollbar x-scrollable>
                    <n-scrollbar>
                        <slot></slot>
                    </n-scrollbar>
                </n-scrollbar>
            </template>
            <template v-else>
                <n-scrollbar>
                    <slot></slot>
                </n-scrollbar>
            </template>
        </div>

        <div v-if="showBottom" class="bottom go-mt-0">
            <slot name="bottom"></slot>
        </div>

        <div class="aside">
            <slot name="aside"></slot>
        </div>
    </div>
</template>

<script lang='ts' setup>
defineProps({
    // 标题
    title: String,
    // 头部控制
    showTop: {
        type: Boolean,
        default: true
    },
    // 底部控制
    showBottom: {
        type: Boolean,
        default: false
    },
    flex: {
        type: Boolean,
        default: false
    },
    // 返回图标控制
    showBackIcon: {
        type: Boolean,
        default: true
    },
    // 背景深度
    depth: {
        type: Number,
        default: 1
    },
    // x 轴滚动
    xScroll: {
        type: Boolean,
        default: false
    },
    disabledScroll: {
        type: Boolean,
        default: false
    },

})

const emit = defineEmits(['back'])

const backHandle = () => {
    emit('back')
}
</script>
 
<style lang="scss" scoped>
$topOrBottomHeight: 35px;

@include go(content-box) {
    height: calc(100vh - #{$--header-height});
    margin: 1px;
    margin-bottom: 0;

    &.bg-depth0 {
        @include fetch-bg-color('background-color1');

        .bottom,
        .top {
            @include fetch-bg-color('background-color1');
        }
    }

    &.bg-depth1 {
        @include fetch-bg-color('background-color1');

        .bottom,
        .top {
            @include fetch-bg-color('background-color2');
        }
    }

    &.bg-depth2 {
        @include fetch-bg-color('background-color2');

        .bottom,
        .top {
            @include fetch-bg-color('background-color3');
        }
    }

    &.bg-depth3 {
        @include fetch-bg-color('background-color3');

        .bottom,
        .top {
            @include fetch-bg-color('background-color4');
        }
    }

    &.flex {
        flex: 1;
    }

    .top,
    .bottom {
        display: flex;
        justify-content: space-between;
        flex-wrap: nowrap;
        align-items: center;
        height: $topOrBottomHeight;
        padding: 0 10px;
        border-top: 1px solid;
        @include fetch-border-color('hover-border-color');

        .mt-1 {
            margin-top: 2px;
        }
    }

    .top {
        border-bottom: 1px solid;
        @include fetch-border-color('background-color1');
    }

    .content {
        height: calc(100vh - #{$--header-height});
        overflow: hidden;
    }

    .aside {
        position: relative;
    }

    .content-height-show-top-bottom {
        height: calc(100vh - #{$--header-height} - #{$topOrBottomHeight});
    }

    .content-height-show-both {
        height: calc(100vh - #{$--header-height} - #{$topOrBottomHeight} - #{$topOrBottomHeight});
    }
}
</style>
