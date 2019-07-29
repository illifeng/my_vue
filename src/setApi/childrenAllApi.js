// 所有权限请求
import axios from './allAxios'
export const setChildren=(type)=>{
    return axios({
        url:`rights/${type}`,
        method: 'get'
    })
}