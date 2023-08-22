
<template>
    <div class="go-text-box" :style="{
        ...useSizeStyle(attr),
        ...useStyle(config.style)
    }">
        <el-icon>
            <component :is="type"></component>
        </el-icon>
    </div>
</template>

<script lang='ts' setup>
import { CreateComponentType } from '@/packages/index.d';
import { toRefs, PropType, shallowReactive, ref, computed, watch } from 'vue';
import { useStyle } from '../../../hooks/useStyle.hook';
import { useSizeStyle } from '@/views/designer/ContentCanvas/hooks/useStyle.hook';
import { option as configOption } from './config'
const props = defineProps({
    config: {
        type: Object as PropType<CreateComponentType>,
        required: true
    },

})
const { attr } = toRefs(props.config)
const { } = toRefs(props.config.style)

const {
    type
} = toRefs(props.config.option)


// const option = shallowReactive({
//   dataset: configOption.dataset
// })


</script>

<style lang="scss" scoped>
.go-text-box {
    display: flex;
    box-sizing: border-box;
}
</style>
