<template>
  <section class="tag-wrapper">
    <el-tag
        v-for="tag in displayTags"
        class="tag"
        :class="{isActive:tag.name===currentTag?.name}"
        effect="plain"
        :closable="tag.name !== defaultTagName"
        @close="closeTag(tag)"
        @click='selectTag(tag)'
    >
      {{ tag?.meta?.title }}
    </el-tag>
  </section>


</template>

<script setup lang="ts">
import {onMounted, ref, watch} from 'vue'
import {RouteRecordRaw, useRoute, useRouter} from "vue-router";
import {useUserStore} from '@/store/user'

const route = useRoute()
const router = useRouter()
const {routes} = useUserStore()

// 默认tag
const defaultTagName = 'dashboard'
// 当前tag
const currentTag = ref<RouteRecordRaw>()
// tagBar中全部tag
const displayTags = ref<RouteRecordRaw[]>([])

/** 获取当前全部可用路由信息 */
const computeRoutes = (targetList: RouteRecordRaw[]) => {
  let result: RouteRecordRaw[] = []
  targetList.forEach(item => {
    if (item.children) {
      const childResult = computeRoutes(item.children) as RouteRecordRaw[]
      if (childResult.length > 0) {
        result = result.concat(childResult)
      }
    }
    result.push(item)
  })
  return result
}
const usableRoutes = computeRoutes(routes)

/** 获取标签 */
const getDisplayTag = (tagName)=>{
  return displayTags.value.find(route=>route.name === tagName)
}
const getUsableTag = (tagName)=>{
  return usableRoutes.find(route=>route.name === tagName)
}


/** 选择标签 */
const selectTag = (tag) => {
  router.push({path:tag.path,replace:true})
}

/** 关闭标签 */
const closeTag = (tag) => {
  const index = displayTags.value.findIndex(item => item.name == tag.name)
  if (index !== -1) {
    displayTags.value.splice(index, 1)
    if (tag.name === currentTag?.value?.name) {
      const chooseIndex = index - 1 >= 0 ? index - 1 : 0
      selectTag(displayTags.value[chooseIndex])
    }
  }
}

/** 初始化tag，保证有个默认的tag存在 */
onMounted(()=>{
  const hasDefault = getDisplayTag(defaultTagName)
  if(!hasDefault){
    const defaultTag = getUsableTag(defaultTagName)
    if(defaultTag){
      displayTags.value.splice(0,0,defaultTag)
    }
  }
})

/** 检测路由 */
watch(
    () => route.name,
    (newVal) => {
      const currentPathName = newVal
      const chosenTag = getDisplayTag(currentPathName)
      if (chosenTag) {
        currentTag.value = chosenTag
      } else {
        const route = getUsableTag(currentPathName)
        if (route && route?.meta?.title) {
          displayTags.value.push(route)
          currentTag.value = route
        }
      }
    }, {
      immediate: true
    }
)


</script>

<style lang="less" scoped>
.tag {
  margin: 5px;
  background-color: @theme-color;
  border: 1px solid @theme-line-color;
  color: @theme-font-color;
  cursor: pointer;

  :deep(.el-icon) {
    color: @theme-font-color;
  }
}

.isActive {
  background-color: @theme-label-active-color;
  color: @theme-label-active-font-color;

  :deep(.el-icon) {
    color: @theme-label-active-font-color;
  }
}
</style>