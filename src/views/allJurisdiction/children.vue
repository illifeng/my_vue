<template>
  <div class="children">
    <!-- 面包屑 -->
    <el-breadcrumb separator-class="el-icon-arrow-right" class="el">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>权限列表</el-breadcrumb-item>
      <el-breadcrumb-item>权限详情</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- table表格展示数据 -->
    <template>
      <el-table :data="tablenum" style="width: 620px" border >
         <!-- 索引列 -->
        <el-table-column type="index" width="80"></el-table-column>
        <el-table-column label="商品详情" width="180" prop="authName"></el-table-column>
         <el-table-column label="路径" width="180" prop="path"></el-table-column>
        <el-table-column prop="level" label="层级" width="180" >
          <template slot-scope="scope">
            <!-- scope.row可以获取到这行的数据 -->
            <!-- 因为我们要将level进行转换 -->
            <!-- 我们不能直接拿到要处理的数据,所以scope.row.level -->
            {{scope.row.level|setlevel}}
          </template>
        </el-table-column>
      </el-table>
    </template>
  </div>
</template>
<script>
import {setChildren} from '@/setApi/childrenAllApi'
export default {
    data(){
        return{
            tablenum:[]
        }
    },
    // 过滤器:将一些数据转成我们需要的格式
    filters:{
      // 名称自己定义
      setlevel(level){
        if(level==='0'){
          return '一级'
        }else if(level==='1'){
          return '二级'
        }else if(level==='2'){
          return '三级'
        }else{
          return ''
        }
      }
    },
    mounted(){
      // 发送请求
        setChildren('list')
        .then(res=>{
          // console.log(res);
            if(res.data.meta.status===200){
               this.tablenum=res.data.data
            }
        })
        .catch(err=>{
            console.log(err);
        })
    }

};
</script>
<style lang="less" scoped>
.el {
  line-height: 46px;
}
</style>
