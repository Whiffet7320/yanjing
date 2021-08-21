<template>
  <div class="fzindex">
    <div class="aside">
      <Aside />
    </div>
    <div class="right">
      <div class="nav1">当前位置：财务中心 > {{txt}}</div>
      <div class="nav2">
        <div class="txt1">
          <img style="width: 24px;height: 24px;" src="../../assets/newImg/tubiao301.png" alt />
          <div class="txt1-1">{{txt}}</div>
          <div class="txt1-2">
            账户余额：
            <span class="color">¥{{ dataObj.user_data.balance }}</span>
          </div>
        </div>
        <div class="txt2">
          <img class="pic1" src="../../assets/newImg/zu227.png" alt />
          <img class="pic2" src="../../assets/newImg/zu228.png" alt />
        </div>
        <template v-if="isYueTixian || isYongjinTixian">
          <div class="txt3">提现金额</div>
          <div class="txt3-1">最低提现金额{{dataObj.user_data.tocash_money_low}}</div>
          <div class="txt3-1">提现手续费率{{dataObj.user_data.tocash_money_rate}}%</div>
        </template>
        <div v-else class="txt3">充值金额</div>
        <div class="txt4">
          <div class="txt4-1">¥</div>
          <el-row>
            <el-col :span="24">
              <el-input v-model="val1" placeholder="请输入数值"></el-input>
            </el-col>
          </el-row>
        </div>
        <div v-if="isYueTixian" @click="yueTixian" class="txt5">确认提现</div>
        <div v-else-if="isYongjinTixian" @click="yongjinTixian" class="txt5">确认提现</div>
        <div v-else @click="chongzhi" class="txt5">确定充值</div>
      </div>
    </div>
    <el-dialog title="提示" :visible.sync="dialogVisible" width="30%" :before-close="handleClose">
      <div class="payImg">
        <div class="txt">充值完成后，请重新刷新页面！</div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapState } from "vuex";
import Aside from "../Aside";
export default {
  computed: {
    ...mapState(["isYueTixian", "isYongjinTixian", "commission"])
  },
  components: {
    Aside
  },
  data() {
    return {
      val1: "",
      dataObj: {},
      dialogVisible: false,
      payImg: "",
      txt: "我要充值"
    };
  },
  created() {
    if (sessionStorage.getItem("token") == "null") {
      setTimeout(() => {
        sessionStorage.setItem("isLogin", "123");
        this.$router.go(0);
      }, 3000);
    }
    this.getData();
    if (this.isYueTixian) {
      this.txt = "余额提现";
    }
    if (this.isYongjinTixian) {
      this.txt = "佣金提现";
    }
  },
  methods: {
    async getData() {
      const res = await this.$api.userInfo({
        token: sessionStorage.getItem("token")
      });
      console.log(res);
      if(res.code == 200){
        this.dataObj = res.data;
      }else{
        this.$message.error(res.msg);
      }
      
    },
    async yueTixian() {
      const res = await this.$api.userReCharge({
        token: sessionStorage.getItem("token"),
        money: this.val1
      });
      console.log(res);
      if (this.val1 == "") {
        this.$message.error("请输入提现金额");
      } else {
        if (res.code == 200) {
          this.$message({
            message: res.msg,
            type: "success"
          });
        } else {
          this.$message.error(res.msg);
        }
      }
    },
    async yongjinTixian() {
      const res = await this.$api.userCommission({
        token: sessionStorage.getItem("token"),
        money: this.val1
      });
      console.log(res);
      if (this.val1 == "") {
        this.$message.error("请输入提现金额");
      } else {
        if (res.code == 200) {
          this.$message({
            message: res.msg,
            type: "success"
          });
        } else {
          this.$message.error(res.msg);
        }
      }
    },
    async chongzhi() {
      let routeData = this.$router.resolve({
        name: "AliPay",
        query: {
          val1: this.val1
        }
      });
      if (this.val1 == "") {
        this.$message.error("请输入充值金额");
      } else {
        window.open(routeData.href, "_blank");
        this.dialogVisible = true;
      }
    },
    handleClose() {
      this.dialogVisible = false;
    }
  }
};
</script>

<style lang="scss" scoped>
.payImg {
  height: 130px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  img {
    width: 100px;
    height: 100px;
  }
  .txt {
    margin-top: 16px;
    font-size: 12px;
  }
}
.fzindex {
  display: flex;
  .right {
    width: 100%;
    .nav1 {
      margin-left: 16px;
      font-size: 14px;
      font-family: PingFang SC, PingFang SC-Medium;
      font-weight: 500;
      text-align: left;
      color: #868686;
    }
    .nav2 {
      margin-top: 16px;
      padding: 10px;
      width: 100%;
      padding-bottom: 30px;
      opacity: 1;
      background-image: url("../../assets/newImg/kk5.png");
      background-size: 100% 100%;
      border-radius: 10px;

      .txt1 {
        height: 77px;
        margin: 0 50px;
        display: flex;
        align-items: center;
        border-bottom: 1px solid #f4f4f4;
        .shu {
          width: 5px;
          height: 25px;
          opacity: 1;
          background: #ea8e11;
        }
        .txt1-1 {
          margin-left: 15px;
          opacity: 1;
          font-size: 18px;
          font-family: PingFang SC, PingFang SC-Bold;
          font-weight: 700;
          color: #000000;
        }
        .txt1-2 {
          margin-left: 25px;
          opacity: 1;
          font-size: 18px;
          font-family: PingFang SC, PingFang SC-Bold;
          font-weight: 700;
          color: #707071;
          .color {
            color: #ea8e11;
          }
        }
      }
      .txt2 {
        margin-top: 25px;
        margin-left: 70px;
        width: 251px;
        height: 70px;
        opacity: 1;
        box-shadow: inset 0px 0 16px 2px #dddddd !important;
        position: relative;
        .pic1 {
          width: 112px;
          height: 39px;
          opacity: 1;
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
        }
        .pic2 {
          position: absolute;
          bottom: 0;
          right: 0;
          width: 52px;
          height: 52px;
          opacity: 1;
        }
      }
      .txt3 {
        margin-top: 60px;
        margin-left: 70px;
        opacity: 1;
        font-size: 20px;
        font-family: PingFang SC, PingFang SC-Bold;
        font-weight: 700;
        color: #000000;
      }
      .txt3-1 {
        font-weight: 600;
        line-height: 24px;
        margin-left: 68px;
        transform: translateY(20px);
        color: #ea8e11;
      }
      .txt4 {
        display: flex;
        align-items: center;
        margin-top: 60px;
        margin-left: 70px;
        .txt4-1 {
          margin-right: 10px;
          font-size: 26px;
          font-weight: 700;
        }
      }
      .txt5 {
        cursor: pointer;
        margin-top: 49px;
        margin-left: 70px;
        margin-bottom: 20px;
        width: 232px;
        height: 49px;
        opacity: 1;
        box-shadow: inset 0px 0 16px 2px #dddddd !important;
        opacity: 1;
        font-size: 16px;
        font-family: zw;
        font-weight: 400;
        line-height: 49px;
        text-align: center;
        color: #5c5c5c;
      }
    }
  }
}
</style>