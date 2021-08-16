<template>
  <div class="fzindex">
    <div class="aside">
      <Aside />
    </div>
    <div class="right">
      <div class="nav1">当前位置：财务中心 > 资金明细</div>
      <div class="txt1">
        <div class="txt1-1">
          <img style="width: 24px;height: 24px;" src="../../assets/newImg/tubiao301.png" alt="" />
          <div class="txt1-1-1">资金明细</div>
        </div>
        <div class="txt1-2">
          <div @click="editTime(1)" :class="{ txt: true, active: time == 1 }">
            今天
          </div>
          <div @click="editTime(2)" :class="{ txt: true, active: time == 2 }">
            一周
          </div>
          <div @click="editTime(3)" :class="{ txt: true, active: time == 3 }">
            一个月
          </div>
          <div @click="editTime(4)" :class="{ txt: true, active: time == 4 }">
            三个月
          </div>
        </div>
      </div>
      <div class="txt2">
        <div class="myForm">
          <el-form :inline="true" :model="formInline" class="demo-form-inline">
            <el-form-item label="起始时间">
              <el-date-picker
                v-model="formInline.time"
                value-format="yyyy-MM-dd HH:mm:ss"
                type="daterange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
              >
              </el-date-picker>
            </el-form-item>
            <el-form-item label="类型">
              <el-select v-model="formInline.region" placeholder="请选择">
                <el-option label="全部" value="quanbu"></el-option>
              </el-select>
            </el-form-item>
            <el-button type="info" plain icon="el-icon-search" @click="onSubmit"
              >搜索</el-button
            >
          </el-form>
        </div>
      </div>
      <div class="txt3">
        <div class="myRadio">
          <el-radio-group @change="changeVal1" v-model="formInline.radioVal1" size="small">
            <el-radio-button label="全部订单"></el-radio-button>
            <el-radio-button label="充值"></el-radio-button>
            <el-radio-button label="下单支出"></el-radio-button>
            <el-radio-button label="推广获利"></el-radio-button>
            <el-radio-button label="订单包裹退款"></el-radio-button>
            <el-radio-button label="提现支出"></el-radio-button>
            <el-radio-button label="提现失败"></el-radio-button>
            <el-radio-button label="其他"></el-radio-button>
          </el-radio-group>
        </div>
      </div>
      <div class="txt4">
        <div class="myTable">
          <vxe-table
            :cell-class-name="cellClassName"
            align="center"
            :data="tableData"
          >
          <vxe-table-column field="id" title="ID"></vxe-table-column>
            <vxe-table-column field="ctime" title="创建时间"></vxe-table-column>
            <vxe-table-column field="memo" title="描述"></vxe-table-column>
            <vxe-table-column field="myMoney" title="资金变动"></vxe-table-column>
            <vxe-table-column field="address" title="备注"></vxe-table-column>
            <template #empty>
              <div class="tabEmpty">
                <img class="pic" src="../../assets/newImg/zu261.png" />
                <p class="txt">没有相关内容</p>
              </div>
            </template>
          </vxe-table>
          <el-pagination
            class="fenye"
            @current-change="this.handleCurrentChange"
            :current-page="this.zijinmingxiPage"
            :page-size="10"
            layout="total, prev, pager, next, jumper"
            :total="this.total"
          >
          </el-pagination>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Aside from "../Aside";
