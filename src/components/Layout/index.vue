<template>
  <div class="layout">
    <el-container v-if="this.isLogin == 'true'">
      <el-aside><Aside/></el-aside>
      <el-container>
        <!-- <el-header><Header/></el-header> -->
        <el-main>
          <RouterView></RouterView>
        </el-main>
      </el-container>
    </el-container>
    <Login v-else />
  </div>
</template>

<script>
import Login from "../Login";
// import Header from "../Header";
import Aside from "../Aside";
export default {
  data() {
    return {
      isLogin: "false",
    };
  },
  created() {
    this.isLogin = sessionStorage.getItem("isLogin");
  },
  components: {
    Login,
    // Header,
    Aside,
  },
};
</script>

<style>
/* .el-header {
  background-color: #b3c0d1;
  height: 60px;
  padding: 0 !important;
} */
.el-container {
  height: calc(100vh);
}
.el-aside {
  background-color:#ffffff;
  color: #333;
  width: 284px !important;
}

.el-main {
  padding: 0 0 0 24px !important;
  background: #f3f3f3;
  color: #333;
}
</style>