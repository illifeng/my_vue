// 这是首页的路由
// 引入所有路由所要拼接完整的公共路径
import goAxios from './allAxios'
// 登陆成功后跳转的页面
export const goHome=(result)=>{
    return goAxios({
        url:'users',
        methods:'get',
        data:result
    })
}