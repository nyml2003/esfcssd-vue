<template>
    <el-row 
         class="info">
        <p>个人信息</p>
    <div class="button-wrapper">
        <el-button type="primary" circle @click="updateInfoDialog"><el-icon><Edit /></el-icon></el-button>
        <el-button type="primary" circle @click="isExit = true"><el-icon><Close /></el-icon></el-button>
    </div>
    </el-row>
    <!--基本信息显示区-->
    <div class="info2">
        <el-row v-for="key in Object.keys(person).filter(key => !keysToFilter.includes(key))" :key="key" :label="key" class="info3"><el-icon size="25" style="margin-right: 15px;"><PriceTag /></el-icon>{{columns.get(key)+":"+person[key] }}</el-row>
    </div>
  <!-- 退出登录 -->
  <el-dialog v-model="isExit" title="您是否要退出登录？" width="500px">
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="isExit = false">取消</el-button>
        <el-button type="primary" @click="logout">
          退出
        </el-button>
      </span>
    </template>
  </el-dialog>

  <el-dialog v-model="dialogVisible" title="修改信息" width="500px">
    <el-form  label-position="top">
        <el-form-item v-for="key in Object.keys(initData).filter(key => !keysToFilter.includes(key))" :key="key" :label="columns.get(key)">
            <el-date-picker v-if="dateCol.includes(key)" v-model="initData[key]" type="date"></el-date-picker>
            <el-input v-else v-model="initData[key]"></el-input>
        </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="updateInfo">
          提交
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { ElMessage } from 'element-plus'
import {useStore} from 'vuex'
import { useRouter } from 'vue-router'
import DataService from '@/components/services/DataService'
const store=useStore()
const router = useRouter()
const isExit = ref(false)
const logout=()=>{
    isExit.value = false
    store.commit("logout")
    ElMessage.success('退出成功！')
    router.push({path:'/login'})
}

const uid = ref(store.state.user.uid)
const person=ref('')
const keysToFilter=ref(['uid','role','Pno','Dno','password'])
let table=``
const dialogVisible = ref(false)
const initData = ref({})
const dateCol = ['Pbd']
const formatData = (key) => {
  if (dateCol.includes(key)) {
    let d = new Date(initData.value[key])
    d = d - d.getTimezoneOffset() * 60000
    initData.value[key] = new Date(d).toISOString().slice(0, 10)
  }
}
const columns=useStore().state.columns
const getPersonalInfo = async () => {
    if (store.state.isLogin === false) {
        ElMessage.error('您还没有登录，请先登录！');
        router.push({path:'/login'})
        return;
    }
    else if (store.state.user.role !== 'admin') {
        table=`cs2305.${store.state.user.role}`
        let responce = await DataService.search(table,"uid",uid.value)
        person.value=responce.data['content'][0]
        store.commit("setPno",person.value['Pno'])
    }else{
        table="cs2305.user"
        let responce = await DataService.search(table,"uid",uid.value)
        person.value=responce.data['content'][0]
    }
};

onMounted(getPersonalInfo)
const updateInfoDialog = () => {
    dialogVisible.value = true
    console.log(person.value)
    initData.value=JSON.parse(JSON.stringify(person.value))
};
const updateInfo= async()=>{
    Object.keys(person.value).forEach(key => {
        if (person.value[key] !== initData.value[key]) {
            formatData(key)
            person.value[key]=initData.value[key]
            DataService.update( '`'+table+ '`',uid.value,key, initData.value[key], "uid")
            console.log(['`'+table+ '`',uid.value,key, initData.value[key], "uid"])
        }
    })
    dialogVisible.value = false
    ElMessage.success('修改成功！')
}
</script>

<style scoped>
.row {
    margin-bottom: 15px;
    font-size: 16px;
    margin-left: 80px;
}
.detail {
    background-image: linear-gradient(to right, #5d9cec, #8eb5f3);
    border-radius: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
}
.icon {
    margin-right: 10px;
}
.button-wrapper {
  margin-left: auto;
}

.info2 {
    color:gray;
    margin-left: 70px;
    height: 60vh;
    font-size: 17px;
    font-weight: 340;
    display: flex; 
    align-items: begin;
    justify-items: center;
    flex-direction: column;
}
.info3 {
    margin-bottom: 15px;
    padding-bottom: 15px;
    border-bottom: 2px solid #E6E6E6;
}

.show_detail {
    margin-top: 15px;
    margin-bottom: 15px;
    display: flex;
    align-items: center;
    padding-right: 50px;
    padding-left: 50px;
    border-right: 2px solid white;
}
.icon {
    color: white;
    border:none !important;
}
.text {
    color: white;
    margin-left: 10px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    font-weight: 220;
    font-size: 16px;
}
.info {
    display: flex;
    align-items: center;
    margin-bottom: 20px;
    border-bottom: 3px solid #E6E6E6;
    padding-bottom: 10px;
    justify-content: space-between;
}
.info p {
    margin-left: 20px;
    font-size: 25px;
    font-weight: 190;
}

.detail p{
    margin-left: 68px;
    margin-bottom: 20px;
    font-weight: 190;
}

</style>