<template>
  <el-card class="btn-wrapper">
    <el-button @click="handleReq">权限不足测试</el-button>
    这里会强制退出登录
  </el-card>
</template>

<script setup lang="ts">
import {noPermission} from "@/api/test";

function handleReq(){
  noPermission()
}
</script>

<style lang="less" scoped>
.btn-wrapper{
  margin-top:20px;
  padding:20px;
}
</style>