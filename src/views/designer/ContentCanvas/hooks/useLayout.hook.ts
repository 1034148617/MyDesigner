import { onUnmounted, onMounted } from 'vue'
import { useEditStore } from '@/store/modules/editStore/editStore'
import { EditCanvasTypeEnum } from '@/store/modules/editStore/editStore.d'

const editStore = useEditStore()

// 布局处理
export const useLayout = () => {
  onMounted(() => {
    // 设置 Dom 值(ref 不生效先用 document)
    editStore.setEditCanvas(
      EditCanvasTypeEnum.EDIT_LAYOUT_DOM,
      document.getElementById('my-canvas')
    )
    editStore.setEditCanvas(
      EditCanvasTypeEnum.EDIT_CONTENT_DOM,
      document.getElementById('my-edit-content')
    )

    onUnmounted(() => {
      editStore.setEditCanvas(EditCanvasTypeEnum.EDIT_LAYOUT_DOM, null)
      editStore.setEditCanvas(EditCanvasTypeEnum.EDIT_CONTENT_DOM, null)
    })
  })
}