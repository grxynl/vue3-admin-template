<template>
  <el-card>
    <template #header>
      受众人群
    </template>
    <div class="variety-item"></div>
  </el-card>
</template>

<script setup lang="ts">
import {useECharts} from '@/hooks/useECharts'
import {onMounted} from "vue";

const {initChart,setOptions} = useECharts()

onMounted(()=>{
  const Dom = document.getElementsByClassName('variety-item')[0] as HTMLHtmlElement
  initChart(Dom,["legend"])

  setOptions({
    tooltip: {
      trigger: 'item'
    },
    legend: {
      top: '5%',
      left: 'center',
    },
    series: [
      {
        name: 'Access From',
        type: 'pie',
        radius: ['40%', '70%'],
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 10,
          borderColor: '#fff',
          borderWidth: 2,
        },
        label: {
          show: false,
          position: 'center'
        },
        emphasis: {
          label: {
            show: true,
            fontSize: 40,
            fontWeight: 'bold'
          }
        },
        labelLine: {
          show: false
        },
        data: [
          { value: 1048, name: 'Search Engine' },
          { value: 735, name: 'Direct' },
          { value: 580, name: 'Email' },
          { value: 484, name: 'Union Ads' },
          { value: 300, name: 'Video Ads' }
        ]
      }
    ]
  })
})

</script>

<style lang="less" scoped>
:deep(.el-card__header){
  height: 20%;
  font-size: 30px;
  text-align: center;
}
:deep(.el-card__body){
height: 80%;
  .variety-item{
  width: 100%;
  height: 100%;
  margin: 10px auto;
}}
</style>
