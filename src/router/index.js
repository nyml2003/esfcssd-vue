import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'home',
    component: ()=>import('../views/HomeView.vue')
  },
  {
    path:'/data',
    name:'data',
    component:()=>import('../views/DataRaw.vue')
  },
  {
    path:'/view',
    name:'view',
    component:()=>import('../views/DataView.vue')
  },
  {
    path:'/login',
    name:'login',
    component:()=>import('../views/LoginView.vue')
  },
  {
    path:'/register',
    name:'register',
    component:()=>import('../views/RegisterView.vue')
  },
  {
    path:'/MyPage',
    name:'MyPage',
    component:()=>import('../views/personalInfo.vue')
  },
  {
    path:'/guahao',
    name:'guahao',
    component:()=>import('../views/guahaoView.vue')
  },
  {
    path:'/guahaoList',
    name:'guahaoList',
    component:()=>import('../views/guahaoListView.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})



// 路由配置...

export default router
