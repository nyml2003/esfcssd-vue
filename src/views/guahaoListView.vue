<template>
    <el-main>
      <el-table 
        :data="tableData" border max-height="600" 
      >
        <el-table-column type="index"></el-table-column>
        <el-table-column v-for="col in dataColumns" :key="col" :prop="col" :label="columns.get(col)"></el-table-column>
      </el-table>
    </el-main>
    <el-footer>
      <el-row style="{align-items: center;justify-content: center;  display: flex;}">
        <el-button type="primary" @click="loadData">刷新</el-button>
      </el-row>
    </el-footer>
  </template>
  
  <script setup>
  import DataService from "@/components/services/DataService.js"
  import { ref,onMounted } from "vue"
  import { useStore } from "vuex";
  const tableData=ref([])
  const columns=useStore().state.columns
    const childParams=useStore().state.RegisterFormView
    const store=useStore()

    const dataColumns=childParams.dataColumns
    const view=childParams.view
    const dateCol=childParams.dateCol
    const datetimeCol=childParams.datetimeCol
  const loadData=async () => {
    const response  =await DataService.search(view,"uid",store.state.user.uid)
    if (response.data.status) {
      console.log(response.data.status)
    }
    tableData.value=response.data.content
    console.log(tableData.value)
    for (let key in formData.value) {
      formatData(key)
    }
  }
  onMounted(loadData);
  const formData = ref({})
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
  </script>
  