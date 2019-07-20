<template>
  <div class="login">
 <div class="container">
   <!-- 头像 -->
   <img src="../assets/hots_4.jpg" alt="" class="avatar">
   <el-form :model="loginobj" :rules="rules" ref="loginobj"  class="demo-ruleForm">
  <el-form-item  prop="username">
    <!-- 在input标签里用prefix-icon来设置图标 -->
    <!-- 用户输入框 -->
    <el-input v-model="loginobj.username" placeholder="输入大宝号" prefix-icon="el-icon-lollipop"></el-input>
  </el-form-item>
  <!-- 密码输入框 -->
  <el-form-item  prop="password">
    <el-input v-model="loginobj.password" placeholder="请输入密码" prefix-icon="el-icon-s-promotion"></el-input>
  </el-form-item>
  <!-- 登录按钮 -->
     <el-form-item>
    <el-button type="primary" @click="getLogin" class="login-btn">点我登录</el-button>
  </el-form-item>
  </el-form>
 </div>
  </div>
</template>
<script>
import {postLogin} from '@/setApi/login'
export default {
    data(){
        return{
            loginobj:{
                username:'jack',
                password:'123456'
            },
            // element-ui插件里面的配置,username与password和prop值一样才有效果
              rules: {
          username: [
            { required: true, message: '请输入大宝号', trigger: 'blur' },
          ],
           password:[ { required: true, message: '请输入密码', trigger: 'blur' },
             { min: 6, max: 10, message: '长度在 6 到 10 个字符', trigger: 'blur' }]},
        }
    },
    methods:{
      // 这个是组件中的方法
     getLogin(){
        // console.log('输出');
        // 下列中的bool值为一个布尔值,true或false
        this.$refs.loginobj.validate((bool)=>{
          if(bool){
            console.log(this.loginobj);
            console.log(bool);
            console.log('123');
            // 接口方法
           postLogin(this.loginobj)
          //  成功回调
           .then(res=>{
             if(res.data.meta.status==200){
              //  console.log('成功登陆');
              // 路径拼接,进行页面跳转
              this.$router.push({name:'goToHome'})
             }
             else{
               console.log('失败');
               console.log(this.loginobj);
               this.$message({
                 type:'error',
                 message:res.data.meta.msg
               })
             }
           })
          //  失败回调
           .catch((err)=>{
             console.log(err);
             this.$message({
              message:'登陆不成功',
              type:'error'
            })
           })
          }else{
            console.log('错误');
            // element插件里面的消息提示
            this.$message({
              message:'输入有误',
              type:'error'
            })
            // 必须要设置false,要不就会继续发请求,作用阻止发请求
            return false
          }
        })
     }
    }
};
</script>
<style lang="less" scoped>
.login {
  position: fixed;
  width: 100%;
  height: 100%;
  background:#b3f1f3;
  .container {
    position: absolute;
    left: 0;
    right: 0;
    width: 400px;
    padding: 0px 40px 15px 40px;
    margin: 200px auto;
    background: white;
    .avatar {
      position: relative;
      left: 50%;
      width: 120px;
      height: 120px;
      margin-left: -60px;
      margin-top: -60px;
      box-sizing: border-box;
      border-radius: 10%;
      // border: 10px solid #fff;
      box-shadow: 0 1px 5px #ccc;
      overflow: hidden;
    }
    .login-btn {
      width: 100%;
    }
  }
}
</style>
