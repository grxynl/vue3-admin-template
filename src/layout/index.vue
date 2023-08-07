<template>
  <section class="layout-wrapper">
    <aside class="left-wrapper">
      <my-side :is-collapse="isCollapsed"/>
    </aside>
    <div class="right-wrapper">
      <header>
        <my-header v-model:isCollapsed="isCollapsed">
        </my-header>
      </header>
      <main class="scrollbar">
        <router-view v-slot="{ Component, route }">
          <transition name="fade">
              <keep-alive :include="KEEP_ALIVE_COMPONENT">
                <component :is="Component" :key="route.path"/>
              </keep-alive>
          </transition>
        </router-view>
      </main>
    </div>
  </section>
</template>



<script setup lang="ts">
import {onMounted, watch, ref, computed} from 'vue'
import MyHeader from './components/header/index.vue'
import MySide from './components/sideBar/index.vue'
import cache from '@/utils/cache'
import {KEEP_ALIVE_COMPONENT} from '@/constants/setting'
import {IS_COLLAPSED_KEY} from '@/constants/cacheKeys'

const isCollapsed = ref<boolean>(false)

onMounted(()=>{
  isCollapsed.value =  cache.getItem(IS_COLLAPSED_KEY)
})
watch(()=>isCollapsed.value,()=>{
  cache.setItem(IS_COLLAPSED_KEY,isCollapsed.value)
})

</script>

<style lang="less" scoped>
body {
  background-color: @theme-bg-color;
}

.theme-style{
  color: @theme-font-color;
  background-color: @theme-bg-color;
}

.layout-wrapper {
  display: flex;

  .left-wrapper {
    z-index:999;
    position: sticky;
    top: 0;
    left: 0;
    flex-shrink: 0;
    overflow-x: hidden;
    overflow-y: auto;
    height: 100vh;
  }

  .right-wrapper {
    flex:1;
    .theme-style();
    header{
      .theme-style();
      background-color: @theme-color;
    }
    main{
      overflow-y: scroll;
      position: relative;
      height: calc( 100% - 10px * 2 - @header-height - @tag-height );
      margin: 10px;
      background-color: @theme-color;
    }
  }
}

</style>
