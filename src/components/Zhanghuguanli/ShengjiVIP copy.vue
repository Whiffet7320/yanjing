<template>
  <div class="hyindex">
    <div class="aside">
      <Aside />
    </div>
    <div class="right">
      <div class="nav1">用户管理 > 升级vip</div>
      <div class="nav2">
        <div class="tit1">
          <div class="box1-1">
            <img
              style="width: 24px;height: 24px;margin-right: 12px;"
              src="../../assets/newImg/tubiao301.png"
              alt
            />
            <div class="txt1">升级VIP</div>
            <div class="txt2">【当前会员级别：{{ grade }}会员】</div>
          </div>
          <div class="box1-2">
            <img class="pic1" src="../../assets/newImg/lujin312-1.png" alt />
            <div class="txt1">点击升级直接扣费，若账户余额不足可进行扫码支付</div>
          </div>
        </div>
        <div class="flex">
          <div class="left">
            <div class="top">
              <div class="nav1-1">
                <div class="bx1"></div>
                <div class="bx2"></div>
                <div class="bx1"></div>
              </div>
              <div class="nav1-2">
                账户当前余额：
                <span class="color">{{ dataObj.balance }}</span>
              </div>
            </div>
            <div class="myRadio">
              <el-radio-group @change="changeRadVal1" v-model="radioVal1" size="small">
                <el-radio-button v-for="item in dataObj.yc" :key="item.id" :label="item.name"></el-radio-button>
              </el-radio-group>
              <el-radio-group @change="changeRadVal2" v-model="radioVal2" size="small">
                <el-radio-button v-for="item in dataObj.kd" :key="item.id" :label="item.name"></el-radio-button>
                <!-- <el-radio-button label="申通快递(拼多多面单)"></el-radio-button>
                <el-radio-button label="广州极兔仓"></el-radio-button>-->
              </el-radio-group>
            </div>
          </div>
          <div class="right">
            <div class="r-1">
              <div :class="{ btns1: true, active: nowVip == 1 }">
                <img v-if="nowVip == 1" class="pic1" src="../../assets/newImg/zu203.png" alt />
                <img v-else class="pic1" src="../../assets/newImg/zu203-2.png" alt />
                <div class="txt1">
                  普通会员
                  <span v-if="nowVip == 1" class="color">(当前)</span>
                </div>
              </div>
              <div :class="{ btns1: true, active: nowVip == 2 }">
                <img v-if="nowVip != 2" class="pic1" src="../../assets/newImg/zu193.png" alt />
                <img v-else class="pic1" src="../../assets/newImg/zu217.png" alt />
                <div class="txt1">
                  升级尊贵VIP
                  <span v-if="nowVip == 2" class="color">(当前)</span>
                </div>
                <img class="pic2" v-if="nowVip <= 1" src="../../assets/newImg/zu206.png" alt />
              </div>
              <div :class="{ btns1: true, active: nowVip == 3 }">
                <img v-if="nowVip <= 2" class="pic1" src="../../assets/newImg/zu196.png" alt />
                <img v-else class="pic1" src="../../assets/newImg/zu220.png" alt />
                <div class="txt1">
                  升级至尊VIP
                  <span v-if="nowVip == 3" class="color">(当前)</span>
                </div>
                <img class="pic2" v-if="nowVip <= 2" src="../../assets/newImg/zu206.png" alt />
              </div>
            </div>
            <div class="rTable">
              <vxe-table
                border
                :cell-class-name="cellClassName"
                :show-header="false"
                :data="tableData"
                align="center"
              >
                <vxe-table-column width="100" field="name" title="Name"></vxe-table-column>
                <vxe-table-column field="sex" title="Sex"></vxe-table-column>
                <vxe-table-column field="age" title="Age"></vxe-table-column>
                <vxe-table-column field="address" title="Address" show-overflow></vxe-table-column>
              </vxe-table>
            </div>
            <div @click="dialogVisible = true" class="r-2" v-if="nowVip != 3">
              <img class="pic1" src="../../assets/newImg/zu257.png" alt />
              <template v-if="nowVip == 1">
                <img class="pic2" src="../../assets/newImg/zu217.png" alt />
                <div class="txt">升级尊贵VIP</div>
              </template>
              <template v-else-if="nowVip == 2">
                <img class="pic2" src="../../assets/newImg/zu220.png" alt />
                <div class="txt">升级至尊VIP</div>
              </template>
            </div>
            <div class="r-3-left" v-if="nowVip != 3">
              <div class="txt1">扫一扫付款(元)</div>
              <div class="txt2" v-if="nowVip == 1">{{ zgPrice }}</div>
              <div class="txt2" v-if="nowVip == 2">{{ zzPrice }}</div>
              <img class="pic1" :src="payImg" alt />
              <div class="nav1">
                <img class="pic2" src="../../assets/newImg/lujin356.png" alt />
                <div class="nav1-1">
                  <div class="txt1">打开手机支付宝</div>
                  <div class="txt1">扫一扫继续支付</div>
                </div>
              </div>
              <div class="txt3">
                首次使用
                <span class="blue">请下载手机支付宝</span>
              </div>
            </div>
            <div class="r-3-right" v-if="nowVip != 3">
              <img class="pic1" src="../../assets/newImg/zu215.png" alt />
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 升级vip -->
    <el-dialog title="提示" :visible.sync="dialogVisible" width="30%" :before-close="handleClose">
      <div
        v-if="dataObj.up_level && nowVip == 1"
        class="txtt"
      >确定付费{{ dataObj.up_level.zg }}元升级尊贵vip吗？</div>
      <div
        v-if="dataObj.up_level && nowVip == 2"
        class="txtt"
      >确定付费{{ dataObj.up_level.zz }}元升级至尊vip吗？</div>
      <div class="btns">
        <div @click="vipSubmit" class="bt1">确定</div>
        <div @click="dialogVisible = false" class="bt2">取消</div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import Aside from "../Aside";
