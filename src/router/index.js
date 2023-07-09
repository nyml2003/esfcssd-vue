import { createRouter, createWebHashHistory } from 'vue-router'
import Cookies from 'js-cookie'
const routes = [
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/login/LoginView.vue')
  },
  {
    path: '/',
    name: 'Layout',
    component: () => import('../views/AppLayout.vue'),
    redirect: '/home',
    children: [
      {
        path: 'home',
        name: 'Home',
        component: () => import('../views/test/TestView.vue')
      }   
    ]
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  if (to.path === '/login') {
    next()
  } else {
    const admin = Cookies.get('admin')
    if (!admin && to.path !== '/login') {
      next('/login')
    } else {
      next()
    }

  }
})
// 路由配置...

export default router
