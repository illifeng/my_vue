import axios from './allAxios'
// 分类列表
export const getGoodList=(type)=>{
    return axios({
        url:'categories',
        method:'get',
        params:{type}
    })
}

// 图片上传

// export const setupload=(data)=>{
//     return axios({
//         url:'upload',
//         method:'post',
//        data
//     })
// }