<template>
  <div class="index">
    <div class="nav1" @click="toLijifahuo">
      <img class="pic" src="../../assets/newImg/ljfh.png" alt="" />
      <div class="tit">立即发货</div>
    </div>
    <div class="nav2">
      <img class="pic" src="../../assets/newImg/asideBG.png" alt="" />
      <div class="box1">
        <img class="pic1" src="../../assets/newImg/zu280-1.png" alt="" />
        <div class="txt1">订单管理</div>
        <div class="txt2">ORDER</div>
        <div
          @click="toDingdanliebiao"
          :class="{ txt3: true, txt: true, active: asideVal == '12-2' }"
        >
          订单列表
        </div>
        <div
          @click="toBaoguoliebiao"
          :class="{ txt4: true, txt: true, active: asideVal == '12-1' }"
        >
          包裹列表
        </div>
      </div>
      <div class="box1 box2">
        <img class="pic1" src="../../assets/newImg/zu280-2.png" alt="" />
        <div class="txt1">财务中心</div>
        <div class="txt2">FINANCE</div>
        <div
          @click="toWoyaochongzhi"
          :class="{ txt3: true, txt: true, active: asideVal == '11-1' }"
        >
          我要充值
        </div>
        <div
          @click="toZijinmingxi"
          :class="{ txt4: true, txt: true, active: asideVal == '11-2' }"
        >
          资金明细
        </div>
        <div
          @click="toYaoqingjiangli"
          :class="{ txt5: true, txt: true, active: asideVal == '11-3' }"
        >
          邀请奖励
        </div>
      </div>
      <div class="box1 box3">
        <img class="pic1" src="../../assets/newImg/zu280-1.png" alt="" />
        <div class="txt1">售后服务</div>
        <div class="txt2">AFTER SALES</div>
        <div
          @click="toShowhouchajian"
          :class="{ txt3: true, txt: true, active: asideVal == '10-1' }"
        >
          售后查件
        </div>
        <div
          @click="toDidanshenqin"
          :class="{ txt3: true, txt: true, active: asideVal == '10-2' }"
          class="txt4 txt"
        >
          底单申请
        </div>
      </div>
      <div class="box1 box4">
        <img class="pic1" src="../../assets/newImg/zu280-3.png" alt="" />
        <div class="txt1">账户管理</div>
        <div class="txt2">ACCOUNT</div>
        <div
          @click="toShengjiVIP"
          :class="{ txt3: true, txt: true, active: asideVal == '6-4' }"
        >
          升级VIP
        </div>
        <div
          @click="toXiugaimima"
          :class="{ txt4: true, txt: true, active: asideVal == '6-3' }"
        >
          修改密码
        </div>
        <div
          @click="toHuiyuanziliao"
          :class="{ txt5: true, txt: true, active: asideVal == '6-1' }"
        >
          会员资料
        </div>
        <div
          @click="toTuiguanfanyong"
          :class="{ txt6: true, txt: true, active: asideVal == '6-2' }"
        >
          推广返佣
        </div>
      </div>
      <div class="box1 box5">
        <img class="pic1" src="../../assets/newImg/zu280-1.png" alt="" />
        <div class="txt1">帮助中心</div>
        <div class="txt2">HELP CENTER</div>
        <div
          @click="toApi"
          :class="{ txt3: true, txt: true, active: asideVal == '7-1' }"
        >
          分站与API
        </div>
        <div
          @click="toBzzx"
          :class="{ txt4: true, txt: true, active: asideVal == '7-2' }"
        >
          帮助中心
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  computed: {
    ...mapState(["asideVal"]),
  },
  created() {
    console.log(this.asideVal);
  },
  methods: {
    toApi() {
      this.$router.push({ name: "Fenzhanyuapi" });
    },
    toBzzx() {
      this.$router.push({ name: "Bangzhuzhongxin" });
    },
    toHuiyuanziliao() {
      this.$router.push({ name: "Huiyuanziliao" });
    },
    toTuiguanfanyong() {
      this.$router.push({ name: "Tuiguanfanyong" });
    },
    toXiugaimima() {
      this.$router.push({ name: "Xiugaimima" });
    },
    toShengjiVIP() {
      this.$router.push({ name: "ShengjiVIP" });
    },
    toShowhouchajian() {
      this.$router.push({ name: "Shouhouchajian" });
    },
    toDidanshenqin() {
      this.$router.push({ name: "Didanshenqin" });
    },
    toWoyaochongzhi() {
      this.$router.push({ name: "Woyaochongzhi" });
    },
    toZijinmingxi() {
      this.$router.push({ name: "Zijinmingxi" });
    },
    toYaoqingjiangli() {
      this.$router.push({ name: "Yaoqingjiangli" });
    },
    toBaoguoliebiao() {
      this.$router.push({ name: "Baoguoliebiao" });
    },
    toDingdanliebiao() {
      this.$router.push({ name: "Dingdanliebiao" });
    },
    toLijifahuo() {
      this.$router.push({ name: "Lijifahuo" });
    },
  },
};
</script>

