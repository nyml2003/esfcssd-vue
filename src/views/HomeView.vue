<template>
    <el-row style="align-items: center; justify-content: center; height:100% width:100%">
  <el-form
    label-position="top"
    label-width="80px"
    style="width: fit-content;"
  >
    <el-col :span="24">
      <p>欢迎使用CS2305.HIS管理系统</p>
    </el-col>
  <el-row>
    <el-col :span="8">
      <el-button type="primary" @click="handleDelete" :disabled="!isDataExist">删除所有表</el-button>
    </el-col>
    <el-col :span="8">
      <el-button type="primary" @click="handleAdd" :disabled="isDataExist">创建所有表</el-button>
    </el-col>
    <el-col :span="8">
      <el-button @click="login" :disabled="!isDataExist">
          登录
        </el-button>
    </el-col>
  </el-row>

  </el-form>
  </el-row>
      <!-- <el-row style="align-items: center; justify-content: center; height:100% width:100%">
      <el-form
      label-position="top"
    label-width="80px"
    style="width: fit-content;"
      >
        <el-text class="login_title" size='large'>欢迎使用医院业务管理系统</el-text>
        <el-form-item >
          <el-button type="primary" @click="handleDelete" :disabled="!isDataExist">删除所有表
      </el-button> <el-button type="primary" @click="handleAdd" :disabled="isDataExist">创建所有表
        </el-button>
        <el-button @click="login" :disabled="!isDataExist">
          登录
        </el-button>
        </el-form-item>

      </el-form>
      </el-row> -->
      
</template>

<script setup>
import {useStore} from 'vuex'
import {computed} from 'vue'
import DataService from '@/components/services/DataService';
import router from '@/router';
import { onMounted } from 'vue';
const store = useStore()
const isDataExist = computed(() => store.state.isDataExist)
onMounted(async()=>{
  const res=await DataService.hasTable()
  console.log(res.data)
  store.commit('setDataExisit',res.data.hasTable)
})
const handleAdd=async()=>{
  store.commit('setDataExisit',true)
  console.log(isDataExist.value)
  console.log(store.state.isDataExist)
  await DataService.createAllTables()
}
const handleDelete=async()=>{
  store.commit('setDataExisit',false)
  console.log(isDataExist.value)
  await DataService.deleteAllTables()
}
const login=()=>{
  router.push({path:'/login'})
}
</script>

<style scoped>
form {
    background-color: #fff;
    padding: 20px;
    margin: 50px;
    margin-top: 150px;
    border-radius: 10px;
    width: 400px !important;
    border: 2px solid rgb(193, 186, 186);
}
.login_title {
    font-size: 25px;
    color: rgb(73, 73, 73);
    font-family:  'San Francisco';
    font-weight: 450;
    text-align: center;
    margin-bottom: 15px;
}
</style>