export default {
  components: {
    Aside
  },
  // watch: {
  //   tableData: {
  //     deep: true, //深度监听设置为 true
  //     handler: function () {
  //       this.tableData[0].sex = res.data.price.pt_kg;
  //       this.tableData[1].sex = res.data.price.pt_kg_add;
  //       this.tableData[0].age = res.data.price.zg_kg;
  //       this.tableData[1].age = res.data.price.zg_kg_add;
  //       this.tableData[0].address = res.data.price.zz_kg;
  //       this.tableData[1].address = res.data.price.zz_kg_add;
  //       this.tableData[2].sex = `${res.data.up_level.pt}元`;
  //       this.tableData[2].age = `${res.data.up_level.zg}元`;
  //       this.tableData[2].address = `${res.data.up_level.zz}元`;
  //     },
  //   },
  // },
  data() {
    return {
      dataObj: {},
      radioVal1: "华北云仓",
      radioVal2: "海带宝",
      nowVip: 1,
      tableData: [
        {
          id: 1,
          name: "0kg～1kg",
          sex: "1.70元",
          age: "1.60元",
          address: "1.50元"
        },
        {
          id: 2,
          name: "续重/1kg",
          sex: "1.00元",
          age: "1.00元",
          address: "1.00元"
        },
        {
          id: 3,
          name: "升级费用",
          sex: "0元",
          age: "20元",
          address: "50元"
        }
      ],
      dialogVisible: false,
      payImg: "",
      zgPrice: 0,
      zzPrice: 0,
      grade: ""
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
  },
  methods: {
    async getData() {
      const res = await this.$api.upLevelDefault({
        token: sessionStorage.getItem("token")
      });
      if (res.code == 200) {
        console.log(res.data);
        this.dataObj = res.data;
        if (res.data.price) {
          this.tableData[0].sex = res.data.price.pt_kg;
          this.tableData[1].sex = res.data.price.pt_kg_add;
          this.tableData[0].age = res.data.price.zg_kg;
          this.tableData[1].age = res.data.price.zg_kg_add;
          this.tableData[0].address = res.data.price.zz_kg;
          this.tableData[1].address = res.data.price.zz_kg_add;
        }
        this.tableData[2].sex = `${res.data.up_level.pt}元`;
        this.tableData[2].age = `${res.data.up_level.zg}元`;
        this.tableData[2].address = `${res.data.up_level.zz}元`;
        this.zgPrice = res.data.up_level.zg;
        this.zzPrice = res.data.up_level.zz;
        this.grade = res.data.grade;
        if (res.data.grade == "普通") {
          this.nowVip = 1;
        } else if (res.data.grade == "尊贵") {
          this.nowVip = 2;
        } else if (res.data.grade == "至尊") {
          this.nowVip = 3;
        }
        if (this.nowVip != 3) {
          const res2 = await this.$api.alipayGetPay({
            token: sessionStorage.getItem("token"),
            type: 2,
            level: this.nowVip + 1
          });
          console.log(res2);
          if (res2.code == 200) {
            this.payImg = `${res2.data.img}`;
          }
        }
      } else {
        this.$message.error(res.msg);
      }
    },
    async changeRadVal1(val) {
      var obj = {};
      obj = this.dataObj.yc.find(function(item) {
        return item.name === val;
      });
      // console.log(obj.id); //label值
      const res = await this.$api.searchData({
        token: sessionStorage.getItem("token"),
        type: 1,
        id: obj.id
      });
      console.log(res.data);
      this.$set(this.dataObj, "kd", res.data.kd);
      this.radioVal2 = res.data.kd[0].name;
      this.tableData[0].sex = res.data.price.pt_kg;
      this.tableData[1].sex = res.data.price.pt_kg_add;
      this.tableData[0].age = res.data.price.zg_kg;
      this.tableData[1].age = res.data.price.zg_kg_add;
      this.tableData[0].address = res.data.price.zz_kg;
      this.tableData[1].address = res.data.price.zz_kg_add;
    },
    async changeRadVal2(val) {
      var obj = {};
      obj = this.dataObj.kd.find(function(item) {
        return item.name === val;
      });
      // console.log(obj.id); //label值
      const res = await this.$api.searchData({
        token: sessionStorage.getItem("token"),
        type: 2,
        id: obj.id
      });
      this.tableData[0].sex = res.data.pt_kg;
      this.tableData[1].sex = res.data.pt_kg_add;
      this.tableData[0].age = res.data.zg_kg;
      this.tableData[1].age = res.data.zg_kg_add;
      this.tableData[0].address = res.data.zz_kg;
      this.tableData[1].address = res.data.zz_kg_add;
    },
    cellClassName({ column }) {
      if (column.property == "sex" && this.nowVip == 1) {
        return "col-active";
      } else if (column.property == "age" && this.nowVip == 2) {
        return "col-active";
      } else if (column.property == "address" && this.nowVip == 3) {
        return "col-active";
      }
    },
    handleClose() {
      this.dialogVisible = false;
    },
    async vipSubmit() {
      const res = await this.$api.userAddLevel({
        token: sessionStorage.getItem("token"),
        level: this.nowVip + 1
      });
      console.log(res);
      if (res.code == 200) {
        this.$message({
          message: res.msg,
          type: "success"
        });
        this.dialogVisible = false;
        this.getData();
      } else {
        this.$message.error(res.msg);
      }
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
  .myRadio {
    display: flex;
    flex-direction: column;
    align-items: center;
    transform: translateY(-14px);
  }

  .nav1 {
    margin-left: 16px;
    font-size: 14px;
    font-family: PingFang SC, PingFang SC-Medium;
    font-weight: 500;
    text-align: left;
    color: #868686;
  }
  .nav2 {
    // box-shadow: 0px 3px 10px 0px rgba(167, 167, 167, 0.2);
    margin-top: 18px;
    width: 100%;
    height: 760px;
    // background: #ffffff;
    background-image: url("../../assets/newImg/kk1.png");
    background-size: 100% 100%;
    border-radius: 10px;
    padding-top: 40px;
    .tit1 {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin: 0 14px;
      .box1-1 {
        display: flex;
        align-items: center;
        margin-left: 50px;
        .shu {
          width: 5px;
          height: 25px;
          opacity: 1;
          background: #ea8e11;
          margin-right: 16px;
        }
        .txt1 {
          font-size: 18px;
          font-family: PingFang SC, PingFang SC-Bold;
          font-weight: 700;
          color: #000000;
        }
        .txt2 {
          margin-left: 10px;
          opacity: 1;
          font-size: 14px;
          font-family: PingFang SC, PingFang SC-Bold;
          font-weight: 700;
          color: #ea8e11;
        }
      }
      .box1-2 {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 426px;
        height: 32px;
        opacity: 1;
        background: #faeaed;
        .pic1 {
          width: 16px;
          height: 15px;
          opacity: 1;
        }
        .txt1 {
          margin-left: 12px;
          opacity: 1;
          font-size: 12px;
          font-family: PingFang SC, PingFang SC-Bold;
          font-weight: 700;
          color: #e64950;
        }
      }
    }
    .flex {
      display: flex;
      flex-direction: column;
    }
    .left {
      width: 220px;
      margin-left: 20px;
      .top {
        margin-top: 20px;
        margin-left: 40px;
        margin-bottom: 37px;
        display: flex;
        align-items: center;
        .nav1-1 {
          margin-right: 20px;
          display: flex;
          align-items: center;
          .bx1 {
            width: 6px;
            height: 5px;
            opacity: 0.5;
            background: #ea8e11;
            border-radius: 50%;
          }
          .bx2 {
            width: 10px;
            height: 9px;
            opacity: 1;
            background: #ea8e11;
            border-radius: 50%;
            margin: 0 10px;
          }
        }
        .nav1-2 {
          opacity: 1;
          font-size: 13px;
          font-family: zw;
          font-weight: 400;
          text-align: center;
          color: #868686;
          .color {
            color: #ea8e11;
          }
        }
      }
    }
    .right {
      width: 800px;
      //   margin-top: 20px;
      .r-1 {
        margin-left: 100px;
        display: flex;
        align-items: center;
        margin-top: 20px;
        .btns1.active {
          box-shadow: inset 0px 0 10px 2px #ccc !important;
        }
        .btns1 {
          width: 233px;
          height: 50px;
          opacity: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #fafafa;
          .pic1 {
            width: 25px;
            height: 22px;
            opacity: 1;
          }
          .txt1 {
            margin-left: 9px;
            opacity: 1;
            font-size: 14px;
            font-family: PingFang SC, PingFang SC-Medium;
            font-weight: 500;
            color: #000000;
            .color {
              color: #ea8e11;
            }
          }
          .pic2 {
            width: 20px;
            height: 14px;
            opacity: 1;
            transform: translateY(-10px);
          }
        }
      }
      .rTable {
        margin-top: 10px;
      }
      .r-2 {
        cursor: pointer;
        margin: 24px auto;
        position: relative;
        width: 400px;
        height: 46px;
        opacity: 1;
        .pic1 {
          position: absolute;
          left: 0;
          top: 0;
          width: 400px;
          height: 46px;
          opacity: 1;
        }
        .pic2 {
          position: absolute;
          top: 13px;
          left: 140px;
          width: 19px;
          height: 15px;
        }
        .txt {
          position: absolute;
          top: 13px;
          left: 170px;
          font-size: 14px;
          font-family: PingFang SC, PingFang SC-Medium;
          font-weight: 500;
          text-align: center;
          color: #5c5c5c;
        }
      }
      .r-3-left {
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        .txt1 {
          opacity: 1;
          font-size: 16px;
          font-family: zw;
          font-weight: 400;
          text-align: center;
          color: #000000;
        }
        .txt2 {
          margin-top: 8px;
          font-size: 20px;
          font-family: PingFang SC, PingFang SC-Heavy;
          font-weight: 800;
          text-align: center;
          color: #ea8e11;
        }
        .pic1 {
          margin-top: 10px;
          width: 190px;
          height: 190px;
          opacity: 1;
        }
        .nav1 {
          display: flex;
          margin-top: 12px;
          .pic2 {
            width: 30px;
            height: 30px;
            opacity: 1;
          }
          .nav1-1 {
            margin-left: 6px;
            .txt1 {
              margin-bottom: 3px;
              opacity: 1;
              font-size: 14px;
              font-family: zw;
              font-weight: 400;
              color: #000000;
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
        transform: translate(400px, -365px);
        width: 280px;
        height: 270px;
        opacity: 1;
        .pic1 {
          width: 276px;
          height: 270px;
          opacity: 1;
        }
      }
    }
  }
}
/deep/ .vxe-body--column.col-active {
  color: #ea8e11;
}
/deep/ .vxe-body--column {
  color: #707071;
  padding: 10px 0;
}
/deep/ .el-radio-group {
  display: flex;
  flex-direction: column;
  align-items: center;
}
/deep/ .el-radio-button {
  margin-right: 10px !important;
  width: 160px;
  margin-top: 10px;
}
/deep/ .el-radio-button.is-active {
  .el-radio-button__inner {
    background-color: #ffffff;
    border-color: #ffffff;
    box-shadow: inset 0px 0 5px 0 #ccc !important;
    color: #ea8e11;
  }
}

/deep/ .el-radio-button__inner {
  display: inline-block;
  width: 100%;
  border: 1px solid #dddddd;
  border-radius: 0px !important;
}
.txtt {
  text-align: center;
}
.btns {
  margin-top: 14px;
  display: flex;
  align-items: center;
  justify-content: space-around;
  .bt1 {
    cursor: pointer;
    width: 150px;
    height: 30px;
    background: #eeeeee;
    text-align: center;
    color: #5c5c5c;
    opacity: 1;
    line-height: 30px;
    box-shadow: inset 0px 0 5px 0 #ccc !important;
  }
  .bt2 {
    cursor: pointer;
    width: 150px;
    height: 30px;
    opacity: 1;
    text-align: center;
    color: #5c5c5c;
    line-height: 30px;
    box-shadow: inset 0px 0 5px 0 #ccc !important;
  }
}
</style>