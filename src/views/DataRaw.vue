<template>
  
  <el-dialog v-model="dialogFormVisible" title="编辑" draggable style="max-width: fit-content;" label-position="right">
    <el-form>
      <el-form-item v-for="col in dataColumns" :key="col" :prop="col" :label="columns.get(col)">
          <el-date-picker v-if="dateCol.includes(col)" v-model="formData[col]" :disabled="!isAdd && disabledColumns.includes(col)" type="date"></el-date-picker>
          <el-date-picker v-else-if="datetimeCol.includes(col)" v-model="formData[col]" :disabled="!isAdd && disabledColumns.includes(col)" type="datetime"></el-date-picker>
          <el-input v-else v-model="formData[col]" :disabled="!isAdd && disabledColumns.includes(col)"></el-input>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        
        <div v-if="isAdd">
          <el-button @click="dialogFormVisible = false">取消</el-button>
          <el-button type="primary" @click="handleAdd">
            添加
          </el-button>
        </div>
        <div v-else>
          <el-button @click="dialogFormVisible = false">取消</el-button>
            <el-button type="primary" @click="update">
            修改
          </el-button>
          <el-button type="primary" @click="handleDelete">
            删除
          </el-button>
        </div>       
        
      </span>
    </template>
  </el-dialog>
  
  <el-main>

    <el-table 
      :data="tableData" @row-click="handleRowClick" border max-height="600" 
    >
      <el-table-column type="index"></el-table-column>
      <el-table-column v-for="col in dataColumns" :key="col" :prop="col" :label="columns.get(col)"></el-table-column>
    </el-table>
  </el-main>
  <el-footer>
    <el-row style="{align-items: center;justify-content: center;  display: flex;}">
      <el-button type="primary" @click="loadData">刷新</el-button>
      <el-button type="primary" @click="handleAddButton">添加</el-button>
    </el-row>
  </el-footer>
</template>

<script setup>
import DataService from "@/components/services/DataService.js"
import { ref,onMounted } from "vue"
import { useStore } from "vuex";
import { useRoute } from "vue-router";
import { ElNotification } from "element-plus";
const tableData=ref([])
const columns=useStore().state.columns
  const childParams=JSON.parse(useRoute().query.item)
  const dataColumns=childParams.dataColumns
  const table=childParams.table
  const pk=childParams.pk
  const dateCol=childParams.dateCol
  const datetimeCol=childParams.datetimeCol
const disabledColumns=[
  pk
]
const loadData=async () => {
  const response  =await DataService.getAllData(table)
  tableData.value=response.data.content
  console.log(tableData.value)
}
onMounted( loadData)
const dialogFormVisible = ref(false)
const formData = ref({})
const isAdd= ref(false)
let initFormData={}
const handleRowClick=(row)=>{
  isAdd.value=false
  formData.value = { ...row };
  initFormData={ ...row };
  dialogFormVisible.value = true
}
const formatData = (key) => {
  if (dateCol.includes(key)) {
    let d = new Date(formData.value[key])
    d = d - d.getTimezoneOffset() * 60000
    formData.value[key] = new Date(d).toISOString().slice(0, 10)
  } else if (datetimeCol.includes(key)) {
    let d = new Date(formData.value[key])
    d = d - d.getTimezoneOffset() * 60000
    formData.value[key] = new Date(d).toISOString().slice(0, 19).replace('T', ' ')
  }
}
const update=async()=>{
  for (let key in formData.value) {
    if(formData.value[key]!=initFormData[key]){
      formatData(key)
      const response=await DataService.update(table,formData.value[pk],key,formData.value[key],pk)
      console.log(response.data)
      if (response.data.error===false)
      ElNotification({
        title:"提交失败",
        message:response.data.content
      })
      else  ElNotification({
        title:"提交成功",
      })
      console.log([table,formData.value[pk],key,formData.value[key],pk])
    }
  }
  dialogFormVisible.value=false
  setTimeout(loadData,500);
}
const handleDelete=async()=>{
  const response=await DataService.delete(table,formData.value[pk],pk);
  if (response.data.error===false)
      ElNotification({
        title:"提交失败",
        message:response.data.content
      })
      else  ElNotification({
        title:"提交成功",
      })
  dialogFormVisible.value=false
  setTimeout(loadData,500);
}
const handleAdd=async()=>{
  let data=[]
  for (let key in formData.value) {
    formatData(key)
    data.push(formData.value[key])
  }
  const response=await DataService.insert(table,data)
  if (response.data.error===false)
      ElNotification({
        title:"提交失败",
        message:response.data.content
      })
      else  ElNotification({
        title:"提交成功",
      })
  dialogFormVisible.value=false
  setTimeout(loadData,500);
}
const handleAddButton=()=>{
  isAdd.value=true
  dialogFormVisible.value=true
  formData.value={}
}
</script>
