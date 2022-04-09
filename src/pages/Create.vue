<template>
  <div id="edit">
    <h1>创建文章</h1>
    <h3>文章标题</h3>
    <el-input v-model="title"></el-input>
    <p class="msg">限30个字</p>
    <h3>内容简介</h3>
    <el-input
      type="textarea"
      v-model="description"
      :autosize="{ minRows: 2, maxRows: 6 }"
    ></el-input>
    <p class="msg">限30个字</p>
    <h3>文章内容</h3>
    <!-- :autosize 可自适应 -->
    <el-input
      type="textarea"
      v-model="content"
      :autosize="{ minRows: 4, maxRows: 30 }"
    ></el-input>
    <p class="msg">限30个字</p>
    <p>
      <label>是否展示到首页</label>
      <el-switch
        v-model="atIndex"
        active-color="#13ce66"
        inactive-color="#ff4949"
      ></el-switch>
    </p>
    <el-button @click="onCreate">确定</el-button>
  </div>
</template>

<script>
import blog from "@/api/blog";
export default {
  data() {
    return {
      title: "",
      description: "",
      content: "",
      atIndex: false,
    };
  },
  methods: {
    onCreate() {
      blog
        .createBlog({
          title: this.title,
          content: this.content,
          description: this.description,
          atIndex: this.atIndex,
        })
        .then((res) => {
          this.$message.success(res.msg);
          //id在res.data里  跳转到对应id的详情页
          this.$route.push({ path: `/detail/${res.data.id}` });
        });
    },
  },
};
</script>

<style lang="less" scoped>
</style>