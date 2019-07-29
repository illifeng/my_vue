<template>
  <!-- 首页单组件 -->
  <div class="gohome">
    <p>{{msg}}</p>
    <!-- v-text渲染文本,不可以解析变量中的标签 -->
    <p v-text="msg"></p>
    <!-- <v-html>也可以渲染页面,不过它能解析变量中的标签 -->
    <div class="nav" v-html="res"></div>
    <!-- 单向动态绑定变量跳转,能绑定一个变量 -->
    <a :href="img">跳转</a>
    <br />
    <!-- 这种不能绑定变量 -->
    <a href="img">跳转</a>
    <!-- 单向动态绑定属性使字体变大与字体颜色变红 -->
    <p :style="{fontSize:style+'px'}">字体变大了吗</p>
    <p :style="{color:isred}">字体变红色</p>
    <!-- 点击按钮取反,达到切换的效果,但是必须要与v-show配合,v-show为显示 -->
    <!-- @click后可加按键修饰符 -->
    <input type="button" value="切换" @click.13="istotal=!istotal" />
    <!-- vue中只有v-for一种循环,循环遍历把数组里面的数据进行渲染,:key绑定的是唯一值 -->
    <!-- 在transition双标签里面加入进入状态enter-active-class="animated 哪种动画" -->
    <!-- 在transition双标签里面加入离开状态enter-active-class="wobble 哪种动画" -->
    <!-- 注:进入与离开可设置多种动画 -->
    <transition
    enter-active-class="animated rotateIn" leave-active-class="animated zoomOutDown">
        <ul v-for="(value,index) in data" :key="index" v-show="istotal">
      <li>{{value.id}}</li>
      <li>{{value.name}}</li>
      <li>{{value.age}}</li>
    </ul>
    </transition>
    <!-- Vue里边的逻辑表达式,v-if,v-esle(先有if再有else) -->
    <p v-if="istotal">显示与隐藏</p>
    <hr />
    <!-- 自定义指令,v-名称调用 -->
    <input type="text" v-addcolor="'red'" />
    <!-- <son></son> -->
  </div>
</template>
<script>
// import getSon from '@/son.vue'
export default {
  data() {
    return {
      msg: "这是首页",
      res: "<p>这是v-html</p>",
      result: "v-bind",
      istotal: false,
      img: "https://www.baidu.com/",
      style: 50,
      isred: "red",
      data: [
        {
          id: 1,
          name: "小健",
          age: 22
        }
      ]
    };
  },
  // 钩子函数
  methods: {
    del() {}
  },
  //   directives指令集合
  //   定义addcolor单组件
  directives: {
    addcolor: {
      inserted(el, binding) {
        el.focus();
        el.style.color = binding.value;
      }
    }
  }
//   将引入的组件注册
//   components:{
//       son:getSon
//   }
};
</script>
<style lang="less" scoped>
</style>