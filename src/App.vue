<template>
  <el-container style="width:100%">
    <el-header style="margin:0 !important;padding: 0 !important;">
      <topBar/>
    </el-header>
      <el-aside>
        <asideBar/>
      </el-aside>
      <el-main style="justify-content: center; align-items: center; width: 100%;height:100%">
        <!-- <router-view :key=$route.fullPath></router-view> -->
      </el-main>
  </el-container>
</template>

<script setup>
import topBar from '@/components/topBar.vue';
import asideBar from '@/components/asideBar.vue';
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
