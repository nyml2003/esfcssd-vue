<template>
  <el-container style="width:100%">
    <el-header>
      <el-menu 
      v-if="store.state.isLogin"
        router
        :unique-opened="true"
        mode="horizontal"
        class="el-menu-demo"
        :ellipsis="false"
        :default-active="$route.path"
      >
        <el-menu-item index="/">
          <el-icon>
            <HomeFilled />
          </el-icon>
          首页
        </el-menu-item>
        <el-sub-menu index=1 v-if="store.state.user.role=='admin'">
          <template #title><el-icon><Filter /></el-icon>原始数据</template>   
          <el-menu-item
          v-for="(item,id) in items"
          :key="id"
          :index="`1+${id}`"
          :route="{ name:'data', query: { item:JSON.stringify({dataColumns:item.dataColumns,table:item.table,pk:item.pk,dateCol:item.dateCol,datetimeCol:item.datetimeCol}) } }"
          >
          <el-icon><Document /></el-icon>{{item.name}}
          </el-menu-item> 
        </el-sub-menu>
        <el-sub-menu index=2 v-if="store.state.user.role=='admin'">
          <template #title><el-icon><Filter /></el-icon>视图</template>   
          <el-menu-item
          v-for="(item,id) in viewItems"
          :key="id"
          :index="`20+${id}`"
          :route="{ name:'view', query: { item:JSON.stringify({dataColumns:item.dataColumns,view:item.view,dateCol:item.dateCol,datetimeCol:item.datetimeCol}) } }"
          >
          <el-icon><Document /></el-icon>{{item.name}}
          </el-menu-item> 
        </el-sub-menu>
        <el-menu-item v-if="store.state.user.role=='patient'" index="/guahao">
          <el-icon>
            <HomeFilled />
          </el-icon>
          挂号
        </el-menu-item>
        <el-menu-item v-if="store.state.user.role=='patient'" index="/guahaoList">
          <el-icon>
            <HomeFilled />
          </el-icon>
          挂号列表
        </el-menu-item>
        <div class="flex-grow" />
        <el-menu-item index="/MyPage" >
          <el-icon><User/></el-icon>  主页
        </el-menu-item>
        
      </el-menu>

    </el-header>
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
.el-table--scrollable-x .el-table__body-wrapper {
  overflow-x: hidden;
}</style>
