<template>
  <div id="detail">
    <section class="user-info">
      <img src="../assets/1.png" alt="" class="avatar" />
      <h3>前端异步大揭秘</h3>
      <p><router-link to="/user">若愚</router-link> 发布于3天前</p>
    </section>
  </div>
</template>

<script>
export default {
  data() {
    return {
      msg: "Welcome to Your Vue.js App",
    };
  },
};
</script>

<style lang="less" scoped>
@import "~@/assets/base.less";

#detail {
  .user-info {
    display: grid;
    grid: auto auto / 80px 1fr;

    margin-top: 30px;
    padding-bottom: 20px;
    border-bottom: 1px solid #ebebeb;

    .avatar {
      grid-column: 1;
      grid-row: 1 / span 2;

      width: 60px;
      height: 60px;
      border-radius: 50%;
    }

    h3 {
      grid-column: 2;
      grid-row: 1;

      margin: 5px 0;
    }

    p {
      grid-column: 2;
      grid-row: 2;

      margin-top: 0;
      font-size: 12px;
      color: @textLighterColor;

      a {
        color: @themeColor;
        text-decoration: none;
      }
    }
  }

  .article {
    padding: 30px 0;
  }
}
</style>