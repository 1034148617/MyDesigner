<template>
    <div class="my-config-item-box">
        <n-text class="item-left" depth="2">
            {{ name }}
            <n-space :size="5">
                <slot name="name"></slot>
            </n-space>
        </n-text>
        <span class="item-content">
            <slot></slot>
        </span>
        <span class="item-right">
            <data-band v-if="isBind" v-model:value="data"></data-band>
        </span>
    </div>
</template>
    
<script setup lang="ts">
import { ref, watch } from 'vue'
import { DataBand } from '@/components/Base/DataBand'

const props = defineProps({
    name: {
        type: String,
        required: false,
        default: ''
    },
    textWidth: {
        type: Number,
        required: false,
        default: 80
    },
    isBind: {
        type: Boolean,
        required: false,
        default: false
    },
    value: {
        type: null,
        required: false
    }
})

const leftWidth = ref(props.textWidth)
document.documentElement.style.setProperty('--left-width', `${leftWidth.value}px`)

const emit = defineEmits(['update:value'])
const data = ref(props.value)

watch(data, (newValue) => {
    emit('update:value', newValue)
})

</script>
    
<style lang="scss" scoped>
@include go('config-item-box') {
    display: flex;
    align-items: center;
    margin: 10px 0;

    .item-left {
        width: var(--left-width);
        ;
        text-align: left;
        font-size: 14px;
        margin-top: 4px;
    }

    .item-content {
        flex: 1;
    }

    .item-right {
        margin-left: auto;
    }
}
</style>
    