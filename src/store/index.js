import Vue from "vue";
import Vuex from "vuex";
import auth from "./modules/auth";
import blog from "./modules/blog";

Vue.use(Vuex);

//创建store对象 供全局vue使用
export default new Vuex.Store({
  modules: {
    auth,
    blog,
  },
});
