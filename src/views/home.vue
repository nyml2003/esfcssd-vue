<template>
  <el-col :span="20" class="table-box">
    <!--title 标题-->
    <div class="title">
      <h2>最简单的 CRUD Demo</h2>
    </div>
    <!--query 查询-->
    <div class="query-box">
      <el-col :span="8">
        <el-input v-model="queryInput" placeholder="请输入姓名搜索" />
      </el-col>
      <div>
        <el-button type="primary" @click="handleAdd">增加</el-button>
        <el-button type="danger" @click="handleListDel" v-if="multipleSelection.length > 0">删除</el-button>
      </div>
    </div>
    <!--table 表格-->
    <el-table :data="tableData" style="width: 100%" border @selection-change="handleSelectionChange"
      ref="multipleTableRef">
      <el-table-column type="selection" width="55" />
      <el-table-column prop="name" label="姓名" width="120" />
      <el-table-column prop="email" label="邮件" width="120" />
      <el-table-column prop="phone" label="电话" width="120" />
      <el-table-column prop="state" label="状态" width="120" />
      <el-table-column prop="address" label="地址" width="300" />
      <el-table-column fixed="right" label="操作" width="120">
        <template #default="scope">
          <el-button link type="danger" size="small" @click="handleRowDel(scope.row.id)">删除</el-button>
          <el-button link type="primary" size="small" @click="handleEdit(scope.row)">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!--dialog 弹窗-->
    <el-dialog v-model="dialogFormVisible" :title="dialogType === 'add' ? '新增' : '编辑'">
      <el-form :model="tableForm" label-width="auto">
        <el-form-item label="姓名">
          <el-input v-model="tableForm.name" autocomplete="off" />
        </el-form-item>
        <el-form-item label="邮箱">
          <el-input v-model="tableForm.email" autocomplete="off" />
        </el-form-item>
        <el-form-item label="电话">
          <el-input v-model="tableForm.phone" autocomplete="off" />
        </el-form-item>
        <el-form-item label="状态">
          <el-input v-model="tableForm.state" autocomplete="off" />
        </el-form-item>
        <el-form-item label="地址">
          <el-input v-model="tableForm.address" autocomplete="off" />
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button type="primary" @click="dialogConfirm">确认</el-button>
        </span>
      </template>
    </el-dialog>
  </el-col>
</template>

<script setup>
import { onMounted, ref, watch } from 'vue'
import DataService from '@/components/services/DataService';
//数据
const queryInput = ref("")
let tableData = ref([
  {
    id: 1,
    name: 'Tom1',
    email: "123@qq.com",
    phone: "12345678901",
    state: '在职',
    city: 'Los Angeles',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    id: 20,
    name: 'Tom2',
    email: "123@qq.com",
    phone: "12345678901",
    state: '在职',
    city: 'Los Angeles',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    id: 3,
    name: 'Tom3',
    email: "123@qq.com",
    phone: "12345678901",
    state: '在职',
    city: 'Los Angeles',
    address: 'No. 189, Grove St, Los Angeles',
  },

])
const tableName=ref("Doctor")
const loadData=async()=>{
  const response=await DataService.getTable(tableName.value)
  tableData.value=response.data
}
onMounted(()=>{
  loadData()
})
let tableDataCopy = tableData.value;
const multipleSelection = ref([]);//多选
const dialogFormVisible = ref(false);//是否打开
const formLabelWidth = "80px";//弹出框 标题长度
const tableForm = ref({})
const dialogType = ref("add")
//监控数据
watch(queryInput, (val) => {
  if (val.length > 0) {
    tableData.value = tableData.value.filter(item => item.name.toLowerCase().match(val.toLowerCase()));
  } else {
    tableData.value = tableDataCopy;
  } 
})
//选择事件
const handleSelectionChange = (val) => {
  multipleSelection.value = [];
  val.forEach(item => {
    multipleSelection.value.push(item.id)
  });
}
//添加按钮
const handleAdd = (val) => {
  tableForm.value = {}
  dialogType.value = "add"
  dialogFormVisible.value = true
}
//编辑按钮
const handleEdit = (val) => {
  tableForm.value = val
  dialogType.value = "edit"
  dialogFormVisible.value = true
}

//删除一条按钮
const handleRowDel = (id) => {
  console.log(id)
  let index = tableData.value.findIndex(item => item.id === id)
  tableData.value.splice(index, 1)
}

//删除多条
const handleListDel = () => {
  multipleSelection.value.forEach(id => {
    handleRowDel(id)
  })
  multipleSelection.value = [];
}

//确认按钮
const dialogConfirm = () => {
  if (dialogType.value === 'add') {
    tableData.value.push({
      id: tableData.value.length + 1,
      ...tableForm.value
    })
  } else {
    let index = tableData.value.findIndex(item => item.id === tableForm.value.id);
    tableData[index] = tableForm
  }
  dialogFormVisible.value = false
}

</script>

<style>
.table-box {
  margin: 0 auto;
}

.title {
  text-align: center;
}

.query-box {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
}
</style>
