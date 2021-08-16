<template>
  <div class="index">
    <div class="nav1">
      <!-- <div class="tit1">全部订单</div> -->
      <el-menu
        :default-active="activeIndex"
        class="el-menu-demo"
        mode="horizontal"
        @select="handleSelect"
        text-color="#6F7070"
        active-text-color="#ebbfcc"
      >
        <el-menu-item index="1">近3个月订单</el-menu-item>
        <el-menu-item index="2">3个月前订单</el-menu-item>
      </el-menu>
    </div>
    <div class="myForm">
      <el-form
        @submit.native.prevent
        :inline="true"
        :model="formInline"
        class="demo-form-inline"
      >
        <el-form-item label="订单编号">
          <el-input
            v-model="formInline.order_no"
            placeholder="请输入订单编号"
            @keyup.enter.native="onSearch"
          ></el-input>
        </el-form-item>
        <el-form-item label="状态">
          <el-select v-model="formInline.status" placeholder="请选择活动区域">
            <el-option label="待发货" value="2"></el-option>
            <el-option label="已完成" value="4"></el-option>
            <el-option label="已取消" value="5"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="商品名称">
          <el-input
            v-model="formInline.title"
            placeholder="请输入关键词"
            @keyup.enter.native="onSearch"
          ></el-input>
        </el-form-item>
        <el-form-item label="收件人姓名">
          <el-input
            v-model="formInline.name"
            placeholder="请输入收件人姓名"
            @keyup.enter.native="onSearch"
          ></el-input>
        </el-form-item>
        <el-form-item label="收件人手机号">
          <el-input
            v-model="formInline.tel"
            placeholder="请输入收件人手机号"
            @keyup.enter.native="onSearch"
          ></el-input>
        </el-form-item>
        <el-form-item label="下单时间">
          <el-date-picker
            value-format="timestamp"
            v-model="formInline.time"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          >
          </el-date-picker>
        </el-form-item>
        <!-- <el-form-item label="只看">
          <el-checkbox-group v-model="formInline.type" @change="onCheck">
            <el-checkbox label="已付款"></el-checkbox>
            <el-checkbox label="已完成"></el-checkbox>
            <el-checkbox label="已取消"></el-checkbox>
            <el-checkbox label="待评价"></el-checkbox>
          </el-checkbox-group>
        </el-form-item> -->
        <el-form-item>
          <el-button type="danger" @click="onSearch">查询</el-button>
        </el-form-item>
        <el-form-item>
          <el-button @click="onReset">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="myTable">
      <vxe-table
        resizable
        highlight-current-row
        highlight-current-column
        border="inner"
        ref="xTree"
        :data="tableData"
      >
        <vxe-table-column type="expand" width="30" :fixed="null">
          <template #content="{ row }">
            <template>
              <div class="top">
                <div class="tit">收货人信息</div>
                <div class="content">
                  <div class="txt">
                    {{ row.address.name }} {{ row.address.tel }}
                  </div>
                  <div class="txt">
                    {{ row.address.province }} {{ row.address.city }}
                    {{ row.address.area }} {{ row.address.address }}
                  </div>
                </div>
                <div class="tit-1">商品信息</div>
              </div>
              <div class="items" v-for="item in row.product_arr" :key="item.id">
                <div class="item">
                  <img
                    :src="item.images"
                    style="width: 52px; height: 52px; cursor: pointer"
                    alt=""
                  />
                  <div class="box1">
                    <div class="txt1">{{ item.title }}</div>
                    <div class="txt2">规格：{{ item.size }}</div>
                    <div class="txt2">数量：{{ item.buy_number }}</div>
                  </div>
                  <div class="box1">
                    <div class="txt1"></div>
                    <div class="txt2">商品分类：{{ item.category_name }}</div>
                    <div class="txt2">商品单价：{{ item.price }}</div>
                  </div>
                  <div class="box1 box2">
                    <div class="txt1"></div>
                    <div class="txt2">总价：{{ item.total_price }}</div>
                  </div>
                </div>
              </div>
            </template>
          </template>
        </vxe-table-column>
        <vxe-table-column
          width="230"
          field="order_no"
          title="订单号"
          show-header-overflow
          show-overflow="title"
          show-footer-overflow
        ></vxe-table-column>
        <vxe-table-column
          field="user_name"
          show-header-overflow
          show-overflow="title"
          show-footer-overflow
          title="客户名称"
        ></vxe-table-column>
        <vxe-table-column
          field="myconfirm_time"
          show-header-overflow
          show-overflow="title"
          show-footer-overflow
          title="下单时间"
        ></vxe-table-column>
        <vxe-table-column
          show-header-overflow
          show-overflow="title"
          show-footer-overflow
          field="myStatus"
          title="货物状态"
        ></vxe-table-column>
        <vxe-table-column
          show-header-overflow
          show-overflow="title"
          show-footer-overflow
          field="express_number"
          title="快递单号"
        ></vxe-table-column>
        <vxe-table-column
          show-header-overflow
          show-overflow="title"
          show-footer-overflow
          field="express_name"
          title="快递公司"
        ></vxe-table-column>
        <vxe-table-column field="pay_price" title="实付金额"></vxe-table-column>
        <vxe-table-column field="deliver_fee" title="邮费"></vxe-table-column>
        <vxe-table-column title="操作" width="120">
          <template slot-scope="scope">
            <!-- <el-button @click="see(scope.row)" type="text" size="small"
              >查看</el-button
            > -->
            <el-button
              :disabled="scope.row.status != 2"
              @click="fahuo(scope.row)"
              type="text"
              size="small"
              >发货</el-button
            >
          </template>
        </vxe-table-column>
      </vxe-table>
      <el-pagination
        class="fenye"
        @size-change="this.handleSizeChange"
        @current-change="this.handleCurrentChange"
        :current-page="this.quanbudingdanPage"
        :page-sizes="[10, 15, 20, 50]"
        :page-size="10"
        layout="total, sizes, prev, pager, next, jumper"
        :total="this.total"
      >
      </el-pagination>
    </div>
    <!-- 发货 -->
    <el-dialog
      title="发货"
      :visible.sync="fahuoDialogVisible"
      width="30%"
      :before-close="fahuoHandleClose"
    >
      <el-form ref="fahuoform" :model="fahuoform" label-width="80px">
        <el-form-item label="快递单号">
          <el-input v-model="fahuoform.express_number"></el-input>
        </el-form-item>
        <el-form-item label="快递公司">
          <el-select
            v-model="fahuoform.express_id"
            placeholder="请选择快递公司"
          >
            <el-option
              v-for="item in option"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="fahuoOnSubmit">保存</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  computed: {
    ...mapState(["quanbudingdanPage", "quanbudingdanPageSize"]),
  },
  data() {
    return {
      activeIndex: "1",
      formInline: {
        order_no: "",
        title: "",
        name: "",
        tel: "",
        status: '',
        time: [],
      },
      tableData: [],
      total: null,
      // statusArr: [],
      // status: -1,
      fahuoform: {
        express_id: "",
        express_number: "",
      },
      option: [],
      fahuoDialogVisible: false,
      order_id: "",
    };
  },
  created() {
    this.getData();
  },
  watch: {
    quanbudingdanPage: function (page) {
      this.$store.commit("quanbudingdanPage", page);
      this.getData();
    },
    quanbudingdanPageSize: function (pageSize) {
      this.$store.commit("quanbudingdanPageSize", pageSize);
      this.getData();
    },
  },
  methods: {
    async getData() {
      const res2 = await this.$api.orderExpress_list();
      console.log(res2);
      this.option = res2.data.data;
      const res = await this.$api.orderIndex(
        this.quanbudingdanPage,
        this.quanbudingdanPageSize,
        this.formInline.status,
        {
          order_no: this.formInline.order_no,
          title: this.formInline.title,
          name: this.formInline.name,
          tel: this.formInline.tel,
          time: this.formInline.time[0] ? {
            start_time: this.formInline.time[0] / 1000,
            end_time: this.formInline.time[1] / 1000,
          } : '',
        }
      );
      console.log(res);
      this.tableData = res.data.data;
      this.tableData.forEach((ele) => {
        ele.myconfirm_time = this.formatDate(ele.confirm_time * 1000);
        if (ele.status == 0) {
          ele.myStatus = "待确认";
        } else if (ele.status == 1) {
          ele.myStatus = "待支付";
        } else if (ele.status == 2) {
          ele.myStatus = "待发货";
        } else if (ele.status == 3) {
          ele.myStatus = "待收货";
        } else if (ele.status == 4) {
          ele.myStatus = "已完成";
        } else if (ele.status == 5) {
          ele.myStatus = "已取消";
        } else if (ele.status == 6) {
          ele.myStatus = "已关闭";
        }
      });
      this.total = res.data.total;
      console.log(this.tableData);
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
    handleSelect(val) {
      console.log(val);
      if (val == 1) {
        const time = this.getLast3Month(Date.now()); //{now:"2019-07-04",last:"2019-04-04"}
        this.$set(this.formInline.time, 1, Date.parse(time.now));
        this.$set(this.formInline.time, 0, Date.parse(time.last));
        this.getData();
      } else if (val == 2) {
        const time = this.getLast3Month(Date.now()); //{now:"2019-07-04",last:"2019-04-04"}
        this.$set(this.formInline.time, 1, Date.parse(time.last));
        this.$set(this.formInline.time, 0, Date.parse("1998-01-01"));
        this.getData();
      }
      // getLast3Month(Date.now())  //{now:"2019-07-04",last:"2019-04-04"}
    },
    // 近三个月
    getLast3Month() {
      var now = new Date();
      var year = now.getFullYear();
      var month = now.getMonth() + 1; //0-11表示1-12月
      var day = now.getDate();
      var dateObj = {};
      if (parseInt(month) < 10) {
        month = "0" + month;
      }
      if (parseInt(day) < 10) {
        day = "0" + day;
      }

      dateObj.now = year + "-" + month + "-" + day;

      if (parseInt(month) == 1) {
        //如果是1月份，则取上一年的10月份
        dateObj.last = parseInt(year) - 1 + "-10-" + day;
        return dateObj;
      }
      if (parseInt(month) == 2) {
        //如果是2月份，则取上一年的11月份
        dateObj.last = parseInt(year) - 1 + "-11-" + day;
        return dateObj;
      }
      if (parseInt(month) == 3) {
        //如果是3月份，则取上一年的12月份
        dateObj.last = parseInt(year) - 1 + "-12-" + day;
        return dateObj;
      }

      var preSize = new Date(year, parseInt(month) - 3, 0).getDate(); //开始时间所在月的总天数
      if (preSize < parseInt(day)) {
        // 开始时间所在月的总天数<本月总天数，比如当前是5月30日，在2月中没有30，则取下个月的第一天(3月1日)为开始时间
        let resultMonth =
          parseInt(month) - 2 < 10
            ? "0" + parseInt(month) - 2
            : parseInt(month) - 2;
        dateObj.last = year + "-" + resultMonth + "-01";
        return dateObj;
      }

      if (parseInt(month) <= 10) {
        dateObj.last = year + "-0" + (parseInt(month) - 3) + "-" + day;
        return dateObj;
      } else {
        dateObj.last = year + "-" + (parseInt(month) - 3) + "-" + day;
        return dateObj;
      }
    },
    // 发货
    fahuo(row) {
      console.log(row);
      this.order_id = row.id;
      this.fahuoDialogVisible = true;
    },
    fahuoHandleClose() {
      this.fahuoDialogVisible = false;
    },
    async fahuoOnSubmit() {
      const res = await this.$api.orderOrder2express(
        this.order_id,
        this.fahuoform.express_id,
        this.fahuoform.express_number
      );
      console.log(res);
      if (res.code == 200) {
        this.$message({
          message: res.message,
          type: "success",
        });
        this.getData();
        this.fahuoform.express_id = "";
        this.fahuoform.express_number = "";
        this.fahuoDialogVisible = false;
      } else {
        this.$message.error(res.message);
      }
    },
    onSearch() {
      this.getData();
    },
    // 重置
    onReset() {
      this.$store.commit("quanbudingdanPage", 1);
      this.formInline.search = "";
      this.formInline.status = "";
      this.formInline.time = [];
      this.status = "";
      this.getData();
    },
    // 分页
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.$store.commit("quanbudingdanPageSize", val);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.$store.commit("quanbudingdanPage", val);
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
  .top {
    .tit {
      opacity: 1;
      font-size: 14px;
      font-family: PingFang SC, PingFang SC-Medium;
      font-weight: 500;
      color: #397ff4;
    }
    .content {
      .txt {
        font-size: 12px;
        margin: 10px 0;
      }
    }
    .tit-1 {
      opacity: 1;
      font-size: 14px;
      font-family: PingFang SC, PingFang SC-Medium;
      font-weight: 500;
      color: #397ff4;
      margin-top: 20px;
    }
  }
  .items {
    .item {
      display: flex;
      margin: 10px 0;
      .box1 {
        // display: flex;
        margin-left: 10px;

        .txt1 {
          height: 17px;
          opacity: 1;
          font-size: 12px;
          font-family: PingFang SC, PingFang SC-Medium;
          font-weight: 500;
          color: #397ff4;
        }
        .txt2 {
          margin-top: 5px;
          opacity: 1;
          font-size: 12px;
          font-family: PingFang SC, PingFang SC-Medium;
          font-weight: 500;
          color: #000000;
        }
      }
      .box1.box2 {
        margin-left: 30px;
      }
    }
  }
}
.fenye{
  margin: 20px 0;
}
</style>