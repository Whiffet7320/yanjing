<template>
  <div class="layout">
    <el-container v-if="this.isLogin == 'true'">
      <template v-if="aliPay">
        <AliPay />
      </template>
      <template v-else>
        <el-header>
          <SyHeader />
        </el-header>
        <div class="contain">
          <el-container>
            <el-aside><Aside /></el-aside>
            <el-main>
              <RouterView></RouterView>
            </el-main>
          </el-container>
        </div>
        <SyFooter />
      </template>
    </el-container>
    <div class="syIndex" v-else-if="this.isLogin == 'sy'">
      <SyHeader />
      
      <SyMain v-if="isShouye" />

      <RouterView v-if="!isShouye"></RouterView>
      <SyFooter/>
    </div>
    <Login v-else />
  </div>
</template>

<script>
import { mapState } from "vuex";
import AliPay from "../AliPay";
import Login from "../Login";
// import Header from "../Header";
import SyHeader from "../Header/syIndex.vue";
import SyMain from "../Header/syMain.vue";
import SyFooter from "../Header/syFooter.vue";
import Aside from "../Aside";
export default {
  computed: {
    ...mapState(["isShouye",'isLogin']),
  },
  watch: {
    $route(to) {
      console.log(to.path); //到哪去
      if (to.path == "/AliPay/AliPay") {
        this.aliPay = true;
      }else if (to.path == "/AliPay/AliPay") {
        this.aliPay = true;
      }
      if(to.path == "/Shouye"){
        this.$store.commit("isShouye", true);
      }else{
        this.$store.commit("isShouye", false);
      }
      if(to.path == '/Geren/Zhanghuxinxi'){
        this.$store.commit("isLogin", 'true');
        this.$store.commit("asideIndex", '20-1');
      }else if(to.path == '/Geren/Shiliziliao'){
        this.$store.commit("isLogin", 'true');
        this.$store.commit("asideIndex", '20-2');
      }else if(to.path == '/Geren/Wodedizhi'){
        this.$store.commit("isLogin", 'true');
        this.$store.commit("asideIndex", '20-3');
      }else if(to.path == '/Dingdan/Wodedingdan'){
        this.$store.commit("isLogin", 'true');
        this.$store.commit("asideIndex", '20-4');
      }else if(to.path == '/Dingdan/Shouhou'){
        this.$store.commit("isLogin", 'true');
        this.$store.commit("asideIndex", '20-6');
      }else if(to.path == '/Dingdan/Shouhouwenti'){
        this.$store.commit("isLogin", 'true');
        this.$store.commit("asideIndex", '20-6');
      }else if(to.path == '/Dingdan/Tousujianyi'){
        this.$store.commit("isLogin", 'true');
        this.$store.commit("asideIndex", '20-6');
      }else if(to.path == '/Qianbao/Youhuiquan'){
        this.$store.commit("isLogin", 'true');
        this.$store.commit("asideIndex", '20-7');
      }else if(to.path == '/Dingdan/Wodepinglun'){
        this.$store.commit("isLogin", 'true');
        this.$store.commit("asideIndex", '20-5');
      }else if(to.path == '/Qianbao/Jifen'){
        this.$store.commit("isLogin", 'true');
        this.$store.commit("asideIndex", '20-8');
      }else if(to.path == '/Huiyuan/HuiyuanZing'){
        this.$store.commit("isLogin", 'true');
        this.$store.commit("asideIndex", '20-9');
      }else if(to.path == '/Huiyuan/Tuiguang'){
        this.$store.commit("isLogin", 'true');
        this.$store.commit("asideIndex", '20-10');
      }
      else{
        this.$store.commit("isLogin", 'sy');
      }
      
    }
  },
  data() {
    return {
      // 
      // 
      path: "",
      aliPay: false,
      kefuImg: "",
      qq: "",
    };
  },
  async created() {
    
  },
  mounted() {
    // history.pushState(null, null, location.href)
    // window.addEventListener("popstate", this.disableBrowserBack);
    // window.addEventListener("scroll", this.scrollToTop);
  },
  destroyed() {
    // window.removeEventListener("scroll", this.scrollToTop);
  },
  components: {
    Login,
    // Header,
    Aside,
    SyHeader,
    SyMain,
    AliPay,
    SyFooter
  },
  methods: {
    toShouye(){
      this.$router.push({name:'Shouye'})
    },
    // 
    toTop() {
      let that = this;
      let timer = setInterval(() => {
        let ispeed = Math.floor(-that.scrollTop / 5);
        document.documentElement.scrollTop = document.body.scrollTop =
          that.scrollTop + ispeed;
        if (that.scrollTop === 0) {
          clearInterval(timer);
        }
      }, 16);
    },
    scrollToTop() {
      let that = this;
      let scrollTop =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop;
      that.scrollTop = scrollTop;
      if (that.scrollTop > 200) {
        that.btnFlag = true;
      } else {
        that.btnFlag = false;
      }
    },
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
  }
};
</script>

