<template>
  <div id="login">
    <h4>用户名</h4>
    <input v-model="username" placeholder="用户名" />
    <h4>密码</h4>
    <!-- @key.up='onLogin'  按回车登录   @click="onLogin"点击登录 -->

    <input
      v-model="password"
      type="password"
      placeholder="密码"
      @keyup.enter="onLogin"
    />
    <el-button size="medium" @click="onLogin">立即登录</el-button>
    <p class="notice">
      没有账号？<router-link to="/register">注册新用户</router-link>
    </p>
  </div>
</template>


<script>
import { mapActions } from "vuex";

export default {
  data() {
    return {
      username: "",
      password: "",
    };
  },

  methods: {
    ...mapActions(["login"]),

    onLogin() {
      this.login({ username: this.username, password: this.password }).then(
        () => {
          //调整到重定向的页面(未登录状态下去需要登录的页面 得到的参数redirect)或者首页
          this.$router.push({ path: this.$route.query.redirect || "/" });
        }
      );
    },
  },
};
</script>

<style lang="less" scoped>
@import "~@/assets/base.less";

// #login,
// #register {  }  注册和登录的布局相同 可以这么写 这么写就不需要在注册页写相应的css了 但是需要去掉scoped

#login {
  display: grid;
  justify-content: center;
  padding-top: 30px;

  h4 {
    margin: 10px 0 5px;
  }

  p {
    margin: 5px 0;
  }

  input {
    width: 400px;
  }

  .error {
    font-size: 12px;
    color: #f00;
  }

  button {
    margin-top: 30px;
    justify-self: start;
  }

  .notice {
    font-size: 12px;
    color: @textLighterColor;
    text-align: center;
    margin-top: 30px;

    a {
      color: @themeColor;
    }
  }
}
</style>