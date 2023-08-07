<template>
    <el-dropdown trigger="click" @command="setTheme">
      <el-icon>
        <el-tooltip effect="dark" content="主题" placement="bottom">
          <svg-icon name="palette"/>
        </el-tooltip>
      </el-icon>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item
              v-for="theme in themeList"
              :command="theme"
          >{{theme.title}}</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>

</template>

<script setup lang="ts">
import {useTheme} from '@/hooks/useTheme'

const {initTheme,themeList,setTheme} = useTheme()
initTheme()
</script>

<style lang="less" scoped>
.el-icon{
  height: 100%;
  svg{
    cursor: pointer;
  }
}
.el-dropdown{
  color:inherit;
}
</style>
