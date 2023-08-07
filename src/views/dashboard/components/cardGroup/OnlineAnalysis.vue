<template>
  <el-card class="online-item">
  </el-card>
</template>

<script setup lang="ts">

import {useECharts} from '@/hooks/useECharts'
import {onMounted} from "vue";
import {EChartsOption} from "echarts";
const {initChart,setOptions} = useECharts()


onMounted(()=>{
  function randomData() {
    now = new Date(+now + oneDay);
    value = value + Math.random() * 21 - 10;
    return {
      name: now.toString(),
      value: [
        [now.getFullYear(), now.getMonth() + 1, now.getDate()].join('/'),
        Math.round(value)
      ]
    };
  }
  let data:any[] = [];
  let now = new Date(1997, 9, 3);
  let oneDay = 24 * 3600 * 1000;
  let value = Math.random() * 1000;
  for (var i = 0; i < 1000; i++) {
    data.push(randomData());
  }
  let option:EChartsOption = {
    title: {
      text: '当前在线人数',
    },
    tooltip: {
      trigger: 'axis',
      formatter: function (params) {
        params = params[0];
        var date = new Date(params.name);
        return (
            date.getDate() +
            '/' +
            (date.getMonth() + 1) +
            '/' +
            date.getFullYear() +
            ' : ' +
            params.value[1]
        );
      },
      axisPointer: {
        animation: false
      }
    },
    xAxis: {
      type: 'time',
      splitLine: {
        show: false
      },
    },
    yAxis: {
      type: 'value',
      boundaryGap: [0, '100%'],
      splitLine: {
        show: false
      },
    },
    grid:{
      left:'20%'
    },
    series: [
      {
        name: 'Fake Data',
        type: 'line',
        showSymbol: false,
        data: data
      }
    ]
  };
  setOptions(option)
  const chartDom = document.querySelector('.online-item')

  initChart(chartDom as HTMLElement,['yAxis','xAxis','title'])

  setInterval(function () {
    for (var i = 0; i < 5; i++) {
      data.shift();
      data.push(randomData());
    }
    setOptions(option)
  }, 1000);

})



</script>

<style lang="less" scoped>
  .online-item{
    width: 200%;
    height: 100%;
    padding-top: 10px;
  }
</style>
