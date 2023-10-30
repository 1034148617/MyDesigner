import { defineStore } from 'pinia'
import { MenuEnum } from '@/enums/editPageEnum'
import { getUUID, loadingFinish, isString, isArray } from '@/utils'
import { CreateComponentType, CreateComponentGroupType } from '@/packages/index.d'
import {
    PageStateEnum,
    ComponentEditStoreType,
    EditCanvasType,
    MousePositionType,
    TargetComponentType,
    RecordComponentType,
    EditCanvasConfigType,
    LayersType
} from './editStore.d'
import { ScrollBarsTypeEnum } from '@/enums/componentEnum'
import cloneDeep from 'lodash/cloneDeep'

export const baseEdit = {
    // 页面属性
    pageState: PageStateEnum.DESIGN,
    // 画布属性
    editCanvas: {
        // 编辑区域 Dom
        editLayoutDom: null,
        editContentDom: null,
        // 偏移量
        offset: 7,
        // 初始化
        isCreate: false,
        // 拖拽中
        isDrag: false,
        // 框选中
        isSelect: false
    },
    // 画布样式
    editCanvasConfig: {
        // 默认宽度
        width: 1000,
        // 默认高度
        height: 600,
        // 默认滚动条
        scrollbar: ScrollBarsTypeEnum.NONE
    },
    // 右键菜单
    rightMenuShow: false,
    // 鼠标定位
    mousePosition: {
        startX: 0,
        startY: 0,
        x: 0,
        y: 0
    },
    // 目标组件
    targetComponent: {
        hoverId: undefined,
        selectId: []
    },
    // 记录临时数据（复制、剪切）
    recordComponent: undefined,
    // 组件数组
    componentList: [],
    // 图层
    layersList: [
        {
            name: "全",
            statue: {
                load: true,
                lock: false,
                hide: false,
                enable: true
            }
        }, {
            name: "1",
            statue: {
                load: true,
                lock: false,
                hide: false,
                enable: true
            }
        }
    ],
    // 当前选择图层
    targetLayers: 1
}

