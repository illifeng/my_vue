<template>
  <div class="parmas">
    <div class="one">
      <!-- 简单的隐藏与显示 -->
      <!-- <button @click="isshow=!isshow">tab切换</button> -->
      <!-- tab栏切换 -->
      <!-- 通过循环将index值等于下列显示的条件,同时循环生成三个按钮结构(其实重点是通过循环把index等于设定的num值) -->
      <!-- 通过遍历数组也可以把数组里的值作为按钮内容输出 -->
      <button
        @click="tabnum(index)"
        v-for="(item,index) in content"
        :key="index"
        :class="{button:num===index}"
      >{{item}}</button>
    </div>
    <div class="two" v-if="num===0">
        <!-- element中的卡片 -->
      <el-card class="box-card">
        <div v-for="o in 6" :key="o" class="text item">{{get + o }}</div>
      </el-card>
    </div>
    <!-- <div class="tree" v-show="isshow">
      <p>风去雨来</p>
      <p>风去雨来</p>
      <p>风去雨来</p>
      <p>风去雨来</p>
    </div>-->
    <div class="tree" v-if="num===1">
        <!-- 表格 -->
      <template>
        <el-table :data="tableData" stripe style="width:500px" border>
          <el-table-column type="index" width="80"></el-table-column>
          <el-table-column prop="date" label="日期" width="80"></el-table-column>
          <el-table-column prop="name" label="姓名" width="80"></el-table-column>
          <el-table-column prop="address" label="地址"></el-table-column>
        </el-table>
      </template>
    </div>
    <div class="fow" v-if="num===2">
        <!-- 加载中 loading-->
      <template>
        <el-table
          v-loading="loading"
          element-loading-text="拼命加载中"
          element-loading-spinner="el-icon-loading"
          element-loading-background="rgba(234, 222, 334, 0.5)"
          :data="tableData"
          style="width:500px"
        >
          <el-table-column type="index" width="80"></el-table-column>
          <el-table-column prop="date" label="日期" width="80"></el-table-column>
          <el-table-column prop="name" label="姓名" width="80"></el-table-column>
          <el-table-column prop="address" label="地址"></el-table-column>
        </el-table>
      </template>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      //   isshow: false,
        get:'小曾',
      num: 0,
      content: ["小健", "小杨", "小芳"],
      tableData: [
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1517 弄"
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄"
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄"
        }
      ],
      loading: true
    };
  },
  methods: {
    //   这是num值做了改变
    tabnum(index) {
      this.num = index;
    }
  }
};
</script>
<style lang="less" scoped>
.button {
  color: gold;
  margin: 10px
}
  .text {
    font-size: 14px;
  }

  .item {
    padding: 18px 0;
  }

  .box-card {
    width: 480px;
  }
</style>
