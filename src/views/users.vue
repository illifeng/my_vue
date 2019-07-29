<template>
  <div class="users">
    <!-- 面包屑 -->
    <el-breadcrumb separator="/" class="el">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>
        <a href="/">用户管理</a>
      </el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
      <el-breadcrumb-item>用户详情</el-breadcrumb-item>
    </el-breadcrumb>
    <div style="margin-top: 15px;">
      <!-- 为搜索框加键盘事件,调用初始化数据方法 -->
      <!-- native 监听组件根元素的原生事件 -->
      <el-input
        placeholder="请输入内容"
        class="input-with-select"
        style="width:370px"
        v-model="getObj.query"
        @keydown.native="init"
      >
        <!-- 这是搜索按钮,点击调用初始化数据方法 -->
        <el-button slot="append" icon="el-icon-search" @click="init"></el-button>
      </el-input>
      <el-button type="success" @click="adddialogFormVisible=true">添加用户</el-button>
    </div>
    <template>
      <el-table :data="obj" style="width: 100%;" border>
        <!-- 索引列 -->
        <el-table-column type="index" width="80"></el-table-column>
        <!-- 日期列 -->
        <!-- 通过prop渲染页面,把请求回来的数据一一对应渲染-->
        <el-table-column prop="username" label="用户名称" width="180"></el-table-column>
        <el-table-column prop="email" label="邮箱" width="180"></el-table-column>
        <el-table-column prop="mobile" label="电话号码" width="380"></el-table-column>
        <el-table-column label="状态">
          <!-- <template slot-scope="scope"></template>是自定义模板 -->
          <template slot-scope="scope">
            <el-row>
              <!-- 状态修改 -->
              <el-switch
                v-model="scope.row.mg_state"
                active-color="#13ce66"
                inactive-color="#ff4949"
                active-value="100"
                inactive-value="0"
                @change="changeuser(scope.row.id,scope.row.mg_state)"
              ></el-switch>
            </el-row>
          </template>
        </el-table-column>
        <!-- 操作列-->
        <el-table-column label="操作">
          <!-- scope.row能获取到这个表单里的所有值 -->
          <template slot-scope="scope">
            <el-tooltip :content="' 编辑'" placement="top">
              <!-- 编辑用户数据 -->
              <el-button type="primary" icon="el-icon-edit" circle @click="showEdit(scope.row)"></el-button>
            </el-tooltip>
            <!-- 调用分配角色方法时,传整行数据过去赋值,在一刷新时scope就会默认获取到了用户角色数据, -->
            <el-tooltip :content="'分配角色'" placement="top">
              <el-button type="success" icon="el-icon-check" circle @click="allOtusers(scope.row)"></el-button>
            </el-tooltip>
            <el-tooltip :content="'删除 '" placement="top">
              <!-- 获取id删除用户 -->
              <el-button type="danger" icon="el-icon-delete" circle @click="deluser(scope.row.id)"></el-button>
            </el-tooltip>
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
      :current-page="obj.pagenum"
      :page-sizes="[1, 2, 3]"
      :page-size="obj.pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    ></el-pagination>

    <!-- 添加新增用户对话框 -->
    <!-- :rules="rules"绑定可加验证规范 -->
    <!-- 必须以这个值prop,prop="password"跟验证规范里面的名字一样 -->
    <el-dialog title="用户添加" :visible.sync="adddialogFormVisible">
      <el-form :model="addForm" :label-width="'100px'" :rules="rules" ref="from">
        <el-form-item label="用户名称" prop="username">
          <el-input v-model="addForm.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="用户密码" prop="password">
          <el-input v-model="addForm.password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="用户邮箱" prop="email">
          <el-input v-model="addForm.email" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="用户电话" prop="mobile">
          <el-input v-model="addForm.mobile" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="adddialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addusers">确 定</el-button>
      </div>
      <!-- 编辑用户对话框 -->
    </el-dialog>
    <el-dialog title="编辑用户" :visible.sync="editdialogFormVisible">
      <el-form :model="editForm" :rules="rules" ref="edit">
        <el-form-item label="用户名称">
          <el-input v-model="editForm.username" autocomplete="off" disabled></el-input>
        </el-form-item>
        <el-form-item label="用户邮箱" prop="email">
          <el-input v-model="editForm.email" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="用户电话" prop="mobile">
          <el-input v-model="editForm.mobile" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="editdialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="edituser">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 删除提示框 -->
    <template>
      <el-button type="text"></el-button>
    </template>
    <!-- 分配角色对话框 -->
    <el-dialog title="分配角色" :visible.sync="outdialogFormVisible">
      <el-form :model="outfrom">
        <el-form-item label="用户名称">
           <span>{{outfrom.username}}</span>
        </el-form-item>
        <el-form-item label="角色名称">
        <el-select v-model="outfrom.rid" clearable placeholder="请选择">
          <!-- 遍历allroles,进行赋值 -->
          <!-- label展示给用户看的,value给程序员用的,两个是对应的,同时value又是赋值给v-model的 -->
          <el-option
            v-for="item in allroles"
            :key="item.id"
            :label="item.roleName"
            :value="item.id"
          ></el-option>
        </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="outdialogFormVisible= false">取 消</el-button>
        <el-button type="primary" @click="setroles">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
