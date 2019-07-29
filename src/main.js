// 第三方资源的引入
import Vue from 'vue'
// 根组件,以后所有的组件渲染都要基于这个根组件
import myApp from '@/App.vue'
// 引入element插件
import  Element from 'element-ui'
// 引入公共样式
import '@/styles/index.less'
// 引入element-ui的样式
import '../node_modules/element-ui/lib/theme-chalk/index.css'
// 引入所有路由配置的集合文件
import  router from '@/my_router/index.js'
// 引入css3动画库
import amimate from 'animate.css'
// 让Vue实例能够使用amimate动画,让其成为内置成员
Vue.use(amimate)
Vue.config.productionTip = false
// 让Vue实例能够使用element,让其成为内置成员
Vue.use(Element)

new Vue({
  // 把上面引入的注入vue实例
  router,
  // 与引入的App.vue所对应
  render: h => h(myApp),
  // 与index.html中的id所对应,注不能改为class
}).$mount('#myApp')