export const useEditStore = defineStore({
    id: 'useEditStore',
    state: (): ComponentEditStoreType => (baseEdit),
    getters: {
        getMousePosition(): MousePositionType {
            return this.mousePosition
        },
        getRightMenuShow(): boolean {
            return this.rightMenuShow
        },
        getPageState(): PageStateEnum {
            return this.pageState
        },
        getEditCanvas(): EditCanvasType {
            return this.editCanvas
        },
        getEditCanvasConfig(): EditCanvasConfigType {
            return this.editCanvasConfig
        },
        getTargetComponent(): TargetComponentType {
            return this.targetComponent
        },
        getRecordComponent(): RecordComponentType | undefined {
            return this.recordComponent 
        },
        getComponentList(): Array<CreateComponentType | CreateComponentGroupType> {
            if (!this.targetLayers) return this.componentList

            function filterComponentList(components: Array<any>, filterCondition: (component: any) => boolean): Array<any> {
                return components.map((component) => {
                    if (component.isGroup && component.groupList) {
                        return {
                            ...component,
                            groupList: filterComponentList(component.groupList, filterCondition),
                        };
                    } else {
                        return component;
                    }
                }).filter(filterCondition);
            }

            return filterComponentList(this.componentList, (component) => {
                if (component.isGroup && (component.layers == 1 || component.layers == this.targetLayers)) {
                    return true
                } else if (component.layers == this.targetLayers) {
                    return true
                }
                return false
            })
        },
        getLayers(): Array<LayersType> {
            return this.layersList
        },
        getTargetLayers(): any {
            return this.layersList[this.targetLayers]
        },
        getLayersTree(): any {
            const fetchNodes: any = (list: Array<any>) => {
                const nodes = []
                for (let i = 0; i < list.length; i++) {
                    if (list[i].isGroup && (list[i].layers == 1 || list[i].layers == this.targetLayers || this.targetLayers == 0)) {
                        nodes.push({
                            id: list[i].id,
                            label: list[i].name,
                            children: fetchNodes(list[i].groupList)
                        })
                    } else if (list[i].layers == this.targetLayers || this.targetLayers == 0) {
                        nodes.push({
                            id: list[i].id,
                            label: list[i].name
                        })
                    }
                }
                return nodes
            }

            return [{
                id: '.',
                label: 'Page',
                children: fetchNodes(this.componentList)
            }]
        }
    },
    actions: {
        // * 恢复画板对象
        setState(state: ComponentEditStoreType) {
            this.editCanvas = state.editCanvas
            this.editCanvasConfig = state.editCanvasConfig
            this.componentList = state.componentList
            this.layersList = state.layersList
        },
        // * 设置画板属性
        setEditCanvas<T extends keyof EditCanvasType, K extends EditCanvasType[T]>(key: T, value: K) {
            this.editCanvas[key] = value
        },
        // * 设置画板样式
        setEditCanvasConfig<T extends keyof EditCanvasConfigType, K extends EditCanvasConfigType[T]>(key: T, value: K) {
            this.editCanvasConfig[key] = value
        },
        // * 设置右键菜单
        setRightMenuShow(value: boolean) {
            this.rightMenuShow = value
        },
        // * 设置页面状态
        setPageState(value: PageStateEnum){
            this.pageState = value
        },
        // * 设置目标数据 hover
        setTargetHoverComponent(hoverId?: TargetComponentType['hoverId']) {
            this.targetComponent.hoverId = hoverId
        },
        // * 设置目标数据 select
        setTargetSelectComponent(selectId?: string | string[], push: boolean = false) {
            // 重复选中
            if (this.targetComponent.selectId.find((e: string) => e === selectId)) return

            // 无 id 清空
            if (!selectId) {
                this.targetComponent.selectId = []
                return
            }
            // 多选
            if (push) {
                // 字符串
                if (isString(selectId)) {
                    this.targetComponent.selectId.push(selectId)
                    return
                }
                // 数组
                if (isArray(selectId)) {
                    this.targetComponent.selectId.push(...selectId)
                    return
                }
            } else {
                // 字符串
                if (isString(selectId)) {
                    this.targetComponent.selectId = [selectId]
                    return
                }
                // 数组
                if (isArray(selectId)) {
                    this.targetComponent.selectId = selectId
                    return
                }
            }
        },
        // * 设置记录数据
        setRecordComponent(item: RecordComponentType | undefined) {
            this.recordComponent = cloneDeep(item)
        },
        // * 设置鼠标位置
        setMousePosition(x?: number, y?: number, startX?: number, startY?: number): void {
            if (x) this.mousePosition.x = x
            if (y) this.mousePosition.y = y
            if (startX) this.mousePosition.startX = startX
            if (startY) this.mousePosition.startY = startY
        },
        // * 统一格式化处理入参 id
        idPreFormat(id?: string | string[]) {
            const idArr = []
            if (!id) {
                idArr.push(...this.getTargetComponent.selectId)
                return idArr
            }
            if (isString(id)) idArr.push(id)
            if (isArray(id)) idArr.push(...id)
            return idArr
        },
        // * 新增组件
        addComponentList(
            componentInstance:
                | CreateComponentType
                | CreateComponentGroupType,
            isHead = false,
            isHistory = false
        ): void {
            // 判断图层是否可入
            if (this.getTargetLayers.statue.lock) {
                return
            }

            // 图层处理
            if (this.targetLayers > 1) {
                componentInstance.layers = this.targetLayers
            }
            // 嵌套处理
            if (this.targetComponent.selectId.length) {
                const component = this.getComponetById(this.getLatestTargetComponent())
                if (component.isGroup) {
                    component.groupList.push(componentInstance)
                } else {
                    this.componentList.push(componentInstance)
                }
            } else {
                this.componentList.push(componentInstance)
            }
        },
        // * 找到目标 id 数据的下标位置，id可为父级或子集数组（无则返回-1）
        fetchTargetIndex(id?: string): number {
            const targetId = id || (this.getTargetComponent.selectId.length && this.getTargetComponent.selectId[0]) || undefined
            if (!targetId) {
                loadingFinish()
                return -1
            }
            const targetIndex = this.componentList.findIndex(e => e.id === targetId)

            // 当前
            if (targetIndex !== -1) {
                return targetIndex
            } else {
                const length = this.getComponentList.length
                for (let i = 0; i < length; i++) {
                    if (this.getComponentList[i].isGroup) {
                        for (const cItem of (this.getComponentList[i] as CreateComponentGroupType).groupList) {
                            if (cItem.id === targetId) {
                                return i
                            }
                        }
                    }
                }
            }
            return -1
        },
        /*****************************************************************************/
        // 根据id获取构建路径
        computePath(id: string): [Array<string>, Array<number>] {
            const findPathAndIndex = (
                components: Array<any>,
                targetId: string,
                path: Array<string> = [],
                index: Array<number> = []
            ): [Array<string>, Array<number>] | undefined => {
                for (let i = 0; i < components.length; i++) {
                    const component = components[i]
                    const componentPath = [...path, component.id]
                    const componentIndex = [...index, i]

                    if (component.id === targetId) {
                        return [componentPath, componentIndex]
                    }

                    if (component.groupList && component.groupList.length) {
                        const result = findPathAndIndex(
                            component.groupList,
                            targetId,
                            componentPath,
                            componentIndex
                        )

                        if (result) {
                            return result
                        }
                    }
                }
                return undefined
            }
            const result = findPathAndIndex(this.componentList, id)
            if (result) {
                return result
            } else {
                return [[], []]
            }
        },
        // 根据id获取组件（不允许重复,无则返回null）
        getComponetById(id: string | undefined): any {
            if (!id) {
                return this.componentList[this.componentList.length - 1]
            }

            const findComponentById = (id: string, componentList: Array<any>): any => {
                for (const component of componentList) {
                    if (component.id == id) {
                        return component
                    } else if (component.isGroup) {
                        const nestComponent = findComponentById(id, component.groupList)
                        if (nestComponent) {
                            return nestComponent
                        }
                    }
                }
                return undefined
            }
            return findComponentById(id, this.componentList)
        },
        // 根据name获取组件（允许重名）
        getComponetByName(name: string): Array<any> {
            let targetComponents: Array<any> = []
            let fetchComponent = (element: Array<any>, name: string) => {
                for (let index = 0; index < element.length; index++) {
                    if (element[index].isGroup) {
                        fetchComponent(element[index].groupList, name)
                    }
                    if (element[index].name == name) {
                        targetComponents.push(element[index])
                    }
                }
            }
            fetchComponent(this.componentList, name)
            return targetComponents
        },
        // 获取最后一个target组件（无则返回null）
        getLatestTargetComponent(): any {
            if (this.targetComponent.selectId.length == 0) {
                return null
            } else {
                return this.targetComponent.selectId[this.targetComponent.selectId.length - 1]
            }
        },
        // 根据id删除组件
        removeComponentList(id?: string | string[], isHistory = true): void {
            const idArr = this.idPreFormat(id)
            // const history: Array<CreateComponentType | CreateComponentGroupType> = []
            // 遍历所有对象
            if (!idArr.length) return
            idArr.forEach(ids => {
                const [path, index] = this.computePath(ids)
                if (path.length == 1) {
                    this.componentList.splice(index[0], 1)
                } else if (path.length > 1) {
                    const parentComponent = this.getComponetById(path[path.length - 2])
                    parentComponent.groupList.splice(index[index.length - 2], 1)
                }
            })
        },
        // 交换两个组件位置
        swapElements<T>(index1: number, index2: number): void {
            [this.componentList[index1], this.componentList[index2]] = [this.componentList[index2], this.componentList[index1]];
        },
        // 在指定下标处插入组件
        insertComponent(index: number, component: CreateComponentType | CreateComponentGroupType): void {
            if (index > this.componentList.length - 1) {
                this.componentList.push(component)
            } else {
                this.componentList.splice(index, 0, component)
            }
        },
        // 删除指定下表的组件并返回
        removeComponent(index: number): any {
            return this.componentList.splice(index, 1)[0]
        },
        /*****************************************************************************/
        // 添加图层并选择图层
        addLayers(): void {
            this.layersList.push({
                name: this.layersList.length.toString(),
                statue: {
                    load: true,
                    lock: false,
                    hide: false,
                    enable: true
                }
            })
            // this.targetLayers = this.layersList.length - 1
        },
        // 删除图层
        deleteLayers(name: string): void {
            if (name == "1" || name == "全") return
            let index = 0
            for (; index < this.layersList.length; index++) {
                if (this.layersList[index].name == name) break
            }

            const deleteLayersComponent = (list: Array<any>) => {
                for (let i = 0; i < list.length; i++) {
                    if (list[i].isGroup) {
                        if (list[i].layers == index) {
                            list.splice(i--, 1)
                        } else {
                            deleteLayersComponent(list[i].groupList)
                        }
                    } else if (list[i].layers == index) {
                        list.splice(i--, 1)
                    }
                }
            }

            deleteLayersComponent(this.componentList)

            this.layersList.splice(index, 1)
            this.layersList.forEach((item, index) => {
                if (item.name != "1" && item.name != "全") {
                    item.name = index.toString()
                }
            })
        },
        // 设置选中图层
        setTargetLayers(tab: any): void {
            let index = 0
            for (; index < this.layersList.length; index++) {
                if (this.layersList[index].name == tab.props.name) break
            }
            this.targetLayers = index
        },
        /*****************************************************************************/
        // * 移动位置
        setMove(keyboardValue: MenuEnum) {
            const index = this.fetchTargetIndex()
            if (index === -1) return
            const attr = this.getComponentList[index].attr
            const distance = 10
            switch (keyboardValue) {
                case MenuEnum.ARROW_UP:
                    attr.y && (attr.y -= distance)
                    break
                case MenuEnum.ARROW_RIGHT:
                    attr.x && (attr.x += distance)
                    break
                case MenuEnum.ARROW_DOWN:
                    attr.y && (attr.y += distance)
                    break
                case MenuEnum.ARROW_LEFT:
                    attr.x && (attr.x -= distance)
                    break
            }
        },

    }
})


