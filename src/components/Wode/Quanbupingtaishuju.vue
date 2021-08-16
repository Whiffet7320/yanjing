<template>
  <div class="index">
    <div class="nav1">
      <div class="tit1">全部平台数据</div>
    </div>
    <el-row>
      <el-col :span="24">
        <div class="nav">
          <div class="nav2">
            <img class="pic1" src="../../assets/img/zu96.png" alt="" />
            <div class="box1">
              <div class="txt">本月订单量</div>
              <div class="txt2">{{ otherObj.thisMonthOrder }}</div>
            </div>
            <div class="shu"></div>
            <div class="box1">
              <div class="txt">本周订单量</div>
              <div class="txt2">{{ otherObj.thisWeekOrder }}</div>
            </div>
            <div class="shu"></div>
            <div class="box1">
              <div class="txt">今日订单量</div>
              <div class="txt2">{{ otherObj.thisDayOrder }}</div>
            </div>
            <div class="shu"></div>
            <div class="box1">
              <div class="txt">订单总数</div>
              <div class="txt2">{{ otherObj.totalCount }}</div>
            </div>
          </div>
          <div class="nav2 nav2-1">
            <img class="pic1 nav3" src="../../assets/img/zu102.png" alt="" />
            <div class="box1 nav3">
              <div class="txt">今日成交额</div>
              <div class="txt2 nav3">{{ otherObj.totalDayMoney }}</div>
            </div>
            <div class="shu"></div>
            <div class="box1 nav3">
              <div class="txt">本月成交额</div>
              <div class="txt2 nav3">{{ otherObj.totalMonthMoney }}</div>
            </div>
            <div class="shu"></div>
            <div class="box1 nav3">
              <div class="txt">本季度成交额</div>
              <div class="txt2 nav3">{{ otherObj.totalSeasonMoney }}</div>
            </div>
          </div>
        </div>
      </el-col>
    </el-row>
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
            <template v-if="row.address">
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
        :current-page="this.quanbupingtaishujuPage"
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
    ...mapState(["quanbupingtaishujuPage", "quanbupingtaishujuPageSize"]),
  },
  watch: {
    quanbupingtaishujuPage: function (page) {
      this.$store.commit("quanbupingtaishujuPage", page);
      this.getData();
    },
    quanbupingtaishujuPageSize: function (pageSize) {
      this.$store.commit("quanbupingtaishujuPageSize", pageSize);
      this.getData();
    },
  },
  data() {
    return {
      otherObj: {},
      formInline: {
        search: "",
        type: [],
      },
      tableData: [],
      total: null,
      fahuoDialogVisible:false,
      fahuoform: {
        express_id: "",
        express_number: "",
      },
      option: [],
    };
  },
  created() {
    this.getData();
  },
  methods: {
    async getData() {
      const res3 = await this.$api.orderExpress_list();
      console.log(res3);
      this.option = res3.data.data;
      const res = await this.$api.otherIndex();
      this.otherObj = res.data;
      const res2 = await this.$api.orderIndex(
        this.quanbupingtaishujuPage,
        this.quanbupingtaishujuPageSize,
        '',
      );
      console.log(res2);
      this.tableData = res2.data.data;
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
      this.total = res2.data.total;
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
    onSearch() {},
    onReset() {},
    // 分页
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.$store.commit("quanbupingtaishujuPageSize", val);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.$store.commit("quanbupingtaishujuPage", val);
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
.nav {
  display: flex;
  width: 100%;
}
.nav2.nav2-1 {
  // width: 620px;
  width: 100%;
  height: 119px;
}
.nav2 {
  margin-right: 10px;
  width: 100%;
  // width: 585px;
  height: 119px;
  opacity: 1;
  background: #ffffff;
  border-radius: 2px;
  margin-top: 22px;
  display: flex;
  align-items: center;
  padding: 0 40px;
  .pic1 {
    // width: 52px;
    height: 49px;
    opacity: 1;
  }
  .pic1.nav3 {
    // width: 58px;
    height: 45px;
    opacity: 1;
  }
  .box1 {
    width: 121px;
    // margin: 0 6%;
    .txt {
      opacity: 1;
      font-size: 16px;
      font-family: SourceHanSansCN-Normal;
      text-align: center;
      color: #333333;
    }
    .txt2 {
      opacity: 1;
      font-size: 18px;
      font-family: SourceHanSansCN-Medium;
      text-align: center;
      color: #02b2e3;
      margin-top: 14px;
    }
  }
  .box1.nav3 {
    width: 141px;
    // margin: 0 16px;
    .txt2.nav3 {
      color: #ec9a17;
      opacity: 1;
      font-size: 18px;
      font-family: SourceHanSansCN-Medium;
      text-align: center;
      margin-top: 14px;
    }
  }
  .shu {
    width: 0px;
    height: 40px;
    opacity: 1;
    border: 1px solid #979797;
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