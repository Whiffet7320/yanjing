<template>
  <div class="index">
    <div class="nav1">
      <div class="tit1">评论管理</div>
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
          prop="name"
          label="客户名称"
          width="120"
        >
        </el-table-column>
        <el-table-column
          :show-overflow-tooltip="true"
          prop="money"
          label="付款金额"
        >
        </el-table-column>
        <el-table-column
          :show-overflow-tooltip="true"
          prop="product_title"
          label="下单商品"
        >
        </el-table-column>
        <el-table-column
          :show-overflow-tooltip="true"
          prop="mobile"
          label="手机号码"
        >
        </el-table-column>
        <el-table-column
          :show-overflow-tooltip="true"
          prop="content"
          label="评论内容"
          width="200"
        >
        </el-table-column>
        <el-table-column
          :show-overflow-tooltip="true"
          prop="create_at"
          label="评论时间"
        >
        </el-table-column>
        <el-table-column fixed="right" label="操作" width="100">
          <template slot-scope="scope">
            <el-button @click="del(scope.row)" type="text" size="small"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        class="fenye"
        @size-change="this.handleSizeChange"
        @current-change="this.handleCurrentChange"
        :current-page="this.pinglunliebiaoPage"
        :page-sizes="[10, 15, 20, 50]"
        :page-size="10"
        layout="total, sizes, prev, pager, next, jumper"
        :total="this.total"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  computed: {
    ...mapState(["pinglunliebiaoPage", "pinglunliebiaoPageSize"]),
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
    };
  },
  created() {
    this.getData();
  },
  watch: {
    pinglunliebiaoPage: function (page) {
      this.$store.commit("pinglunliebiaoPage", page);
      this.getData();
    },
    pinglunliebiaoPageSize: function (pageSize) {
      this.$store.commit("pinglunliebiaoPageSize", pageSize);
      this.getData();
    },
  },
  methods: {
    async getData() {
      const res = await this.$api.commitIndex(
        this.pinglunliebiaoPage,
        this.pinglunliebiaoPageSize,
        this.formInline.search
      );
      console.log(res);
      this.tableData = res.data.data;
      this.total = res.data.total;
      console.log(this.tableData);
    },
    // 删除
    async del(row) {
      const res = await this.$api.commitDel_commit(row.id);
      if (res.code == 200) {
        this.$message({
          message: res.message,
          type: "success",
        });
        this.getData();
      } else {
        this.$message.error(res.message);
      }
    },
    onSearch() {
      this.getData();
    },
    // 重置
    onReset() {
      this.$store.commit("pinglunliebiaoPage", 1);
      this.formInline.search = "";
      this.getData();
    },
    // 分页
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.$store.commit("pinglunliebiaoPageSize", val);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.$store.commit("pinglunliebiaoPage", val);
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
.fenye{
  margin: 20px 0;
}
</style>