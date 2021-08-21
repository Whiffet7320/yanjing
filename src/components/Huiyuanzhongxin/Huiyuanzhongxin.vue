<template>
  <div class="hyindex">
    <div class="aside">
      <Aside />
    </div>
    <div class="right">
      <div class="nav1">
        <div class="left-nav">
          <div class="tit1">
            <!-- <img class="pic1" src="../../assets/newImg/zu184.png" alt="" /> -->
            <img class="pic1" src="../../assets/newImg/tubiao301.png" alt />
            <div class="txt1">我的账户</div>
            <!-- <div class="heng"></div> -->
          </div>
          <div class="tit2">
            <div class="txt1">
              <img class="pic1-1" src="../../assets/newImg/zu95.png" alt />
              <div class="txt1-1">等级</div>
              <div class="txt1-2">{{ dataObj.user_data.grade }}会员</div>
              <div @click="$router.push({name:'ShengjiVIP'})" class="sjbtn">升级VIP</div>
            </div>
            <div class="txt1">
              <img class="pic1-2" src="../../assets/newImg/zu97.png" alt />
              <div class="txt1-1 txt2-1">手机号</div>
              <div class="txt1-2 txt2-2">{{ dataObj.user_data.username }}</div>
            </div>
            <div class="txt1">
              <img class="pic1-3" src="../../assets/newImg/lujin202.png" alt />
              <div class="txt1-1">邮箱</div>
              <div class="txt1-2">{{ dataObj.user_data.mail }}</div>
            </div>
            <div class="txt1">
              <img class="pic1-4" src="../../assets/newImg/zu99.png" alt />
              <div class="txt1-1">注册</div>
              <div class="txt1-2">{{ dataObj.user_data.ctime }}</div>
            </div>
            <div class="txt1">
              <img class="pic1-5" src="../../assets/newImg/zu101.png" alt />
              <div class="txt1-1">余额</div>
              <div class="txt1-2">{{ dataObj.user_data.balance }}元</div>
              <div @click="$router.push({name:'Woyaochongzhi'})" class="sjbtn bt1">立即充值</div>
              <div v-if="dataObj.user_data.yue_tixian != 0" @click="toYueTixian" :class="{'sjbtn':true, 'bt2':true}">余额提现</div>
              <div v-if="dataObj.user_data.yongjin_tixian != 0 && dataObj.user_data.yue_tixian != 0" @click="toYongjinTixian" :class="{'sjbtn':true, 'bt3':true}">佣金提现</div>
              <div v-if="dataObj.user_data.yongjin_tixian != 0 && dataObj.user_data.yue_tixian == 0" @click="toYongjinTixian" :class="{'sjbtn':true, 'bt2':true}">佣金提现</div>
            </div>
          </div>
        </div>
        <div class="left-nav">
          <div class="tit1">
            <!-- <img class="pic1" src="../../assets/newImg/zu182.png" alt="" /> -->
            <img class="pic1" src="../../assets/newImg/tubiao301.png" alt />
            <div class="txt1">联系客服</div>
            <!-- <div class="heng"></div> -->
          </div>
          <div class="tit2">
            <div class="txt1">
              <img class="pic2-1" src="../../assets/newImg/lujin215.png" alt />
              <div class="txt1-1">QQ</div>
              <div class="txt1-2">{{ dataObj.kf.qq }}</div>
            </div>
            <div class="txt1 txt2">
              <img class="pic2-2" src="../../assets/newImg/zu103.png" alt />
              <div class="txt1-1">微信</div>
              <div class="piccc">
                <img class="picc" :src="dataObj.kf.wx" alt />
                <div class="txt">扫码添加微信</div>
              </div>
            </div>
            <div class="txt1">
              <img class="pic1-2" src="../../assets/newImg/zu97.png" alt />
              <div class="txt1-1">电话</div>
              <div class="txt1-2">{{ dataObj.kf.mobile }}</div>
            </div>
          </div>
        </div>
      </div>
      <div class="nav2">
        <div @click="myTo(1)" :class="{ box1: true, active: toIndex == 1 }">
          <img class="pic1-1" src="../../assets/newImg/tubiao201.png" alt />
          <div class="txt1">立即发货</div>
        </div>
        <img class="imgg" src="../../assets/newImg/shuxian1.png" alt />
        <div @click="myTo(2)" :class="{ box1: true, active: toIndex == 2 }">
          <img class="pic1-2" src="../../assets/newImg/tubiao202.png" alt />
          <div class="txt1">订单管理</div>
        </div>
        <img class="imgg" src="../../assets/newImg/shuxian1.png" alt />
        <div @click="myTo(3)" :class="{ box1: true, active: toIndex == 3 }">
          <img class="pic1-3" src="../../assets/newImg/tubiao203.png" alt />
          <div class="txt1">售后管理</div>
        </div>
        <img class="imgg" src="../../assets/newImg/shuxian1.png" alt />
        <div @click="myTo(4)" :class="{ box1: true, active: toIndex == 4 }">
          <img class="pic1-4" src="../../assets/newImg/tubiao204.png" alt />
          <div class="txt1">底单申请</div>
        </div>
      </div>
      <div class="nav3">
        <div class="tit1">
          <img class="pic1" src="../../assets/newImg/fuben.png" alt />
          <div class="txt1">订单管理</div>
        </div>
        <div class="tit2">
          <div class="box1">
            <img class="pic1-1" src="../../assets/newImg/tubiao100.png" alt />
            <div class="txt1">待付款</div>
            <div class="txt2">0</div>
          </div>
          <img class="imgg" src="../../assets/newImg/shuxian1.png" alt />
          <div class="box1">
            <img class="pic1-2" src="../../assets/newImg/tubiao101.png" alt />
            <div class="txt1">任务处理中</div>
            <div class="txt2" style="color: #5c5c5c">0</div>
          </div>
          <img class="imgg" src="../../assets/newImg/shuxian1.png" alt />
          <div class="box1">
            <img class="pic1-3" src="../../assets/newImg/tubiao103.png" alt />
            <div class="txt1">未发货</div>
            <div class="txt2">{{ dataObj.order_no }}</div>
          </div>
          <img class="imgg" src="../../assets/newImg/shuxian1.png" alt />
          <div class="box1">
            <img class="pic1-4" src="../../assets/newImg/tubiao104.png" alt />
            <div class="txt1">已发货</div>
            <div class="txt2" style="color: #5c5c5c">{{ dataObj.order_yes }}</div>
          </div>
          <img class="imgg" src="../../assets/newImg/shuxian1.png" alt />
          <div class="box1">
            <img class="pic1-5" src="../../assets/newImg/tubiao105.png" alt />
            <div class="txt1">发货完成</div>
            <div class="txt2" style="color: #5c5c5c">0</div>
          </div>
        </div>
      </div>
      <div class="nav4">
        <div class="left-nav4">
          <div class="tit1">
            <img class="pic1" src="../../assets/newImg/tubiao301.png" alt />
            <div class="txt1">最新公告</div>
          </div>
          <div
            @click="togonggao('3')"
            v-for="item in dataObj.gonggao"
            :key="item.id"
            class="tit2"
          >通知：{{ item.title }}</div>
        </div>
        <img class="imgg" src="../../assets/newImg/shuxian1.png" alt />
        <div class="left-nav4">
          <div class="tit1">
            <img class="pic1" src="../../assets/newImg/tubiao301.png" alt />
            <div class="txt1">常见问题</div>
          </div>
          <div
            @click="togonggao('6')"
            v-for="item in dataObj.wenti"
            :key="item.id"
            class="tit2"
          >通知：{{ item.title }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Aside from "../Aside";
export default {
  components: {
    Aside
  },
  data() {
    return {
      dataObj: {},
      toIndex: ""
    };
  },
  created() {
    this.getData();
    sessionStorage.setItem("isPay",'false');
  },
  methods: {
    async getData() {
      const res = await this.$api.userInfo({
        token: sessionStorage.getItem("token")
      });
      console.log(res);
      if (res.code == 200) {
        this.dataObj = res.data;
      } else {
        this.$message.error(res.msg);
        setTimeout(() => {
          sessionStorage.setItem("isLogin", "123");
          this.$router.go(0);
        }, 3000);
      }
    },
    toYueTixian(){
      this.$store.commit('isYongjinTixian',null);
      this.$store.commit('commission',null);
      this.$store.commit('isYueTixian',true)
      this.$router.push({name:'Woyaochongzhi'})
    },
    toYongjinTixian(){
      this.$store.commit('isYueTixian',null)
      this.$store.commit('isYongjinTixian',true);
      this.$store.commit('commission',this.dataObj.user_data.commission);
      this.$router.push({name:'Woyaochongzhi'})
    },
    myTo(index) {
      this.toIndex = index;
      if (index == 1) {
        setTimeout(() => {
          this.$router.push({ name: "Lijifahuo" });
        }, 500);
      } else if (index == 2) {
        setTimeout(() => {
          this.$router.push({ name: "Dingdanliebiao" });
        }, 500);
      } else if (index == 4) {
        setTimeout(() => {
          this.$router.push({ name: "Didanshenqin" });
        }, 500);
      }
    },
    togonggao(val) {
      this.$store.commit("myactiveName", val);
      this.$router.push({ name: "Bangzhuzhongxin" });
    }
  }
};
</script>

<style lang="scss" scoped>
.hyindex {
  display: flex;
}
.right {
  width: 100%;
  .nav1 {
    position: relative;
    background-image: url("../../assets/newImg/zu292.png");
    background-size: 100% 100%;
    display: flex;
    width: 100%;
    height: 330px;
    // background: transparent;
    border-radius: 10px;
    padding-top: 20px;
    // box-shadow: 0px 3px 10px 0px rgba(167, 167, 167, 0.2);
    .left-nav {
      width: 56%;
      .tit1 {
        margin-top: 10px;
        margin-left: 50px;
        display: flex;
        align-items: center;
        .pic1 {
          width: 24px;
          height: 24px;
          opacity: 1;
        }
        .txt1 {
          margin-left: 16px;
          opacity: 1;
          font-size: 14px;
          font-family: PingFang SC, PingFang SC-Bold;
          font-weight: 700;
          color: #5c5c5c;
        }
        .heng {
          transform: translate(-80px, 6px);
          width: 74px;
          height: 0px;
          opacity: 0.2;
          border: 3px solid #007cf3;
        }
      }
      .tit2 {
        margin-top: 30px;
        margin-left: 90px;
        .txt1.txt2 {
          display: flex;
          align-items: flex-start;
          .piccc {
            transform: translateY(-5px);
            display: flex;
            flex-direction: column;
            align-items: center;
            .txt {
              opacity: 1;
              font-size: 14px;
              font-family: SimSun;
              font-weight: 400;
              color: #868686;
              letter-spacing: 0px;
            }
          }
        }
        .txt1 {
          display: flex;
          align-items: center;
          margin-bottom: 30px;
          .pic1-1 {
            width: 20px;
            height: 18px;
            opacity: 1;
          }
          .pic1-2 {
            margin-left: 2px;
            width: 16px;
            height: 20px;
            opacity: 1;
          }
          .sjbtn {
            cursor: pointer;
            background-image: url("../../assets/newImg/sjvip.png");
            background-size: 100% 100%;
            width: 121px;
            height: 42px;
            position: absolute;
            left: 266px;
            font-size: 14px;
            font-family: SimSun;
            font-weight: 400;
            text-align: center;
            line-height: 38px;
            color: #ea8e11;
          }
          .sjbtn.bt2{
            left: 386px;
          }
          .sjbtn.bt3{
            left: 506px;
          }
          .sjbtn.bt1 {
            // margin-left: 10px;
          }
          .pic1-3 {
            width: 19px;
            height: 14px;
            opacity: 1;
          }
          .pic1-4 {
            width: 19px;
            height: 19px;
            opacity: 1;
          }
          .pic1-5 {
            width: 18px;
            height: 18px;
            opacity: 1;
          }
          .pic2-1 {
            width: 15px;
            height: 19px;
            opacity: 1;
          }
          .pic2-2 {
            width: 17px;
            height: 15px;
            opacity: 1;
          }
          .picc {
            width: 100px;
            height: 100px;
            opacity: 1;
          }
          .txt1-1 {
            margin-left: 14px;
            opacity: 1;
            font-size: 14px;
            font-family: SimSun;
            font-weight: 400;
            color: #5c5c5c;
            letter-spacing: 14px;
          }
          .txt1-1.txt2-1 {
            letter-spacing: 0px;
          }
          .txt1-2 {
            margin-left: 20px;
            font-size: 14px;
            font-family: SimSun;
            font-weight: 400;
            color: #868686;
            letter-spacing: 0px;
          }
          .txt1-2.txt2-2 {
            margin-left: 34px;
          }
        }
      }
    }
  }
  .nav2 {
    position: relative;
    background-image: url("../../assets/newImg/zu293.png");
    background-size: 100% 100%;
    // box-shadow: 0px 3px 10px 0px rgba(167, 167, 167, 0.2);
    // margin-top: 20px;
    padding: 0 60px;
    border-radius: 40px;
    height: 100px;
    display: flex;
    align-items: center;
    justify-content: space-around;
    .box1.active {
      box-shadow: inset 0px 0 6px 5px #e2e1e7 !important;
    }
    .box1:hover {
      box-shadow: inset 0px 0 6px 5px #e2e1e7 !important;
    }
    .box1 {
      transform: translateY(-6px);
      cursor: pointer;
      border-radius: 0px;
      padding: 10px 20px;
      display: flex;
      align-items: center;
      .pic1-1 {
        width: 60px;
        height: 32px;
        opacity: 1;
      }
      .pic1-2 {
        width: 36px;
        height: 33px;
        opacity: 1;
      }
      .pic1-3 {
        width: 48px;
        height: 30px;
        opacity: 1;
      }
      .pic1-4 {
        width: 31px;
        height: 31px;
        opacity: 1;
      }
      .txt1 {
        margin-left: 14px;
        opacity: 1;
        font-size: 16px;
        font-family: PingFang SC, PingFang SC-Medium;
        font-weight: 600;
        text-align: left;
        color: #ea8e11;
      }
    }
    .imgg {
      transform: translateY(-6px);
      width: 10px;
      height: 36px;
      opacity: 1;
    }
  }
  .nav3 {
    // box-shadow: 0px 3px 10px 0px rgba(167, 167, 167, 0.2);
    // margin-top: 20px;
    // background: #ffffff;
    position: relative;
    background-image: url("../../assets/newImg/zu292.png");
    background-size: 100% 100%;
    border-radius: 10px;
    height: 220px;
    .tit1 {
      margin-left: 50px;
      padding-top: 30px;
      display: flex;
      align-items: center;
      .pic1 {
        width: 28px;
        height: 26px;
        opacity: 1;
      }
      .txt1 {
        margin-left: 10px;
        opacity: 1;
        font-size: 14px;
        font-family: PingFang SC, PingFang SC-Medium;
        font-weight: 700;
        color: #5c5c5c;
      }
    }
    .tit2 {
      padding: 0 60px;
      display: flex;
      justify-content: space-around;
      .box1 {
        margin-top: 30px;
        display: flex;
        flex-direction: column;
        align-items: center;
        .pic1-1 {
          width: 39px;
          height: 43px;
          opacity: 1;
        }
        .pic1-2 {
          width: 46px;
          height: 44px;
          opacity: 1;
        }
        .pic1-3 {
          width: 68px;
          height: 44px;
          opacity: 1;
        }
        .pic1-4 {
          width: 103px;
          height: 44px;
          opacity: 1;
        }
        .pic1-5 {
          width: 51px;
          height: 44px;
          opacity: 1;
        }
        .txt1 {
          font-size: 14px;
          font-family: "zw";
          font-weight: 400;
          color: #5c5c5c;
          margin: 10px 0;
        }
        .txt2 {
          font-weight: 600;
          color: #ea8e11;
        }
      }
      .imgg {
        width: 14px;
        height: 112px;
        opacity: 1;
      }
    }
  }
  .nav4 {
    position: relative;
    background-image: url("../../assets/newImg/zu292.png");
    background-size: 100% 100%;
    // box-shadow: 0px 3px 10px 0px rgba(167, 167, 167, 0.2);
    display: flex;
    // align-items: center;
    margin-top: 20px;
    // background: #ffffff;
    border-radius: 10px;
    padding-bottom: 40px;
    .imgg {
      margin-left: 26px;
      transform: translateY(30px);
      width: 10px;
      height: 153px;
      opacity: 1;
    }
    .left-nav4 {
      width: 46%;
      .tit1 {
        margin-bottom: 30px;
        margin-left: 50px;
        padding-top: 40px;
        display: flex;
        align-items: center;
        .pic1 {
          width: 24px;
          height: 24px;
          opacity: 1;
        }
        .txt1 {
          margin-left: 10px;
          opacity: 1;
          font-size: 14px;
          font-family: PingFang SC, PingFang SC-Medium;
          font-weight: 700;
          color: #5c5c5c;
        }
      }
      .tit2 {
        cursor: pointer;
        margin-bottom: 15px;
        margin-left: 60px;
        font-size: 14px;
        font-family: "zw";
        font-weight: 400;
        color: #5c5c5c;
      }
    }
  }
}
</style>