<template>
  <el-card class="todo-list-wrapper">
    <header>
      <div class="title">
        todo list
      </div>
      <div class="tags-wrapper">
      <Screenfull :el="el"/>
      <ul class="tags">
        <li></li>
        <li></li>
        <li></li>
      </ul>
      </div>

    </header>
    <main class="todo-item-wrapper">

      <ul>
        <li v-for="item in todoList"
            :key="item.content"
            class="dragItem"
            :style="'border-left: 4px solid'+item.type"
        >
          <div class="todo-item">
            <p class="content">{{ item.content }}</p>
            <el-progress :color="item.type" :percentage="computeProgress(item.startTime,item.finalTime)"/>
          </div>
          <el-tooltip
              effect="dark"
              content="移动"
              placement="bottom"
              :show-after="800"
              class="progress"
          >
            <svg-icon class=" icon-move" name="move"/>
          </el-tooltip>
        </li>
      </ul>
    </main>
  </el-card>
</template>

<script setup lang="ts">
import { onMounted, ref} from 'vue';
import Screenfull from '@/components/screenfull/index.vue';
import {TypeEnum} from '@/enum/todoList'
import {useDrag} from "@/hooks/useDrag";

interface todoItem {
  startTime: Date | string,
  finalTime: Date | string,
  content: string,
  type: TypeEnum
}

const todoList = ref<todoItem[]>([])
const el = ref<HTMLElement>()


/** 计算进度条 */
function computeProgress(startTime: Date | string, finalTime: Date | string) {
  const period = new Date(finalTime).getTime() - new Date(startTime).getTime();
  const elapsed = new Date().getTime() - new Date(startTime).getTime();
  const percentage = Math.round((elapsed / period) * 100);
  if (percentage > 100) return 100
  return percentage;
}

function test() {
  todoList.value = [
    {
      startTime: '2023/07/12 12:00:00',
      finalTime: '2023/07/12 21:00:00',
      content: '解决todoList',
      type: TypeEnum.urgent
    },
    {
      startTime: '2023/07/01 12:00:00',
      finalTime: '2023/07/21 18:00:00',
      content: '在github开源',
      type: TypeEnum.significant
    },
    {
      startTime: '2023/07/01 12:00:00',
      finalTime: '2024/07/21 18:00:00',
      content: '产品上市',
      type: TypeEnum.significant
    }
  ]
}

test()

const {initDragEventsByEl, isAboveMiddle} = useDrag()


/** 设置拖拽样式 */
const setDropItemStyle = (dragEvent: DragEvent) => {
  const dropDom = dragEvent.target as HTMLHtmlElement
  const isAbove = isAboveMiddle(dragEvent)
  if (isAbove) {
    dropDom.style.boxShadow = '0px -5px 0px -3px #999'
  } else {
    dropDom.style.boxShadow = '0px 5px 0px -3px #999'
  }
}

/** 恢复原始样式 */
const clearDropItemStyle = (items: HTMLCollectionOf<Element>) => {
  for (const item of Array.from(items)) {
    if (item instanceof HTMLElement) {
      item.style.boxShadow = ''
    }
  }
}

/** 开始拖拽 */
function handleDragStart(event: DragEvent, item: todoItem) {
  const dataTransfer = event.dataTransfer
  if (dataTransfer) {
    dataTransfer.effectAllowed = 'move'
    dataTransfer.setData('dragItem', JSON.stringify(item))
  }
}

/** 结束拖拽 */
function handleDrop(event: DragEvent, dragList: todoItem[], dropItem: todoItem) {
  const dragItem = JSON.parse(event?.dataTransfer?.getData('dragItem') as string)
  let dragIndex = dragList.findIndex(e => e.content === dragItem.content)
  let dropIndex = dragList.findIndex(e => e.content === dropItem.content)

  if (dragIndex !== -1 && dropIndex !== -1 && dragIndex !== dropIndex) {
    // 修正index
    dragIndex < dropIndex && dropIndex--
    !isAboveMiddle(event) && dropIndex++
    // 修改顺序
    const dragItems = dragList.splice(dragIndex, 1)
    dragList.splice(+dropIndex, 0, ...dragItems)
  }
}


onMounted(() => {
  const dragDomList = document.getElementsByClassName('dragItem')
  for (const index in Array.from(dragDomList)) {
    const dragDom = dragDomList[index] as HTMLElement
    const dragItem = todoList.value[index]
    initDragEventsByEl(dragDom, {
      'dragstart': (event) => {handleDragStart(event, dragItem)},
      'drop': (event) => {
        handleDrop(event, todoList.value, dragItem)
        clearDropItemStyle(dragDomList)
      },

      'dragenter': (event) => {
        const targetDom = event.target
        if (!(targetDom instanceof HTMLElement && targetDom?.className?.includes('dragItem'))) {
          return
        }

        clearDropItemStyle(dragDomList)
        setDropItemStyle(event)
      },
      'dragover': (event) => {
        const targetDom = event.target
        if (!(targetDom instanceof HTMLElement && targetDom?.className?.includes('dragItem'))) {
          return
        }
        event.preventDefault()
        setDropItemStyle(event)
      },
      'dragleave': () => {
        clearDropItemStyle(dragDomList)}
    })
  }

  // 全屏操作
  el.value = document.getElementsByClassName('todo-list-wrapper')[0] as HTMLElement
})

</script>

<style lang="less" scoped>
.todo-list-wrapper {
  padding: 15px;

  header {
    display: flex;
    justify-content: space-between;
    padding-bottom: 10px;
    border-bottom: 1px solid @theme-line-color;
    .tags-wrapper{
      display: flex;
    }
    .tags {
      display: flex;
      margin-left: 10px;

      li {
        width: 15px;
        height: 15px;
        margin-left: 5px;
        border-radius: 50%;

        &:nth-of-type(1) {
          background-color: #ff5e5d;
        }

        &:nth-of-type(2) {
          background-color: #ffba2c;
        }

        &:nth-of-type(3) {
          background-color: #20cb5a;
        }
      }
    }
  }
}

.todo-item-wrapper {
  padding: 10px;
  overflow-y: auto;

  ul > li {
    overflow: hidden;
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: max-content;
    line-height: 50px;
    margin-bottom: 10px;
    padding-left: 10px;
    transition: .3s;

    .todo-item {
      width: calc(100% - 20px);
      pointer-events: none;

      .content {
        overflow: hidden;
        white-space: nowrap;
      }
    }

    .icon-move {
      cursor: grab;
    }
  }

}

</style>
