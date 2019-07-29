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
    <div class="navy">添加商品详情信息</div>
    <!-- active控制进度条的位置, -->
    <!-- 相减的话这会把activeName进行隐式转换,然后变成数字 -->
    <el-steps :active="activeName-0">
      <el-step title="步骤 1" icon="el-icon-edit"></el-step>
      <el-step title="步骤 2" icon="el-icon-info"></el-step>
      <el-step title="步骤 3" icon="el-icon-picture"></el-step>
      <el-step title="步骤 4" icon="el-icon-upload"></el-step>
      <el-step title="步骤 5" icon="el-icon-s-platform"></el-step>
    </el-steps>
    <el-form :label-width="'100px'" :model="cat_list" ref="catList">
      <!-- 设置一个变量让步骤条跟着标签页变化, -->
      <el-tabs :tab-position="tabPosition='left'" v-model="activeName" @tab-click="handlclick"
      :before-leave="beforeLeave">
        <el-tab-pane label="基本信息" name="0">
          <el-form-item label="商品名称" prop="username">
            <el-input autocomplete="off" v-model="cat_list.goods_name"></el-input>
          </el-form-item>
          <el-form-item label="商品价格" prop="password">
            <el-input autocomplete="off" v-model="cat_list.goods_price"></el-input>
          </el-form-item>
          <el-form-item label="商品重量" prop="email">
            <el-input autocomplete="off" v-model="cat_list.goods_weight"></el-input>
          </el-form-item>
          <el-form-item label="商品数量" prop="mobile">
            <el-input autocomplete="off" v-model="cat_list.goods_number"></el-input>
          </el-form-item>
          <el-form-item label="商品分类" prop="mobile">
            <!-- 动态绑定props,让他的label值可以动态改变 -->
            <!-- 级联 -->
            <el-cascader
              change-on-select
              :options="getAllList"
              v-model="cat_list.goods_cat"
              :props="defaultprop"
              @change="getnum"
            ></el-cascader>
          </el-form-item>
          <el-form-item label="是否促销" prop="mobile">
            <el-button plain>否</el-button>
            <el-button plain>是</el-button>
          </el-form-item>
        </el-tab-pane>
        <el-tab-pane label="商品参数" name="1">
          <!-- 动态参数的展示 -->
          <!-- setnum是当前这一项 -->
          <!-- 如果在复选框组中绑定同一个数组，那么在有多组的时候，会造成多组复选框都指向一个相同的数组 -->
          <el-form-item
            :label="setnum.attr_name"
            prop="username"
            v-for="setnum in getparmas"
            :key="setnum.attr_id"
          >
            <el-checkbox-group v-model="setnum.attr_vals" size="small">
              <el-checkbox
                :label="value"
                border
                v-for="(value,index) in setnum.attr_vals"
                :key="index"
              ></el-checkbox>
            </el-checkbox-group>
          </el-form-item>
        </el-tab-pane>
        <!-- 静态属性的展示 -->
        <el-tab-pane label="商品属性" name="2">
          <el-form-item :label="item.attr_name" v-for="item in setparmas" :key="item.attr_id">
            <el-input :value="item.attr_vals" readonly></el-input>
          </el-form-item>
        </el-tab-pane>
        <el-tab-pane label="图片上传" name="3">
          <!-- action是要把文件上传到服务器的具体地址 -->
          <!-- accept只接受后面那种格式的文件上传 -->
          <el-upload
            class="upload-demo"
            action="http://localhost:8888/api/private/v1/upload"
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :on-success="handleSuccess"
            :file-list="fileList"
            :headers="getToken()"
            list-type="picture"
            :before-upload="handleBefore"
            accept=".jpg"
          >
            <el-button size="small" type="primary">点击上传</el-button>
            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
          </el-upload>
        </el-tab-pane>
        <el-tab-pane label="商品内容" name="4">
          <!-- 获取到富文本框中的内容 -->
          <quill-editor v-model="cat_list.goods_introduce"></quill-editor>
        </el-tab-pane>
      </el-tabs>
    </el-form>
    <el-button plain style="margin:0 0 0 450px">取消</el-button>
    <el-button type="primary" @click="getAll">加载中</el-button>
  </div>
