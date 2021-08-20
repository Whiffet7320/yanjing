<template>
  <div class="index">
    <div class="topbar">
      <div class="topbar-wrap">
        <a href="https://help.alipay.com/lab/help_detail.htm?help_id=258086" class="txt222">常见问题</a>
        <span class="txt111" data-i18nkey="top_welcome">你好，欢迎使用支付宝付款！</span>
      </div>
    </div>
    <div class="nav1">
      <div class="header-container fn-clear">
        <div class="header-title">
          <div class="alipay-logo">
            <img
              src="https://gw.alipayobjects.com/mdn/rms_9e4c39/afts/img/A*Qys_QIJfGPgAAAAAAAAAAAAAARQnAQ"
              style="height: 100%"
              alt="alipay_logo"
            />
          </div>
          <span class="logo-title custom-i18n" data-i18nkey="top_my_cashier">我的收银台</span>
        </div>
      </div>
    </div>
    <template v-if="status == 1">
      <div class="nav2">
        <div class="orderDetail-base">
          <div class="tit1">
            <span style="cursor: auto">
              <span class="txt">正在使用即时到账交易</span>

              <span
                data-role="J_questionIcon"
                seed="order-type-detail"
                style="cursor: pointer;color: #08c;"
              >[?]</span>
            </span>
          </div>
          <div class="tit2">
            <span class="txt1">商家充值</span>
            <span class="txt2">收款方：礼品网</span>
          </div>
          <span class="tit3" style="display: block;">
            <strong class="txt1">{{zzPrice}}</strong>
            <span class="txt2" data-i18nkey="cny">元</span>
          </span>
          <div class="smallBox">订单详情</div>
        </div>
      </div>
      <div class="content">
        <div class="r-3-left">
          <div class="txt1">扫一扫付款(元)</div>
          <div class="txt2">{{ zzPrice }}</div>
          <div class="imgBox">
            <img class="pic1" :src="payImg" alt />
            <div class="nav1">
              <img class="pic2" src="../../assets/newImg/lujin356.png" alt />
              <div class="nav1-1">
                <div class="txt11">打开手机支付宝</div>
                <div class="txt11">扫一扫继续支付</div>
              </div>
            </div>
          </div>
          <div class="txt3">
            首次使用
            <span class="blue">请下载手机支付宝</span>
          </div>
        </div>
        <div class="r-3-right">
          <img class="pic1" src="../../assets/newImg/zu215.png" alt />
        </div>
      </div>
      <div class="nav3">ICP证：沪B2-20150087</div>
      <div class="nav4">
        <img
          alt="合作机构"
          src="https://i.alipayobjects.com/e/201303/2R3cKfrKqS.png"
          seed="partner-iE2013032R3cKfrKqS"
          smartracker="on"
        />
      </div>
    </template>
    <template v-else>
      <div class="index2">
        <div class="boxx2">
          <div class="nav5-1">
            <i class="el-icon-success"></i>
            <div class="txt">交易支付成功，正在跳转至商户页面</div>
          </div>
          <div class="nav5-2">您的贷款已经打到卖家支付宝账号中，请您积极与卖家联系，确保交易顺利完成。</div>
        </div>
      </div>
    </template>
  </div>
</template>

<script>
export default {
  data() {
    return {
      zzPrice: "0.00",
      payImg: "",
      status: 1
    };
  },
  created() {
    console.log(this.$route.query);
    this.zzPrice = this.toDecimal2(this.$route.query.val1);
    this.getData();
  },
  methods: {
    async getData() {
      const res = await this.$api.alipayGetPay({
        token: sessionStorage.getItem("token"),
        type: 1,
        money: this.$route.query.val1
      });
      console.log(res);
      if (res.code == 200) {
        this.payImg = `${res.data.img}`;
        this.order = res.data.order;
        this.mycheckOrder();
      } else {
        this.$message.error(res.msg);
      }
    },
    mycheckOrder() {
      setInterval(() => {
        this.checkOrder();
        sessionStorage.setItem("isPay", "true");
      }, 5000);
    },
    async checkOrder() {
      const res = await this.$api.alipayQueryOrder({
        token: sessionStorage.getItem("token"),
        order: this.order
      });
      console.log(res);
      if (res.code == 200) {
        this.status = 2;
        this.$store.commit("isPay", true);
        setTimeout(() => {
          window.close();
        }, 3000);
      }
    },
    toDecimal2(x) {
      var f = parseFloat(x);
      if (isNaN(f)) {
        return false;
      }
      f = Math.round(x * 100) / 100;
      var s = f.toString();
      var rs = s.indexOf(".");
      if (rs < 0) {
        rs = s.length;
        s += ".";
      }
      while (s.length <= rs + 2) {
        s += "0";
      }
      return s;
    }
  }
};
</script>

