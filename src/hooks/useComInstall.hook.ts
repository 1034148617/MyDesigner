import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { CreateComponentType, CreateComponentGroupType } from '@/packages/index.d'
import { fetchComponent } from '@/packages/index'
import { fetchID, Aggregate, DB, COL_CANVAS } from '@/utils'
import { useEditStore, baseEdit } from '@/store/modules/editStore/editStore'

export function useComInstall() {
    const isShow = ref(false)
    const editStore = useEditStore()

    async function loadData() {
        const id = computed(() => {
            const route = useRoute()
            return fetchID(route.fullPath)
        })

        if (id) {
            const res = await Aggregate(DB, COL_CANVAS, [
                { $match: { "_id.id": id.value } },
                { $sort: { "_id.updateTime": -1 } },
                { $limit: 1 }
            ])
            if (res && res.data.result.length > 0) {
                editStore.setState(res.data.result[0])
                return 
            }
        }

        editStore.setState(baseEdit)
    }

    onMounted(async () => {
        // await loadData()
        const componentList: Array<CreateComponentType | CreateComponentGroupType> = editStore.getComponentList

        if (componentList.length) {
            // 注册组件(一开始无法获取w indow['$vue'])
            const intervalTiming = setInterval(() => {
                if (window['$vue'].component) {
                    clearInterval(intervalTiming)

                    const initComponent = (target: CreateComponentType | CreateComponentGroupType) => {
                        if (target.isGroup) {         // 分子（容器）组件 进行递归
                            (target as CreateComponentGroupType).groupList.forEach(item => {
                                initComponent(item)
                            })
                        }
                        // 原子组件 进行注册操作
                        if (!window['$vue'].component(target.key)) {
                            window['$vue'].component(target.key, fetchComponent(target.key)?.default)
                        }
                    }

                    componentList.forEach(async (e: CreateComponentType | CreateComponentGroupType) => {
                        initComponent(e)
                    })
                    isShow.value = true 
                }
            }, 200)
        }
    })

    return {
        isShow
    }
}

