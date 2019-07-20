import Vue from 'vue'
// 根组件
import App from './App.vue'
// 引入element插件
import  Element from 'element-ui'
// 引入公共样式
// import '@/styles/index.less'
// 引入element-ui的样式
import '../node_modules/element-ui/lib/theme-chalk/index.css'
// 引入所有路由配置的集合文件
import  router from '@/my_router/index.js'
Vue.config.productionTip = false
// 让Vue能够使用element
Vue.use(Element)
new Vue({
  // 把上面引入的注入
  router,
  render: h => h(App),
}).$mount('#app')
