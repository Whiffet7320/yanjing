<template>
  <div class="layout">
    <el-container v-if="this.isLogin == 'true'">
      <template v-if="aliPay">
        <AliPay />
      </template>
      <template v-else>
        <el-header>
          <Header />
        </el-header>
        <div class="contain">
          <el-container>
            <!-- <el-aside><Aside /></el-aside> -->
            <el-main>
              <RouterView></RouterView>
            </el-main>
          </el-container>
        </div>
        <el-footer>
          <img class="footerImg" src="../../assets/newImg/组件2–74.png" alt />
        </el-footer>
      </template>
    </el-container>
    <div class="syIndex" v-else-if="this.isLogin == 'sy'">
      <SyHeader />
      <SyMain />
    </div>
    <Login v-else />
  </div>
</template>

<script>
// import { mapState } from "vuex";
import AliPay from "../AliPay";
import Login from "../Login";
import Header from "../Header";
import SyHeader from "../Header/syIndex.vue";
import SyMain from "../Header/syMain.vue";
// import Aside from "../Aside";
export default {
  // computed: {
  //   ...mapState(["aliPay"]),
  // },
  watch: {
    $route(to) {
      console.log(to.path); //到哪去
      if (to.path == "/AliPay/AliPay") {
        this.aliPay = true;
      }
    }
  },
  data() {
    return {
      isLogin: "false",
      path: "",
      aliPay: false
    };
  },
  created() {
    console.log(this.aliPay);
    console.log(sessionStorage.getItem("routerParams"), "ccccc");
    this.routerParams = sessionStorage.getItem("routerParams");
    if (!sessionStorage.getItem("isLogin")) {
      sessionStorage.setItem("isLogin", "sy");
    }
    this.isLogin = sessionStorage.getItem("isLogin");
    console.log(this.isLogin);
  },
  mounted() {
    // history.pushState(null, null, location.href)
    window.addEventListener("popstate", this.disableBrowserBack);
  },
  components: {
    Login,
    Header,
    // Aside,
    SyHeader,
    SyMain,
    AliPay
  },
  methods: {
    disableBrowserBack() {
      console.log(this.isLogin, this.routerParams);

      if (this.path == this.$route.path) {
        this.path = this.$route.path;
        sessionStorage.setItem("isLogin", "sy");
        this.$router.go(0);
        window.history.forward(1);
      } else if (this.path != this.$route.path && this.isLogin == "sy") {
        sessionStorage.setItem("isLogin", "true");
        this.$router.go(0);
        window.history.forward(1);
      } else if (this.isLogin == "123") {
        sessionStorage.setItem("isLogin", "sy");
        this.$router.go(0);
        window.history.forward(1);
      } else {
        this.path = this.$route.path;
      }

      // window.history.forward(1)
    },
    toLogin() {
      sessionStorage.setItem("isLogin", "123");
      this.isLogin = sessionStorage.getItem("isLogin");
    }
  },
  destroyed() {
    // 清除popstate事件 否则会影响到其他页面
    window.removeEventListener("popstate", this.disableBrowserBack, false);
  }
};
</script>

<style>
.footerImg {
  width: 100%;
  height: 103px;
  opacity: 1;
}
.layout {
  min-width: 1400px;
  background: #eceef5;
}
.contain {
  width: 1400px;
  margin: 0 auto;
}

.el-header {
  background-color: #ffffff;
  height: 133px !important;
  padding: 0 !important;
}
.el-container {
  /* height: calc(100vh); */
}
.el-aside {
  /* background-color: #282828; */
  color: #333;
  width: 284px !important;
}
.el-footer {
  /* background-color: #282828; */
  color: #333;
  background: #ffffff;
  height: 103px !important;
}

.el-main {
  /* padding: 0 0 0 24px !important; */
  /* background: #f3f3f3; */
  color: #333;
}
.syIndex {
}
</style>