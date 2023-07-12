<template>
  <el-dialog v-model="isSearchDialogVisible" draggable title="查询" style="max-width: fit-content; user-select: none;"
    center show-close :top="'5vh'" label-position="right">
    <el-form label-width="120px">
      <el-form-item v-for="index in queryRules.length" :key="index" :label="queryRules[index - 1].label">
        <el-input v-if="queryRules[index - 1].type == 'text'" v-model="commitQueryData[queryRules[index - 1].prop]"
          :placeholder="'请输入' + queryRules[index - 1].label" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="handleQuery(commitQueryData)">查询</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
  <!-- <el-dialog v-model="isDialogVisible" draggable title="编辑" style="max-width: fit-content; " center show-close
    :top="'5vh'" label-position="right">
    <el-form label-width="120px">
      <el-form-item v-for="index in columns.length" :key="index" :label="columns[index - 1].label">
        <el-input v-if="columns[index - 1].type == 'input'" v-model="rowRaw[columns[index - 1].prop]" />
        <el-select v-else-if="columns[index - 1].type == 'select'" v-model="rowRaw[columns[index - 1].prop]">
          <el-option v-for="option in columns[index - 1].options" :key="option.value" :label="option.label"
            :value="option.value" />
        </el-select>
        <el-select v-else-if="columns[index - 1].type == 'selectForeign'" v-model="rowRaw[columns[index - 1].prop]"
          @click="handleGetId(index - 1)">
          <el-option v-for="option in columns[index - 1].options" :key="option.value" :label="option.label"
            :value="option.value" />
        </el-select>
        <el-text v-else type="info">{{ rowRaw[columns[index - 1].prop] }}</el-text>
      </el-form-item>
    </el-form>
  </el-dialog> -->
  <div>
    <div style="margin-bottom: 20px">
      <el-button size="large" :type="viewModeConfig" @click="handleSwitchView">
        <el-icon>
          <View />
        </el-icon>
        {{ viewMode }}
      </el-button>
      <el-button size="large" @click="handleNewRow" v-if="viewMode == 'edit'">
        <el-icon>
          <Plus />
        </el-icon>
        新增
      </el-button>
      <el-button size="large" @click="handleRefresh">
        <el-icon>
          <Refresh />
        </el-icon>
        重置
      </el-button>
      <el-button size="large" @click="handleSearch" :type="handleQueryMode">
        <el-icon>
          <Search />
        </el-icon>
        查询
      </el-button>
    </div>
    <el-table :data="tableData" style="width: 100%;  user-select:none;" border @row-click="handleRowClick" default-expand-all>
      <el-table-column type="index" width="60" fixed align="center" label="序号">
      </el-table-column>
      <!-- 数据展示 -->
      <el-table-column v-for="index in columns.length" :key="index" :label="columns[index - 1].label"
         align="center">
        <template #default="scope">
          <el-input v-if="viewMode == 'view'" type="info" v-model="scope.row[columns[index - 1].prop]" :disabled="isDisabled"></el-input>
          <el-input v-else-if="columns[index - 1].type == 'input'" v-model="scope.row[columns[index - 1].prop]" :disabled="isDisabled"/>
          <el-select v-else-if="columns[index - 1].type == 'select'" v-model="scope.row[columns[index - 1].prop]">
            <el-option v-for="option in columns[index - 1].options" :key="option.value" :label="option.label"
              :value="option.value" />
          </el-select>
          <el-select v-else-if="columns[index - 1].type == 'selectForeign'" v-model="scope.row[columns[index - 1].prop]"
            @click="handleGetId(index - 1)">
            <el-option v-for="option in columns[index - 1].options" :key="option.value" :label="option.label"
              :value="option.value" />
          </el-select>
          <el-text v-else type="info">{{ scope.row[columns[index - 1].prop] }}</el-text>
        </template>
      </el-table-column>
      <el-table-column v-if="viewMode == 'edit' || isOperation " label="操作" fixed="right" width="150" align="center" >
        <template #default="scope">
          <el-button-group v-if="!isShow">
            <el-button type="primary" @click="handleUpload(scope.$index, scope.row)" :disabled="!isDifferent(scope.$index, scope.row)">
              <el-icon>
                <Upload />
              </el-icon>
            </el-button>
            <el-button type="danger" @click="handleDelete(scope.$index, scope.row)">
              <el-icon>
                <Delete />
              </el-icon>
            </el-button>
          </el-button-group>
          <el-button-group v-else>
            <el-button type="primary" @click="handleConfirm(scope.row)">
              <el-icon><Select /></el-icon>
            </el-button>
            <el-button type="danger" @click="handleReject(scope.row)">
              <el-icon><Close /></el-icon>
            </el-button>
          </el-button-group>
        </template>
      </el-table-column>
     
    </el-table>
  </div>
  <div style="display: flex; align-items: center; flex-direction: column;">
    <div style="margin-top: 20px ">
    <el-pagination layout="prev, pager, next" :total="total" :page-size="recordsPerPage" background
      @current-change="handleCurrentChange"></el-pagination>
  </div>
  </div>
  
