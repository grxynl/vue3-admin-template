<template>
    <el-dropdown >
    <span>
      <el-avatar :size="30" :fit="'cover'" :src="circleUrl" />
    </span>
      <template #dropdown>
        <el-dropdown-menu>
          <span @click="toAbout">
          <el-dropdown-item>关于</el-dropdown-item>
            </span>
          <el-dropdown-item>GitHub</el-dropdown-item>
          <span @click="logout">
          <el-dropdown-item >退出登录</el-dropdown-item>
            </span>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
</template>


<script setup lang="ts">
import {ref} from 'vue'
import {useUserStore} from '@/store/user'
const userStore = useUserStore()

const circleUrl = ref<string>('https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png')
const {logout} = userStore

// function logout(){
//   console.log('logout')
//
// }
function toAbout(){
  console.log('about')
}


</script>

<style lang="less" scoped>

</style>