import request from "@/helpers/request";

const URL = {
  REGISTER: "/auth/register",
  LOGIN: "/auth/login",
  LOGOUT: "/auth/logout",
  GET_INFO: "/auth",
};

export default {
  register({ username, password }) {
    return request(URL.REGISTER, "POST", { username, password });
  },

  login({ username, password }) {
    return request(URL.LOGIN, "POST", { username, password });
  },

  logout() {
    //  localStorage.clear("token"); 清除本地的token  防止点击注销后刷新页面又直接登录了的bug
    localStorage.clear("token");
    return request(URL.LOGOUT);
  },

  getInfo() {
    return request(URL.GET_INFO);
  },
};
