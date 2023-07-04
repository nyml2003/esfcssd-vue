// 导入 axios
import axios from 'axios';

// 创建一个 axios 实例，用于发送请求
const apiClient = axios.create({
  // 设置后端 API 的基础 URL
  baseURL: "http://localhost:8090/api",
  // 设置请求头
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

// 定义一个用于获取数据的函数
export default {
  getAllData(table) {
    return apiClient.post('/table',{'table':table});
  },
  getView(view) {
    return apiClient.post('/view',{'view':view});
  },
  shutdown() {
    return apiClient.post('/shutdown',{"content":"shutdown"});
  },
  update(table,id,col,value,pk){
    return apiClient.post('/update',{"table":table,"id":id,"col":col,"value":value,"pk":pk});
  },
  delete(table,id,pk){
    return apiClient.post('/delete',{"table":table,"id":id,"pk":pk});
  },
  insert(table,values){
    return apiClient.post('/insert',{"table":table,"values":values});
  },
  login(username, password){
    return apiClient.post('/login', {username:username,password:password});
  },
  register(username, password,role){
    return apiClient.post('/register', {username:username,password:password,role:role});
  },
  select_profile(uid){
    return apiClient.post('/SP', {uid:uid});
  },
  search(table,col,value){
    return apiClient.post('/search',{"table":table,"col":col,"value":value});
  },
  guahao(table,values){
    return apiClient.post('/guahao',{"table":table,"values":values});
  },
  deleteAllTables(){
    return apiClient.post('/deleteAllTables');
  },
  createAllTables(){
    return apiClient.post('/createAllTables');
  },
  hasTable(){
    return apiClient.get('/hasTable');
  }
};
