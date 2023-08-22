<template>
    <div class="my-dynmaic-input">
        <vue-draggable-next v-model="innerData" animation="200" handle=".dragger">
            <transition-group name="fade">
                <div class="draggable-item" v-for="item, index in innerData" :key="index">
                    <n-button text class="dragger">
                        <n-icon size="16">
                            <AppSwitcher />
                        </n-icon>
                    </n-button>
                    <slot :item="item" :index="index"></slot>
                    <n-popover trigger="hover">
                        <template #trigger>
                            <n-button text @click="onEdit(item)">
                                <n-icon size="16">
                                    <Edit />
                                </n-icon>
                            </n-button>
                        </template>
                        <span>编辑</span>
                    </n-popover>
                    <n-popover trigger="hover">
                        <template #trigger>
                            <n-button text @click="innerData.splice(index, 1)">
                                <n-icon size="16">
                                    <Delete />
                                </n-icon>
                            </n-button>
                        </template>
                        <span>删除</span>
                    </n-popover>

                </div>
            </transition-group>
        </vue-draggable-next>
        <div class="action-form-button">
            <n-button type="primary" style="width: 100%" @click="onCreate()">
                <template #icon>
                    <n-icon>
                        <Add />
                    </n-icon>
                </template>
                {{ content }}
            </n-button>
        </div>
        <div class="item-config" v-show="showConfig">
            <div class="item-config-header">
                <n-text>设置</n-text>
                <n-button text style="font-size: 24px" @click="showConfig = false">
                    <n-icon>
                        <Close />
                    </n-icon>
                </n-button>
            </div>
            <div class="item-config-content">
                <slot name="config" :value="configData"></slot>
            </div>
        </div>
    </div>
</template>

<script lang='ts' setup>
import { ref, PropType, watch, computed } from 'vue'
import { VueDraggableNext } from "vue-draggable-next"
import _ from 'lodash'
import { Close, Edit, Add, Delete, AppSwitcher } from '@vicons/carbon'
import { useDesignStore } from '@/store/modules/designStore/designStore'
const designStore = useDesignStore()

const props = defineProps({
    data: {
        type: Object as PropType<any[]>,
        required: true
    },
    default: {
        type: Object,
        required: true
    },
    content: {
        type: String,
        required: false,
        default: "新增一项"
    },
    panelTop: {
        type: Number,
        required: false,
        default: 60
    }
})

// 控制颜色变化
const themeColor = computed(() => {
    return designStore.getDarkTheme ? 'rgb(24, 24, 28)' : '#f1f1f1'
})

// 编辑面板top设置
const configPanelTop = ref(props.panelTop)
document.documentElement.style.setProperty('--config-panel-top', `${configPanelTop.value}px`);


// 用于更新数据的emits
const emit = defineEmits(['update:data'])
// 用于控制编辑面板
const showConfig = ref(false)
// 用于保存当前编辑的数据
const configData = ref()

const innerData = ref(props.data)

watch(innerData, (newValue) => {
    emit('update:data', newValue)
})

const onCreate = () => {
    innerData.value.push(_.cloneDeep(props.default))
}

const onEdit = (item: any) => {
    if (configData.value == item) {
        showConfig.value = !showConfig.value
    } else {
        configData.value = item
        showConfig.value = true
    }
}

</script>

<style lang="scss" scoped>
.draggable-item {
    display: flex;
    align-items: center;
    margin-bottom: 10px;
    background-color: v-bind('themeColor');
    column-gap: 4px;
}

.item-config {
    position: fixed;
    top: var(--config-panel-top);
    right: 350px;
    background-color: v-bind('themeColor');
    height: 100%;
    width: 275px;
    box-shadow: 0 2px 10px 0px rgba(0, 0, 0, 0.32);
    z-index: 99;
    padding: 16px 10px;

    .item-config-header {
        line-height: 1;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
}
</style>
