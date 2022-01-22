<template>
  <div class="index">
    <div class="top">
      <img class="pic1" src="../../assets/newImg/dhl.png" alt />
      <div class="nav">
        <div class="item1">
          <img class="pic2" src="../../assets/newImg/mhhz.png" alt />
        </div>
        <div @click="shouye" class="item active">
          <img class="pic2" src="../../assets/newImg/hezi.png" alt />
          <div class="txt1">首页</div>
          <div class="txt2">INDEX</div>
        </div>
        <div @click="lpsc" class="item">
          <img class="pic2" src="../../assets/newImg/hezi.png" alt />
          <div class="txt1">礼品商城</div>
          <div class="txt2">GIFT MALL</div>
        </div>
        <div @click="hyzx" class="item">
          <img class="pic2" src="../../assets/newImg/hezi.png" alt />
          <div class="txt1">会员中心</div>
          <div class="txt2">MEMBER</div>
        </div>
        <div @click="sfbz" class="item">
          <img class="pic2" src="../../assets/newImg/hezi.png" alt />
          <div class="txt1">收费标准</div>
          <div class="txt2">CHARGES</div>
        </div>
        <div @click="dfzn" class="item">
          <img class="pic2" src="../../assets/newImg/hezi.png" alt />
          <div class="txt1">代发指南</div>
          <div class="txt2">AGENCY</div>
        </div>
        <div @click="tgfy" class="item">
          <img class="pic2" src="../../assets/newImg/hezi.png" alt />
          <div class="txt1">推广返佣</div>
          <div class="txt2">REBATE</div>
        </div>
        <div @click="fzyApi" class="item">
          <img class="pic2" src="../../assets/newImg/hezi.png" alt />
          <div class="txt1">分站与API</div>
          <div class="txt2">SUBATATION</div>
        </div>
        <div @click="zxkf" class="item">
          <img class="pic2" src="../../assets/newImg/hezi.png" alt />
          <div class="txt1">在线客服</div>
          <div class="txt2">SERVICE</div>
        </div>
        <div class="item">
          <img class="pic2" src="../../assets/newImg/mhhz.png" alt />
        </div>
      </div>
    </div>
    <div class="content">
      <el-row type="flex" justify="center">
        <el-col :span="18">
          <div class="item">
            <img class="pic" src="../../assets/newImg/sy1.png" alt />
            <div class="box">
              <div class="items">
                <img class="pic2" src="../../assets/newImg/hezi.png" alt />
                <div class="txt1">关于我们</div>
                <div class="txt2">ABOUT US</div>
              </div>
            </div>
            <div class="box2">我司是专业做礼品代发、云仓发货、还可以专门为客户定制专属礼品发货的一家公司，我们承诺礼品代发百分百真实发货，百分百派送，而且价格实惠</div>
          </div>
        </el-col>
      </el-row>
      <el-row type="flex" justify="center">
        <el-col :span="18">
          <div class="item">
            <img class="pic" src="../../assets/newImg/sy2.png" alt />
            <div class="sy2">
              <div class="items">
                <img class="pic2" src="../../assets/newImg/hezi.png" alt />
                <div class="txt1">专属定制</div>
                <div class="txt2">CUSTOM MADE</div>
              </div>
            </div>
            <div class="boxsy2">我司可以专门为客户定制专属礼品发货，还可以加入我们分站，专属个人域名、独立后台自由管理，我们提供稳定、安全、低价的快递费、礼品货源</div>
          </div>
        </el-col>
      </el-row>
      <el-row type="flex" justify="center">
        <el-col :span="18">
          <div class="item" style="marginbottom: 60px">
            <img class="pic" src="../../assets/newImg/sy3.png" alt />
            <div class="box">
              <div class="items">
                <img class="pic2" src="../../assets/newImg/hezi.png" alt />
                <div class="txt1">推广返佣</div>
                <div class="txt2">REBATE</div>
              </div>
            </div>
            <div class="box2">邀请您身边的朋友在我们平台上下单，您就有佣金可拿只要一直在用您就永久有佣金拿，我们要做的就是真正实现合作共赢的优良平台</div>
          </div>
        </el-col>
      </el-row>
    </div>
    <div class="right-float">
      <img class="pic" src="../../assets/newImg/zu291.png" alt />
      <div class="txt1">在线客服</div>
      <img class="pic2" :src="kefuImg" alt />
      <div class="txt2">微信咨询</div>
      <div class="tit">
        <img class="picc1" src="../../assets/newImg/lujin215.png" alt />
        <div class="txtt1">客服QQ</div>
      </div>
      <div class="txt3">{{qq}}</div>
      <div class="line line2"></div>
      <div class="tit tit2">
        <img class="picc1" src="../../assets/newImg/lujin521.png" alt />
        <div class="txtt1">客服电话</div>
      </div>
      <div class="line"></div>
      <div class="txt4">工作时间:8:00~22:00</div>
      <div class="line line3"></div>
      <div class="btn">
        <img class="picc3" src="../../assets/newImg/lujin522.png" alt />
        <div class="txtt3">客服QQ</div>
      </div>
    </div>
    <div class="footerLay">
      <a
        id="domain"
        class="beian"
        href="https://beian.miit.gov.cn/#/Integrated/index"
        target="_blank"
      >浙ICP备2021026509号-1</a>
    </div>
    <!-- 在线客服 -->
    <el-dialog :visible.sync="zxkfDialogVisible" width="400px" :before-close="zxkfHandleClose">
      <div class="zxkf">
        <div class="picBox">
          <img :src="kefuImg" alt class="zxkf-pic" />
        </div>
        <div class="zxkf-txt">扫码添加客服微信</div>
        <img class="zxkf-pic2" src="../../assets/newImg/shuxian2.png" alt />
        <div @click="zxkfDialogVisible = false" class="zxkf-btn">确定</div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      zxkfDialogVisible: false,
      kefuImg: "",
      qq: ""
    };
  },
  async created() {
    const res = await this.$api.getKefu({
      token: sessionStorage.getItem("token")
    });
    console.log(res);
    this.kefuImg = res.data.wx;
    this.qq = res.data.qq;
  },
  methods: {
    async toZaixiankefu() {
      const res = await this.$api.getKefu({
        token: sessionStorage.getItem("token")
      });
      console.log(res);
      this.kefuImg = res.data.wx;
      this.qq = res.data.qq;
      this.zxkfDialogVisible = true;
    },
    shouye() {
      this.$router.go(0);
    },
    lpsc() {
      sessionStorage.setItem("isLogin", true);
      this.$router.push({ name: "Lipingshangcheng" });
      setTimeout(() => {
        this.$router.go(0);
      }, 100);
    },
    hyzx() {
      sessionStorage.setItem("isLogin", true);
      this.$router.push({ name: "Huiyuanzhongxin" });
      setTimeout(() => {
        this.$router.go(0);
      }, 100);
    },
    sfbz() {
      sessionStorage.setItem("isLogin", true);
      this.$router.push({ name: "ShengjiVIP" });
      setTimeout(() => {
        this.$router.go(0);
      }, 100);
    },
    dfzn() {
      sessionStorage.setItem("isLogin", true);
      this.$router.push({ name: "Daifazhinan" });
      setTimeout(() => {
        this.$router.go(0);
      }, 100);
    },
    tgfy() {
      sessionStorage.setItem("isLogin", true);
      this.$router.push({ name: "Tuiguanfanyong" });
      setTimeout(() => {
        this.$router.go(0);
      }, 100);
    },
    fzyApi() {
      sessionStorage.setItem("isLogin", true);
      // this.$store.commit('routerParams',true)
      sessionStorage.setItem("routerParams", true);
      this.$router.push({
        name: "Fenzhanyuapi"
      });
      setTimeout(() => {
        this.$router.go(0);
      }, 100);
    },
    zxkf() {
      this.toZaixiankefu();
      this.zxkfDialogVisible = true;
    },
    zxkfHandleClose() {
      this.zxkfDialogVisible = false;
    }
  }
};
</script>

