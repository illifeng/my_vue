<template>
  <div class="jurisdiction">
    <!-- 面包屑 -->
    <el-breadcrumb separator-class="el-icon-arrow-right" class="el">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>权限列表</el-breadcrumb-item>
      <el-breadcrumb-item>权限详情</el-breadcrumb-item>
    </el-breadcrumb>
    <el-button type="success" @click="adddialogFormVisible=true">添加用户</el-button>
    <!-- 表格 -->
    <template >
      <el-table :data="rolesList" style="width: 100%;margin-top:10px" border>
        <el-table-column type="expand">
          <!-- 自定义模板组件自带遍历功能 -->
          <template slot-scope="props">
            <!-- 展开整体,遍历数据中的第一层 -->
            <!-- props.row.children可以获取整个数据,id为唯一值 -->
            <el-row
              v-for="setnum in props.row.children"
              :key="setnum.id"
              style="margin:0px 10px 10px 0px;border-bottom:1px dashed skyblue"
            >
              <!-- 里面的第一个, -->
              <el-col :span="4">
                <el-tag
                  closable
                  disable-transitions
                  @close="delchildren(props.row,setnum.id)"
                >{{setnum.authName}}</el-tag>
              </el-col>
              <!-- 里面的第二个,第二个里面又嵌套了多个 -->
              <el-col :span="20">
                <!-- 遍历数据中的第二层 -->
                <el-row
                  v-for="scllo in setnum.children"
                  :key="scllo.id"
                  style="margin:0px 10px 10px 0px"
                >
                  <!-- 里面的第二个 -->
                  <el-col :span="6">
                    <!-- element里面的close删除事件 -->
                    <el-tag closable @close="delchildren(props.row,scllo.id)">{{scllo.authName}}</el-tag>
                  </el-col>
                  <!-- 里面的第三个 -->
                  <el-col :span="18">
                    <!-- 遍历数据中的第三层 -->
                    <el-tag
                      v-for="addscllo in scllo.children"
                      :key="addscllo.id"
                      closable
                      style="margin:0px 10px 10px 0px"
                      @close="delchildren(props.row,addscllo.id)"
                    >{{addscllo.authName}}</el-tag>
                  </el-col>
                </el-row>
              </el-col>
            </el-row>
            <!-- 有没有数据来做一个判断 -->
            <el-row>
              <el-col v-show="props.row.children.length==0">此处没有数据</el-col>
            </el-row>
          </template>
        </el-table-column>
        <!-- 索引列 -->
        <el-table-column type="index" width="80"></el-table-column>
        <el-table-column label="描述" prop="roleName"></el-table-column>
        <el-table-column label="具体工作" prop="roleDesc"></el-table-column>
        <!-- 操作按钮 -->
        <el-table-column label="权限设置">
          <template slot-scope="scope">
            <el-tooltip :content="' 编辑'" placement="top">
              <!-- 添加用户数据 -->
              <el-button type="primary" icon="el-icon-edit" circle></el-button>
            </el-tooltip>
            <!-- 分配角色 -->
            <el-tooltip :content="'分配角色'" placement="top">
              <!-- 收集当前行对象 -->
              <el-button type="success" icon="el-icon-check" circle @click="pushuser(scope.row)"></el-button>
            </el-tooltip>
            <el-tooltip :content="'删除 '" placement="top">
              <!-- 获取id删除用户 -->
              <el-button type="danger" icon="el-icon-delete" circle></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
    </template>
    <!-- 外层对话框,内层树状图 -->
    <el-dialog title="权限设置" :visible.sync="alldialogFormVisible">
      <!-- <el-form :model="form"> -->
        <!-- 为了让用户本来就有的一些权限得到展示,通过id值来达到效果,如果我们需要拿到id -->
      <el-tree
        :data="pushlist"
        show-checkbox
        node-key="id"
        :default-expand-all="true"
        :default-checked-keys="ByIdAll"
        :props="defaultProps"
        ref="gettree"
      ></el-tree>
      <!-- </el-form> -->
      <div slot="footer" class="dialog-footer">
        <el-button @click="alldialogFormVisible = false">取 消</el-button>
        <!-- 授权权限 -->
        <el-button type="primary" @click="setTree">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 添加 -->
     <el-dialog title="用户添加" :visible.sync="adddialogFormVisible">
      <el-form :model="addkitty" :label-width="'100px'" :rules="rules" ref="from">
        <el-form-item label="用户名称" prop="roleName">
          <el-input v-model="addkitty.roleName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="具体工作" prop="roleDesc">
          <el-input v-model="addkitty.roleDesc" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="adddialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addkittys">确 定</el-button>
      </div>
      </el-dialog>
  </div>
