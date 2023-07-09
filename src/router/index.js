import { createRouter, createWebHashHistory } from 'vue-router'
const routes = [
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/login/LogInView.vue')
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
  if (to.path === '/login') next()
  const admin = Cookies.get("admin")
  if (!admin && to.path !== '/login') return next("/login")  // 强制退回到登录页面
  // 访问 /home 的时候，并且cookie里面存在数据，这个时候我就直接放行
  next()
})

// 路由配置...

export default router
