<template>
    <div class="container">
        <div class="text">
            欢迎使用残疾人就业保障金征收及使用监管系统:{{ role }}
        </div>
        <img src="@/assets/image/logo_full.png" alt="image">
    </div>
</template>

<script setup>
import Cookies from "js-cookie";
import { ref } from "vue";
const role = ref(((usrClass)=>{
  if (usrClass === '企业') {
    return '企业工作人员';
  } else if (usrClass === '领导') {
    return '财政局领导';
  } else if (usrClass === '管理员') {
    return '管理员';
  } else {
    return 'unknown';
  }
})(JSON.parse(Cookies.get('admin')).usrClass))
</script>

<style>
.container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 80vh;
}

.text {
    position: absolute;
    top: 10%;
    text-align: center;
}

img {
  position: absolute;
  top:60%;
  left: 80%;
  max-width: 100%;
}
</style>