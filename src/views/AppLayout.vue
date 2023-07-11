<template>
  <div style="user-select: none;">
    <!-- 头部区域 -->
    <div style="height: 60px; line-height: 60px; background-color: white; margin-bottom: 2px; display: flex ">
      <div style="width: 600px">
        <img src="@/assets/image/logo.png" alt="" style="width: 80px; position: relative; top: 15px; left: 10px">
        <span style="margin-left: 20px; font-size: 24px">残疾人就业保障金征收及使用监管系统</span>
      </div>
      <el-select v-model="role" v-if="false">
        <el-option label="单位" value="enterprise"></el-option>
        <el-option label="领导" value="leader"></el-option>
        <el-option label="管理员" value="admin"></el-option>
      </el-select>
      <el-button @click="handleRole" v-if="false"></el-button>
      
      <div style="flex: 1; text-align: right; padding-right: 20px">
        
        <el-button type="danger" @click="logout"><el-icon>
            <SwitchButton />
          </el-icon>注销</el-button>
      </div>
    </div>

    <!-- 侧边栏和主体 -->
    <div style="display: flex">

      <!-- 侧边栏导航 -->
      <div ref="sideBar" class="sidebar">
        <el-button class="lock" circle @click="toggleSidebar" size="large">

          <Pushpin v-if="isMenuExpanded" theme="filled" size="24" fill="#409eff" :strokeWidth="1" />
          <Pushpin v-else theme="filled" size="24" fill="#dbe0e2" :strokeWidth="1" />
        </el-button>
        <el-menu :default-active="$route.path" router class="el-menu-demo" style="margin-bottom: 10px"
          :collapse="!(isMenuExpanded || isMouseInside)" >
          <el-menu-item index="/">
            <template #title>
              <span>首页</span>
            </template>
            <template #>
              <HomeTwo theme="filled" size="24" fill="#333" :strokeWidth="1" />
            </template>
          </el-menu-item>
            <el-menu-item index="/enterprise/UnitInfo" v-if="role == 'enterprise'">
              <template #title>
                <span>单位信息</span>
              </template>
              <template #>
                <BuildingOne theme="filled" size="24" fill="#333" :strokeWidth="1" />
              </template>
            </el-menu-item>
            <el-menu-item index="/enterprise/EmployeeInfo" v-if="role == 'enterprise'">
              <template #title>
                <span>员工信息</span>
              </template>
              <template #>
                <User theme="filled" size="24" fill="#333" :strokeWidth="1" />
              </template>
            </el-menu-item>
            <el-menu-item index="/enterprise/applicationRecord" v-if="role == 'enterprise'">
              <template #title>
                <span>已申请记录</span>
              </template>
              <template #>
                <ListAdd theme="filled" size="24" fill="#333" :strokeWidth="1" />
              </template>
            </el-menu-item>
            <el-menu-item index="/enterprise/disabilityAllowanceReceivable" v-if="role == 'enterprise'">
              <template #title>
                <span>残保金待收信息</span>
              </template>
              <template #>
                <Wallet theme="filled" size="24" fill="#333" :strokeWidth="1" />
              </template>
            </el-menu-item>
            <el-menu-item index="/leader/collect-bill" v-if="role == 'leader'">
                <template #title>
                  <span>代收信息</span>
                </template>
                <template #>
                  <Income theme="filled" size="24" fill="#333" :strokeWidth="1"/>
                </template>
              </el-menu-item>
              <el-menu-item index="/leader/withholding-info" v-if="role == 'leader'">
                <template #title>
                  <span>代扣信息</span>
                </template>
                <template #>
                  <IncomeOne theme="filled" size="24" fill="#333" :strokeWidth="1"/>
                </template>
              </el-menu-item>
            <el-menu-item index="/leader/expense-bill"  v-if="role == 'leader'">
              <template #title>
                <span>使用信息</span>
              </template>
              <template #>
                <Wallet theme="filled" size="24" fill="#333" :strokeWidth="1" />
              </template>
            </el-menu-item>
            <el-menu-item index="/leader/account" v-if="role == 'leader'">
              <template #title>
                <span>帐号信息</span>
              </template>
              <template #>
                <BuildingOne theme="filled" size="24" fill="#333" :strokeWidth="1" />
              </template>
            </el-menu-item>
            <el-menu-item index="/admin/pending-applications" v-if="role == 'admin' ">
              <template #title>
                <span>未处理申请记录</span>
              </template>
              <template #>
                <ListAdd theme="filled" size="24" fill="#333" :strokeWidth="1" />
              </template>
            </el-menu-item>
            <el-menu-item index="/admin/all-applications" v-if=" role== 'admin' ">
              <template #title>
                <span>所有申请记录</span>
              </template>
              <template #>
                <ListAdd theme="filled" size="24" fill="#333" :strokeWidth="1" />
              </template>
            </el-menu-item>
            <el-menu-item index="/admin/account" v-if="role == 'admin' ">
              <template #title>
                <span>帐号信息</span>
              </template>
              <template #>
                <BuildingOne theme="filled" size="24" fill="#333" :strokeWidth="1" />
              </template>
            </el-menu-item>
            <el-menu-item index="/admin/collectbill" v-if="role == 'admin' ">
              <template #title>
                <span>代收信息</span>
              </template>
              <template #>
                <Wallet theme="filled" size="24" fill="#333" :strokeWidth="1" />
              </template>
            </el-menu-item>
          <el-menu-item index="/admin/company" v-if="role == 'admin'">
            <template #title>
              <span>单位信息</span>
            </template>
            <template #>
              <BuildingOne theme="filled" size="24" fill="#333" :strokeWidth="1" />
            </template>
          </el-menu-item>
          <el-menu-item index="/admin/dpfederation" v-if="role == 'admin'">
            <template #title>
              <span>残联信息</span>
            </template>
            <template #>
              <BuildingOne theme="filled" size="24" fill="#333" :strokeWidth="1" />
            </template>
          </el-menu-item>
          <el-menu-item index="/admin/expensebill" v-if="role == 'admin'">
            <template #title>
              <span>使用信息</span>
            </template>
            <template #>
              <Wallet theme="filled" size="24" fill="#333" :strokeWidth="1" />
            </template>
          </el-menu-item>
          <el-menu-item index="/admin/financial" v-if="role == 'admin'">
            <template #title>
              <span>财务信息</span>
            </template>
            <template #>
              <Wallet theme="filled" size="24" fill="#333" :strokeWidth="1" />
            </template>
          </el-menu-item>
          <el-menu-item index="/admin/staff" v-if="role == 'admin'">
            <template #title>
              <span>员工信息</span>
            </template>
            <template #>
              <User theme="filled" size="24" fill="#333" :strokeWidth="1" />
            </template>
          </el-menu-item>
          <el-menu-item index="/admin/staffapplicationrecord" v-if="role == 'admin'">
            <template #title>
              <span>已申请记录</span>
            </template>
            <template #>
              <ListAdd theme="filled" size="24" fill="#333" :strokeWidth="1" />
            </template>
          </el-menu-item>
          <el-menu-item index="/admin/user" v-if="role == 'admin'">
            <template #title>
              <span>用户信息</span>
            </template>
            <template #>
              <User theme="filled" size="24" fill="#333" :strokeWidth="1" />
            </template>
          </el-menu-item>
          <el-menu-item index="/admin/withheldbill" v-if="role == 'admin'">
            <template #title>
              <span>代扣信息</span>
            </template>
            <template #>
              <Wallet theme="filled" size="24" fill="#333" :strokeWidth="1" />
            </template>
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

