<template>
  <div class="index">
    <div v-if="false" class="nav1">
      <div class="tit1">
        <img src="../../assets/img/zu119.png" alt class="n2t1-pic1" />
        <div class="n2t1-txt1">Zing</div>
        <div class="n2t1-txt2">您好！尊敬的会员LI</div>
      </div>
      <div class="tit2">
        续费
        <i class="el-icon-caret-right"></i>
      </div>
      <div class="tit3">会员到期时间：2010-06-08</div>
    </div>
    <div class="nav1">
      <div class="tit1">
        <img src="../../assets/img/zu119.png" alt class="n2t1-pic1" />
        <div class="n2t1-txt1">Zing</div>
      </div>
      <div class="n2t1-txt2-a">成为会员，可获得一年的会员优惠</div>
      <div class="tit2">
        立即购买
        <i class="el-icon-caret-right"></i>
      </div>
      <div class="tit3">￥29.8/年（仅限中国用户）</div>
    </div>
    <div class="nav2">
      <div class="txt">4项专属特权</div>
      <div class="heng"></div>
      <div class="items">
        <el-row>
          <el-col :span="12">
            <div class="item">
              <img src="../../assets/img/zu131.png" class="pic" alt />
              <div class="right">
                <div class="txtt1">免费商务快递</div>
                <div class="txtt2">订单满￥29可享受1年免费商务快递</div>
              </div>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="item">
              <img src="../../assets/img/zu132.png" class="pic" alt />
              <div class="right">
                <div class="txtt1">1年保修</div>
                <div class="txtt2">所有订单均提供1年保修</div>
              </div>
            </div>
          </el-col>
        </el-row>
      </div>
      <div class="items items2">
        <el-row>
          <el-col :span="12">
            <div class="item">
              <img src="../../assets/img/zu204.png" class="pic" alt />
              <div class="right">
                <div class="txtt1">四张额外优惠券</div>
                <div class="txtt2">总共获得价值￥50的优惠券</div>
              </div>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="item">
              <img src="../../assets/img/zu133.png" class="pic" alt />
              <div class="right">
                <div class="txtt1">独家最新到货</div>
                <div class="txtt2">抢先了解独家最新款式</div>
              </div>
            </div>
          </el-col>
        </el-row>
      </div>
    </div>
    <div class="nav3">
      <div class="tit1">
        <div class="t1-l">小计</div>
        <div class="t1-r">￥65.82</div>
      </div>
      <div class="tit2">国家</div>
      <el-select v-model="guojia" placeholder="请选择">
        <el-option label="美国" value="1"></el-option>
      </el-select>
      <div @click="choosePay('1')" :class="{'boxx':true,'active':payIndex == '1'}">
        <img src="../../assets/img/Paypal.png" class="pic1" alt />
      </div>
      <div @click="choosePay('2')" :class="{'boxx':true,'active':payIndex == '2'}">
        <img src="../../assets/img/sepa.png" class="pic2" alt />
      </div>
      <div @click="choosePay('3')" :class="{'boxx':true,'active':payIndex == '3'}">
        <img src="../../assets/img/tu2048.png" class="pic3" alt />
      </div>
      <div @click="choosePay('4')" :class="{'boxx':true,'active':payIndex == '4'}">
        <img src="../../assets/img/Sofort.png" class="pic4" alt />
      </div>
      <div class="box2">借记卡或信用卡</div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      guojia: "",
      payIndex: "1"
    };
  },
  created() {},
  methods: {
    choosePay(i) {
      this.payIndex = i;
    }
  }
};
</script>