</template>
  
<script setup>
// import
import { ref, onMounted, computed,inject } from "vue"
import request from "@/utils/request"
import { ElMessageBox } from "element-plus"

/*
与后端的交互
 
*/
const loadData = async () => {
  commitQueryData.value["pageNum"] = currentPage.value
  commitQueryData.value["pageSize"] = recordsPerPage.value
  if (id.value) {
    commitQueryData.value[idName.value] = id.value
  }
  if (filter.value) {
    for (let i = 0; i < filter.value.length; i++) {
      commitQueryData.value[filter.value[i].key] = filter.value[i].value
    }
  }
  await request.post('/' + table.value + '/search' + table.value, commitQueryData.value).then((response) => {
    console.log("loadData")
    console.log(response)
    tableData.value = response.data.list
    total.value = response.data.total
    recordsOnPage.value = tableData.value.length
    tableDataCopy = JSON.parse(JSON.stringify(tableData.value))
    const column = require('@/assets/json/' + table.value + '.json')
    columns.value = column.column
    queryRules.value = column.queryRule
  }).catch((err) => {
    console.log(err)
  })
}
onMounted(() => {
  loadData()
})




//表格数据和其备份 行数据和其备份
const tableData = ref([])
let tableDataCopy = []
let rowRaw = ref({})
let rowCopy = []

//每个列有3个属性：prop,label,type 
//prop是其对应的表的列名  
//label是其对应的表的列名的中文名  
//type有三种：input,select,fixed
//fixed可能是主键或者外键，或者连接进来的非本表的列
//本表的非主键非外键，也不是其他不能修改的情况的话，其他列可以修改
//修改暂时只支持两种：input和select
//select是下拉框，options是下拉框的选项, 比如性别有男女两个选项
//input是输入框
const columns = ref([])

