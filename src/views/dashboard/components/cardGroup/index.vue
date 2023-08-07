<template>
    <header>
      <CountCard class="count-item"
                 title="月销量"
                 icon="salesVolume"
                 :count="112310"
                 footer="同比上涨1.2%"
      />
      <CountCard class="count-item"
                 title="日销量"
                 icon="salesVolume"
                 :count="10872"
                 footer="同比上涨3.6%"
      >
        <template #tag>
          <div class="tag">主要</div>
        </template>
      </CountCard>

      <CountCard class="count-item"
                 title="月营业额"
                 icon="salesVolume"
                 :count="2983740"
                 footer="同比上涨3.6%"
      />
      <OnlineAnalysis class="online-chart" />
    </header>
</template>

<script setup lang="ts">
import CountCard from '@/components/CountCard.vue'
import OnlineAnalysis from './OnlineAnalysis.vue'

</script >

<style lang="less" scoped>
.card-around{
  margin: 20px 10px 0 10px;
}
header {
  display: flex;
  flex-wrap: wrap;
  .count-item {
    flex:1;
    height: 200px;
    .card-around();

    .tag {
      padding: 2px 3px;
      height: min-content;
      background-color: @theme-label-active-color;
      color: @theme-label-active-font-color;
      border-radius: 2px;
    }
  }
  .online-chart{
    flex: 1;
    height: 200px;
    .card-around();
  }
}
</style>