<template>
  <div class="home">
    <el-container>
      <el-aside width="200px">
        <div class="logo"></div>
        <!-- 启动路由模式,让下面子项的index值可以进行路由跳转 -->
        <el-menu
          :router="true"
          default-active="2"
          class="el-menu-vertical-demo"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b"
        >
        <!-- setrouter.id+''变成字符串 -->
          <el-submenu :index="setrouter.id+''" v-for="setrouter in getrouter" :key="setrouter.id">
            <template slot="title">
              <i class="el-icon-platform-eleme"></i>
              <span>{{setrouter.authName}}</span>
            </template>
            <!-- 动态绑定才可以加变量 -->
            <el-menu-item :index="'/users/'+routerList.path" v-for="routerList in setrouter.children" :key="routerList.id">
              <template slot="title">
                <i class="el-icon-user"></i>
                <span>{{routerList.authName}}</span>
              </template>
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-container>
        <el-header>
          <span class="el-icon-s-unfold"></span>
          <span>黑马程序员</span>
          <span class="el-icon-loading"></span>
        </el-header>
        <el-main>
          <!-- 在首页中为变化的页面挖坑 -->
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script>
import { getmenus } from "../setApi/letmenu";
export default {
  data() {
    return {
      getrouter:[]
    };
  },
  directives: {
    del: {
      inserted() {}
    }
  },
  // 钩子函数,请求左侧菜单栏
  async mounted() {
    let res =await getmenus();
    // console.log(res.data.data);
    this.getrouter=res.data.data
  }
};
</script>
<style lang="less" scoped>
.home {
  height: 100%;
  .el-menu-admin:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
  }
  .el-container {
    height: 100%;
  }
  .el-aside {
    background-color: #545c64;
  }
  .el-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #545c64;
    color: #fff;
  }
  .logo {
    height: 60px;
    background: url(../assets/logo.png);
    background-size: cover;
    background-color: #fff;
  }
  .toggle-btn {
    padding: 0 15px;
    margin-left: -20px;
    font-size: 36px;
    color: white;
    cursor: pointer;
    line-height: 60px;
    &:hover {
      background-color: #4292cf;
    }
  }
  .system-title {
    font-size: 28px;
    color: white;
  }
  .welcome {
    color: white;
  }
}
</style>



