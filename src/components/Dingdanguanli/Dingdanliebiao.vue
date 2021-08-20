<template>
  <div class="fzindex">
    <div class="aside">
      <Aside />
    </div>
    <div class="right">
      <div class="nav1">当前位置：订单管理 > 订单列表</div>
      <div class="txt1">
        <div class="txt1-1">
          <img style="width: 24px;height: 24px;" src="../../assets/newImg/tubiao301.png" alt />
          <div class="txt1-1-1">订单列表</div>
        </div>
        <div class="txt1-2">
          <div
            @click="editTime('day')"
            :class="{ txt: true, active: formInline.monthTime == 'day' }"
          >今天</div>
          <div
            @click="editTime('week')"
            :class="{ txt: true, active: formInline.monthTime == 'week' }"
          >一周</div>
          <div
            @click="editTime('month')"
            :class="{ txt: true, active: formInline.monthTime == 'month' }"
          >一个月</div>
          <div
            @click="editTime('threeMonth')"
            :class="{ txt: true, active: formInline.monthTime == 'threeMonth' }"
          >三个月</div>
        </div>
      </div>
      <div class="txt2">
        <div class="myForm">
          <el-form :inline="true" :model="formInline" class="demo-form-inline">
            <el-form-item label="快捷查询">
              <el-input placeholder="输入订单号/收件人手机号" v-model="formInline.name"></el-input>
            </el-form-item>
            <el-form-item label="订单状态">
              <el-select v-model="formInline.ship_status" placeholder="请选择">
                <el-option label="全部" value="1"></el-option>
                <!-- <el-option label="已发货" value="3"></el-option> -->
              </el-select>
            </el-form-item>
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
            <!-- <el-form-item label="平台订单号">
              <el-input
                placeholder="请输入"
                v-model="formInline.order_id"
              ></el-input>
            </el-form-item>
            <el-form-item label="第三方订单号">
              <el-input
                placeholder="请输入"
                v-model="formInline.dsf_order"
              ></el-input>
            </el-form-item>
            <el-form-item label="快递单号">
              <el-input
                placeholder="请输入"
                v-model="formInline.kd_order"
              ></el-input>
            </el-form-item>-->
            <el-button class="btn" type="info" plain icon="el-icon-search" @click="onSubmit">搜索</el-button>
            <el-button class="btn" type="info" plain @click="onResult">重置</el-button>
          </el-form>
        </div>
      </div>
      <div class="txt3">
        <div class="myRadio">
          <el-radio-group @change="changeRadioVal1" v-model="formInline.radioVal1" size="small">
            <el-radio-button label="全部订单"></el-radio-button>
            <el-radio-button label="未发货"></el-radio-button>
            <el-radio-button label="已发货"></el-radio-button>
            <!-- <el-radio-button label="待付款"></el-radio-button>
            <el-radio-button label="任务处理中"></el-radio-button>
            <el-radio-button label="可发货"></el-radio-button>
            <el-radio-button label="发货中"></el-radio-button>
            <el-radio-button label="发货完成"></el-radio-button>
            <el-radio-button label="撤销订单"></el-radio-button>-->
          </el-radio-group>
        </div>
      </div>
      <div class="txt4">
        <div class="myTable">
          <vxe-table :cell-class-name="cellClassName" align="center" :data="tableData">
            <vxe-table-column show-overflow="title" field="dsf_order" title="订单号"></vxe-table-column>
            <vxe-table-column show-overflow="title" field="ship_status" title="订单状态"></vxe-table-column>
            <vxe-table-column show-overflow="title" field="import_mode" title="导入方式"></vxe-table-column>
            <vxe-table-column show-overflow="title" field="ctime" title="支付时间"></vxe-table-column>
            <vxe-table-column show-overflow="title" field="order_amount" title="总费用"></vxe-table-column>
            <vxe-table-column show-overflow="title" field="remarks" title="备注"></vxe-table-column>
            <vxe-table-column title="操作状态" width="180">
              <template slot-scope="scope">
                <div class="flex">
                  <!-- 任务处理中 -->
                  <div
                    v-if="scope.row.status == 3"
                    class="delBtn blue"
                    @click="del(scope.row)"
                    type="text"
                    size="small"
                  >可发货</div>
                  <!-- 可发货 -->
                  <div
                    v-if="scope.row.status == 4"
                    class="delBtn blue"
                    @click="del(scope.row)"
                    type="text"
                    size="small"
                  >发货中</div>
                  <!-- 发货中 -->
                  <div
                    v-if="scope.row.status == 5"
                    class="delBtn blue"
                    @click="del(scope.row)"
                    type="text"
                    size="small"
                  >发货完成</div>
                  <!-- <div
                    class="delBtn"
                    @click="del(scope.row)"
                    type="text"
                    size="small"
                  >
                    撤销订单
                  </div>-->
                  <div
                    class="delBtn blue"
                    @click="seeDingdan(scope.row)"
                    type="text"
                    size="small"
                  >查看详情</div>
                </div>
              </template>
            </vxe-table-column>
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
            :current-page="this.baoguoliebiaoPage"
            :page-size="10"
            layout="total, prev, pager, next, jumper"
            :total="total"
          ></el-pagination>
        </div>
      </div>
    </div>
    <!-- 查看详情 -->
    <el-dialog title="订单信息" :visible.sync="dialogVisible" width="800" :before-close="handleClose">
      <div class="xiangqinBox">
        <img class="see-pic1" src="../../assets/newImg/zu193.png" alt />
        <div class="tit1">
          <div class="txt1">商品名称：{{}}</div>
          <div class="txt1">购买数量：{{}}</div>
          <div class="txt1">总重量：0.05</div>
          <div class="txt1">总价格：{{xqObj.order_amount}}</div>
        </div>
        <div class="tit2">
          <div class="txt1">第三方订单号：{{xqObj.order_id}}</div>
          <div class="txt1">快递单号：{{}}</div>
          <div class="txt1">收件人：{{xqObj.sj_username}}</div>
          <div class="txt1">收件人电话：{{}}</div>
          <div class="txt1">地址：{{}}</div>
        </div>
      </div>
    </el-dialog>
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
    ...mapState(["baoguoliebiaoPage"])
  },
  watch: {
    baoguoliebiaoPage: function(page) {
      this.$store.commit("baoguoliebiaoPage", page);
      this.getData();
    }
  },
  data() {
    return {
      xqObj:{},
      dialogVisible: false,
      formInline: {
        monthTime: "",
        name: "",
        time: "",
        ship_status: "1",
        radioVal1: "全部订单",
        kd_order: "",
        order_id: "",
        dsf_order: ""
      },
      tableData: [
        {
          id: 10004,
          name: "Test4",
          role: "Designer",
          sex: "+50.00",
          age: 24,
          address: "Shanghai",
          status: 1
        },
        {
          id: 10004,
          name: "Test4",
          role: "Designer",
          sex: "-60.00",
          age: 24,
          address: "Shanghai",
          status: 2
        }
      ],
      total: 0
    };
  },
  created() {
    this.getData();
  },
  methods: {
    async getData() {
      var ship_status = "";
      if (this.formInline.radioVal1 == "全部订单") {
        ship_status = "";
      } else if (this.formInline.radioVal1 == "未发货") {
        ship_status = "1";
      } else if (this.formInline.radioVal1 == "已发货") {
        ship_status = "3";
      }
      if (this.formInline.time[0]) {
        const res = await this.$api.getOrder({
          token: sessionStorage.getItem("token"),
          limit: 10,
          page: this.baoguoliebiaoPage,
          // ship_status: this.formInline.ship_status,
          ship_status: ship_status,
          time_type: "1",
          start_time: this.formInline.time[0],
          end_time: this.formInline.time[1],
          keyword: this.formInline.name,
          order_id: this.formInline.order_id,
          dsf_order: this.formInline.dsf_order,
          kd_order: this.formInline.kd_order
        });
        console.log(res);
        this.tableData = res.data.data;
        this.total = res.data.total;
        this.tableData.forEach(ele => {
          if (ele.import_mode == 1) {
            ele.import_mode = "淘宝";
          } else if (ele.import_mode == 2) {
            ele.import_mode = "京东";
          } else if (ele.import_mode == 3) {
            ele.import_mode = "拼多多";
          } else if (ele.import_mode == 4) {
            ele.import_mode = "抖音";
          }
          if (ele.ship_status == 1) {
            ele.ship_status = "未发货";
          } else if (ele.ship_status == 3) {
            ele.ship_status = "已发货";
          }
        });
      } else {
        const res = await this.$api.getOrder({
          token: sessionStorage.getItem("token"),
          limit: 10,
          page: this.baoguoliebiaoPage,
          ship_status: ship_status,
          time_type: "2",
          time_name: this.formInline.monthTime,
          keyword: this.formInline.name,
          order_id: this.formInline.order_id,
          dsf_order: this.formInline.dsf_order,
          kd_order: this.formInline.kd_order
        });
        console.log(res);
        this.tableData = res.data.data;
        this.total = res.data.total;
        this.tableData.forEach(ele => {
          if (ele.import_mode == 1) {
            ele.import_mode = "淘宝";
          } else if (ele.import_mode == 2) {
            ele.import_mode = "京东";
          } else if (ele.import_mode == 3) {
            ele.import_mode = "拼多多";
          } else if (ele.import_mode == 4) {
            ele.import_mode = "抖音";
          }
          if (ele.ship_status == 1) {
            ele.ship_status = "未发货";
          } else if (ele.ship_status == 3) {
            ele.ship_status = "已发货";
          }
        });
      }
    },
    changeRadioVal1() {
      this.getData();
    },
    editTime(val) {
      this.formInline.monthTime = val;
      this.getData();
    },
    // 查看订单
    seeDingdan(row) {
      console.log(row);
      this.xqObj = row;
      this.dialogVisible = true;
    },
    async del(row) {
      console.log(row);
      const res = await this.$api.orderDelOrder({
        token: sessionStorage.getItem("token"),
        order: row.order_id
      });
      console.log(res);
      if (res.code == 200) {
        this.$message({
          message: res.msg,
          type: "success"
        });
        setTimeout(() => {
          this.getData();
        }, 500);
      }
    },
    handleClose() {
      this.dialogVisible = false;
    },
    onSubmit() {
      console.log(this.formInline);
      this.getData();
    },
    onResult() {
      this.formInline = {
        monthTime: "",
        name: "",
        time: "",
        ship_status: "1",
        radioVal1: "全部订单",
        kd_order: "",
        order_id: "",
        dsf_order: ""
      };
      this.getData();
    },
    cellClassName({ column, row }) {
      //   console.log(column, row);
      if (column.property == "order_amount" && Number(row.order_amount) >= 0) {
        return "col-active1";
      } else if (
        column.property == "order_amount" &&
        Number(row.order_amount) < 0
      ) {
        return "col-active";
      }
    },
    // 分页
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.$store.commit("baoguoliebiaoPage", val);
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

    .txt1 {
      height: 48px;
      margin: 10px 50px 0 50px;
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
      //   height: 180px;
      // background: #ffffff;
      background-image: url("../../assets/newImg/kk4.png");
      background-size: 100% 100%;
      border-radius: 10px;
      display: flex;
      justify-content: center;
      align-items: center;
      // box-shadow: 0px 3px 10px 0px rgba(167, 167, 167, 0.2);
      .myForm {
        padding: 26px 0;
        margin-left: 60px;
        display: flex;
        justify-content: center;
        align-items: center;
        /deep/ .el-form-item {
          margin-right: 80px;
          margin-top: 6px;
          margin-bottom: 6px;
        }
        .btn {
          margin-top: 6px;
        }
      }
    }
    .txt3 {
      margin: 0 14px 14px 14px;
    }
    .txt4 {
      margin: 14px;
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
.xiangqinBox{
  display: flex;
  .see-pic1{
    width: 120px;
    height: 120px;
    margin-right: 20px;
  }
  .tit1{
    width: 200px;
    margin-right: 20px;
  }
  .tit2{
 width: 308px;
  }
  .txt1{
    font-size: 14px;
    line-height: 20px;
    margin-bottom: 6px;
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
.flex {
  display: flex;
  align-items: center;
}
.delBtn {
  background: #efefef;
  margin: 0 auto;
  cursor: pointer;
  width: 73px;
  height: 26px;
  opacity: 1;
  box-shadow: inset 0px 0 5px 0 #ccc !important;
  font-size: 12px;
  font-family: zw;
  font-weight: 400;
  text-align: center;
  line-height: 26px;
  color: #e64950;
  border-radius: 2px;
}
.delBtn.blue {
  color: #007cf3;
}
// 列表行高
/deep/ .vxe-body--column.col--ellipsis {
  height: 36px;
}
</style>