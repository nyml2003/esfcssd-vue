<template>
  <div>
    <!-- 头部区域 -->
    <div style="height: 60px; line-height: 60px; background-color: white; margin-bottom: 2px; display: flex">
      <div style="width: 600px">
        <img src="@/assets/image/logo.png" alt="" style="width: 80px; position: relative; top: 15px; left: 10px">
        <span style="margin-left: 20px; font-size: 24px">残疾人就业保障金征收及使用监管系统</span>
      </div>
      <div style="flex: 1; text-align: right; padding-right: 20px">
        <el-dropdown size="medium">
          <span class="el-dropdown-link" style="cursor: pointer">
            username<i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown>
            <span class="el-dropdown-link" style="cursor: pointer">
              username<i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <template v-slot:dropdown>
              <el-dropdown-menu style="margin-top: -5px">
                <el-dropdown-item>
                  <div style="width: 50px; text-align: center;">退出</div>
                </el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>

        </el-dropdown>
        <el-button type="danger"  @click="logout"><el-icon><SwitchButton /></el-icon>注销</el-button>
      </div>
    </div>

    <!-- 侧边栏和主体 -->
    <div style="display: flex">
      
      <!-- 侧边栏导航 -->
      <div ref="sideBar"
      class="sidebar"
        >
        <el-menu :default-active="$route.path" router class="el-menu-demo" style="margin-bottom: 10px"
          :collapse="!isMouseInside">
          <el-menu-item index="/">
            <el-icon>
              <House />
            </el-icon>
            <span>首页</span>
          </el-menu-item>

          <el-menu-item index="office">
            <el-icon>
              <OfficeBuilding />
            </el-icon>
            <span>单位</span>
          </el-menu-item>
          <el-menu-item index="2">
            <el-icon><User /></el-icon>
            <span>职工</span>
          </el-menu-item>
          <el-menu-item index="3">
            <el-icon><Money /></el-icon>
            <span>征收</span>
          </el-menu-item>
          <el-menu-item index="4">
            <el-icon><DataAnalysis /></el-icon>
            <span>统计</span>
          </el-menu-item>
          <el-menu-item index="5">
            <el-icon><Printer /></el-icon>
            <span>打印</span>
          </el-menu-item>
        </el-menu>
      </div>

      <!-- 主体数据 -->
      <!-- width: 0; 可以限制容器的宽度，不被子元素无限撑开-->
      <div style="flex: 1; width: 0; background-color: white; padding: 10px">
        <router-view />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted,nextTick } from 'vue';
import {ElMessageBox} from 'element-plus';
import Cookies from 'js-cookie';
import router from '@/router';
const sideBar = ref(null);
const isMouseInside = ref(false);

const handleMouseEnter = () => {
  isMouseInside.value = true;
};

const handleMouseLeave = () => {
  isMouseInside.value = false;
};

onMounted(() => {
  sideBar.value.addEventListener('mouseenter', handleMouseEnter);
  sideBar.value.addEventListener('mouseleave', handleMouseLeave);
});

// onUnmounted(() => {
//   sideBar.value.removeEventListener('mouseenter', handleMouseEnter);
//   sideBar.value.removeEventListener('mouseleave', handleMouseLeave);
// });
const logout = () => {
  ElMessageBox.confirm('确认退出吗？', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
  }).then(() => {
    Cookies.remove('admin');
    router.push('/login');
  }).catch(() => {
      // 处理用户点击“取消”按钮的情况
    });

};
</script>

<style scoped>
.sidebar {
  width: 64px;
  min-height: calc(100vh - 62px);
  overflow: hidden;
  margin-right: 2px;
  background-color: white;
  transition: width 0.3s ease-in-out;
}

.sidebar:hover {
  width: 200px;
}
.el-menu {
  border-right: none;
  text-decoration: none;
}


</style>