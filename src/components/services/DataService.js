// 导入 axios
import axios from 'axios'

// 创建一个 axios 实例，用于发送请求
const apiClient = axios.create({
  // 设置后端 API 的基础 URL
  baseURL: "http://192.168.1.15:9090",
  // 设置请求头
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
})

// 定义一个用于获取数据的函数
export default {
  hello(){
    return apiClient.get('/Staff/hello')
  },
  searchCompanyStaff(queryData){
    return apiClient.post('/Staff/searchCompanyStaff',queryData);
  },
  addCompanyStaff(staff){
    console.log(staff)
    return apiClient.post('/Staff/addCompanyStaff',staff);
  },
  updateCompanyStaff(staff){
    console.log("updateCompanyStaff")
    return apiClient.put('/Staff/updateCompanyStaff',staff);
  },
  deleteCompanyStaff(staffId,companyId){
    console.log("deleteCompanyStaff")
    console.log(staffId)
    console.log(companyId)
    return apiClient.delete('/Staff/deleteCompanyStaff/'+companyId+'/'+staffId);
  }
  
}
