import axios from './allAxios'

// 角色列表
export const setroles=()=>{
    return axios({
        url:'roles',
        method:'get'
    })
}
// 删除数据
export const delchildren=(roleId,rightId)=>{
    return axios({
        url:`roles/${roleId}/rights/${rightId}`,
        method: 'delete'
    })
}

// 角色授权

export const getAllId=(roleId,rid)=>{
    return axios({
        url:`roles/${roleId}/rights`,
        method:'post',
        data:{rid}
    })
}

// 添加
export const setaddkitty=(data)=>{
    return axios({
        url:`roles`,
        method:'post',
        data
    })
}