<template>
  <svg v-if="name" class="svg-icon" aria-hidden="true">
    <use :href="symbolId"  />
  </svg>
</template>

<script setup lang="ts">
import {computed} from 'vue'

const props = defineProps({
  prefix:{
    type:String,
    default:'icon'
  },
  name:{
    type:String,
    default:''
  }
})

const symbolId = computed(()=>`#${props.prefix}-${props.name}`)

</script>

<style lang="less" scoped>
.svg-icon{
  outline: none;
  width: 1em;
  height: 1em;
  fill: currentColor;
  vertical-align: middle;
}
</style>
