<template>
    <div class="my-collapse">
        <div class="my-collapse-header" @click="togglePanel">
            <span class="title">{{ title }}</span>
            <data-band v-if="value != null" v-model:value="data"></data-band>
            <span class="arrow" :class="{ expanded: isExpanded }"  v-if="isCollapsible"></span>
        </div>
        <div class="my-collapse-content" v-show="isExpanded || !isCollapsible">
            <slot></slot>
        </div>
    </div>
</template>

<script lang='ts' setup>
import { ref, computed, watch } from 'vue'
import { useDesignStore } from '@/store/modules/designStore/designStore'
import { DataBand } from '@/components/Base/DataBand'
const designStore = useDesignStore()

const props = defineProps({
    // 面板绑定的值,当为true的时候显示变量绑定按钮
    value: {
        type: null,
        require: false
    },
    // 面板项标题
    title: {
        type: String,
        require: false,
        default: ''
    },
    // 是否允许展开
    collapsible: {
        type: Boolean,
        require: false,
        default: true
    },
    // 是否默认展开
    expanded: {
        type: Boolean,
        require: false,
        default: true
    }
})

const themeColor = computed(() => {
    return  designStore.getDarkTheme ? 'rgb(24, 24, 28)'  : 'white'
})


const emit = defineEmits(['update:value'])
const data = ref(props.value)
watch(data, (newValue) => {
    emit('update:value', newValue)
})

const isCollapsible = ref(props.collapsible)
const isExpanded = ref(props.expanded)

const togglePanel = () => {
    if (isCollapsible.value) {
        isExpanded.value = !isExpanded.value
    }
}

</script>

<style lang="scss" scoped>
 $contentPaddingWidth: 15px;

@include go(collapse) {

    &-header {
        display: flex;
        justify-content: space-between;
        padding: 5px 0;
        cursor: pointer;

        .title {
            min-width: 70px;
        }

        .arrow {
            margin-left: auto;
            margin-top: 8px;
            width: 5px;
            height: 5px;
            border-top: 2px solid #666;
            border-left: 2px solid #666;
            transform: rotate(45deg);
            transition: transform 0.3s ease;
        }

        .expanded {
            transform: rotate(-135deg);
        }
    }

    &-content {
        padding: 4px $contentPaddingWidth 4px $contentPaddingWidth;
        background-color: v-bind('themeColor');
    }
}
</style>
