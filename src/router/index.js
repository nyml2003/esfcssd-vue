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
        path: "/enterprise",
        name: "Enterprise",
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
      {
        path:"/leader",
        name:"Leader",
        component: () => import("@/views/leader/LeaderView.vue"),
        children:[
          {
            path:'account',
            name:'Leader_Account',
            component: () => import("@/views/leader/AccountView.vue"),

          },
          {
            path:'withholding-info',
            name:'WithholdingInfo',
            component: () => import("@/views/leader/WithholdingInfoView.vue"),
          },
          {
            path:'expense-bill',
            name:'Leader_ExpenseBill',
            component: () => import("@/views/leader/ExpenseBillView.vue"),
          },
          {
            path:'collect-bill',
            name:'Leader_CollectBill',
            component: () => import("@/views/leader/CollectBillView.vue"),
          }
        ]
      },
      {
        path: "/admin",
        name: "Admin",
        component: () => import("@/views/admin/AdminView.vue"),
        children:[
          {
            path:'pending-applications',
            name:'PendingApplications',
            component: () => import("@/views/admin/PendingApplicationsView.vue"),
          },
          {
            path:'all-applications',
            name:'AllApplications',
            component: () => import("@/views/admin/AllApplicationsView.vue")
          },
          {
            path:'account',
            name:'Account',
            component: () => import("@/views/admin/AccountView.vue"),
          },
          {
            path:'collectbill',
            name:'CollectBill',
            component: () => import("@/views/admin/CollectBillView.vue"),
          },
          {
            path:'company',
            name:'Company',
            component: () => import("@/views/admin/CompanyView.vue"),
          },
          {
            path:'dpfederation',
            name:'DpFederation',
            component: () => import("@/views/admin/DpFederationView.vue"),
          },
          {
            path:'expensebill',
            name:'ExpenseBill',
            component: () => import("@/views/admin/ExpenseBillView.vue"),
          },
          {
            path:'financial',
            name:'Financial',
            component: () => import("@/views/admin/FinancialView.vue"),
          },
          {
            path:'staff',
            name:'Staff',
            component: () => import("@/views/admin/StaffView.vue"),
          },
          {
            path:'staffapplicationrecord',
            name:'StaffApplicationRecord',
            component: () => import("@/views/admin/StaffApplicationRecordView.vue"),
          },
          {
            path:'user',
            name:'User',
            component: () => import("@/views/admin/UserView.vue"),
          },
          {
            path:'withheldbill',
            name:'WithheldBill',
            component: () => import("@/views/admin/WithheldBillView.vue"),
          }
        ]
      }
    ],
  },
];
//account collectbill company dpfederation expensebill financial staff staffapplicationrecord user withheldbill
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
