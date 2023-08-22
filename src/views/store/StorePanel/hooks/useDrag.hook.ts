import { ref } from 'vue'

export  function useDragHandel() {
    const width = ref(400)
    const isDragging = ref(false)

    function startDrag(event: any) {
        isDragging.value = true
    }

    function onDrag(event: any) {
        if (isDragging.value) {
            width.value = event.clientX
        }
    }

    function endDrag(event: any) {
        isDragging.value = false
    }

    return {
        width,
        startDrag,
        onDrag,
        endDrag
    }

}