<style lang="scss" scoped>
.footerLay{
  padding:10px 0 30px 0;
  display: flex;
  justify-content: center;
}
.beian {
  font-size: 14px;
  text-decoration: none;
  color: #aaaaaa !important;
  cursor: pointer;
}
.beian:hover{
  color: #007aff !important;
}
.index {
  // height: calc(100vh - );
  position: relative;
  .top {
    position: relative;
    margin-top: 4px;
    height: 74px;
    opacity: 1;
    .pic1 {
      position: absolute;
      top: 10px;
      left: 0;
      height: 70%;
      width: 100%;
    }
    .nav {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      display: flex;
      justify-content: center;
      .item.item1 {
        margin-left: 0px;
      }
      .item.active {
        .txt1,
        .txt2 {
          color: #ffffff;
        }
      }
      .item {
        cursor: pointer;
        position: relative;
        width: 105px;
        height: 56px;
        margin-left: 74px;
        flex-shrink: 0;
        .pic2 {
          position: absolute;
          top: 0;
          left: 0;
          width: 105px;
          height: 56px;
          opacity: 1;
        }
        .txt1 {
          width: 100%;
          position: absolute;
          top: 22px;
          // left: -2px;
          // left: 50%;
          // transform: translateX(-50%);
          opacity: 1;
          font-size: 16px;
          font-family: PingFang SC, PingFang SC-Bold;
          font-weight: 700;
          text-align: center;
          color: #5c5c5c;
        }
        .txt2 {
          width: 100%;
          position: absolute;
          top: 40px;
          left: -2px;
          opacity: 1;
          font-size: 10px;
          font-family: zw;
          font-weight: 400;
          text-align: center;
          color: #5c5c5c;
        }
      }
    }
  }
  .content {
    padding-bottom: 60px;
    .item {
      width: 100%;
      margin-top: 50px;
      height: 258px;
      position: relative;
      overflow: hidden;
      border-radius: 19px;
      .pic {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        opacity: 1;
      }
      .box {
        position: absolute;
        top: 50px;
        left: 30px;
        width: 105px;
        height: 56px;
        .items {
          cursor: pointer;
          position: relative;
          width: 105px;
          height: 56px;
          .pic2 {
            position: absolute;
            top: 0;
            left: 0;
            width: 105px;
            height: 56px;
            opacity: 1;
          }
          .txt1 {
            width: 100%;
            position: absolute;
            top: 22px;
            left: -2px;
            opacity: 1;
            font-size: 18px;
            font-family: PingFang SC, PingFang SC-Bold;
            font-weight: 700;
            text-align: center;
            color: #5c5c5c;
          }
          .txt2 {
            width: 100%;
            position: absolute;
            top: 42px;
            left: -2px;
            opacity: 1;
            font-size: 10px;
            font-family: zw;
            font-weight: 400;
            text-align: center;
            color: #5c5c5c;
          }
        }
      }
      .sy2 {
        position: absolute;
        top: 50px;
        right: 30px;
        width: 105px;
        height: 56px;
        .items {
          cursor: pointer;
          position: relative;
          width: 105px;
          height: 56px;
          .pic2 {
            position: absolute;
            top: 0;
            left: 0;
            width: 105px;
            height: 56px;
            opacity: 1;
          }
          .txt1 {
            width: 100%;
            position: absolute;
            top: 22px;
            left: -2px;
            opacity: 1;
            font-size: 18px;
            font-family: PingFang SC, PingFang SC-Bold;
            font-weight: 700;
            text-align: center;
            color: #5c5c5c;
          }
          .txt2 {
            width: 100%;
            position: absolute;
            top: 42px;
            left: -2px;
            opacity: 1;
            font-size: 10px;
            font-family: zw;
            font-weight: 400;
            text-align: center;
            color: #5c5c5c;
          }
        }
      }
      .boxsy2 {
        font-family: "SimSun";
        position: absolute;
        top: 115px;
        right: 30px;
        width: 15%;
        letter-spacing: 2px;
        height: 115px;
        opacity: 1;
        font-size: 12px;
        font-weight: 400;
        text-align: left;
        color: #5c5c5c;
        line-height: 18px;
      }
      .box2 {
        font-family: "SimSun";
        position: absolute;
        top: 115px;
        left: 30px;
        width: 14%;
        letter-spacing: 2px;
        height: 115px;
        opacity: 1;
        font-size: 12px;
        font-weight: 400;
        text-align: left;
        color: #5c5c5c;
        line-height: 18px;
      }
    }
  }
  .right-float {
    width: 172px;
    height: 436px;
    opacity: 1;
    position: fixed;
    top: 55%;
    right: 30px;
    transform: translateY(-50%);
    .pic {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
    }
    .txt1 {
      position: absolute;
      top: 8px;
      left: 50%;
      transform: translateX(-50%);
      opacity: 1;
      font-size: 16px;
      font-family: "zw";
      font-weight: 700;
      color: #ffffff;
    }
    .pic2 {
      position: absolute;
      top: 51px;
      left: 30px;
      width: 113px;
      height: 113px;
    }
    .txt2 {
      position: absolute;
      top: 176px;
      left: 54px;
      opacity: 1;
      font-size: 16px;
      font-family: "zw";
      font-weight: 500;
      color: #5c5c5c;
    }
    .tit {
      position: absolute;
      display: flex;
      align-items: center;
      top: 223px;
      left: 50%;
      transform: translateX(-50%);
      .picc1 {
        width: 14px;
        height: 17px;
      }
      .txtt1 {
        margin-left: 11px;
        font-size: 16px;
        font-family: "zw";
        font-weight: 500;
        color: #000000;
      }
    }
    .txt3 {
      position: absolute;
      top: 251px;
      left: 43px;
      opacity: 1;
      font-size: 16px;
      font-family: "zw";
      font-weight: 700;
      color: #ff8803;
    }
    .tit2.tit {
      width: 90px;
      position: absolute;
      top: 298px;
    }
    .line {
      position: absolute;
      top: 329px;
      left: 7px;
      width: 158px;
      opacity: 1;
      border: 1px solid #eceef5;
    }
    .line2.line {
      position: absolute;
      top: 285px;
    }
    .line3.line {
      position: absolute;
      top: 373px;
    }
    .txt4 {
      position: absolute;
      top: 343px;
      left: 20px;
      opacity: 1;
      font-size: 14px;
      font-family: "zw";
      font-weight: 500;
      color: #000000;
    }
    .btn {
      cursor: pointer;
      position: absolute;
      top: 387px;
      left: 11px;
      width: 150px;
      height: 37px;
      background-color: rgb(255, 136, 3);
      display: flex;
      align-items: center;
      justify-content: center;
      .picc3 {
        width: 14px;
        height: 17px;
      }
      .txtt3 {
        margin-left: 11px;
        opacity: 1;
        font-size: 16px;
        font-family: "zw";
        font-weight: 500;
        color: #ffffff;
      }
    }
  }
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