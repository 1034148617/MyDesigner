import { computed } from 'vue'
import { useEditStore } from '@/store/modules/editStore/editStore'
import _ from 'lodash'

// 获取当前对象数据
export const useTargetComponent = () => {
    const editStore = useEditStore()
    const targetComponent: any = computed(() => {
        const targetId = _.last(editStore.getTargetComponent.selectId)
        return editStore.getComponetById(targetId)
    })
    return { targetComponent, editStore }
}
