<template>
  <template v-for="route in menu">
    <el-sub-menu v-if="!isOneItemShow(route)"
                 :class="{'aside-collapse':isCollapse}"
                 :index="route.path">

      <template #title>
        <svg-icon class="aside-svg"
                  v-if="iconShow"
                  :name="route?.meta?.svgIcon"
        />
        <span class="aside-title">
          {{ route?.meta?.title }}
        </span>
      </template>

      <aside-item
          :menu="route.children"
      />
    </el-sub-menu>
    <el-menu-item v-else
                  :class="{'aside-collapse':isCollapse}"
                  @click="clickMenuItem(route.children && route.children[0] || route)"
                  :index="route.path"
    >
      <svg-icon v-if="iconShow"
                class="aside-svg"
                :name="route?.meta?.svgIcon"
      />
      <template #title>
        <span class="aside-title">
        {{ route?.meta?.title }}
        </span>
      </template>
    </el-menu-item>

  </template>
</template>

<script setup lang="ts">

import {useRouter} from "vue-router";

// TODO 组件遍历自身

const props = defineProps({
  menu: {
    type: Object,
    require: true,
  },
  iconShow: {
    type: Boolean,
    default: false
  },
  isCollapse: {
    type: Boolean,
    require: true
  }
})

const router = useRouter()


// 过滤隐藏
const menu = props.menu?.filter(route => !route.meta.sidebarHide)


// 判断单个路由 和 是否合并显示
const isOneItemShow = (router) => {
  if(router.children){
    if ( router.children.length > 1 || router.children[0].children) {
      return false
    }
  }
  return true
}

const clickMenuItem = (item) => {
  if (item?.meta?.isExt) {
    window.open(item.path, '_blank')
  } else {
    router.push(item.path)
  }
}

</script>

<style lang="less" scoped>
.aside-svg {
  box-sizing: content-box;
  margin: 0 0.5em;
  font-size: 1.2em;
}

.aside-collapse {
  :deep(.el-tooltip__trigger) {
    padding: 0;
  }
  .aside-svg {
    width: 100%;
  }
}


</style>
