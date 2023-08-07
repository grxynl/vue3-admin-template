<template>
  <section class="err-wrapper">
    <img src="@/assets/image/404.gif" alt="">
    <div class="info ">
      <svg-icon class="icon-404" name="404"/>
       Page Not Found
    </div>
    <router-link :to="{path:'/dashboard',replace:true}">
      <div class="back-home-btn" >返回首页</div>
    </router-link>
  </section>
</template>

<script setup lang="ts">



</script>

<style lang="less" scoped>
.err-wrapper{
  height: 700px;
  img{
    width: 30%;
    margin-left: 35%;
  }
  .info{
    .icon-404{
      color: @theme-label-active-color;
      font-size: 2em;
    }
    text-align: center;
    font-size: 60px;
  }
  .back-home-btn{
    width: 180px;
    margin:  auto;
    padding: 10px;
    color: @theme-label-active-font-color;
    font-size: 2em;
    text-align: center;
    background-color: @theme-label-active-color;
    border-radius: 0.3em;
    cursor: pointer;
  }
}
</style>