</template>
<script>
import { setroles, delchildren,getAllId,setaddkitty } from "../../setApi/roles";
import { setChildren } from "../../setApi/childrenAllApi";
export default {
  data() {
    return {
      setId:'',
      // 储存所有数据
      rolesList: [],
      pushlist: [],
      // 添加
      adddialogFormVisible: false,
      alldialogFormVisible: false,
      // 展示默认权限
      ByIdAll:[],
      defaultProps: {
        children: "children",
        // 展示权限数据名称
        label: "authName"
      },
      addkitty:{
        roleName:'',
        roleDesc:''
      },
       rules: {
          roleName: [
          { required: true, message: "请输入用户名称", trigger: "blur" }
        ],
        roleDesc: [
          { required: true, message: "请输入用户权限", trigger: "blur" }
        ]
       }
    };
  },
  // 请求数据
  mounted() {
    this.init();
  },
  // 方法集合
  methods: {
    // 添加
    // 添加用户业务
    // 点击添加按钮时
    addkittys() {
      this.$refs.from.validate(bool => {
        //  bool为true时,表示数据合法
        if (bool === true) {
           console.log(this.addkitty);
          // 添加用户时,以双向绑定和ref属性获取用户填写的数据,然后把这份数据发给后台,再通过回调返回结果
          setaddkitty(this.addkitty)
         
            //  请求返回的结果
            .then(res => {
               console.log(res);
              if (res.data.meta.status === 201) {
                this.$message({
                  message: "添加成功",
                  type: "success"
                });
              }
              // 让对话框隐藏
              this.adddialogFormVisible = false;
              //resetFields是element里面的方法 把表单数据清空
              this.addkitty.resetFields='';
              // 数据更新
              this.init();
            })
            .catch(err => {
              console.log(err);
            });
        } else {
          this.$message({
            message: "输入有误",
            type: "error"
          });
          // 阻止发请求
          return false;
        }
      });
    },
    // 初始化数据
    async init() {
      let res = await setroles();
      // console.log(res);
      if (res.data.meta.status === 200) {
        this.rolesList = res.data.data;
      }
    },
    // 删除,
    async delchildren(row, rid) {
      //  console.log(id);
      //  console.log(rid);
      let res = await delchildren(row.id, rid);
      // console.log(res);
      if (res.data.meta.status === 200) {
        this.$message({
          type: "success",
          message: "取消权限成功"
        });
      }
      // 当前行刷新,把删除成功后回来的值,覆盖掉当前行的数据
      row.children = res.data.data;
      // 这种刷新会自动闭合行
      // this.init()
    },
    // 权限列表
    async pushuser(row) {
      let res = await setChildren("tree");
      // console.log(res);
      this.alldialogFormVisible = true;
      this.pushlist = res.data.data;
      // 储存值,需要给哪个用户设置权限时,取出来用
      this.setId=row.id
      // console.log(row.id);
      // console.log("123");
      // console.log(row.children);
            // 把之前刷新时赋值到的数据刷新
            this.ByIdAll.length=0
       // 为了可以达到把已有的权限默认勾上,我们要判断是否有那个权限,如果有遍历找到那个权限展开,其实我们只要找到
            // 最下一级的权限就能把父节点展开,其实每个权限都有对应的一个id,找出最下一级的id就可以展开
            // 有这个元素并且里面有数据
            // 点开对话框时,加载里面的已有的默认权限
      if(row.children&&row.children.length>0){
        // console.log('11');
      row.children.forEach(setnum => {
        if(setnum.children&&setnum.children.length>0){
            setnum.children.forEach(scllo => {
              if(scllo.children&&scllo.children.length>0){
                scllo.children.forEach(addscllo => {
                 this.ByIdAll.push(addscllo.id)
                  // console.log(addscllo.id);
                });
              }
            });
        }
      });
      }
    },
  // 授权权限,取到父节点与子节点的id
 async setTree(){
      // 这是一个对象,里面有我们需要的值
      let tree=this.$refs.gettree.getCheckedNodes()
      // console.log(tree);
     var arr=[]
    //  把里面我们需要的给找出来
     tree.forEach(item => {
       arr.push(item.id+','+item.pid)
     });
    //  console.log(arr);
    //  把数组进行拼接,变成字符串
     var str=arr.join()
    //  console.log(str);
    //  转变为数组
     var feelarr=str.split(',')
    //  console.log(feelarr);
    //  展开去重
     var getarr=[...new Set(feelarr)]
    //  console.log(getarr);
    // 后台需要的格式
    var  grandarr=getarr.join(',')
    // console.log(grandarr);
    var res=await getAllId(this.setId,grandarr)
    // console.log(typeof(grandarr));
    // console.log(res);
        if(res.data.meta.status===200){
           this.$message({
          type: "success",
          message: "增加权限成功"
        });
        }
    this.alldialogFormVisible=false
      this.init()
  }
  }
};
</script>
<style lang="less" scoped>
.el {
  line-height: 46px;
}
</style>
