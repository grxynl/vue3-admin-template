<template>

    <el-breadcrumb :separator-icon="ArrowRight">
      <el-breadcrumb-item class="breadcrumb-item" v-for="item in breadcrumbItems" :to="{ path: item.path }">{{item.meta.title}}</el-breadcrumb-item>

    </el-breadcrumb>

</template>

<script setup lang="ts">
import {ref, watch} from 'vue'
import {useRouter,useRoute,RouteLocationMatched} from 'vue-router'
import {ArrowRight} from '@element-plus/icons-vue'

const router = useRouter()
const route = useRoute()

const breadcrumbItems = ref<RouteLocationMatched[]>([])

const refreshBreadcrumbItems = ()=>{
  breadcrumbItems.value = route.matched.filter(r=>r.meta.title)
}

refreshBreadcrumbItems()

watch(
    ()=>route.path,
    (newPath)=>{
      refreshBreadcrumbItems()
    },{
      immediate:true
    }
)

</script>

<style lang="less" scoped>
.breadcrumb-item{
  :deep(.is-link){
    color: inherit;
  }
}
</style>