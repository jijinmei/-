import axios from 'axios';


let instance = axios.create({
  // baseURL: 'http://boss-macaucf.leanapp.cn/api/v1',                       // 生产版
  // baseURL: 'http://stg-boss-macaucf.leanapp.cn/api/v1',                       // 开发本版
  baseURL: 'http://stg-boss-macaucf.leanapp.cn/',
  headers: {'token': sessiontoken},
  timeout: 10000
})


// 拦截器, 拦截请求后的数据处理
instance.interceptors.response.use(
  response => {
    
    // if (response.data.status) {
    //   return response.data.results
    // } else {
    //   return response.data.results
    // }
    return response.data

  },
  error => {
    return Promise.reject(error)
  }
)


export default instance