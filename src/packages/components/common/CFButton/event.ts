import { EventType } from '@/packages/index.d'
import { BaseEvent } from '@/enums/eventEnum';

const event: EventType = {
    baseEvents:{
        [BaseEvent.ON_LOADING]: undefined,
        [BaseEvent.ON_CLICK]: undefined,
        [BaseEvent.ON_MOUSEENTER]: undefined,
        [BaseEvent.ON_MOUSELEAVE]: undefined,
        [BaseEvent.ON_RESIZE]: undefined,

    },
    componentEvents:{
        // 自定义事件
    }
}

export default event