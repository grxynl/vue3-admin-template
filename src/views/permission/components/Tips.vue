<template>
  <el-card class="tips">
    <template #header>
      Tips:
    </template>
    <p>
      1. 这里检测到没有权限就直接删除了dom；如果想切换自如可以用<b>v-if</b>或者将指令中删除元素改为 <b>display:none</b>
    </p>
    <p>
      2. 在请求中已经封装<b>LOG_OUT_CODE</b>，当后端检测权限不足可以返回这个code来强制退出登录
    </p>
  </el-card>
</template>

<script setup lang="ts">

</script>


<style lang="less" scoped>
                   .tips{
                     margin-top: 20px;
                     p{
                       line-height: 2em;
                     }
                   }
</style>