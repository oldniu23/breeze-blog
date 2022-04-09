import Vue from "vue";
import VueRouter from "vue-router";
import Index from "@/pages/Index.vue";
import Login from "@/pages/Login.vue";
import Detail from "@/pages/Detail.vue";
import Edit from "@/pages/Edit.vue";
import Create from "@/pages/Create.vue";
import Register from "@/pages/Register.vue";
import User from "@/pages/User.vue";
import My from "@/pages/My.vue";
import NotFound from "@/pages/NotFound.vue";
import store from "@/store";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    redirect: "/index",
  },
  {
    path: "/index",
    component: Index,
  },
  {
    path: "/login",
    component: Login,
  },
  {
    path: "/detail/:blogId",
    component: Detail,
  },
  {
    path: "/edit/:blogId",
    component: Edit,
    meta: { requiresAuth: true },
  },
  {
    path: "/create",
    component: Create,
    //路由元信息
    meta: { requiresAuth: true },
  },
  {
    path: "/user/:blogId",
    component: User,
  },
  {
    path: "/my",
    component: My,
    meta: { requiresAuth: true },
  },
  {
    path: "/register",
    component: Register,
  },
];

const router = new VueRouter({
  routes,
});

//导航守卫   每次路由切换都会执行对应的函数  此router就是上边new Router的对象

//遍历上边的路由
router.beforeEach((to, from, next) => {
  //如果匹配到了有meta的路由
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    //启用检查登录功能 然后异步操作
    store.dispatch("checkLogin").then((isLogin) => {
      //如果没登陆 就跳转到login页面   这个isLogin是auth.js里那个isLogin
      if (!isLogin) {
        next({
          path: "/login",
          query: { redirect: to.fullPath },
        });
      } else {
        //登录了就下一步
        next();
      }
    });
  } else {
    next();
  }
});

export default router;