</template>
<script>
import { getGoodList } from "../../setApi/goodslist.js";
import { getCategories,getCommodity } from "../../setApi/get_categories";
// 引入富文本样式
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";
// 引入富文本组件
import { quillEditor } from "vue-quill-editor";
export default {
  // 注册富文本框指令
  components: {
    quillEditor
  },
  data() {
    return {
      // 动态商品参数
      getparmas: [],
      // 静态商品属性
      setparmas: [],
      // 文件上传
      fileList: [],
      //   所有数据获取
      getAllList: [],
      // 定义步骤条与标签页的变量,
      activeName: "0",
      //   这是添加商品中所需传的参数(一切为了接口准备)
      cat_list: {
        goods_name: "",
        // 级联中三级id号
        goods_cat: "",
        goods_price: 0,
        goods_number: 0,
        goods_weight: 0,
        goods_introduce: "",
        pics: [],
        attrs: []
      },
      // 级联中props的配置
      defaultprop: {
        label: "cat_name",
        value: "cat_id",
        children: "children"
      }
    };
  },
  //   获取所有商品列表数据
  async mounted() {
    let res = await getGoodList(3);
    // console.log(res);
    this.getAllList = res.data.data;
  },
  methods: {
    // 切换标签页就触发的函数  点击第二个或第三个的时候,如果用户不输入分类内容,给出提示,不让访问
    beforeLeave(activeName,oldActiveName){
      // console.log(oldActiveName);
          if(activeName==='1'||activeName==='2'){
            if(this.cat_list.goods_cat.length!==3){
              this.$message.error('请输入商品参数')
              return false
            }
          }
    },
    // 操作标签页时触发,判断cat_list.goods_cat(级联层级)
    async handlclick(obj) {
      // 这个obj时级联分类中每一个层级中的id
      // console.log(obj);
      // 只有商品参数'1'与商品属性'2'需要加入展示参数
      if (this.activeName === "1" || this.activeName === "2") {
        // 没有选够三级
        if (this.cat_list.goods_cat.length !==3) {
          this.$message.error("请输入三级分类");
          return false;
        }
        // 不选择级联中的商品分类无法获得this.cat_list.goods_cat[2],请求没有数据
        if (this.activeName === "1") {
          // 获取动态参数
          // console.log("这是一种");
          let res = await getCategories(this.cat_list.goods_cat[2], "many");
          // console.log(res);
          // 请求回来的数据
          this.getparmas = res.data.data;
          // console.log('动态参数', this.getparmas);
          this.getparmas.forEach(value=>{
            // 遍历当前项下的attr_vals的数组是否有数据,有的话把他劈成数组,不然给个空数组占位
            value.attr_vals=value.attr_vals?value.attr_vals.split(','):[]
            // 数组就展开里面的项变成新数组,
            value.attr_vals=[...value.attr_vals]
          })
        } else {
          // 获取静态属性
          let res = await getCategories(this.cat_list.goods_cat[2], "only");
          // console.log(res);
          this.setparmas = res.data.data;
        }
      }
    },
    // 商品提交确实键
  async  getAll() {
      // console.log('富文本框',this.cat_list.goods_introduce);
      // console.log(this.cat_list);
      // 只差attrs这个值了,它需要的是一个对象,attrs是商品的参数(具体见接口文档)
      for(var i=0;i<this.getparmas.length;i++){
          let id=this.getparmas[i].attr_id
          for(var j=0;j<this.getparmas[i].attr_vals.length;j++){
              this.cat_list.attrs.push({attr_id:id,attr_value:this.getparmas[i].attr_vals[j]})
          };
          // 接口需要转成字符串
          this.cat_list.goods_cat=this.cat_list.goods_cat.join(',')
          // console.log(this.cat_list);
          let res=await getCommodity(this.cat_list)
          // console.log("添加商品",res);
          if(res.data.meta.status===201){
            this.$message({
              type:'success',
              message:"添加商品成功"
            })
            // 清空表单
            this.$refs.catList.resetFields()
            // 编程式跳转
            this.$router.push({name:'list'})
          }
      };
    },
    //   因为element自己封装了一个异步请求,所以它不会经过我们的拦截器,所以取不到token值,那就说明没有授权指令,
    //   但是我们可以通过element里面的请求头的方式再去取token值,得到授权
    getToken() {
      // 获取到本地的token值,通过一个对象以键值方式发送
      let token = localStorage.getItem("local_login_21");
      return { Authorization: token };
    },
    //   上传文件成功后的钩子函数
    handleSuccess(response, file, fileList) {
      //   console.log(response);
      //   console.log(file);
      console.log(fileList);
      if (response.meta.status === 200) {
        //   把上传成功后的返回的文件地址加入参数pics数组中,方便后面传值
        this.cat_list.pics.push({ pic: response.data.tmp_path });
        // console.log("图片地址", this.cat_list.pics);
      }
    },
    //   移除文件时触发
    handleRemove(file, fileList) {
      // file就是当前删除的对象
      console.log(fileList);
      // 因为用户选择的不是图片,所以后期没有这个值,没有的话就阻止继续下去
      if (!file.response) {
        return false;
      }
      //   取到用户删除的图片路径
      let removeFile = file.response.data.tmp_path;
      //   console.log(removeFile);
      //   因为用户上传后才可以删除,在上传后已经把图片地址加入了参数pics数组中了,
      //   所以通过遍历,如果找到跟用户点击删除的那个地址是一样的就移除
      for (var i = 0; i < this.cat_list.pics.length; i++) {
        if (this.cat_list.pics[i].pic === removeFile) {
          console.log("是否相同");
          //   splice(i,1)从当前i开始删除一个,就是删除当前这一个
          // 虽然添加商品时把用户不想上传的图片删除了,但是服务器缓存上还储存有用户删除掉的图片
          this.cat_list.pics.splice(i, 1);
          break;
        }
      }
    },
    // 预览时触发
    handlePreview(file) {
      console.log(file);
    },
    // 检测用户输入的文件是否合法
    // 字节k用size表示,image是扩展名,不同的扩展名的处理方式不一样
    // file用户当前选择的图片对象
    handleBefore(file) {
      // 如果用户上传的不是图片,不发请求,不上传
      if (file.type.indexOf("image/") !== 0) {
        //   console.log('选择图片');
        this.$message.error("请选择图片");
        // 它会触发handleRemove,所以我们要设置移除文件前的判断
        return false;
      }
    },
    //选择级联里面的内容时触发
    // 先获取到值,后期点击级联里面的分类时,做一个动态商品参数的渲染,这就是cat_list.goods_cat(下面有三级分类)
    getnum(obj) {
      console.log(obj);
      console.log(this.cat_list.goods_cat);
      console.log(this.cat_list.goods_cat.join(","));
    }
  }
};
</script>
<style lang="less" scoped>
.el {
  line-height: 46px;
}
.navy {
  height: 40px;
  margin-bottom: 10px;
  background: #ffffff;
  line-height: 40px;
}
</style>