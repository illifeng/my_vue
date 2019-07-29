// 这是首页的路由
// 引入所有路由所要拼接完整的公共路径
import goAxios from './allAxios'
// 登陆成功后跳转的页面
export const goHome=(params)=>{
    return goAxios({
        url:'users',
        method:'get',
        params:params
    })
}
// 添加用户,参数参照文档
export const adduser=(result)=>{
    return goAxios({
        url:'users',
        method:'post',
        data:result
    })
}

// 删除数据
export const delusers=(id)=>{
    return goAxios({
        url:`users/+${id}`,
        method:'delete',
    })
}

// 编辑用户

export const editusers=(data)=>{
    return goAxios({
        url:`users/+${data.id}`,
        method:'put',
        data:{
            email:data.email,
            mobile:data. mobile
        }
    })
}
// 状态修改
export  const changeusers=(id,type)=>{
    return goAxios({
        url:`users/:${id}/state/:${type}`,
        method:'put',
    })
}

// 分配角色
export  const allOtusers=(id,rid)=>{
    return goAxios({
        url:`users/${id}/role`,
        method:'put',
        data:rid
    })
}