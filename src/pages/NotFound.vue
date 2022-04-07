<template>
  <div id="notFound">
    <h3>此页面不存在</h3>
    <div id="jump">
      <router-link to="/register"><p>点击跳转至注册页面</p></router-link>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="less" scoped>
#notFound {
  display: flex;
  justify-content: center;
  align-items: center;
}

p {
  padding: 50px;
  font-size: 16px;
}
</style>