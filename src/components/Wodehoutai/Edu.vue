<template>
  <div class="index">
    <div class="nav1">
      <div class="tit1">提现列表</div>
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
        <el-form-item label="状态">
          <el-checkbox-group v-model="formInline.type" @change="onCheck">
            <el-checkbox label="未处理"></el-checkbox>
            <el-checkbox label="提现通过"></el-checkbox>
            <el-checkbox label="提现被拒绝"></el-checkbox>
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
        <el-table-column
          :show-overflow-tooltip="true"
          prop="realname"
          label="用户名称"
        >
        </el-table-column>
        <el-table-column
          :show-overflow-tooltip="true"
          prop="withdrawal_typename"
          label="提现类型"
        >
        </el-table-column>
        <el-table-column
          :show-overflow-tooltip="true"
          prop="account"
          label="提现账号"
        >
        </el-table-column>
        <el-table-column
          :show-overflow-tooltip="true"
          prop="bankname"
          label="开户行"
        >
        </el-table-column>
        <el-table-column
          :show-overflow-tooltip="true"
          prop="money"
          label="金额"
        >
        </el-table-column>
        <el-table-column
          :show-overflow-tooltip="true"
          prop="withdrawal_status"
          label="提现状态"
        >
        </el-table-column>
        <el-table-column
          :show-overflow-tooltip="true"
          prop="createtime"
          label="提现时间"
        >
        </el-table-column>
        <el-table-column fixed="right" label="操作" width="100">
          <template slot-scope="scope">
            <el-button :disabled="scope.row.withdrawal_statusval != 0" @click="shenhe(scope.row)" type="text" size="small"
              >审核</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        class="fenye"
        @size-change="this.handleSizeChange"
        @current-change="this.handleCurrentChange"
        :current-page="this.eduPage"
        :page-sizes="[10, 15, 20, 50]"
        :page-size="10"
        layout="total, sizes, prev, pager, next, jumper"
        :total="this.total"
      >
      </el-pagination>
    </div>
    <!-- 审核 -->
    <el-dialog
      title="提现审核"
      :visible.sync="shenhedialogVisible"
      width="30%"
      :before-close="shenhehandleClose"
    >
      <el-form ref="shenheForm" :model="shenheForm" label-width="80px">
        <el-form-item label="审核备注">
          <el-input v-model="shenheForm.remark"></el-input>
        </el-form-item>
        <el-form-item label="特殊资源">
          <el-radio-group v-model="shenheForm.status">
            <el-radio label="提现通过"></el-radio>
            <el-radio label="提现被拒绝"></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onshenheSubmit">提交</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  computed: {
    ...mapState(["eduPage", "eduPageSize"]),
  },
  data() {
    return {
      formInline: {
        search: "",
        type: [],
      },
      tableData: [],
      total: null,
      shenhedialogVisible: false,
      shenheForm: {
        remark: "",
        status: "",
        mystatus: "",
      },
      id: "",
      statusArr: [],
      status: "",
    };
  },
  created() {
    this.getData();
  },
  watch: {
    eduPage: function (page) {
      this.$store.commit("eduPage", page);
      this.getData();
    },
    eduPageSize: function (pageSize) {
      this.$store.commit("eduPageSize", pageSize);
      this.getData();
    },
  },
  methods: {
    async getData() {
      // 额度
      // const res = await this.$api.quota_list(
      //   this.eduPage,
      //   this.eduPageSize,
      //   this.formInline.search
      // );
      // 提现列表
      const res = await this.$api.withdrawal_list(
        sessionStorage.getItem("user_name"),
        sessionStorage.getItem("user_pass"),
        this.eduPage,
        this.eduPageSize,
        this.status
      );
      console.log(res);
      this.tableData = res.list;
      this.total = res.total;
      console.log(this.tableData);
    },
    onSearch() {
      this.getData();
    },
    // 分页
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.$store.commit("eduPageSize", val);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.$store.commit("eduPage", val);
    },
    // 重置
    onReset() {
      this.$store.commit("eduPage", 1);
      this.formInline.search = "";
      this.formInline.type = [];
      this.status = "";
      this.getData();
    },
    // toXiangqin(row) {
    //   this.$router.push({ name: "Xiangqin", params: { userId: row.user_id } });
    // },
    // 审核
    shenhe(row) {
      // console.log(row);
      this.id = row.id;
      this.shenhedialogVisible = true;
    },
    shenhehandleClose() {
      this.shenhedialogVisible = false;
    },
    //审核确认
    async onshenheSubmit() {
      if (this.shenheForm.status == "提现被拒绝") {
        this.shenheForm.mystatus = 2;
      } else if (this.shenheForm.status == "提现通过") {
        this.shenheForm.mystatus = 1;
      }
      console.log(this.id, this.shenheForm);
      const res = await this.$api.withdrawal(
        sessionStorage.getItem("user_name"),
        sessionStorage.getItem("user_pass"),
        this.id,
        this.shenheForm.remark,
        this.shenheForm.mystatus
      );
      if (res.result == 1) {
        this.$message({
          message: res.msg,
          type: "success",
        });
        this.getData();
        this.shenhedialogVisible = false;
      } else {
        this.$message.error(res.msg);
      }
    },
    onCheck(val) {
      this.statusArr = [];
      val.forEach((ele) => {
        if (val.indexOf(ele) != -1) {
          if (ele == "未处理") {
            this.statusArr.push(0);
          }
          if (ele == "提现通过") {
            this.statusArr.push(1);
          }
          if (ele == "提现被拒绝") {
            this.statusArr.push(2);
          }
        }
      });
      this.status = this.statusArr.toString();
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
</style>