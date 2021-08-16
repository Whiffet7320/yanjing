<template>
  <div class="fzindex">
    <div class="aside">
      <Aside />
    </div>
    <!-- <div class="right">
      <div class="nav1">当前位置：订单管理 > 包裹列表</div>
      <div class="txt1">
        <div class="txt1-1">
          <div class="shu"></div>
          <div class="txt1-1-1">包裹列表</div>
        </div>
        <div class="txt1-2">
          <div @click="editTime(1)" :class="{ txt: true, active:formInline.monthTime == 1 }">
            今天
          </div>
          <div @click="editTime(2)" :class="{ txt: true, active:formInline.monthTime == 2 }">
            一周
          </div>
          <div @click="editTime(3)" :class="{ txt: true, active:formInline.monthTime == 3 }">
            一个月
          </div>
          <div @click="editTime(4)" :class="{ txt: true, active:formInline.monthTime == 4 }">
            三个月
          </div>
        </div>
      </div>
      <div class="txt2">
        <div class="myForm">
          <el-form :inline="true" :model="formInline" class="demo-form-inline">
            <el-form-item label="快捷查询">
              <el-input
                placeholder="输入订单号/收件人手机号"
                v-model="formInline.name"
              ></el-input>
            </el-form-item>
            <el-form-item label="订单状态">
              <el-select v-model="formInline.region" placeholder="请选择">
                <el-option label="全部" value="quanbu"></el-option>
                <el-option label="待付款" value="daifukuan"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="起始时间">
              <el-date-picker
                v-model="formInline.time"
                type="daterange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
              >
              </el-date-picker>
            </el-form-item>
            <el-form-item label="平台订单号">
              <el-input
                placeholder="请输入"
                v-model="formInline.name"
              ></el-input>
            </el-form-item>
            <el-form-item label="第三方订单号">
              <el-input
                placeholder="请输入"
                v-model="formInline.name"
              ></el-input>
            </el-form-item>
            <el-form-item label="快递单号">
              <el-input
                placeholder="请输入"
                v-model="formInline.name"
              ></el-input>
            </el-form-item>
            <el-button
              class="btn"
              type="info"
              plain
              icon="el-icon-search"
              @click="onSubmit"
              >搜索</el-button
            >
          </el-form>
        </div>
      </div>
      <div class="txt3">
        <div class="myRadio">
          <el-radio-group v-model="formInline.radioVal1" size="small">
            <el-radio-button label="全部订单"></el-radio-button>
            <el-radio-button label="待付款"></el-radio-button>
            <el-radio-button label="待发货"></el-radio-button>
            <el-radio-button label="已发货"></el-radio-button>
            <el-radio-button label="已退款"></el-radio-button>
            <el-radio-button label="交易成功"></el-radio-button>
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
            <vxe-table-column field="name" title="包裹状态"></vxe-table-column>
            <vxe-table-column field="role" title="包裹号"></vxe-table-column>
            <vxe-table-column field="age" title="平台订单号"></vxe-table-column>
            <vxe-table-column
              field="sex"
              title="第三方订单号"
            ></vxe-table-column>
            <vxe-table-column field="address" title="总计费"></vxe-table-column>
            <vxe-table-column field="address" title="收件人"></vxe-table-column>
            <vxe-table-column
              field="address"
              title="快递单号"
            ></vxe-table-column>
            <vxe-table-column
              field="address"
              title="创建时间"
            ></vxe-table-column>
            <vxe-table-column title="操作" width="120">
              <template slot-scope="scope">
                <div
                  class="delBtn"
                  @click="del(scope.row)"
                  type="text"
                  size="small"
                >
                  删除订单
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
            :total="this.total"
          >
          </el-pagination>
        </div>
      </div>
    </div> -->
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
    ...mapState(["baoguoliebiaoPage"]),
  },
  watch: {
    baoguoliebiaoPage: function (page) {
      this.$store.commit("baoguoliebiaoPage", page);
      //   this.getData();
    },
  },
  data() {
    return {
      formInline: {
        monthTime: 1,
        name: "",
        time: "",
        region: "",
        radioVal1: "全部订单",
      },
      tableData: [
        // {
        //   id: 10004,
        //   name: "Test4",
        //   role: "Designer",
        //   sex: "+50.00",
        //   age: 24,
        //   address: "Shanghai",
        // },
        // {
        //   id: 10004,
        //   name: "Test4",
        //   role: "Designer",
        //   sex: "-60.00",
        //   age: 24,
        //   address: "Shanghai",
        // },
      ],
      total: 0,
    };
  },
  methods: {
    editTime(val) {
      this.formInline.monthTime = val;
    },
    del(row) {
      console.log(row);
    },
    onSubmit() {
      console.log(this.formInline);
    },
    cellClassName({ column, row }) {
      //   console.log(column, row);
      if (column.property == "sex" && Number(row.sex) > 0) {
        return "col-active1";
      } else if (column.property == "sex" && Number(row.sex) < 0) {
        return "col-active";
      }
    },
    // 分页
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.$store.commit("baoguoliebiaoPage", val);
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
      font-size: 14px;
      font-family: PingFang SC, PingFang SC-Medium;
      font-weight: 500;
      text-align: left;
      color: #868686;
    }

    .txt1 {
      height: 77px;
      margin: 0 50px;
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
      background: #ffffff;
      border-radius: 10px;
      display: flex;
      justify-content: center;
      align-items: center;
      box-shadow: 0px 3px 10px 0px rgba(167, 167, 167, 0.2);
      .myForm {
        padding: 10px 0;
        margin-left: 60px;
        display: flex;
        justify-content: center;
        align-items: center;
        /deep/ .el-form-item {
          margin-right: 40px;
          margin-top: 6px;
          margin-bottom: 6px;
        }
        .btn {
          margin-top: 6px;
        }
      }
    }
    .txt4 {
      margin-top: 10px;
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

.delBtn {
  background: #efefef;
  margin: 0 auto;
  cursor: pointer;
  width: 73px;
  height: 26px;
  opacity: 1;
  box-shadow: inset 0px 0 5px 0 #ccc !important;
  font-size: 12px;
  font-family: zw;;
  font-weight: 400;
  text-align: center;
  line-height: 26px;
  color: #e64950;
  border-radius: 2px;
}
</style>