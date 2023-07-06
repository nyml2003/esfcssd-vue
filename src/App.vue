<template>
  <el-container style="width:100%">
    <el-main>
      <router-view :key=$route.fullPath></router-view>
    </el-main> 
  </el-container>
</template>

<script setup>
import {useStore} from 'vuex'
import { ref } from 'vue';
const store=useStore()
const items=ref(useStore().state.rawTableParanms)
const viewItems=ref(useStore().state.rawViewParanms)

</script>

<style>
#app {
  position: absolute;
  height: 98%;
  width: 98%;
  display: flex;
  padding: 0%;
  margin: 0%;
  flex-direction: column;
  justify-content: space-between;
}
.flex-grow {
  flex-grow: 1;
}
.el-header {
  padding: 0px;
  margin: 0px;
  width: 100%;
}

.el-table
{
  width: 100%;
}
.el-table__header-wrapper table,.el-table__body-wrapper table{
  width: 100% !important;
}
.el-table__header-wrapper, .el-table__body-wrapper{
  overflow-x: hidden;
}
.el-table__body, .el-table__footer, .el-table__header{
  table-layout: auto;
}
</style>
