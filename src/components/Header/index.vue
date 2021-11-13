<template>
  <div class="index">
    <div class="user">
      <!-- <img src="../../assets/newImg/zu184.png" class="pic1" alt="" /> -->
      <img src="../../assets/newImg/dltb.png" class="pic1" alt="" />
      <div
        style="cursor: pointer"
        @click="denglu"
        v-if="userName == 'null'"
        class="txt2"
      >
        登录
      </div>
      <div v-if="userName != 'null'" class="txt1">欢迎您</div>
      <div v-if="userName != 'null'" class="txt2">{{ userName }}</div>
      <img src="../../assets/newImg/lujin312.png" class="pic2" alt="" />
      <div v-if="userName != 'null'" @click="tuichuLogin" class="txt3">
        退出帐号
      </div>
    </div>
    <img class="pic" src="../../assets/newImg/LOGO3.png" alt="" />
    <el-menu
      @select="handleSelect"
      :default-active="activeIndex2"
      class="el-menu-demo"
      mode="horizontal"
      background-color="#ffffff"
      text-color="#5C5C5C"
      active-text-color="#EA8E11"
      router
    >
      <el-menu-item @click="tuShouye"
        >首页
        <div class="menuEnglish">INDEX</div></el-menu-item
      >
      <el-menu-item index="2" :route="{ name: 'Lipingshangcheng' }"
        >礼品商城
        <div class="menuEnglish">GIFT MALL</div>
      </el-menu-item>
      <el-menu-item index="3" :route="{ name: 'Huiyuanzhongxin' }"
        >会员中心
        <div class="menuEnglish">MEMBER</div></el-menu-item
      >
      <el-menu-item index="4" :route="{ name: 'ShengjiVIP' }"
        >收费标准
        <div class="menuEnglish">CHARGES</div></el-menu-item
      >
      <el-menu-item index="5" :route="{ name: 'Daifazhinan' }"
        >代发指南
        <div class="menuEnglish">AGENCY</div></el-menu-item
      >
      <el-menu-item index="6" :route="{ name: 'Tuiguanfanyong' }"
        >推广返佣
        <div class="menuEnglish">REBATE</div></el-menu-item
      >
      <el-menu-item index="7" :route="{ name: 'Fenzhanyuapi' }"
        >分站与API
        <div class="menuEnglish">SUBATATION</div></el-menu-item
      >
      <el-menu-item @click="toZaixiankefu"
        >在线客服
        <div class="menuEnglish">SERVICE</div></el-menu-item
      >
    </el-menu>
    <!-- 在线客服 -->
    <el-dialog
      :visible.sync="zxkfDialogVisible"
      width="400px"
      :before-close="zxkfHandleClose"
    >
      <div class="zxkf">
        <div class="picBox">
          <img :src="kefuImg" alt="" class="zxkf-pic" />
        </div>
        <div class="zxkf-txt">扫码添加客服微信</div>
        <img class="zxkf-pic2" src="../../assets/newImg/shuxian2.png" alt="" />
        <div @click="zxkfDialogVisible = false" class="zxkf-btn">确定</div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeIndex2: null,
      zxkfDialogVisible: false,
      userName: "null",
      kefuImg: "",
    };
  },
  created() {
    const userName = sessionStorage.getItem("username");
    console.log(userName);
    if (userName == null) {
      this.userName = "null";
    } else {
      this.userName = userName;
    }
  },
  watch: {
    $route(to) {
      console.log(to.path, "cyy");
      if (to.path == "/Lipingshangcheng/Lipingshangcheng") {
        this.activeIndex2 = "2";
        this.$store.commit("asideVal", "2-1");
      } else if (to.path == "/Fenzhanyuapi/Fenzhanyuapi") {
        this.activeIndex2 = "7";
        this.$store.commit("asideVal", "7-1");
      } else if (to.path == "/Fenzhanyuapi/Bangzhuzhongxin") {
        this.activeIndex2 = "7";
        this.$store.commit("asideVal", "7-2");
      } else if (to.path == "/Zhanghuguanli/Huiyuanziliao") {
        this.activeIndex2 = "6";
        this.$store.commit("asideVal", "6-1");
      } else if (to.path == "/Zhanghuguanli/Tuiguanfanyong") {
        this.activeIndex2 = "6";
        this.$store.commit("asideVal", "6-2");
      } else if (to.path == "/Zhanghuguanli/Xiugaimima") {
        this.activeIndex2 = "6";
        this.$store.commit("asideVal", "6-3");
      } else if (to.path == "/Zhanghuguanli/ShengjiVIP") {
        this.activeIndex2 = "4";
        this.$store.commit("asideVal", "6-4");
      } else if (to.path == "/Shouhoufuwu/Shouhouchajian") {
        this.$store.commit("asideVal", "10-1");
      } else if (to.path == "/Shouhoufuwu/Didanshenqin") {
        this.$store.commit("asideVal", "10-2");
      } else if (to.path == "/Daifazhinan/Daifazhinan") {
        this.activeIndex2 = "5";
      } else if (to.path == "/Huiyuanzhongxin/Huiyuanzhongxin") {
        this.activeIndex2 = "3";
      } else if (to.path == "/Caiwuzhongxin/Woyaochongzhi") {
        this.$store.commit("asideVal", "11-1");
      } else if (to.path == "/Caiwuzhongxin/Zijinmingxi") {
        this.$store.commit("asideVal", "11-2");
      } else if (to.path == "/Caiwuzhongxin/Yaoqingjiangli") {
        this.$store.commit("asideVal", "11-3");
      } else if (to.path == "/Dingdanguanli/Baoguoliebiao") {
        this.$store.commit("asideVal", "12-1");
      } else if (to.path == "/Dingdanguanli/Dingdanliebiao") {
        this.$store.commit("asideVal", "12-2");
      }
    },
  },
  methods: {
    denglu() {
      sessionStorage.setItem("isLogin", "123");
      this.$router.go(0);
    },
    tuShouye() {
      sessionStorage.setItem("isLogin", "sy");
      this.$router.go(0);
    },
    async toZaixiankefu() {
      const res = await this.$api.getKefu({
        token: sessionStorage.getItem("token"),
      });
      console.log(res);
      this.kefuImg = res.data.wx;
      this.zxkfDialogVisible = true;
    },
    zxkfHandleClose() {
      this.zxkfDialogVisible = false;
    },
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
      if (key == 1) {
        // sessionStorage.setItem("isLogin", "sy");
        // this.$router.go(0);
        this.$router.push({ name: "Fenzhanyuapi" });
      }
    },
    tuichuLogin() {
      sessionStorage.setItem("token", "null");
      sessionStorage.setItem("username", "null");
      sessionStorage.setItem("isLogin", "123");
      this.$router.go(0);
    },
  },
};
</script>