<style lang="scss" scoped>
.index {
  background: #eff0f1;
}
.topbar {
  width: 100%;
  height: 26px;
  background: url(https://i.alipayobjects.com/e/201305/OzLou0mHd.png) repeat-x 0
    0;
  .topbar-wrap {
    background: url(https://i.alipayobjects.com/e/201305/OzLou0mHd.png) repeat-x
      0 0;
    width: 950px;
    margin: 0 auto;
    display: flex;
    justify-content: flex-end;
    // .topbar .topbar-wrap .topbar-link-last {
    //   padding-right: 0;
    // }
    .txt111 {
      float: right;
      color: #fff;
      font-size: 12px;
      line-height: 26px;
      padding: 0px 15px;
      background: url(https://i.alipayobjects.com/e/201305/OzUPukVET.png)
        no-repeat 0 7px;
    }
    .txt222 {
      float: right;
      color: #fff;
      font-size: 12px;
      line-height: 26px;
      padding: 0px 15px;
    }
  }
}
.nav1 {
  height: 60px;
  background-color: #fff;
  border-bottom: 1px solid #d9d9d9;
  margin-top: 0px;
  .header-container {
    width: 950px;
    margin: 0 auto;
    .header-title {
      height: 60px;
      float: left;
      .alipay-logo {
        display: block;
        position: relative;
        left: 0;
        top: 10px;
        float: left;
        height: 40px;
      }
      .logo-title {
        font-size: 16px;
        font-weight: normal;
        font-family: "Microsoft YaHei", 微软雅黑, "宋体";
        border-left: 1px solid #676d70;
        color: #676d70;
        height: 20px;
        float: left;
        margin-top: 15px;
        margin-left: 10px;
        padding-top: 10px;
        padding-left: 10px;
      }
    }
  }
}
.nav2 {
  padding-top: 20px;
  margin: 0 auto;
  width: 950px;
  position: relative;
  .orderDetail-base {
    border-bottom: 3px solid #b3b3b3;
    padding: 16px 23px;
    // position: relative;
    .tit1 {
      font-size: 12px;
    }
    .tit2 {
      margin-top: 14px;
      display: flex;
      align-items: center;
      .txt1 {
        font-size: 16px;
        font-weight: 600;
      }
      .txt2 {
        margin-left: 20px;
        font-size: 12px;
      }
    }
    .tit3 {
      position: absolute;
      bottom: 36px;
      right: 23px;
      text-align: right;
      z-index: 1;
      .txt1 {
        color: #f60;
        font-size: 22px;
        font-weight: 700;
      }
      .txt2 {
        margin-left: 4px;
        font-size: 12px;
      }
    }
    .smallBox {
      position: absolute;
      right: 20px;
      bottom: 0;
      height: 22px;
      padding: 1px 8px 1px;
      font-weight: 700;
      border-top: 0;
      background: #b3b3b3;
      z-index: 100;
      color: #fff;
      font-size: 12px;
      line-height: 22px;
    }
  }
}

.content {
  margin: 0 auto;
  width: 950px;
  height: 526px;
  min-height: 460px;
  background-color: #fff;
  border-bottom: 3px solid #b3b3b3;
}
.r-3-left {
  display: flex;
  flex-direction: column;
  align-items: center;
  .txt1 {
    display: block;
    width: auto;
    margin: 0;
    padding: 0;
    margin-top: 75px;
    margin-bottom: 16px;
    opacity: 1;
    font-size: 14px;
    font-weight: 400;
    text-align: center;
    color: #000000;
  }
  .txt2 {
    margin-bottom: 24px;
    font-size: 26px;
    font-family: PingFang SC, PingFang SC-Heavy;
    font-weight: 800;
    text-align: center;
    color: #f60;
  }
  .imgBox {
    position: relative;
    width: 168px;
    height: auto;
    min-height: 168px;
    margin: 0 auto;
    padding: 6px;
    border: 1px solid #d3d3d3;
    -webkit-box-shadow: 1px 1px 1px #ccc;
    box-shadow: 1px 1px 1px #ccc;
    .pic1 {
      width: 168px;
      height: 168px;
      opacity: 1;
    }
    .nav1 {
      height: 40px;
      border-bottom: 0;
      display: flex;
      justify-content: center;
      margin-top: 12px;
      .pic2 {
        width: 30px;
        height: 30px;
        opacity: 1;
      }
      .nav1-1 {
        margin-left: 6px;
        .txt11 {
          margin-bottom: 3px;
          opacity: 1;
          font-size: 14px;
          font-family: zw;
          font-weight: 400;
          color: #000000;
        }
      }
    }
  }
  .txt3 {
    margin-top: 30px;
    font-size: 16px;
    font-family: zw;
    font-weight: 400;
    color: #707071;
    .blue {
      text-decoration: underline;
      color: #1676fe;
    }
  }
}
.r-3-right {
  transform: translate(564px, -410px);
  width: 260px;
  height: 250px;
  opacity: 1;
  .pic1 {
    width: 276px;
    height: 270px;
    opacity: 1;
  }
}
.nav3 {
  margin: 30px 0;
  text-align: center;
  font-size: 12px;
  color: #808080;
}
.nav4 {
  display: flex;
  justify-content: center;
  background-color: #eff0f1;
  margin-bottom: 20px;
}

//
.index2 {
  background: #ffffff;
  width: 100vw;
}
.boxx2 {
  margin: 0 auto;
  width: 950px;
  .nav5-1 {
    border: 1px solid #dee2cf;
    border-bottom: 0;
    border-top: 0;
    background: #eefecd;
    height: 80px;
    display: flex;
    align-items: center;
    .el-icon-success {
      margin-left: 40px;
      margin-right: 10px;
      font-size: 40px;
      color: #2ecf32;
    }
    .txt {
      font-size: 16px;
      font-weight: 700;
    }
  }
  .nav5-2 {
    padding-left: 86px;
    background: #ffffff;
    height: 60px;
    display: flex;
    align-items: center;
    border: 1px solid #dee2cf;
    font-size: 16px;
    color: #868686;
  }
}
</style>