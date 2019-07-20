// 引入公共路径,方便后面拼接路径发请求
import setAxios from './allAxios'
// 向外暴露登录页面的请求与方法名称,并且把前台接到的用户数据给后台,并且传一个回调函数给后台,以便返回成功或失败的结果
export const postLogin=(result)=>{
    // axios请求始终会返回一个promise对象
    return setAxios({
        // 请求路径(文档接口中的路径)
        url:'login',
        // 请求方式
        methods: 'post',
        // 向后台发的用户数据
        data:result
    })
}