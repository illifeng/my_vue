// 此页面是所有页面路由的配置
// 引入Vue
import Vue from 'vue'
// 引入Vue内置插件
import vueRouter from 'vue-router'
// 让Vue能够使用路由,名字与引入时创建名字一样
Vue.use(vueRouter)
// 引入登录页面单组件,在src下面的文件可用@符号表示
import myLogin from '@/views/my_login.vue'
import goHome from '@/views/gohome.vue'
// 创建路由对象,这个是要暴露出去的对象
var router = new vueRouter(
    // 进行路由配置
    {
        routes: [
            {
                name: 'setLogin',
                // 直接/跳到登录页面
                path: '/',
                // 页面重定向,输入/跳到登录页
                redirect: { name: 'mylogin' }
            },
            {
                // 登陆路由配置
                name: 'mylogin',
                // 因为是根路径所以要加斜杠,子路径不用加斜杆
                path: '/mylogin',
                // 引入的登录单组件
                component: myLogin
            },
            // 首页路由配置
            {
                name: 'goToHome',
                path: '/users',
                component: goHome
            }
        ]
    })
// 向外暴露路由
export default router