import { mapState } from "vuex";
export default {
  components: {
    Aside,
  },
  computed: {
    ...mapState(["zijinmingxiPage"]),
  },
  watch: {
    zijinmingxiPage: function (page) {
      this.$store.commit("zijinmingxiPage", page);
      //   this.getData();
    },
  },
  data() {
    return {
      time: '',
      formInline: {
        time: [],
        region: "全部",
        radioVal1: "全部订单",
      },
      tableData: [
        {
          id: 10004,
          name: "Test4",
          role: "Designer",
          myMoney: "+50.00",
          age: 24,
          address: "Shanghai",
        },
        {
          id: 10004,
          name: "Test4",
          role: "Designer",
          myMoney: "-60.00",
          age: 24,
          address: "Shanghai",
        },
      ],
      total: 0,
      time_type:'',
      type:'',
    };
  },
  created() {
    this.getData();
  },
  methods: {
    async getData() {
      if(!this.formInline.time){
        this.formInline.time = '';
      }
      if (this.formInline.radioVal1 == "全部订单") {
        this.type = "";
      } else if (this.formInline.radioVal1 == "充值") {
        this.type = 1;
      } else if (this.formInline.radioVal1 == "下单支出") {
        this.type = 2;
      } else if (this.formInline.radioVal1 == "推广获利") {
        this.type = 3;
      } else if (this.formInline.radioVal1 == "订单包裹退款") {
        this.type = 4;
      } else if (this.formInline.radioVal1 == "提现支出") {
        this.type = 5;
      } else if (this.formInline.radioVal1 == "提现失败") {
        this.type = 6;
      } else if (this.formInline.radioVal1 == "其他") {
        this.type = 7;
      }
      if (this.time == 1) {
        this.time_type = "day";
      } else if (this.time == 2) {
        this.time_type = "week";
      } else if (this.time == 3) {
        this.time_type = "month";
      } else if (this.time == 4) {
        this.time_type = "threeMonth";
      }
      this.time_type = !this.formInline.time[0] ? this.time_type : '';
      this.time = !this.formInline.time[0] ? this.time : '';
      const res = await this.$api.userMoneyList({
        token: sessionStorage.getItem("token"),
        limit: 13,
        page: this.zijinmingxiPage,
        start_time: this.formInline.time[0],
        end_time: this.formInline.time[1],
        type: this.type,
        time_type: this.time_type,
      });
      console.log(res);
      this.total = res.data.total;
      this.tableData = res.data.data;
      this.tableData.forEach(ele=>{
        ele.myMoney = `${ele.manner}${ele.money}`
      })
    },
    changeVal1(){
      this.getData()
    },
    onSubmit() {
      console.log(this.formInline);
      this.getData();
    },
    editTime(val) {
      this.time = val;
    },
    cellClassName({ column, row }) {
      if (column.property == "myMoney" && Number(row.myMoney) > 0) {
        return "col-active1";
      } else if (column.property == "myMoney" && Number(row.myMoney) < 0) {
        return "col-active";
      }
    },
    // 分页
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.$store.commit("zijinmingxiPage", val);
    },
  },
};
</script>

<style lang="scss" scoped>
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

    .txt1 {
      height: 48px;
      margin: 10px 50px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      .txt1-1 {
        display: flex;
        align-items: center;
        .shu {
          width: 5px;
          height: 25px;
          opacity: 1;
          background: #ea8e11;
        }
        .txt1-1-1 {
          margin-left: 15px;
          opacity: 1;
          font-size: 18px;
          font-family: PingFang SC, PingFang SC-Bold;
          font-weight: 700;
          color: #000000;
        }
      }
      .txt1-2 {
        display: flex;
        align-items: center;
        .txt {
          cursor: pointer;
          margin-left: 20px;
          font-size: 14px;
          font-family: PingFang SC, PingFang SC-Medium;
          font-weight: 700;
          color: #868686;
        }
        .txt.active {
          color: #ea8e11;
        }
      }
    }
    .txt2 {
      // transform: translateY(-10px);
      margin-top: -10px;
      // height: 80px;
      // background: #ffffff;
      background-image: url("../../assets/newImg/kk6.png");
    background-size: 100% 100%;
      border-radius: 10px;
      display: flex;
      justify-content: center;
      align-items: center;
      .myForm {
        padding: 28px;
        display: flex;
        justify-content: center;
        align-items: center;
        /deep/ .el-form-item {
          margin-bottom: 0px;
          margin-right: 30px;
        }
      }
    }
    .txt3{
      margin: 0 16px 16px 16px;
    }
    .txt4 {
      margin: 16px;
      background: #ffffff;
      padding: 10px;
      border-radius: 10px;
      .fenye {
        margin-top: 10px;
      }
      /deep/ .el-pager {
        .active {
          color: #ea8e11;
        }
        .number:hover {
          color: #ea8e11;
        }
      }
    }
  }
}
.tabEmpty {
  margin-top: 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 140px;
  .pic {
    width: 108px;
    height: 80px;
    margin-bottom: 10px;
  }
  .txt {
    font-size: 14px;
    font-family: zw;;
    font-weight: 400;
    text-align: center;
    color: #5c5c5c;
  }
}
/deep/ .el-radio-group {
  display: flex;
  align-items: center;
}
/deep/ .el-radio-button {
  margin-right: 10px !important;
  width: 104px;
  margin-top: 10px;
}
/deep/ .el-radio-button.is-active {
  .el-radio-button__inner {
    background-color: #ffffff;
    border-color: #ffffff;
    box-shadow: inset 0px 0 5px 0 #ccc !important;
    // color: #ea8e11;
    color: #000000;
  }
}
/deep/ .el-radio-button:first-child .el-radio-button__inner {
  border-left: 0px;
}
/deep/ .el-radio-button__inner {
  display: inline-block;
  width: 100%;
  border: 0px;
  border-radius: 0px !important;
  background: #eceef5;
}
/deep/ .vxe-body--column.col-active {
  font-size: 13px;
  color: #ea8e11;
  font-weight: 700;
  font-family: PingFang SC, PingFang SC-Bold;
}
/deep/ .vxe-body--column.col-active1 {
  font-size: 13px;
  color: #007cf3;
  font-weight: 700;
  font-family: PingFang SC, PingFang SC-Bold;
}
</style>