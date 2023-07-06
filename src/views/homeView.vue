<template>
  <el-main>
    <el-table :data="tableData" style="width: 100%; user-select:none;" border>
      <el-table-column type="index" width="100" fixed align="center">
        <template #header>
          <el-button>
            <el-icon>
              <Plus />
            </el-icon>
          </el-button>
        </template>
      </el-table-column>
      <!-- 数据展示 -->
      <el-table-column v-for="item in columns" :key="item.prop" :label="item.label" max-width="300" min-width="200">
        <template #default="scope">
          <el-input v-if="item.type=='input'" v-model="scope.row[item.prop]"/>
          <el-select v-else-if="item.type=='select'" v-model="scope.row[item.prop]">
            <el-option v-for="option in item.options" :key="option.value" :label="option.label" :value="option.value" />
          </el-select>
          <el-text v-else type="info">{{ scope.row[item.prop] }}</el-text>
        </template>
      </el-table-column>
      <el-table-column label="操作" fixed="right" width="200" align="center">
        <template #default="scope">
        <el-button-group>
          <el-button type="primary" @click="handleEdit(scope.$index, scope.row)">
            <el-icon>
              <Edit />
            </el-icon>
          </el-button>
          <el-button type="danger" @click="handleClick()">
            <el-icon>
              <Delete />
            </el-icon>
          </el-button>
        </el-button-group>
        </template>
        

      </el-table-column>
    </el-table>
  </el-main>
  <el-footer>
       <el-button @click="loadData">
        click it
    </el-button>
    </el-footer>
</template>

<script setup>
import { onMounted, ref } from "vue";
import DataService from "@/components/services/DataService";
const tableData=ref([]);
let tableDataCopy=[];
const columns=ref([]);
const loadData=async()=>{
    const response=await DataService.getView("Doctor");
    console.log(response.data)
    tableData.value=response.data.tableData;
    tableDataCopy=JSON.parse(JSON.stringify(tableData.value))
    columns.value=response.data.columns;
}
onMounted(()=>{
    loadData();

});
const handleEdit = async(index, row) => {
  if (isDifferent(index,row)){
    await DataService.update("Doctor",row);
  }
}
const isDifferent=(index,row)=>{
  const rowCopy = tableDataCopy[index];
  for (let key in row){
    if (rowCopy[key]!=row[key]){
      return true;
    }
  }
  return false;
}
const handleClick=()=>{
    console.log("delete")
}
</script>


<style scoped></style>
