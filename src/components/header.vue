<template>
  <header :class="{ login: isLogin, 'no-login': !isLogin }">
    <!-- 未登录的状态 -->
    <template v-if="!isLogin">
      <h1>Let's share</h1>
      <p>精品博客汇聚</p>
      <div class="btn">
        <router-link to="/login"><el-button>立即登录</el-button></router-link>
        <router-link to="/register"
          ><el-button>注册账号</el-button></router-link
        >
      </div>
    </template>
    <!-- 登录状态 -->
    <template v-if="isLogin">
      <h1><router-link to="/">Let's share</router-link></h1>
      <router-link to="/create"><i class="edit el-icon-plus"></i></router-link>
      <div class="user">
        <img
          class="avatar"
          :src="user.avatar"
          :alt="user.username"
          :title="user.username"
        />
        <ul>
          <li><router-link to="/my">我的</router-link></li>
          <li><a href="#" @click="onLogout">退出</a></li>
        </ul>
      </div>
    </template>
  </header>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

import auth from "@/api/auth";
window.auth = auth;

export default {
  data() {
    return {};
  },

  computed: {
    //拿到数据
    // 映射this.isLogin 为 store.state.isLogin  this.user 为 store.state.user
    ...mapGetters(["isLogin", "user"]),
  },
  created() {
    //拿到数据未渲染前  使用checkLogin 判断是否登录了
    this.checkLogin();
  },
  methods: {
    //通过...mapXXX 直接拿到想用的方法
    ...mapActions(["checkLogin", "logout"]),
    onLogout() {
      this.logout();
      this.$router.replace("/");
    },
  },
};
</script>


<style lang="less" >
@import "../assets/base.less";

header.no-login {
  // background-image: url(~@/assets/rock.png);
  padding: 0px 12% 30px 12%;
  background: @bgColor;
  display: grid;
  justify-items: center;

  h1 {
    color: #fff;
    font-size: 40px;
    margin: 20px 0 0 0;
    text-transform: uppercase;
  }

  p {
    margin: 10px 0 0 0;
    color: #fff;
  }

  .btn {
    margin-top: 10px;
  }

  button {
    margin: 20px 5px 0;
  }
}

header.login {
  display: flex;
  align-items: center;
  background: @bgColor;

  h1 {
    margin: 0;
    padding: 0;
    font-size: 40px;
    text-transform: uppercase;
    flex: 1;

    a {
      color: #fff;
    }
  }

  .edit {
    color: #fff;
    font-size: 30px;
  }

  .avatar {
    width: 40px;
    height: 40px;
    border: 1px solid #fff;
    border-radius: 50%;
    margin-left: 15px;
  }

  .user {
    position: relative;

    ul {
      display: none;
      position: absolute;
      right: 0;
      list-style: none;
      border: 1px solid #eaeaea;
      margin: 0;
      padding: 0;
      background-color: #fff;

      a {
        text-decoration: none;
        color: #333;
        font-size: 12px;
        display: block;
        padding: 5px 10px;

        &:hover {
          background-color: #eaeaea;
        }
      }
    }

    &:hover ul {
      display: block;
    }
  }
}
</style>