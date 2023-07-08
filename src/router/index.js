import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('../views/TableView.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})



// 路由配置...

export default router