// 接口
import {
  goHome,
  adduser,
  editusers,
  delusers,
  changeusers,
  allOtusers
} from "../setApi/gohome";
import {getallpas} from '../setApi/allpas'
export default {
  data() {
    return {
      // 创建与后台数据同样的参数,方便传过去是一一对应
      // 添加
      addForm: {
        username: "",
        password: "",
        email: "",
        mobile: ""
      },
      // 编辑
      editForm: {
        username: "",
        id: "",
        email: "",
        mobile: ""
      },
      // 分配角色
      allroles:[],
      // 分配角色
      outfrom: {
        id: "",
        rid: "",
        username: ""
      },
      // 对话框的显示(true)与隐藏(false)
      adddialogFormVisible: false,
      editdialogFormVisible: false,
      outdialogFormVisible: false,
      // 每页总记录数
      total:0,
      // 分页
      // getObj是后台要求前台必须要传给后台的数据
      getObj: {
        // 可以传字符串
        query: "",
        // 当前页码
        pagenum: 1,
        // 每页展示的数据条数
        pagesize: 2
      },
      // 状态修改
      value: true,
      // 钩子函数刷新页面时
      obj: [],
      // 对添加用户表单的验证规则,
      rules: {
        username: [
          { required: true, message: "请输入用户名称", trigger: "blur" }
        ],
        password: [
          { required: true, message: "请输入用户密码", trigger: "blur" }
        ],
        email: [
          // 正则: 用户邮箱必须要有@和[.]
          { required: true, message: "请输入用户邮箱", trigger: "blur" },
          {
            pattern: /\w+[@]+\w+[.]\w+/,
            message: "用户邮箱不合法",
            trigger: "blur"
          }
        ],
        // 正则:用户的电话号码必须以1开头,而且必须要十一位数
        mobile: [
          { required: true, message: "请输入用户电话", trigger: "blur" },
          { pattern: /^1\d{4}$/, message: "用户电话不规范", trigger: "blur" }
        ]
      }
    };
  },
  // 钩子函数,页面一加载完成就调用,并且只调用一次
  mounted() {
    this.init();
    // 刷新页面获取角色数据
    this.allpas()
  },
  // 方法集合
  methods: {
    // 分配角色,触发事件时进行填充
    allOtusers(row) {
      this.outdialogFormVisible = true;
        this.outfrom.id = row.id;
        this.outfrom.rid = row.rid;
        this.outfrom.username = row.username;
      // console.log(row.username);
    },
    // 分配角色,点击确定按钮时触发
 async  setroles(){
  //  判断是否为空内容
     if(!this.outfrom.rid){
        this.$message({
          type: "success",
          message: "请选择角色"
        })
     }else{
      //  调用方法接口allOtusers发请求
        let res=await allOtusers(this.outfrom)
        console.log(res);
         if (res.data.meta.status === 400) {
        this.$message({
          type: "success",
          message: "增加角色成功"
        })
      }
      this.outdialogFormVisible=false
      this.init()
     }
   },
    // 状态修改
    async changeuser(id, type) {
      // console.log(id,type);
      let results = await changeusers(id, type);
      // console.log(results);
      if (results.data.meta.status === 400) {
        this.$message({
          type: "success",
          message: "状态修改成功"
        });
      }
    },
    // 分页
    // 点击切换每页显示数量时触发
    handleSizeChange(val) {
      // console.log(`每页 ${val} 条`);
      // 触发函数会默认获到这个val值,然后把获取到的值重新丢给后台
      this.getObj.pagesize = val;
      this.init();
    },
    // 点击当前页码时触发
    handleCurrentChange(val) {
      // console.log(`当前页: ${val}`);
      // 触发函数会默认获到这个val值,然后把获取到的值重新丢给后台
      this.getObj.pagenum = val;
      this.init();
    },
    // 每次调用会更新数据,分页
    init() {
      // 调用请求数据方法时,把参数传给后台
      goHome(this.getObj)
        .then(res => {
          console.log(res);
          if (res.data.meta.status === 200) {
            //  成功时把数据加入定义的数组
            this.obj = res.data.data.users;
            //  console.log(this.obj);
            // 把总页数重赋值
            this.total=res.data.data.total
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 获取所有角色信息
    async allpas(){
      let res=await getallpas()
      // console.log('11111',res);
      // console.log(res.data.data);
      // 加入数组后期遍历赋值
      this.allroles=res.data.data
      // console.log(res.data.data);
    },
    // 添加用户业务
    // 点击添加按钮时
    addusers() {
      this.$refs.from.validate(bool => {
        //  bool为true时,表示数据合法
        if (bool === true) {
          // 添加用户时,以双向绑定和ref属性获取用户填写的数据,然后把这份数据发给后台,再通过回调返回结果
          adduser(this.addForm)
            //  请求返回的结果
            .then(res => {
              //  console.log(res);
              if (res.data.meta.status === 201) {
                this.$message({
                  message: "添加成功",
                  type: "success"
                });
              }
              // 让对话框隐藏
              this.adddialogFormVisible = false;
              //resetFields是element里面的方法 把表单数据清空
              this.addForm.resetFields = "";
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
    // 编辑用户,发请求
    async edituser() {
      // console.log(123)
      // 用await发送请求,async配合await发送异步请求
      let res = await editusers(this.editForm);
      //  console.log(res);
      //  请求结果
      if (res.data.meta.status === 200) {
        this.$message({
          type: "success",
          message: res.data.meta.msg
        });
      } else {
        this.$message({
          type: "error",
          message: res.data.meta.msg
        });
      }
      // 对话框隐藏,里面的内容清空,刷新数据
      this.editdialogFormVisible = false;
      this.editForm.resetFields = "";
      this.init();
    },
    // 点击编辑按钮时,填充数据
    showEdit(row) {
      // console.log(row);
      this.editdialogFormVisible = true;
      this.editForm.username = row.username;
      this.editForm.id = row.id;
      this.editForm.email = row.email;
      this.editForm.mobile = row.mobile;
    },
    //  根据id删除
    deluser(id) {
      //  this.$confirm是element里面自带的提示确认框
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          // 把id丢给后台
          delusers(id)
            .then(result => {
              // console.log(result);
              if (result.data.meta.status === 200) {
                this.$message({
                  type: "success",
                  message: "删除成功!"
                });
              } else {
                this.$message({
                  type: "error",
                  message: "删除失败"
                });
              }
              // 在此前请求已发,数据删除成功了,不过没有刷新数据,但是不知道何时会减,所以刷新数据时假设删除了
              // 如果总条数减去1除以当前页面条数向上取整不小于页码就刷新(证明还有数据)
              if (
                Math.ceil((this.total - 1) / this.getObj.pagesize) <
                this.getObj.pagenum
              ) {
                this.getObj.pagenum--;
              } else if (
                Math.ceil((this.total - 1) / this.getObj.pagesize) === 0
              ) {
                // 为第一页
                this.getObj.pagenum = 1;
              }
              // 在发请求前做判断,不然的话把整页数据删除后不会跳上上一页
              this.init();
            })
            .catch(geterr => {
              console.log(geterr);
            });
          this.$message({
            type: "success",
            message: "删除成功!"
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    }
  }
};
</script>
<style lang="less" scoped>
.el {
  line-height: 46px;
}
</style>
