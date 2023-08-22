import _ from 'lodash';
import { CreateComponentType, CreateComponentGroupType, AttrType } from '@/packages/index.d'
import { useEditStore } from '@/store/modules/editStore/editStore'
const editStore = useEditStore()

function swapArrayElements<T>(arr: T[], index1: number, index2: number): void {
    [arr[index1], arr[index2]] = [arr[index2], arr[index1]];
}

export const delSelected = (isAll = true): void => {
    const selects = editStore.getTargetComponent.selectId
    if (isAll) {
        editStore.removeComponentList(selects)
    } else {
        if (selects.length) {
            editStore.removeComponentList(_.last(selects))
        }
    }
}

export const moveUp = () => {
    const selects = editStore.getTargetComponent.selectId
    // 默认逻辑操作最后选择的组件
    const _id = _.last(selects)
    // 未选择组件则返回
    if (!_id) return
    const [path, index] = editStore.computePath(_id)

    if (path.length == 1) {
        const ind = index[0]
        if (ind) {
            editStore.swapElements(ind - 1, ind)
        }
    } else if (path.length > 1) {
        const ind = index[index.length - 2]
        if (ind) {
            swapArrayElements(editStore.getComponetById(path[path.length - 2]).groupList, (ind - 1), ind)
        }
    }
}

export const moveDown = () => {
    const selects = editStore.getTargetComponent.selectId
    // 默认逻辑操作最后选择的组件
    const _id = _.last(selects)
    // 未选择组件则返回
    if (!_id) return
    const [path, index] = editStore.computePath(_id)

    if (path.length == 1) {
        const ind = index[0]
        if (ind < editStore.getComponentList.length - 1) {
            editStore.swapElements(ind, ind + 1)
        }
    } else if (path.length > 1) {
        const parentComponent = editStore.getComponetById(path[path.length - 2])
        const ind = index[index.length - 2]
        if (ind < parentComponent.groupList.length - -1) {
            swapArrayElements(parentComponent.groupList, ind, ind + 1)
        }
    }
}

export const moveLeft = () => {
    const selects = editStore.getTargetComponent.selectId
    // 默认逻辑操作最后选择的组件
    const _id = _.last(selects)
    // 未选择组件则返回
    if (!_id) return
    const [path, index] = editStore.computePath(_id)

    if (path.length < 2) {
        return
    } else if (path.length == 2) {
        const parentComponent = editStore.getComponetById(path[0])
        const componentList = editStore.getComponentList
        let parentIndex = 0;
        componentList.forEach((item, index) => {
            if (item.id == parentComponent.id) {
                parentIndex = index
            }
        })
        const targetComponent = parentComponent.groupList.splice(index[1], 1)[0]
        editStore.insertComponent(parentIndex + 1, targetComponent)
    } else {
        const parentComponent = editStore.getComponetById(path[path.length - 2])
        const grandParentComponent = editStore.getComponetById(path[path.length - 3])
        if (index[index.length - 2] == grandParentComponent.groupList.length - 1) {
            grandParentComponent.groupList.push(parentComponent.groupList.splice(index[index.length - 2], 1)[0])
        } else {
            grandParentComponent.groupList.splice(path[path.length - 2] + 1, 0, parentComponent.groupList.splice(index[index.length - 1], 1)[0])
        }   
    }
}

export const moveRight = () => {
    const selects = editStore.getTargetComponent.selectId
    // 默认逻辑操作最后选择的组件
    const _id = _.last(selects)
    // 未选择组件则返回
    if (!_id) return
    const [path, index] = editStore.computePath(_id)

    if (path.length == 1) {
        const componentList = editStore.getComponentList
        let parentIndex = -1;
        componentList.forEach((item, i) => {
            if (item.id == _id) return
            if (item.isGroup && Math.abs(i - index[0]) < Math.abs(parentIndex - index[0])) {
                parentIndex = i
            }
        })
        if (parentIndex > -1) {
            editStore.getComponetById(componentList[parentIndex].id).groupList.push(editStore.removeComponent(index[0]))
        }
    } else if (path.length > 1) {
        const parentComponent = editStore.getComponetById(path[path.length - 2])
        let parentIndex = -1;
        parentComponent.groupList.forEach((item: any, i: number) => {
            if (item.id == _id) return
            if (item.isGroup && Math.abs(i - index[0]) < Math.abs(parentIndex - index[0])) {
                parentIndex = i
            }
        })
        if (parentIndex > -1) {
            const node = parentComponent.groupList[parentIndex]
            node.groupList.push(parentComponent.groupList.splice(index[index.length-1], 1)[0])
        }
    }
}