//表名，由路由传入
const table = ref(inject('table'))
const id = ref(inject('id'))
const idName = ref(inject('idName'))
const pkid = ref(inject('pkid'))
const isOperation = ref(inject('isOperation'))
const isDisabled = ref(inject('isDisabled'))
const filter=ref(inject('filter'))
const isShow=ref(inject('isShow'))
const handleReject=(row)=>{
  ElMessageBox.confirm('确认驳回第'+row[pkid.value]+'号申请吗？', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(async () => {
    row['sarpass']='拒绝'
    console.log(row)
    const response=await request.put('/'+table.value+'/update'+table.value,row);
    switch(response.code){
      case '-1':
        ElMessageBox.alert('拒绝失败'+(response.msg==null ? "":response.msg), '提示', {
          confirmButtonText: '确定',
          type: 'warning'
        })
        break
      case '200':
        ElMessageBox.alert('拒绝成功'+(response.msg==null ? "":response.msg), '提示', {
          confirmButtonText: '确定',
          type: 'success'
        })
        break
    }
    setTimeout(() => {
      loadData()
    }, 200)
  }).catch(() => {
    // 处理取消操作
  })
}
const handleConfirm=(row)=>{
  ElMessageBox.confirm('确认通过第'+row[pkid.value]+'号申请吗？', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(async () => {
    row['sarpass']='通过'
    console.log(row)
    const response=await request.put('/'+table.value+'/update'+table.value,row);
    switch(response.code){
      case '-1':
        ElMessageBox.alert('通过失败'+(response.msg==null ? "":response.msg), '提示', {
          confirmButtonText: '确定',
          type: 'warning'
        })
        break
      case '200':
        ElMessageBox.alert('通过成功'+(response.msg==null ? "":response.msg), '提示', {
          confirmButtonText: '确定',
          type: 'success'
        })
        break
    }
    setTimeout(() => {
      loadData()
    }, 200)
  }).catch(() => {
    // 处理取消操作
  })
}
//加载数据
/*
  currentPage: 当前页码, 从1开始
  recordsPerPage: 每页的最大记录数，暂定为9
  total: 总记录数
  recordsOnPage: 当前页的记录数
*/
const currentPage = ref(1)
const recordsPerPage = ref(15)
const total = ref(0)
const recordsOnPage = ref(0)
const handleCurrentChange = (page) => {
  currentPage.value = page
  loadData()
}



//编辑模式的增删改查
const isDifferent = (index, row) => {
  rowCopy = tableDataCopy[index]
  if (rowCopy === undefined) return true
  for (let key in rowCopy) {
    if (rowCopy[key] !== row[key]) {
      return true
    }
  }
  return false
}

const handleNewRow = () => {
  if (tableData.value.length === recordsOnPage.value) {
    tableData.value.push(columns.value.reduce((acc, column) => ({ ...acc, [column.prop]: '' }), {}));
  }
}




//DataService接口
//增删改查

const handleUpload = async (index, row) => {
  console.log("handleUpload")
  console.log(row)
  ElMessageBox.confirm('确定要更新吗？', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(async () => {
    if (index === recordsOnPage.value) {
      const response=await request.post('/'+table.value+'/add'+table.value,row)
      console.log('add a row')
      switch (response.code){
        case '-1':
          ElMessageBox.alert('添加失败', '提示', {
            confirmButtonText: '确定',
            type: 'warning'
          })
          break
        case '200':
          ElMessageBox.alert('添加成功', '提示', {
            confirmButtonText: '确定',
            type: 'success'
          })
          break
      }
      console.log(response)
      setTimeout(() => {
        loadData()
      }, 200)
    } else {
      if (isDifferent(index, row)) {
        const response=await request.put('/'+table.value+'/update'+table.value,row);
        switch(response.code){
          case '-1':
            ElMessageBox.alert('更新失败'+(response.msg==null ? "":response.msg), '提示', {
              confirmButtonText: '确定',
              type: 'warning'
            })
            break
          case '200':
            ElMessageBox.alert('更新成功'+(response.msg==null ? "":response.msg), '提示', {
              confirmButtonText: '确定',
              type: 'success'
            })
            break
        }
        setTimeout(() => {
          loadData()
        }, 200)
      }
    }
  }).catch(() => {
    // 处理取消操作
  })
}

const handleInsert = async (row) => {
  
}
const handleDelete = async (index, row) => {
  if (index === recordsOnPage.value) {
    tableData.value.splice(index, 1)
  } else {
    ElMessageBox.confirm('确定要删除吗？', '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    }).then(async () => {
      console.log("delete")
      console.log(pkid.value)
      console.log(row)
      const response=await request.delete('/'+table.value+'/delete'+table.value+'/'+row[pkid.value]);
      switch(response.code){
        case '-1':
          ElMessageBox.alert('删除失败'+(response.msg==null ? "":response.msg), '提示', {
            confirmButtonText: '确定',
            type: 'warning'
          })
          break
        case '200':
          ElMessageBox.alert('删除成功'+(response.msg==null ? "":response.msg), '提示', {
            confirmButtonText: '确定',
            type: 'success'
          })
          break
      }
      setTimeout(() => {
        loadData()
      }, 200)
    }).catch(() => {
      // 处理取消操作
    })
  }
}

const handleQuery = async (row) => {
  console.log(Object.keys(commitQueryData).length)
  isSearchDialogVisible.value = false
  loadData()
}
const handleGetId = async (index) => {
  const table = columns.value[index].foreign
  const response = await request.get('/Staff/getId/'+table);
  const id = response.data.id
  columns.value[index].options = []
  for (let i = 0; i < id.length; i++) {
    columns.value[index].options.push({
      "value": id[i],
      "label": id[i]
    })
  }
  return response.data.id
}

//视图模式 | 编辑模式
const viewMode = ref(inject('viewMode'))
const viewModeConfig = ((mode)=>{
 if (mode == 'view') {
    return 'info'
  } else {
    return 'primary'
  }
})(viewMode.value)
const handleSwitchView = () => {
  switch (viewMode.value) {
    case 'edit':
      viewMode.value = 'view'
      break
    case 'view':
      viewMode.value = 'edit'
      break
    default:
      break
  }
}

// 进行选中行的备份
const isDialogVisible = ref(false)
const handleRowClick = (row) => {
  if (viewMode.value == 'edit') return
  rowRaw.value = row
  rowCopy = JSON.parse(JSON.stringify(row))
  isDialogVisible.value = true
  console.log(row)
}

const queryRules = ref([])
const commitQueryData = ref({})
const isSearchDialogVisible = ref(false)
const handleSearch = () => {
  console.log( Object.keys(commitQueryData.value).length)
  console.log('id')
    console.log(id.value === undefined ? 0:1)
  isSearchDialogVisible.value = true
}

const handleRefresh = () => {
  commitQueryData.value = {}
  loadData()
}

//查询条件为空 | 存在查询条件 
const queryMode = ref('empty')
const handleQueryMode =computed(
  () => {
    
  //获取 commitQueryData 对象的键名数组
  // 检查键名数组中是否有除了 'pageNum' 和 'pageSize' 之外的元素
  if (Object.keys(commitQueryData.value).length > 2+(id.value === undefined ? 0:1)+(filter.value === undefined ? 0:filter.value.length)) {
    return 'warning'
  } else {
    return 'primary'
  }
}
)



const queryModeConfig = {
  empty:
  {
    button: 'info',
  },
  exist:
  {
    button: 'primary',
  }
}
</script>
  
  
<style scoped>
.el-menu-item {
  height: 50px;
}
</style>
  
