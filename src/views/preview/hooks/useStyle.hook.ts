import { CreateComponentType, CreateComponentGroupType, PickCreateComponentType } from '@/packages/index.d'
import {
  GroupModeEnum
} from "@/enums/componentEnum"

type AttrType = PickCreateComponentType<'attr'>

export const useComponentStyle = (attr: AttrType, index: number) => {
  if (!attr) return {}
  const componentStyle = {
    zIndex: index + 1,
    left: `${attr.x}px`,
    top: `${attr.y}px`
  }
  return componentStyle
}

export const useDockStyle = (componentList: Array<any>, id: string) => {

}
