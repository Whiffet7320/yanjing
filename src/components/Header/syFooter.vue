<template>
  <div class="index">
    <div class="nav12">
      <el-row style="width:100%">
        <el-col :span="20">
          <el-row style="width:100%">
            <el-col :span="6">
              <div class="n12-tit">
                <div class="txt">发现</div>
                <div class="txt">精美眼镜</div>
                <div class="txt">超轻</div>
                <div class="txt">弹簧铰链</div>
              </div>
            </el-col>
            <el-col :span="6">
              <div class="n12-tit">
                <div class="txt">公司</div>
                <div @click="jump('Guanyuwomen')" class="txt">关于CCSpace</div>
                <div class="txt">品牌故事</div>
                <div class="txt">联系CCSpace</div>
                <div @click="jump('Jiaruwomen')" class="txt">加入我们</div>
                <div class="txt">为什么选择CCSpace</div>
              </div>
            </el-col>
            <el-col :span="6">
              <div class="n12-tit">
                <div class="txt">政策</div>
                <div @click="jump('Womendechengnuo')" class="txt">我们的承诺</div>
                <div @click="jump('Tuihuotuikuan')" class="txt">退货退款</div>
                <div class="txt">隐私和安全</div>
                <div class="txt">条款和条件</div>
              </div>
            </el-col>
            <el-col :span="6">
              <div class="n12-tit">
                <div class="txt">帮助和信息</div>
                <div class="txt">如何选择眼镜</div>
                <div class="txt">如何测量您的瞳孔距离（PD）</div>
                <div class="txt">如何填写处方</div>
                <div class="txt">加入我们</div>
                <div @click="jump('Yunshushuoming')" class="txt">运输说明</div>
                <div @click="jump('Weishenmexuanze')" class="txt">为什么选择CCSpace</div>
                <div class="txt">如何填写处方</div>
                <div class="txt">加入我们</div>
                <div class="txt">为什么选择CCSpace</div>
              </div>
            </el-col>
          </el-row>
        </el-col>
        <el-col :span="4">
          <div class="n12-right">
            <div class="n12r-txt">需要帮忙？</div>
            <div class="n12-box">在线客服</div>
            <div class="n12-tit11">
              <img src="../../assets/img/zu181.png" class="pic" alt />
              <div class="box">
                <div class="n12-txtt1">客户服务部</div>
                <div class="n12-txtt2">ccspace@ccspace.com</div>
              </div>
            </div>
            <div class="n12-tit11">
              <img src="../../assets/img/zu182.png" class="pic" alt />
              <div class="box">
                <div class="n12-txtt1">电话：5001-645632</div>
                <div class="n12-txtt2">北京时间 周一至周五</div>
              </div>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
    <div class="nav13">
      <img src="../../assets/img/sybottom.png" class="n13-pic" alt />
      <div class="n13-txt">© 2021 CCSpace Inc. 保留所有权利</div>
    </div>
  </div>
</template>

<script>
export default {
  // created() {
  //   const userName = sessionStorage.getItem("username");
  //   console.log(userName);
  //   if (userName == null) {
  //     this.userName = "null";
  //   } else {
  //     this.userName = userName;
  //   }
  // },
  data() {
    return {
      searchVal: "",
      activeIndex: "sy",
      //
      lbtIndex: 0,
      userName: "null"
    };
  },
  methods: {
    jump(url){
      this.$router.push({name:url})
    },
    toShouye() {
      this.$store.commit("isShouye", true);
      this.activeIndex = "sy";
    },
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
      this.$store.commit("isShouye", false);
      this.activeIndex = key;
      // sessionStorage.setItem("isShouye", "no");
      // this.$router.go(0);
    },
    lbtChange(i) {
      this.lbtIndex = i;
    },
    denglu() {
      sessionStorage.setItem("isLogin", "123");
      this.$router.go(0);
    },
    outLogin() {
      sessionStorage.setItem("token", "null");
      // sessionStorage.setItem("isLogin", "123");
      sessionStorage.setItem("username", "null");
      this.$router.go(0);
    }
  }
};
</script>
<style lang="scss" scoped>
.nav12 {
  padding: 35px 60px;
  height: 436px;
  // background: #fafafa;
  background: #ffffff;
  .n12-tit {
    .txt {
      cursor: pointer;
      font-size: 16px;
      text-align: left;
      color: #1f1f33;
      line-height: 40px;
    }
  }
  .n12-right {
    .n12r-txt {
      font-size: 24px;
      font-family: PingFang SC, PingFang SC-Heavy;
      font-weight: 800;
      text-align: left;
      color: #1f1f33;
      line-height: 40px;
    }
    .n12-box {
      margin-top: 12px;
      width: 200px;
      height: 48px;
      background: #000000;
      border-radius: 24px;
      font-size: 16px;
      text-align: center;
      color: #ffffff;
      line-height: 48px;
    }
    .n12-tit11 {
      display: flex;
      align-items: center;
      margin-top: 36px;
      .pic {
        width: 54px;
        height: 54px;
      }
      .box {
        margin-left: 14px;
        .n12-txtt1 {
          font-size: 16px;
          color: #1f1f33;
        }
        .n12-txtt2 {
          margin-top: 4px;
          font-size: 16px;
          color: #1f1f33;
        }
      }
    }
  }
}
.nav13 {
  height: 122px;
  display: flex;
  align-items: center;
  padding: 0 60px;
  justify-content: space-between;
  .n13-pic {
    width: 447px;
    height: 44px;
  }
  .n13-txt {
    font-size: 16px;
    color: #000000;
    line-height: 40px;
  }
}
</style>