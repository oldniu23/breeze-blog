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
    path: "/detail",
    component: Detail,
  },
  {
    path: "/edit",
    component: Edit,
  },
  {
    path: "/create",
    component: Create,
  },
  {
    path: "/user",
    component: User,
  },
  {
    path: "/my",
    component: My,
  },
  {
    path: "/register",
    component: Register,
  },
  {
    path: "*",
    component: NotFound,
  },
];

const router = new VueRouter({
  routes,
});

export default router;
