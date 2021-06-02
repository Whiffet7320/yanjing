<template>
  <div class="index">
    <div class="nav1">
      <div class="tit1">售后列表</div>
    </div>
    <div class="myForm">
      <el-form
        @submit.native.prevent
        :inline="true"
        :model="formInline"
        class="demo-form-inline"
      >
        <!-- <el-form-item label="关键词">
          <el-input
            v-model="formInline.search"
            placeholder="请输入关键词"
            @keyup.enter.native="onSearch"
          ></el-input>
        </el-form-item> -->
        <el-form-item label="只看">
          <el-checkbox-group v-model="formInline.type" @change="onCheck">
            <el-checkbox label="未处理"></el-checkbox>
            <el-checkbox label="申请通过"></el-checkbox>
            <el-checkbox label="申请被拒"></el-checkbox>
          </el-checkbox-group>
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
      <el-table :data="tableData" style="width: 100%">
        <el-table-column type="expand">
          <template slot-scope="props">
            <el-form label-position="left" inline class="demo-table-expand">
              <div v-for="(item, i) in props.row.goods" :key="i">
                <el-form-item label="商品名称">
                  <span>{{ item.goods_title }}</span>
                </el-form-item>
                <el-form-item label="购买数量">
                  <span>{{ item.goods_num }}</span>
                </el-form-item>
                <el-form-item label="商品主图">
                  <img
                    style="width: 100px; height: 100px; cursor: pointer"
                    :src="item.goods_pic"
                  />
                </el-form-item>
                <el-form-item label="购买价格">
                  <span>{{ item.goods_postage + item.goods_price }}</span>
                </el-form-item>
                <el-form-item label="商品分类">
                  <span>{{ item.goods_classify }}</span>
                </el-form-item>
              </div>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column
          :show-overflow-tooltip="true"
          prop="remark"
          label="客户名称"
        >
        </el-table-column>
        <!-- <el-table-column
          :show-overflow-tooltip="true"
          prop="realname"
          label="商品名称"
        >
        </el-table-column> -->
        <!-- <el-table-column
          :show-overflow-tooltip="true"
          prop="orders_status"
          label="货物状态"
        >
        </el-table-column> -->
        <el-table-column
          :show-overflow-tooltip="true"
          prop="orders_money"
          label="实付金额"
        >
        </el-table-column>
        <el-table-column
          :show-overflow-tooltip="true"
          prop="my_is_examine"
          label="状态"
        >
        </el-table-column>
        <el-table-column
          :show-overflow-tooltip="true"
          prop="refund_money"
          label="退款金额"
        >
        </el-table-column>
        <!-- <el-table-column
          :show-overflow-tooltip="true"
          prop="title"
          label="商品主图"
        >
          <template slot-scope="scope">
            <template v-for="(item, i) in scope.row.pic">
              <img
                v-if="item.name != ''"
                :key="i"
                style="width: 40px; height: 40px; cursor: pointer"
                :src="item.name"
              />
            </template>
          </template>
        </el-table-column> -->
        <el-table-column
          :show-overflow-tooltip="true"
          prop="types"
          label="售后类型"
        >
        </el-table-column>
        <el-table-column
          :show-overflow-tooltip="true"
          prop="createtime"
          label="申请时间"
        >
        </el-table-column>
        <el-table-column fixed="right" label="操作" width="160">
          <template slot-scope="scope">
            <el-button @click="tuikuan(scope.row)" type="text" size="small"
              >退款/换货</el-button
            >
            <el-button @click="jujietuikuan(scope.row)" type="text" size="small"
              >拒绝申请</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        class="fenye"
        @size-change="this.handleSizeChange"
        @current-change="this.handleCurrentChange"
        :current-page="this.shouhouliebiaoPage"
        :page-sizes="[10, 15, 20, 50]"
        :page-size="10"
        layout="total, sizes, prev, pager, next, jumper"
        :total="this.total"
      >
      </el-pagination>
    </div>
    <!-- 退款 -->
    <el-dialog
      title="退款金额"
      :visible.sync="editDialogVisible"
      width="30%"
      :before-close="editHandleClose"
    >
      <el-form ref="editform" :model="editform" label-width="80px">
        <el-form-item label="退款金额">
          <el-input v-model="editform.price"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="danger" @click="editOnSubmit">确定</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  computed: {
    ...mapState(["shouhouliebiaoPage", "shouhouliebiaoPageSize"]),
  },
  watch: {
    shouhouliebiaoPage: function (page) {
      this.$store.commit("shouhouliebiaoPage", page);
      this.getData();
    },
    shouhouliebiaoPageSize: function (pageSize) {
      this.$store.commit("shouhouliebiaoPageSize", pageSize);
      this.getData();
    },
  },
  data() {
    return {
      formInline: {
        search: "",
        type: [],
      },
      tableData: [],
      total: null,
      statusArr: [],
      status: "",
      //   退款
      editform: {
        price: "",
      },
      editDialogVisible: false,
    };
  },
  created() {
    this.getData();
  },
  methods: {
    async getData() {
      const res = await this.$api.order_postsale(
        sessionStorage.getItem("user_name"),
        sessionStorage.getItem("user_pass"),
        this.shouhouliebiaoPage,
        this.shouhouliebiaoPageSize,
        this.status
      );
      console.log(res);
      this.tableData = res.list;
      if (this.tableData) {
        this.tableData.forEach((ele) => {
          if (ele.is_examine == 0) {
            ele.my_is_examine = "未处理";
          } else if (ele.is_examine == 1) {
            ele.my_is_examine = "申请通过";
          } else if (ele.is_examine == 2) {
            ele.my_is_examine = "申请被拒";
          }
        });
      }

      this.total = res.total;
      console.log(this.tableData);
    },
    onSearch() {
      console.log(this.formInline);
      this.getData();
    },
    // 退款
    async tuikuan(row) {
      // this.editDialogVisible = true;
      const res = await this.$api.order_postsaleset(
        sessionStorage.getItem("user_name"),
        sessionStorage.getItem("user_pass"),
        row.id,
        1
      );
      console.log(res)
      if(res.result == 1){
        this.$message({
          message: res.msg,
          type: 'success'
        });
      }else{
        this.$message.error(res.msg);
      }
    },
    // 拒绝申请
    async jujietuikuan(row){
      const res = await this.$api.order_postsaleset(
        sessionStorage.getItem("user_name"),
        sessionStorage.getItem("user_pass"),
        row.id,
        2
      );
      console.log(res)
      if(res.result == 1){
        this.$message({
          message: res.msg,
          type: 'success'
        });
      }else{
        this.$message.error(res.msg);
      }
    },
    // 退款确定
    editOnSubmit() {},
    editHandleClose() {
      this.editDialogVisible = false;
    },
    // 重置
    onReset() {
      this.$store.commit("huowuzhuangtaiPage", 1);
      this.formInline.search = "";
      this.formInline.type = [];
      this.status = "";
      this.getData();
    },
    onCheck(val) {
      this.statusArr = [];
      console.log(val);
      val.forEach((ele) => {
        if (val.indexOf(ele) != -1) {
          if (ele == "未处理") {
            this.statusArr.push(0);
          }
          if (ele == "申请通过") {
            this.statusArr.push(1);
          }
          if (ele == "申请被拒") {
            this.statusArr.push(2);
          }
        }
      });
      this.status = this.statusArr.toString();
    },
    // 分页
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.$store.commit("shouhouliebiaoPageSize", val);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.$store.commit("shouhouliebiaoPage", val);
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
    font-size: 30px;
    font-family: YouSheBiaoTiHei, YouSheBiaoTiHei-Regular;
    font-weight: 400;
    text-align: left;
    line-height: 80px;
    margin-left: 40px;
    color: #ebbfcc;
  }
}
.myForm {
  margin-top: 30px;
  padding-left: 30px;
}
.myTable {
  margin-right: 30px;
}
/deep/ .el-form-item {
  margin-right: 20px;
}

/deep/ .demo-table-expand {
  font-size: 0;
}
/deep/ .demo-table-expand label {
  width: 90px;
  color: #99a9bf;
}
/deep/ .demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 50%;
}
.fenye {
  margin: 20px 0;
}
</style>