import { ref, onMounted, onUnmounted, nextTick,provide } from 'vue';
import { ElMessageBox } from 'element-plus';
import Cookies from 'js-cookie';
import router from '@/router';
import {
  User,
  Lock,
  SwitchButton,
  HomeTwo,
  BuildingOne,
  ListAdd,
  Wallet,
  Income,
  IncomeOne,
  Pushpin
} from '@icon-park/vue-next';
const sideBar = ref(null);
const isMouseInside = ref(false);
const isMenuExpanded = ref(false);
const role = ref(((usrClass)=>{
  if (usrClass === '企业') {
    return 'enterprise';
  } else if (usrClass === '领导') {
    return 'leader';
  } else if (usrClass === '管理员') {
    return 'admin';
  } else {
    return 'unknown';
  }
})(JSON.parse(Cookies.get('admin')).usrClass))

const handleRole=()=>{
  console.log(JSON.parse(Cookies.get('admin')).usrClass)
}
const handleMouseEnter = () => {
  if (isMenuExpanded.value) {
    return;
  }
  isMouseInside.value = true;
};

const handleMouseLeave = () => {
  if (isMenuExpanded.value) {
    return;
  }
  isMouseInside.value = false;
};
const toggleSidebar = () => {
  isMenuExpanded.value = !isMenuExpanded.value;
  const sidebar = document.querySelector('.sidebar');
  if (isMenuExpanded.value) {
    sidebar.classList.remove('collapse');
    sidebar.classList.add('expanded');
  } else {
    sidebar.classList.remove('expanded');
    sidebar.classList.add('collapse');
  }
}
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
  display: flex;
  flex-direction: column;
  align-items: center;
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

.expanded {
  width: 200px;
}

.collapse {
  width: 64px;
}

.lock {
  top: 10px;
  background: #fff;
  border-color: #cbcbcd;
  color: #505255;
}

.lock:hover {
  background: #ecf5ff;
  border-color: #c6e2ff;
  color: #409eff;
}

.el-menu {
  border-right: none;
  text-decoration: none;
}
</style>