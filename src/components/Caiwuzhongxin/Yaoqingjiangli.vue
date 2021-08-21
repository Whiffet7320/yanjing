<template>
  <div class="fzindex">
    <div class="aside">
      <Aside />
    </div>
    <div class="right">
      <div class="nav1">当前位置：财务中心 > 邀请奖励</div>
      <div class="nav2">
        <div class="box1">
          <div class="txt1">总邀请奖励</div>
          <div class="txt2">{{count_sum}}</div>
          <img class="pic1" src="../../assets/newImg/zu232.png" alt />
        </div>
        <div class="box1">
          <div class="txt1">上个月邀请奖励</div>
          <div class="txt2 yellow">{{count_upmonth}}</div>
          <img class="pic1" src="../../assets/newImg/zu233-1.png" alt />
        </div>
        <div class="box1">
          <div class="txt1">本月邀请奖励</div>
          <div class="txt2 red">{{count_month}}</div>
          <img class="pic1" src="../../assets/newImg/zu233-2.png" alt />
        </div>
      </div>
      <!-- <div class="nav3">
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
      </div>-->
      <div class="nav4">
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
              ></el-date-picker>
            </el-form-item>
            <el-form-item label="类型">
              <el-select v-model="formInline.region" placeholder="请选择">
                <el-option label="全部" value="quanbu"></el-option>
              </el-select>
            </el-form-item>
            <el-button type="info" plain icon="el-icon-search" @click="onSubmit">搜索</el-button>
          </el-form>
        </div>
      </div>
      <div class="nav6">
        <div class="myTable">
          <vxe-table :cell-class-name="cellClassName" align="center" :data="tableData">
            <vxe-table-column field="id" width="60" title="编号"></vxe-table-column>
            <vxe-table-column field="source_id" title="订单号"></vxe-table-column>
            <vxe-table-column field="username" title="手机号码"></vxe-table-column>
            <vxe-table-column field="ctime" title="订单完成时间"></vxe-table-column>
            <vxe-table-column field="money" title="奖励金额"></vxe-table-column>
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
            :current-page="this.yaoqingjiangliPage"
            :page-size="10"
            layout="total, prev, pager, next, jumper"
            :total="this.total"
          ></el-pagination>
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
    Aside
  },
  computed: {
    ...mapState(["yaoqingjiangliPage"])
  },
  watch: {
    yaoqingjiangliPage: function(page) {
      this.$store.commit("yaoqingjiangliPage", page);
      //   this.getData();
    }
  },
  data() {
    return {
      time: 1,
      count_sum: 0,
      count_upmonth: 0,
      count_month: 0,
      formInline: {
        time: [],
        region: "全部",
        radioVal1: "全部订单"
      },
      tableData: [
        {
          id: 10004,
          name: "Test4",
          role: "Designer",
          sex: "+50.00",
          age: 24,
          address: "Shanghai"
        },
        {
          id: 10004,
          name: "Test4",
          role: "Designer",
          sex: "-60.00",
          age: 24,
          address: "Shanghai"
        }
      ],
      total: 0
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
      if (!this.formInline.time) {
        this.formInline.time = "";
      }
      console.log(this.formInline);
      const res = await this.$api.userInvitationReward({
        token: sessionStorage.getItem("token"),
        page: this.yaoqingjiangliPage,
        limit: 10,
        start_time: this.formInline.time[0],
        end_time: this.formInline.time[1]
      });
      console.log(res);
      if (res.code == 200) {
        this.tableData = res.data.data;
        this.total = res.data.total;
        this.count_month = res.data.count_month;
        this.count_sum = res.data.count_sum;
        this.count_upmonth = res.data.count_upmonth;
      } else {
        this.$message.error(res.msg);
      }
    },
    editTime(val) {
      this.time = val;
    },
    onSubmit() {
      console.log(this.formInline);
      this.getData();
    },
    cellClassName({ column, row }) {
      if (column.property == "sex" && Number(row.sex) > 0) {
        return "col-active1";
      } else if (column.property == "sex" && Number(row.sex) < 0) {
        return "col-active";
      }
    },
    // 分页
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.$store.commit("yaoqingjiangliPage", val);
    }
  }
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
    .nav2 {
      margin-top: 20px;
      // background: #ffffff;
      background-image: url("../../assets/newImg/kk8.png");
      background-size: 100% 100%;
      border-radius: 10px;
      height: 180px;
      display: flex;
      align-items: center;
      padding-left: 50px;
      .box1 {
        display: flex;
        align-items: center;
        position: relative;
        width: 222px;
        height: 111px;
        opacity: 1;
        margin-right: 20px;
        box-shadow: inset 0px 0 16px 2px #dddddd !important;
        .txt1 {
          position: absolute;
          top: 22px;
          left: 26px;
          font-size: 16px;
          font-family: PingFang SC, PingFang SC-Medium;
          font-weight: 500;
          color: #000000;
        }
        .txt2.red {
          color: #e64950;
        }
        .txt2.yellow {
          color: #ffaf55;
        }
        .txt2 {
          position: absolute;
          top: 62px;
          left: 26px;
          font-size: 24px;
          font-family: PingFang SC, PingFang SC-Heavy;
          font-weight: 800;
          color: #007cf3;
        }
        .pic1 {
          position: absolute;
          bottom: 21px;
          right: 20px;
          width: 60px;
          height: 60px;
          opacity: 1;
        }
      }
    }
    .nav3 {
      margin-top: 16px;
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
    .nav4 {
      margin-top: 10px;
      // height: 80px;
      padding: 28px;
      // background: #ffffff;
      background-image: url("../../assets/newImg/kk6.png");
      background-size: 100% 100%;
      border-radius: 10px;
      display: flex;
      justify-content: center;
      align-items: center;
      .myForm {
        display: flex;
        justify-content: center;
        align-items: center;
        /deep/ .el-form-item {
          margin-bottom: 0px;
          margin-right: 30px;
        }
      }
    }
    .nav5 {
    }
    .nav6 {
      margin: 10px 16px 16px 16px;
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
    font-family: zw;
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