<style lang="scss">
.footerLay {
  padding: 10px 0 30px 0;
  display: flex;
  justify-content: center;
}
.beian {
  font-size: 14px;
  text-decoration: none;
  color: #aaaaaa !important;
  cursor: pointer;
}
.beian:hover {
  color: #007aff !important;
}
.footerImg {
  width: 100%;
  height: 103px;
  opacity: 1;
}
.layout {
  min-width: 1400px;
  background: #ffffff;
}
.contain {
  // width: 100vw;
  // margin: 0px auto 0 auto;
}

.el-header {
  background-color: #ffffff;
  height: 157px !important;
  padding: 0 !important;
}
.el-container {
  /* height: calc(100vh); */
}
.el-aside {
  background-color: #fafafa;
  color: #333;
  width: 400px !important;
}
.el-footer {
  /* background-color: #282828; */
  color: #333;
  background: #ffffff;
  height: 103px !important;
}

.el-main {
  // flex: 0;
  box-sizing: border-box;
  // height: calc(100vh - 157px);
  /* padding: 0 0 0 24px !important; */
  /* background: #f3f3f3; */
  color: #333;
  padding: 40px 0 0 70px;
  background:#fafafa;
}
.syIndex {
}

.fiexd-box {
  position: fixed;
  top: 50%;
  transform: translateY(-50%);
  width: 90px;
  height: 300px;
  background: #fe8800;
  border-radius: 10px;
  box-shadow: 0px 3px 10px 0px rgba(167, 167, 167, 0.2);
  right: 80px;
  z-index: 99999;
  .f-b1 {
    height: 100px;
    width: 90px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    z-index: 99999;
    .pic {
      width: 50px;
      height: 40px;
    }
    .pic.b3 {
      width: 41px;
      height: 21px;
    }
    .txt {
      margin-top: 12px;
      font-size: 14px;
      font-weight: 500;
      text-align: center;
      color: #ffffff;
    }
  }
  .f-b1.b2 {
    .b2-hov {
      font-size: 14px;
      display: none;
    }
    position: relative;
    background: #ff6a00;
    .pic {
      width: 39px;
      height: 43px;
    }
  }
  .f-b1.b2:hover .b2-hov {
    display: flex;
    transform: translate(-100px, -26px);
    width: 100px;
    height: 60px;
    align-items: center;
    justify-content: center;
    border-radius: 10px;
    background: #fff;
    background-size: 100% auto;
    position: absolute;
    top: 50px;
    left: 0;
    z-index: 99999;
  }
  .f-b1.b1 {
    position: relative;
    .b1-hov {
      display: none;
      // transform: translateX(-120px);
      img {
        width: 100px;
        height: 100px;
      }
    }
  }
  .f-b1.b1:hover .b1-hov {
    display: block;
    transform: translate(-100px, -50px);
    position: absolute;
    top: 50px;
    left: 0;
    z-index: 99999;
  }
  .hov.qq {
  }
}
</style>