// 此页面是所有页面路由的配置
// 注:路由映射组件,先要有组件路径,再可以把组件引入
// 引入Vue
import Vue from 'vue'
// 引入Vue内置插件
import vueRouter from 'vue-router'
// 让Vue能够使用路由,名字与引入时创建名字一样
Vue.use(vueRouter)
// 引入登录页面单组件,在src下面的文件可用@符号表示
import myLogin from '@/views/my_login.vue'
// 首页单组件
import goHome from '@/views/gohome.vue'
// 练习单组件
import Exercise from '@/views/exercise.vue'
// 管理用户单组件
import Users from '@/views/users.vue'
// 权限单组件
import Children from '@/views/allJurisdiction/children.vue'
import Jurisdiction from '@/views/allJurisdiction/jurisdiction.vue'
import Goods from '../views/goods/catlist.vue'
import letcat from '../views/goods/letcat.vue'
import rightcat from '../views/goods/rightcat.vue'
import Reports from '@/views/gege.vue'
import Orders from  '@/views/goods/orders.vue'
import Parmas from   '@/views/goods/parmas.vue'
// 创建路由对象,这个是要暴露出去的对象
var myRouter = new vueRouter(
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
                path: '/login',
                // 引入的登录单组件
                component: myLogin
            },
            // 首页路由配置
            {
                name: 'goToHome',
                path: '/users',
                component: goHome,
                redirect: { name: 'users' },
                // 子组件
                children: [ 
                    // 饼状图
                    {
                    name: 'reports',
                    path: 'reports',
                    component:Reports
                },
                {
                    name: 'orders',
                    path: 'orders',
                    component:Orders
                },
                {
                    name: 'parmas',
                    path: 'params',
                    component:Parmas
                },
                    {
                    name: 'users',
                    path: 'users',
                    component: Users
                },
                // 权限路由
                {
                    name: 'children',
                    path: 'rights',
                    component: Children
                }, {
                    // 左侧菜单路由
                    name: 'jurisdiction',
                    path: 'roles',
                    component: Jurisdiction
                },
                // 商品列表
                {
                    name: 'goods',
                    path: 'goods',
                    component: Goods,
                    redirect: { name: 'list' },
                    children: [
                        {
                            name: 'list',
                            path: 'list',
                            component: letcat
                        },
                        {
                            name: 'add',
                            path: 'add',
                            component: rightcat
                        }
                    ]
                },
                ]
            },
            {
                // 练习组件路由配置
                name: 'exercise',
                path: '/exercise',
                component: Exercise
            }
        ]
    })
// before路由进入前
// later路由离开后
// 每一次走路由都会经过这个函数,此为导航守卫
myRouter.beforeEach((before, later, next) => {
    // 提取token值
    let token = localStorage.getItem('local_login_21')
    // console.log(mytoken);
    // console.log(before);
    // console.log(later);
    // 本地储存有token值,证明已经登录成功过或者直接登陆成功,就可以进入首页
    if (token || before.path == '/mylogin') {
        next()
    } else {
        // 否则跳回登录页
        next({ name: 'mylogin' })
    }

})
// 向外暴露路由
export default myRouter
