<template>

  <el-icon @click="trigger" >
    <el-tooltip :content="isFull? '退出全屏' : '全屏'" placement="bottom" effect="dark">
      <svg-icon :name=" isFull? 'closeScreenfull': 'openScreenfull'"/>
    </el-tooltip>
  </el-icon>

</template>

<script setup lang="ts">
import {ref} from 'vue'
import {ElMessage } from 'element-plus'
import screenfull from 'screenfull'

const props = defineProps({
  el:{
    type:HTMLElement,
    default:document.documentElement
  },
})


const isFull = ref<boolean>(false)

const trigger = ()=>{
  if(screenfull.isEnabled){
    screenfull.toggle(props.el)
    screenfull.isFullscreen
        ? isFull.value = false
        : isFull.value = true
  }else{
    ElMessage.error('此设备不支持全屏操作！')
  }
}

</script>

<style lang="less" scoped>
</style>