<style lang="scss" scoped>
.fenye {
  margin-bottom: 20px;
}
.index {
}
.nav1 {
  margin-right: 60px;
  padding: 0 50px;
  box-sizing: border-box;
  margin-top: 20px;
  background-image: url("../../assets/img/zu130.png");
  background-size: 100% 100%;
  height: 300px;
  position: relative;
  .tit1 {
    padding-top: 52px;
    display: flex;
    align-items: center;
    .n2t1-pic1 {
      width: 59px;
      height: 54px;
    }
    .n2t1-txt1 {
      margin-left: 32px;
      font-size: 36px;
      font-family: PingFang SC, PingFang SC-Heavy;
      font-weight: 800;
      color: #d0b28b;
    }
    .n2t1-txt2 {
      margin-left: 160px;
      font-size: 24px;
      color: #d0b28b;
    }
  }
  .n2t1-txt2-a {
    position: absolute;
    top: 136px;
    left: 54px;
    font-size: 24px;
    color: #d0b28b;
  }
  .tit2 {
    cursor: pointer;
    position: absolute;
    right: 50px;
    top: 50%;
    transform: translateY(-50%);
    display: flex;
    align-items: center;
    font-size: 36px;
    font-family: PingFang SC, PingFang SC-Heavy;
    font-weight: 800;
    color: #d0b28b;
    .el-icon-caret-right {
      margin-left: 50px;
      font-size: 30px;
    }
  }
  .tit3 {
    position: absolute;
    bottom: 28px;
    left: 50px;
    font-size: 18px;
    font-weight: 800;
    color: #d0b28b;
  }
}
.nav2 {
  margin-top: 30px;
  margin-right: 60px;
  height: 347px;
  background: #ffffff;
  position: relative;
  .txt {
    position: absolute;
    left: 50%;
    transform: translate(-50%, 0);
    top: 12px;
    font-size: 40px;
    font-family: PingFang SC, PingFang SC-Heavy;
    font-weight: 800;
    text-align: center;
    color: #d0b28b;
    z-index: 10;
  }
  .heng {
    position: absolute;
    left: 50%;
    width: 307px;
    height: 25px;
    background: #feebd4;
    margin: 0 auto;
    transform: translate(-50%, 36px);
    z-index: 2;
  }
  .items {
    padding: 120px 180px 0 180px;
  }
  .items.items2 {
    padding: 30px 180px 0 180px;
  }
  .item {
    display: flex;
    align-items: center;
    // justify-content: center;
    .pic {
      width: 75px;
      height: 75px;
    }
    .right {
      margin-left: 40px;
      .txtt1 {
        font-size: 24px;
        font-family: PingFang SC, PingFang SC-Bold;
        font-weight: 700;
        color: #000000;
      }
      .txtt2 {
        margin-top: 8px;
        font-size: 20px;
        color: #969699;
      }
    }
  }
}
.nav3 {
  background: #ffffff;
  padding: 48px 200px;
  margin-right: 60px;
  margin-top: 20px;
  margin-bottom: 40px;
  .tit1 {
    display: flex;
    align-items: center;
    justify-content: space-between;
    .t1-l {
      font-size: 24px;
      color: #969699;
    }
    .t1-r {
      font-size: 32px;
      color: #e61717;
    }
  }
  .tit2 {
    margin-bottom: 20px;
    margin-top: 30px;
    font-size: 18px;
    color: #969699;
  }
  /deep/ .el-select {
    width: 100%;
  }
  .boxx.active {
    background: #ffb300;
  }
  .boxx {
    cursor: pointer;
    margin-top: 28px;
    background: #f5f5f5;
    border-radius: 3px;
    height: 66px;
    display: flex;
    align-items: center;
    justify-content: center;
    .pic1 {
      width: 129px;
      height: 31px;
    }
    .pic2 {
      width: 84px;
      height: 53px;
    }
    .pic3 {
      width: 92px;
      height: 41px;
    }
    .pic4 {
      width: 113px;
      height: 37px;
    }
  }
  .box2 {
    cursor: pointer;
    margin-top: 28px;
    background: #333334;
    border-radius: 3px;
    height: 66px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 20px;
    color: #ffffff;
  }
}
</style>