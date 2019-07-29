import axios from './allAxios'

// 商品管理
export const goodList=(params)=>{
    return axios({
        url:'goods',
        method:'get',
        params
    })
}