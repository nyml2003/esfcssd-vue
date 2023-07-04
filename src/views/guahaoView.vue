<template>
    <el-row style="align-items: center; justify-content: center; height:100% width:100%">
        <el-form  label-position="top">
            <el-form-item label="日期选择">
                <el-date-picker v-model="datetime" type="datetime"></el-date-picker>
            </el-form-item>
            <el-form-item label="出诊科室" >
                <el-select v-model="dept">
                    <el-option
                        v-for="item in deptOptions"
                        :key="item.DeptNo"
                        :label="item.DeptName"
                        :value="item.DeptNo"
                    />
                </el-select>
            </el-form-item>
            <el-form-item label="出诊医生" >
                <el-select v-model="doctor" @click="getDoctor">
                    <el-option
                        v-for="item in doctorOptions"
                        :key="item.Dno"
                        :label="item.Dname"
                        :value="item.Dno"
                    />
                </el-select>
            </el-form-item>
            <el-form-item label="备注" >
                <el-input v-model="comment"></el-input>
            </el-form-item>
            <el-button type="primary" @click="handleAdd">提交
            </el-button>
        </el-form>
    </el-row>
</template>

<script setup>
import DataService from "@/components/services/DataService.js"
import { ref} from "vue"
import { useStore } from "vuex";
import { useRouter } from 'vue-router'
const router = useRouter()
const datetime = ref(new Date())
const store=useStore()
const dept = ref('')
const doctor = ref('')
const comment = ref('')
const deptOptions = ref('')
const doctorOptions = ref('')
const getData=async()=>{
    let table="`cs2305.dept`"
    let res=await DataService.getAllData(table)
    deptOptions.value=res.data.content
}
getData()
const getDoctor=async()=>{
    let table="cs2305.doctor"
    let res=await DataService.search(table,"Ddeptno",dept.value)
    doctorOptions.value=res.data.content
}
const formatData = (datetime) => {
    let d = new Date(datetime)
    d = d - d.getTimezoneOffset() * 60000
    return new Date(d).toISOString().slice(0, 19).replace('T', ' ')
}
const handleAdd=()=>{
    datetime.value=formatData(datetime.value)
    let table="`cs2305.Register_Form`"
    let data=[dept.value,doctor.value,store.state.Pno,datetime.value,comment.value]
    DataService.guahao(table,data)
    router.push({path:'/guahaoList'})
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
</style>