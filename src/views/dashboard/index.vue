<template>
  <div>
    <CardGroup/>
    <VarietyAnalysis class="center-chart"/>
    <todo-list class="center-chart"/>
  </div>
</template>

<script >

</script>

<script setup lang="ts">
import {defineOptions} from 'vue'
import CardGroup from './components/cardGroup/index.vue'
import VarietyAnalysis from './components/VarietyAnalysis.vue'
import TodoList from './components/TodoList.vue'

defineOptions({
  name:'dashboard'
})

</script >

<style lang="less" scoped>

.center-chart{
  display: inline-block;
  width: calc(50% - 20px);
  height: 400px;
  margin: 20px 10px 0 10px;
}
</style>
