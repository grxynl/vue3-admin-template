<template>
  <div>
    <el-card >
      <template #header>
        <div>{{ title }}</div>
        <slot name="tag"></slot>
      </template>
      <main>
        <svg-icon class="icon" name="salesVolume" />
        <div class="count" v-countTo="2000">
          {{ count }}
        </div>
      </main>
      <footer>
        {{ footer }}
      </footer>
    </el-card>
  </div>
</template>

<script setup lang="ts">

defineProps({
  title:{
    type:String,
    default:'标题'
  },
  icon:{
    type:String,
    default:'salesVolume'
  },
  count:{
    type:Number,
    default:'000'
  },
  footer:{
    type:String,
  }
})
</script>

<style lang="less" scoped>
  .el-card{
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;

    :deep(.el-card__header){
      display: flex;
      justify-content: space-between;
      height: 30%;
    }
    :deep(.el-card__body){
      display: flex;
      flex-direction: column;
      padding: 0;
      main{
        display: flex;
        justify-content: space-evenly;
        align-items: center;
        height: 50%;
        .icon{
          flex: 2;
          color: @theme-label-active-color;
          width: 50%;
          height: 50%;
        }
        .count{
          flex: 3;
          font-size: 1.5em;
          text-align: center;
        }
      }
      footer{
        height: 20%;
        padding: 10px;
        border-top: 1px solid @theme-line-color;
        text-align: center;
      }
    }
  }
</style>
