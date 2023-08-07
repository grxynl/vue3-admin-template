import {onUnmounted} from 'vue'
export type eventList = ['drag','dragover','drop','dragstart','dragend','dragenter','dragleave']
type eventFunction = (this: HTMLElement, ev: DragEvent,...args) => any

/**
 * @example {
 *     'darg':[
 *         function handleDarg (){}
 *     ]
 * }
 */
export type listenEvents = {
    [eventName in eventList[number]]?:eventFunction|eventFunction[]
}

export type listenEventsMap = Map<HTMLElement,{
    [eventName in eventList[number]]?:eventFunction|eventFunction[]
}>


export function useDrag(){
    let dragEventMap:listenEventsMap = new Map()

    /** 配置监听事件 */
    function initDragEventsByEl(el:HTMLElement,events:listenEvents){
        if(dragEventMap.has(el)){
            clearDragListenerByEl(el)
        }
        el.draggable = true
        dragEventMap.set(el,events)
        for(const eventName in events){
            setDragListenerByEl(el,eventName as eventList[number],events[eventName])
        }
    }

    /** 挂载drag监听事件 */
    function setDragListenerByEl(el:HTMLElement,eventName:eventList[number],func:eventFunction|eventFunction[]){
        if(Array.isArray(func)){
            func.forEach(e => setDragListenerByEl(el,eventName,e))
        }else {
            el.addEventListener(eventName, func,false)
        }
    }

    /** 移除el中某个监听事件 */
    function removeDragListenerByEl(el:HTMLElement,eventName:eventList[number],func:eventFunction){
        const eventList = dragEventMap.get(el)
        const event = eventList && eventList[eventName]
        if(!event) return
        try{
        if(Array.isArray(event)){
            const findFunc =  event.find(e=>e.toString() === func.toString())
            if(!findFunc) return false
            el.removeEventListener(eventName,findFunc)
            return true
        }else{
            if(event.toString() === func.toString()){
                el.removeEventListener(eventName,func)
                return true
            }else return false
        }}catch (ex){
            console.error('removeListenEvents error:',ex)
        }
    }

    /** 清除el中所有监听事件 */
    function clearDragListenerByEl(el:HTMLElement){
        const eventList = dragEventMap.get(el)
        for (let eventName in eventList){
            const event = eventList[eventName]
            if( ! Array.isArray(event)){
                el.removeEventListener(eventName,event)
            }else{
                event.forEach(e => el.removeEventListener(eventName,e))
            }
        }
    }

    /** 清除所有el中监听事件 */

    function clearDragListener(){
        for(let listener of dragEventMap.keys()){
            clearDragListenerByEl(listener)
        }
    }

    onUnmounted(()=>{
        clearDragListener()
    })

    /** 判断鼠标在drop元素中位置 */
    const isAboveMiddle = (dragEvent:DragEvent)=>{
        console.log(dragEvent)
        const dropDom = dragEvent.target as HTMLHtmlElement
        const dropDomMiddle = dropDom.offsetHeight/2
        console.log(dragEvent.offsetY,dropDomMiddle)
        if(dragEvent.offsetY > dropDomMiddle){
            return false
        }else{
            return true
        }
    }

    return {
        initDragEventsByEl,
        setDragListenerByEl,
        removeDragListenerByEl,
        clearDragListenerByEl,
        clearDragListener,
        isAboveMiddle
    }
}
