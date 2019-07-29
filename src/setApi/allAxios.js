// 这是所有请求都会来这里查找前面共同的前缀
// 引入axios
import getAxios from 'axios'
// 设置接口基准地址
getAxios.defaults.baseURL='http://localhost:8888/api/private/v1/'

// 添加请求拦截器
getAxios.interceptors.request.use(function (config) {
    // 通过响应头的方式传递token值,键必须是Authorization
    let token=localStorage.getItem('local_login_21')
    // 响应头
    config.headers['Authorization']=token
    // 在发送请求之前做些什么
    return config;
  }, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  })

// 向外暴露axios请求
export default getAxios