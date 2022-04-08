import auth from "@/api/auth";

const state = {
  //用户信息 是否登录
  user: null,
  isLogin: false,
};

const getters = {
  //方便其他组件拿到并使用数据
  user: (state) => state.user,
  isLogin: (state) => state.isLogin,
};

//操作数据 载荷payload
const mutations = {
  setUser(state, payload) {
    state.user = payload.user;
  },
  setLogin(state, payload) {
    state.isLogin = payload.isLogin;
  },
};

//放一些异步操作
const actions = {
  // 传递用户名和密码 得到promise对象
  login({ commit }, { username, password }) {
    return auth.login({ username, password }).then((res) => {
      commit("setUser", { user: res.data });
      commit("setLogin", { isLogin: true });
    });
  },
  // async 和 await就相当于对promise的改进用法
  async register({ commit }, { username, password }) {
    //res就是then的结果
    let res = await auth.register({ username, password });
    commit("setUser", { user: res.data });
    commit("setLogin", { isLogin: true });
    return res.data;
  },

  //注销
  async logout({ commit }) {
    await auth.logout();
    commit("setUser", { user: null });
    commit("setLogin", { isLogin: false });
  },

  //检查是否登录
  async checkLogin({ commit, state }) {
    if (state.isLogin) return true;
    let res = await auth.getInfo();
    commit("setLogin", { isLogin: res.isLogin });
    if (!res.isLogin) return false;
    commit("setUser", { user: res.data });
    return true;
  },
};

export default {
  state,
  getters,
  mutations,
  actions,
};