<style lang="scss" scoped>
/deep/ .el-menu-item {
  opacity: 1;
  font-size: 16px;
  font-family: zw;
  font-weight: 700;
  text-align: left;
  color: #ea8e11;
  border-bottom: 0px !important;
  padding: 0px 38px;
  .menuEnglish {
    height: 20px;
    line-height: 20px;
    opacity: 1;
    font-size: 6px;
    font-family: zw;
    // font-family: eng;
    font-weight: 100;
    text-align: center;
    color: #a7a7a7;
    transform: translateY(-20px);
  }
}
/deep/ .el-menu-item.is-active {
  border-bottom: 0px !important;
  .menuEnglish {
    height: 20px;
    line-height: 20px;
    opacity: 1;
    font-size: 10px;
    font-family: zw;
    font-weight: 100;
    text-align: center;
    color: rgb(234, 142, 17);
    transform: translateY(-20px);
  }
}
/deep/ .el-menu-demo{
  transform: translateX(10px)
}
.index {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  box-shadow: 0px 2px 4px 2px #dddddd !important;
  .user {
    position: absolute;
    right: 17%;
    top: 20px;
    display: flex;
    align-items: center;
    transform: translateX(14px);
    .pic1 {
      width: 21px;
      height: 21px;
      opacity: 1;
    }
    .txt1 {
      margin-left: 10px;
      opacity: 1;
      font-size: 14px;
      font-family: SimSun;
      font-weight: 400;
      text-align: left;
      color: #5c5c5c;
    }
    .txt2 {
      margin-left: 10px;
      opacity: 1;
      font-size: 14px;
      font-family: SimSun;
      font-weight: 400;
      text-align: left;
      color: #ea8e11;
    }
    .pic2 {
      margin-left: 20px;
      width: 19px;
      height: 17px;
      opacity: 1;
    }
    .txt3 {
      cursor: pointer;
      margin-left: 10px;
      opacity: 1;
      font-size: 14px;
      font-family: SimSun;
      font-weight: 400;
      text-align: left;
      color: #5c5c5c;
    }
  }
  .pic {
    width: 207px;
    height: 75px;
    opacity: 1;
    margin-right: 30px;
  }
}
/deep/ .el-menu.el-menu--horizontal {
  border-bottom: 0px !important;
}
/deep/ .el-menu-demo {
  margin-top: 50px;
}

.zxkf {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  .picBox {
    background: #dddddd;
    width: 160px;
    height: 160px;
    opacity: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    .zxkf-pic {
      width: 144px;
      height: 144px;
      opacity: 1;
    }
  }
  .zxkf-txt {
    margin-top: 10px;
    font-size: 16px;
    font-family: zw;
    font-weight: 400;
    color: #353535;
  }
  .zxkf-pic2 {
    margin-top: 20px;
    width: 429px;
    height: 10px;
    opacity: 1;
  }
  .zxkf-btn {
    margin-top: 20px;
    width: 180px;
    height: 42px;
    opacity: 1;
    font-size: 14px;
    font-family: PingFang SC, PingFang SC-Medium;
    font-weight: 500;
    text-align: center;
    color: #5c5c5c;
    line-height: 42px;
    box-shadow: inset 0px 0 16px 4px #dddddd !important;
  }
}
</style>