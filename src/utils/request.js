// 导入 axios
import axios from 'axios'
import Cookies from 'js-cookie'
import router from '@/router'

// 创建一个 axios 实例，用于发送请求
const request = axios.create({
  // 设置后端 API 的基础 URL
  baseURL: "http://localhost:8090",
  // 设置请求头
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
})

// request 拦截器
// 可以自请求发送前对请求做一些处理
// 比如统一加token，对请求参数统一加密
request.interceptors.request.use(config => {
  config.headers['Content-Type'] = 'application/json;charset=utf-8';
  const adminJson = Cookies.get('admin')
  if (adminJson) {
      // 设置请求头
      config.headers['token'] = JSON.parse(adminJson).token 
  }
  return config
}, error => {
  return Promise.reject(error)
});

// response 拦截器
// 可以在接口响应后统一处理结果
request.interceptors.response.use(
  response => {
      let res = response.data;
      // 兼容服务端返回的字符串数据
      if (typeof res === 'string') {
          res = res ? JSON.parse(res) : res
      }
      if (res.code === '401') {
          router.push('/login')
      }
      return res;
  },
  error => {
      console.log('err' + error) // for debug
      return Promise.reject(error)
  }
)
// 定义一个用于获取数据的函数
export default request
