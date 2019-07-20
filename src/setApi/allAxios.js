// 这是所有请求都会来这里查找前面共同的前缀
// 引入axios
import getAxios from 'axios'
// 设置接口基准地址
getAxios.defaults.baseURL='http://localhost:8888/api/private/v1/'

// 向外暴露axios请求
export default getAxios