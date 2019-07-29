import axios from './allAxios'
// 获取所有角色
export const getallpas=()=>{
    return axios({
        url:'roles',
        method:'get'
    })
}