<template>
  <div class="index">
    <div class="nav1">
      <div class="tit1">用户提现表</div>
    </div>
    <div class="myForm">
      <el-form
        @submit.native.prevent
        :inline="true"
        :model="formInline"
        class="demo-form-inline"
      >
        <el-form-item label="关键词">
          <el-input
            v-model="formInline.search"
            placeholder="请输入关键词"
            @keyup.enter.native="onSearch"
          ></el-input>
        </el-form-item>
        <el-form-item label="状态">
          <el-select v-model="formInline.status" placeholder="请选择活动区域">
            <el-option label="已通过" value="1"></el-option>
            <el-option label="未通过" value="2"></el-option>
            <el-option label="待审核" value="0"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="danger" @click="onSearch">查询</el-button>
        </el-form-item>
        <el-form-item>
          <el-button @click="onReset">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="myTable">
      <!-- <el-button
        type="info"
        style="margin-bottom: 10px"
        @click="exportSelectEvent"
        >导出</el-button
      > -->
      <vxe-table
        resizable
        highlight-current-row
        highlight-current-column
        border="inner"
        ref="xTree"
        :data="tableData"
      >
        <vxe-table-column
          width="120"
          field="bank_realname"
          show-header-overflow
          show-overflow="title"
          show-footer-overflow
          title="用户名称"
        ></vxe-table-column>
        <vxe-table-column
          show-header-overflow
          show-overflow="title"
          show-footer-overflow
          field="bank_mobile"
          title="联系方式"
        ></vxe-table-column>
        <vxe-table-column
          win-width="80"
          field="myStatus"
          title="状态"
        ></vxe-table-column>
        <vxe-table-column
          show-header-overflow
          show-overflow="title"
          show-footer-overflow
          field="withdraw_order_no"
          title="订单编号"
          win-width="220"
        ></vxe-table-column>
        <vxe-table-column field="money" title="提现金额"></vxe-table-column>
        <vxe-table-column
          win-width="90"
          field="txfs"
          title="提现方式"
        ></vxe-table-column>
        <vxe-table-column
          show-header-overflow
          show-overflow="title"
          show-footer-overflow
          field="bank_number"
          title="银行卡卡号"
          win-width="280"
        ></vxe-table-column>
        <vxe-table-column
          show-header-overflow
          show-overflow="title"
          show-footer-overflow
          field="myconfirm_time"
          title="下单时间"
          win-width="190"
        ></vxe-table-column>
        <vxe-table-column title="操作" width="120">
          <template slot-scope="scope">
            <el-button @click="cz(scope.row)" :disabled="scope.row.confirm_status != 0" type="text" size="small"
              >操作</el-button
            >
          </template>
        </vxe-table-column>
      </vxe-table>
      <el-pagination
        class="fenye"
        @size-change="this.handleSizeChange"
        @current-change="this.handleCurrentChange"
        :current-page="this.YonghutixianbiaoPage"
        :page-sizes="[10, 15, 20, 50]"
        :page-size="10"
        layout="total, sizes, prev, pager, next, jumper"
        :total="this.total"
      >
      </el-pagination>
    </div>
    <!-- 提现 -->
    <el-dialog
      title="发货"
      :visible.sync="tixianDialogVisible"
      width="30%"
      :before-close="tixianHandleClose"
    >
      <el-form ref="tixianform" :model="tixianform" label-width="80px">
        <el-form-item label="审核">
          <el-select v-model="tixianform.status" placeholder="请选择">
            <el-option label="通过" value="1"></el-option>
            <el-option label="不通过" value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="tixianOnSubmit">保存</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  computed: {
    ...mapState(["YonghutixianbiaoPage", "YonghutixianbiaoPageSize"]),
  },
  watch: {
    YonghutixianbiaoPage: function (page) {
      this.$store.commit("YonghutixianbiaoPage", page);
      this.getData();
    },
    YonghutixianbiaoPageSize: function (pageSize) {
      this.$store.commit("YonghutixianbiaoPageSize", pageSize);
      this.getData();
    },
  },
  data() {
    return {
      formInline: {
        search: "",
        status: '',
      },
      tableData: [],
      total: null,
      statusArr: [],
      status: "",
      tixianDialogVisible: false,
      tixianform: {
        status: "",
      },
    };
  },
  created() {
    this.getData();
  },
  methods: {
    async getData() {
      const res = await this.$api.orderWithdraw_list({
        keyword:this.formInline.search,
        page: this.YonghutixianbiaoPage,
        limit: this.YonghutixianbiaoPageSize,
        status: this.formInline.status,
      });
      this.tableData = res.data.data;
      this.tableData.forEach((ele) => {
        ele.txfs = "银行卡";
        ele.myconfirm_time = this.formatDate(ele.confirm_time * 1000);
        if (ele.confirm_status == 0) {
          ele.myStatus = "待审核";
        } else if (ele.confirm_status == 1) {
          ele.myStatus = "已通过";
        } else if (ele.confirm_status == 2) {
          ele.myStatus = "未通过";
        }
      });
      this.total = res.data.total;
      console.log(this.tableData);
    },
    // 提现
    async tixianOnSubmit() {
      const res = await this.$api.orderChange_withdraw_status({
        withdraw_id: this.withdraw_id,
        status: this.tixianform.status,
      });
      console.log(res);
      if (res.code == 200) {
        this.$message({
          message: res.message,
          type: "success",
        });
        this.getData()
      }
      this.tixianDialogVisible = false;
    },
    cz(row) {
      this.withdraw_id = row.id;
      this.tixianDialogVisible = true;
    },
    tixianHandleClose() {
      this.tixianDialogVisible = false;
    },
    // 时间戳转日期
    formatDate(time) {
      var now = new Date(time);
      var year = now.getFullYear(); //取得4位数的年份
      var month = now.getMonth() + 1; //取得日期中的月份，其中0表示1月，11表示12月
      var date = now.getDate(); //返回日期月份中的天数（1到31）
      var hour = now.getHours(); //返回日期中的小时数（0到23）
      var minute = now.getMinutes(); //返回日期中的分钟数（0到59）
      var second = now.getSeconds(); //返回日期中的秒数（0到59）
      return (
        year +
        "-" +
        month +
        "-" +
        date +
        " " +
        hour +
        ":" +
        minute +
        ":" +
        second
      );
    },
    // onCheck(val) {
    //   this.statusArr = [];
    //   val.forEach((ele) => {
    //     if (val.indexOf(ele) != -1) {
    //       if (ele == "待审核") {
    //         this.statusArr.push(0);
    //       }
    //       if (ele == "已通过") {
    //         this.statusArr.push(1);
    //       }
    //       if (ele == "未通过") {
    //         this.statusArr.push(2);
    //       }
    //     }
    //   });
    //   this.status = this.statusArr.toString();
    // },
    onSearch() {
      this.getData();
    },
    // 重置
    onReset() {
      this.$store.commit("YonghutixianbiaoPage", 1);
      this.formInline.search = "";
      this.formInline.status = "";
      this.getData();
    },
    exportSelectEvent() {},
    // 分页
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.$store.commit("YonghutixianbiaoPageSize", val);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.$store.commit("YonghutixianbiaoPage", val);
    },
  },
};
</script>

<style lang="scss" scoped>
.index {
}
.nav1 {
  width: 100%;
  height: 80px;
  opacity: 1;
  background: #ffffff;
  .tit1 {
    opacity: 1;
    font-size: 25px;
    font-family: PingFang SC, PingFang SC-Heavy;
    font-weight: 800;
    text-align: left;
    color: #2f313d;
    line-height: 80px;
    margin-left: 44px;
  }
}
.myForm {
  margin-top: 30px;
  padding-left: 30px;
}
.myTable {
  margin-right: 30px;
}
.fenye {
  margin: 20px 0;
}
</style>