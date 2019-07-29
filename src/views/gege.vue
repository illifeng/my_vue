<template>
  <div class="repors">
    <v-chart :options="reports" style="width:100%"></v-chart>
  </div>
</template>
<script>
// 饼块状图
import ECharts from "vue-echarts";
import "echarts/lib/chart/line";
import "echarts/lib/component/polar";
import { getReports } from "../setApi/get_categories";
export default {
  data() {
    return {
      reports:{}
    };
  },
  async mounted() {
    let res = await getReports(1);
    // console.log(res);
    this.reports = res.data.data;
  },
  components: {
    //   注册
    "v-chart": ECharts
  }
};
</script>
<style lang="less" scoped>
</style>
