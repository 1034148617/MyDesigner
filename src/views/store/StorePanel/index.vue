<template>
    <store-box class="my-store-panel" :depth="1" :showTop="false">
        <aside>
            <div class="menu-width-box">
                <n-menu class="menu-width" v-model:value="selectValue" :options="menuOptions" :icon-size="27"
                    @update:value="clickItemHandle"></n-menu>
                <div class="menu-content-box">
                    <component :is="currentPanel"></component>
                </div>
            </div>
        </aside>
    </store-box>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { StoreBox } from '../StoreBox'
import {    
    selectValue,
    currentPanel,
    clickItemHandle,
    menuOptions,
} from './hooks/useAside.hook'

</script>

<style lang="scss" scoped>
/* 整体宽度 */
$width: 400px;
/* 列表宽度 */
$widthScoped: 80px;
/* 拖拽框宽度 */
$widthDrag: 5px;
/* 此高度与 ContentBox 组件关联 */
$topHeight: 40px;

@include go(store-panel) {
    width: $width;
    @extend .my-transition;

    &.scoped,
    .menu-width {
        width: $widthScoped;
    }

    .menu-width-box {
        display: flex;
        height: calc(100vh - #{$--header-height});

        .menu-width {
            flex-shrink: 0;
            @include fetch-bg-color('background-color2');
        }

        .menu-content-box {
            flex-shrink: 0;
            width: calc($width - $widthScoped - $widthDrag);
            overflow: hidden;
            margin: 15px 10px;
        }

        .menu-resize {
            cursor: col-resize; 
            float: left;
            position: relative;
            border-radius: 5px;
            margin-top: -10px;
            width: $widthDrag;
            background-size: cover;
            background-position: center;
            /*z-index: 99999;*/
            color: white;

            &:hover {
                background-color: rgba(0, 0, 255, 0.37);
            }

            &::before {
                content: '';
            }
        }
    }

    @include deep() {
        .menu-width {
            .n-menu-item {
                height: auto !important;

                &.n-menu-item--selected {
                    &::after {
                        content: '';
                        position: absolute;
                        left: 2px;
                        top: 0;
                        height: 100%;
                        width: 3px;
                        border-top-right-radius: 3px;
                        border-bottom-right-radius: 3px;
                    }
                }

                .n-menu-item-content {
                    display: flex;
                    flex-direction: column;
                    padding: 6px 12px !important;
                    font-size: 14px !important;
                }

                .n-menu-item-content__icon {
                    font-size: 18px !important;
                    margin-right: 0 !important;
                }
            }
        }
    }
}
</style>
