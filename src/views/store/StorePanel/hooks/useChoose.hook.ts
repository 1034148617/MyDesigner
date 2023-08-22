import { ref } from 'vue'
import { StoreFileTypeEnum } from '../index.d'

export type FileNode = {
    ProjectID: string,
    FileID: string,
    NodeType: StoreFileTypeEnum
}

export const SelectedNode = ref<FileNode>()

export function handleSelect(node: any){
    console.log(node)
}

