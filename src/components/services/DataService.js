// 导入 axios
import axios from 'axios'

// 创建一个 axios 实例，用于发送请求
const apiClient = axios.create({
  // 设置后端 API 的基础 URL
  baseURL: "http://localhost:8090",
  // 设置请求头
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
})

// 定义一个用于获取数据的函数
export default {
  getView(table) {
    return apiClient.get('/getView'+table)
  },
  getRawTable(table,current=1,size=10) { 
    return apiClient.post('/getRawTable'+table,{
      current:current,
      pageSize:size
    })
  },
  getId(table) {
    return apiClient.get('/getId'+table)
  },
  update(table,record) {
    console.log("update"+table)
    console.log(record)
    return apiClient.post(
      "/update"+table,
      {
        record:record
      }
    )
  },
  delete(table,record) {
    console.log("delete"+table)
    console.log(record)
    return apiClient.post(
      "/delete"+table,
      {
        record:record
      }
    )
  },
  insert(table,record) {
    console.log("insert"+table)
    console.log(record)
    return apiClient.post(
      "/insert"+table,
      {
        record:record
      }
    )
  }
}
