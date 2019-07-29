<template>
    <div class="catlist">
          <!-- 面包屑 -->
    <el-breadcrumb separator="/" class="el">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>
        <a href="/">用户管理</a>
      </el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
      <el-breadcrumb-item>用户详情</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 搜索与添加用户按钮 -->
     <div style="margin: 15px 0;">
      <!-- 为搜索框加键盘事件,调用初始化数据方法 -->
      <!-- native 监听组件根元素的原生事件 -->
      <el-input
        placeholder="请输入内容"
        class="input-with-select"
        style="width:370px"
        v-model="catlists.query"
      >
        <!-- 这是搜索按钮,点击调用初始化数据方法 -->
        <el-button slot="append" icon="el-icon-search"></el-button>
      </el-input>
      <!-- 编程式导航 -->
      <el-button type="success" style="margin-left:10px" @click="$router.push({name:'add'})">添加用户</el-button>
    </div>
        <!-- table表格展示数据 -->
    <template>
      <el-table :data="catlist" style="width:100%; margin-top:10px" border >
         <!-- 索引列 -->
        <el-table-column type="index" width="80" ></el-table-column>
        <el-table-column label="商品详情" prop="goods_name"></el-table-column>
         <el-table-column label="商品价格" prop="goods_price"></el-table-column>
         <el-table-column label="商品状态" prop="goods_state"></el-table-column>
         <el-table-column label="商品数量" prop="goods_number"></el-table-column>
        <el-table-column label="创建时间" >
          <template slot-scope="scope">
              <!-- scope.row可以获取到这行的数据 -->
            <!-- 因为我们要将level进行转换 -->
            <!-- 我们不能直接拿到要处理的数据,所以scope.row.level -->
            {{scope.row.add_time|settime('/')}} 
          </template>
        </el-table-column>
      </el-table>
    </template>
        <!--obj.pagenum 我们接收回来的数据中储存的页码 -->
    <!-- obj.pagesize我们接收回来的数据中储存的每页设置的条数 -->
    <!-- 分页组件 -->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="catlists.pagenum"
      :page-sizes="[10, 20, 30]"
      :page-size="catlists.pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    ></el-pagination>
    </div>
</template>
<script>
import {goodList} from '../../setApi/goods'
export default {
    data(){
        return{
          total:0,
            catlist:[],
            catlists:{
                query:'',
                pagenum:10,
                pagesize:100
            }
        }
    },
    // 获取全部数据
   async mounted(){
      this.init()
    },
    methods:{
      // 分页
    // 点击切换每页显示数量时触发
    handleSizeChange(val) {
      // console.log(`每页 ${val} 条`);
      // 触发函数会默认获到这个val值,然后把获取到的值重新丢给后台
      this.catlists.pagesize = val;
      this.init();
    },
    // 点击当前页码时触发
    handleCurrentChange(val) {
      // console.log(`当前页: ${val}`);
      // 触发函数会默认获到这个val值,然后把获取到的值重新丢给后台
      this.catlists.pagenum = val;
      this.init();
    },
    async init(){
         let res=await goodList(this.catlists)
       console.log(res);
      if(res.data.meta.status===200){
          this.catlist=res.data.data.goods
          this.total=res.data.data.total
      }
    }
    },
     // 过滤器:将一些数据转成我们需要的格式
    filters:{
      // 名称自己定义
      settime(time){
      var  nowdate=new Date(time)
      var  y=nowdate.getFullYear()
      var  m=nowdate.getMonth()
      var f=nowdate.getDay()
      return  y+m+f
      }
    }
}
</script>
<style lang="less" scoped>
    .el {
  line-height: 46px;
}
</style>