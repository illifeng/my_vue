import axios from './allAxios'

// 获取所有商品分类
export const getCategories=(id,sel)=>{
    return axios({
        url:`categories/${id}/attributes`,
        params:{sel}
    })
}
// 获取报表数据,饼状图形
export const getReports=()=>{
    return axios({
        url:`reports/type/1`,
    })
}

// 添加商品
export const getCommodity=(data)=>{
    return axios({
        url:`goods`,
        method:'post',
        data
    })
}