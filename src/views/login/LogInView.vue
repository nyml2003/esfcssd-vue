<template>
  <div style="height: 100vh; overflow: hidden; position: relative">
    <el-card class="cover" v-if="loginAdmin.id">
      <slide-verify
        :l="42"
        :r="10"
        :w="310"
        :h="155"
        :accuracy="5"
        slider-text="向右滑动"
        @success="onSuccess"
        @fail="onFail"
        @refresh="onRefresh"
      ></slide-verify>
    </el-card>

    <div
      style="
        width: 500px;
        height: 400px;
        background-color: white;
        border-radius: 10px;
        margin: 150px auto;
        padding: 50px;
      "
    >
      <div
        style="
          margin: 30px;
          text-align: center;
          font-size: 30px;
          font-weight: bold;
          color: dodgerblue;
        "
      >
        登 录
      </div>
      <el-form :model="admin" :rules="rules" ref="loginForm">
        <el-form-item prop="username">
          <el-input
            placeholder="请输入账号"
            size="large"
            v-model="admin.usrName"
          >
            <template #prefix>
              <el-icon>
                <User />
              </el-icon>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            placeholder="请输入密码"
            show-password
            size="large"
            v-model="admin.passWd"
          >
            <template #prefix>
              <el-icon>
                <Lock />
              </el-icon>
            </template>
          </el-input>
        </el-form-item>
        <el-select v-model="admin"  placeholder="Select" size="large" v-if="true">
          <el-option v-for="item in defaultOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
        </el-select>
        <div style=" display: flex; justify-content: center; ">
          <el-button size="large" type="primary" @click="login">登录</el-button>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import request from "@/utils/request";
import Cookies from "js-cookie";
import router from "@/router";
import SlideVerify from 'vue3-slide-verify';
const loginAdmin = ref({});
const admin = ref({
  usrName: 'admin',
  passWd: 'admin',
});
const defaultOptions=[
  {
    value: 
    {
      usrName: 'admin',
      passWd: 'admin',
    },
    label: '管理员'
  },
  {
    value: 
    {
      usrName: 'leader1',
      passWd: 'leader1',
    },
    label: '领导1'
  },
  {
    value: 
    {
      usrName: 'leader2',
      passWd: 'leader2',
    },
    label: '领导2'
  },
  {
    value: 
    {
      usrName: 'enterprise1',
      passWd: 'enterprise1',
    },
    label: '企业1'
  },
  {
    value: 
    {
      usrName: 'enterprise2',
      passWd: 'enterprise2',
    },
    label: '企业2'
  },
  {
    value: 
    {
      usrName: 'enterprise8',
      passWd: 'enterprise8',
    },
    label: '企业8'
  },
  {
    value:
    {
      usrName: '',
      passWd: '',
    },
    label:'请选择'
  }
]

const rules = {
  usrName: [
    { required: true, message: "请输入用户名", trigger: "blur" },
    { min: 3, max: 10, message: "长度在3-10个字符", trigger: "blur" },
  ],
  passWd: [
    { required: true, message: "请输入密码", trigger: "blur" },
    { min: 3, max: 10, message: "长度在3-10个字符", trigger: "blur" },
  ],
};

const loginForm = ref(null);

const login = async () => {
  loginForm.value.validate(async (valid) => {
    if (valid) {
      try {
        const res = await request.post('/User/Login', admin.value)
        console.log('login post')
        console.log(res)
        loginAdmin.value = res
        Cookies.set('admin', JSON.stringify(loginAdmin.value))
        console.log('onSuccess')
        console.log(loginAdmin.value)
        console.log(Cookies.get('admin'))
        router.push('/')
      } catch (error) {
        console.error(error)
      }
    }
  })
}

</script>

<style>
.cover {
  width: fit-content;
  background-color: white;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1000;
}
</style>
