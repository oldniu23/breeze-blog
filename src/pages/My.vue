<template>
  <div id="user">
    <section class="user-info">
      <img :src="user.avatar" :alt="user.username" class="avatar" />
      <h3>{{ user.username }}</h3>
    </section>
    <section>
      <router-link
        class="item"
        v-for="blog in blogs"
        :key="blog.id"
        :to="`/detail/${blog.id}`"
      >
        <div class="date">
          <span class="day">{{ splitDate(blog.createdAt).date }}</span>
          <span class="month">{{ splitDate(blog.createdAt).month }}月</span>
          <span class="year">{{ splitDate(blog.createdAt).year }}</span>
        </div>
        <h3>{{ blog.title }}</h3>
        <p>{{ blog.description }}</p>
        <div class="actions">
          <router-link class="edit" :to="`/edit/${blog.id}`">编辑</router-link>
          <a href="#" @click.prevent="onDelete(blog.id)" class="del">删除</a>
        </div>
      </router-link>
    </section>
    <section class="pagination">
      <el-pagination
        layout="prev, pager, next"
        :total="total"
        :current-page="page"
        @current-change="onPageChange"
      >
      </el-pagination>
    </section>
  </div>
</template>



<script>
import blog from "@/api/blog";
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      blogs: [],
      page: 1,
      total: 0,
    };
  },

  computed: {
    ...mapGetters(["user"]),
  },

  created() {
    //获取数据
    this.page = parseInt(this.$route.query.page) || 1;
    blog.getBlogsByUserId(this.user.id, { page: this.page }).then((res) => {
      this.page = res.page;
      this.total = res.total;
      this.blogs = res.data;
    });
  },
  methods: {
    //分页
    onPageChange(newPage) {
      blog.getBlogsByUserId(this.user.id, { page: newPage }).then((res) => {
        console.log(res);
        this.blogs = res.data;
        this.total = res.total;
        this.page = res.page;
        this.$router.push({
          path: "/my",
          query: { page: newPage },
        });
      });
    },
    //删除功能
    onDelete(blogId) {
      this.$confirm("此操作将删除该博客,是否删除？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          return blog.deleteBlog({ blogId });
        })
        .then(() => {
          this.$message.success("删除成功");
          //删除后更新dom元素 不然删除后 那个博文还在原来位置上 页面不刷新 但是已经删除了
          this.blogs = this.blogs.filter((blog) => blog.id != blogId);
        });
    },
    //日期
    splitDate(dataStr) {
      let dateObj = typeof dataStr === "object" ? dataStr : new Date(dataStr);
      return {
        date: dateObj.getDate(),
        month: dateObj.getMonth() + 1,
        year: dateObj.getFullYear(),
      };
    },
  },
};
</script>

<style lang="less" >
@import "~@/assets/base.less";

#my,
#user {
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
      margin-top: 10px;
    }
  }

  .item {
    display: grid;
    grid: auto auto auto / 80px 1fr;
    margin: 20px 0;

    .date {
      grid-column: 1;
      grid-row: 1 / span 3;
      justify-self: center;
      text-align: center;

      span {
        display: block;
        color: @textLighterColor;
      }

      .day {
        font-size: 40px;
      }
    }

    h3 {
      grid-column: 2;
      grid-row: 1;
    }

    p {
      grid-column: 2;
      grid-row: 2;
      margin-top: 0;
    }

    .actions {
      grid-column: 2;
      grid-row: 3;
      font-size: 12px;
      .edit {
        color: @themeLighterColor;
        padding-right: 4px;
      }
      .del {
        color: rgb(173, 39, 39);
      }
    }
  }
}
</style>