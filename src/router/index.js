import { createRouter, createWebHashHistory } from "vue-router";
import Cookies from "js-cookie";
const routes = [
  {
    path: "/login",
    name: "login",
    component: () => import("../views/login/LogInView.vue"),
  },
  {
    path: "/",
    name: "Layout",
    component: () => import("@/views/AppLayout.vue"),
    redirect: "/home",
    children: [
      {
        path: "home",
        name: "Home",
        component: () => import("@/views/home/HomeView.vue"),
      },
      {
        path: "/enterpriseInfo",
        name: "EnterpriseInfo",
        component: () => import("@/views/enterprise/EnterpriseInfoView.vue"),
        children: [
          {
            path: "unitInfo",
            name: "UnitInfo",
            component: () => import("@/views/enterprise/UnitInfoView.vue"),
          },
          {
            path: "employeeInfo",
            name: "EmployeeInfo",
            component: () => import("@/views/enterprise/EmployeeInfoView.vue"),
          },
          {
            path: "applicationRecord",
            name: "ApplicationRecord",
            component: () => import("@/views/enterprise/ApplicationRecordView.vue"),
          },
          {
            path: "disabilityAllowanceReceivable",
            name: "DisabilityAllowanceReceivable",
            component: () =>
              import("@/views/enterprise/DisabilityAllowanceReceivableView.vue"),
          },
        ],
      },
    ],
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.path === "/login") {
    next();
  } else {
    const admin = Cookies.get("admin");
    if (!admin && to.path !== "/login") {
      next("/login");
    } else {
      next();
    }
  }
});
// 路由配置...

export default router;