<style lang="scss" scoped>
.index {
  .nav1 {
    position: relative;
    width: 224px;
    height: 58px;
    cursor: pointer;
    .pic {
      position: absolute;
      width: 224px;
      height: 58px;
      opacity: 1;
    }
    .tit {
      position: absolute;
      top: 50%;
      right: 28px;
      transform: translate(4px,-50%);
      letter-spacing: 2px;
      font-size: 22px;
      font-family: PingFang SC, PingFang SC-Bold;
      font-weight: 700;
      color: #ea8e11;
    }
  }
  .nav2 {
    position: relative;
    transform: translate(-12px, -12px);
    width: 248px;
    height: 1132px;
    opacity: 1;

    .pic {
      position: absolute;
      width: 248px;
      height: 1132px;
      opacity: 1;
    }
    .box1 {
      .txt.active {
        color: #ea8e11;
      }
      .txt:hover {
        color: #ea8e11;
      }
      position: relative;
      left: 50%;
      top: 52px;
      transform: translateX(-50%);
      width: 105px;
      height: 154px;
      opacity: 1;
      .pic1 {
        position: absolute;
        width: 105px;
        height: 154px;
        opacity: 1;
        left: 0;
        top: 0;
      }
      .txt1 {
        cursor: pointer;
        position: absolute;
        left: 0;
        top: 22px;
        width: 100%;
        font-size: 16px;
        font-family: 'zw';
        font-weight: 500;
        text-align: center;
        color: #5c5c5c;
      }
      .txt2 {
        cursor: pointer;
        position: absolute;
        left: 0;
        top: 40px;
        width: 100%;
        font-size: 12px;
        font-family: 'zw';;
        font-weight: 500;
        text-align: center;
        color: #5c5c5c;
      }
      .txt3 {
        cursor: pointer;
        position: absolute;
        left: 0;
        top: 76px;
        width: 100%;
        font-size: 14px;
        font-family: 'zw';
        font-weight: 500;
        text-align: center;
        color: #5c5c5c;
      }
      .txt4 {
        cursor: pointer;
        position: absolute;
        left: 0;
        top: 116px;
        width: 100%;
        font-size: 14px;
        font-family: 'zw';
        font-weight: 500;
        text-align: center;
        color: #5c5c5c;
      }
      .txt5 {
        cursor: pointer;
        position: absolute;
        left: 0;
        top: 140px;
        width: 100%;
        font-size: 18px;
        font-family: 'zw';
        font-weight: 500;
        text-align: center;
        color: #5c5c5c;
      }
    }
    .box2.box1 {
      .txt.active {
        color: #ea8e11;
      }
      .txt:hover {
        color: #ea8e11;
      }
      margin-top: 40px;
      .pic1 {
        width: 105px;
        height: 176px;
        opacity: 1;
      }
      .txt3 {
        cursor: pointer;
        position: absolute;
        left: 0;
        top: 68px;
        width: 100%;
        font-size: 14px;
        font-family: 'zw';
        font-weight: 500;
        text-align: center;
        color: #5c5c5c;
      }
      .txt4 {
        cursor: pointer;
        position: absolute;
        left: 0;
        top: 104px;
        width: 100%;
        font-size: 14px;
        font-family: 'zw';
        font-weight: 500;
        text-align: center;
        color: #5c5c5c;
      }
      .txt5 {
        cursor: pointer;
        position: absolute;
        left: 0;
        top: 142px;
        width: 100%;
        font-size: 14px;
        font-family: 'zw';
        font-weight: 500;
        text-align: center;
        color: #5c5c5c;
      }
    }
    .box3.box1 {
      .txt.active {
        color: #ea8e11;
      }
      margin-top: 60px;
    }
    .box4.box1 {
      .txt.active {
        color: #ea8e11;
      }
      margin-top: 40px;
      .txt:hover {
        color: #ea8e11;
      }
      position: relative;
      left: 50%;
      top: 52px;
      transform: translateX(-50%);
      width: 105px;
      height: 212px;
      opacity: 1;
      .pic1 {
        width: 105px;
        height: 212px;
        opacity: 1;
      }
      .txt3 {
        cursor: pointer;
        position: absolute;
        left: 0;
        top: 70px;
        width: 100%;
        font-size: 14px;
        font-family: 'zw';
        font-weight: 500;
        text-align: center;
        color: #5c5c5c;
      }
      .txt4 {
        cursor: pointer;
        position: absolute;
        left: 0;
        top: 102px;
        width: 100%;
        font-size: 14px;
        font-family: 'zw';
        font-weight: 500;
        text-align: center;
        color: #5c5c5c;
      }
      .txt5 {
        cursor: pointer;
        position: absolute;
        left: 0;
        top: 138px;
        width: 100%;
        font-size: 14px;
        font-family: 'zw';
        font-weight: 500;
        text-align: center;
        color: #5c5c5c;
      }
      .txt6 {
        cursor: pointer;
        position: absolute;
        left: 0;
        top: 174px;
        width: 100%;
        font-size: 14px;
        font-family: 'zw';
        font-weight: 500;
        text-align: center;
        color: #5c5c5c;
      }
    }
    .box5.box1 {
      .txt.active {
        color: #ea8e11;
      }
      margin-top: 40px;
    }
  }
}
</style>