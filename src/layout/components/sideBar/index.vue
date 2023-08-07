<template>
  <div class="aside-wrapper">
    <section class="logo-wrapper" >
      <p style="color:#fff; font-size: 50px; text-align: center">hr</p>
    </section>
    <el-menu
        default-active="dashboard"
        :collapse="isCollapse"
        :unique-opened="true"
        :collapse-transition="false"
    >
      <aside-item
          :menu="menu"
          :icon-show="true"
          :is-collapse="isCollapse"
      />
    </el-menu>
  </div>
</template>


<script lang="ts" setup>
import {computed} from 'vue'
import AsideItem from './componts/asideItem.vue'
import {useUserStore} from '@/store/user'

const props = defineProps({
  isCollapse: {
    type: Boolean,
    default: false
  }
})



// 当前角色全部路由
const userStore = useUserStore()
const menu = userStore.routes

const asideWidth = computed(()=>props.isCollapse? 'var(--aside-min-width)': 'var(--aside-max-width)')


</script>
<!---->
<style lang="less" scoped>
.aside-wrapper {

  width: v-bind(asideWidth);
  height: calc(100% - @tag-height);
  transition:.5s;
  background-color: @theme-aside-bg-color;

  .logo-wrapper {
    height: calc(@header-height + @tag-height);
    line-height: calc(@header-height + @tag-height);
  }

  :deep(.el-menu-item){
    &.is-active {
      background-color: @theme-aside-active-bg-color;
    }
  }
}
</style>


