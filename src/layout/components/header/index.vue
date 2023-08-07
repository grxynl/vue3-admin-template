<template>
  <div class="header-top">
      <el-icon @click="()=>emit('update:isCollapsed',!isCollapsed)" class="header-icon" :size="20">
        <component :is="isCollapsed ?  Expand:Fold"/>
      </el-icon>
      <Breadcrumb class="breadcrumb"></Breadcrumb>
      <Screenfull class="header-icon"/>
      <Theme-switch class="theme-switch"/>
      <User-dropdown class="user-dropdown"/>
  </div>
  <div class="header-bottom">
    <TagsBar/>
  </div>
</template>

<script setup lang="ts">

import {Fold, Expand} from '@element-plus/icons-vue'
import Breadcrumb from './components/Breadcrumb/index.vue'
import TagsBar from './components/TagsBar/index.vue'
import Screenfull from '@/components/screenfull/index.vue'
import ThemeSwitch from './components/themeSwitch/index.vue'
import UserDropdown from './components/userDropdown/index.vue'

defineProps({
  isCollapsed: {
    type: Boolean,
  }
})
const emit = defineEmits(['update:isCollapsed'])

</script>

<style lang="less" scoped>
.column-center {
  height: @header-height;
  line-height: @header-height;
}

.header-top {
  display: flex;
  width: 100%;
  height: @header-height;
  padding: 0 1em;

  .breadcrumb {
    flex: 1;
    .column-center();
  }

  .header-icon {
    margin-right: 1em;
    font-size: 16px;
    .column-center();
    :deep(svg){
      cursor: pointer;
    }
  }
  .theme-switch{
    margin-right: 10px;
    :focus {
      outline: none;
    }
  }
  .user-dropdown {
    margin: 0 10px;
    cursor: pointer;
    .column-center();
    :focus {
      outline: none;
    }
    :deep(.el-avatar) {
      vertical-align: middle;
    }
  }
}

.header-bottom{
  height: 34px;
  box-shadow: 0 -1px 1px @theme-line-color;
}
</style>
