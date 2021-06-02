<template>
  <div class="index">
    <div class="nav1">
      <div class="tit1">全平台的免单记录</div>
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
          prop="realname"
          label="客户名称"
          width="180"
        >
        </el-table-column>
        <el-table-column
          :show-overflow-tooltip="true"
          prop="mobile"
          label="联系方式"
        >
        </el-table-column>
        <el-table-column
          :show-overflow-tooltip="true"
          prop="order_no"
          label="订单编号"
        >
        </el-table-column>
        <el-table-column
          :show-overflow-tooltip="true"
          prop="goods_price"
          label="商品原价"
        >
        </el-table-column>
        <el-table-column
          :show-overflow-tooltip="true"
          prop="classify"
          label="商品分类"
        >
        </el-table-column>
        <el-table-column
          :show-overflow-tooltip="true"
          prop="paytime"
          label="下单时间"
        >
        </el-table-column>
      </el-table>
      <el-pagination
        class="fenye"
        @size-change="this.handleSizeChange"
        @current-change="this.handleCurrentChange"
        :current-page="this.miandanjiluPage"
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
    ...mapState(["miandanjiluPage", "miandanjiluPageSize"]),
  },
  data() {
    return {
      formInline: {
        search: "",
      },
      tableData: [],
      total: null,
    };
  },
  created() {
    this.getData();
  },
  watch: {
    page: function (page) {
      this.$store.commit("miandanjiluPage", page);
      this.getData();
    },
    pageSize: function (pageSize) {
      this.$store.commit("miandanjiluPageSize", pageSize);
      this.getData();
    },
  },
  methods: {
    async getData() {
      const res = await this.$api.user_freeorder(
        this.miandanjiluPage,
        this.miandanjiluPageSize,
        this.formInline.search
      );
      this.tableData = res.list;
      this.total = res.total;
      console.log(this.tableData);
    },
    onSearch() {
      this.getData();
    },
    // 重置
    onReset() {
      this.$store.commit("miandanjiluPage", 1);
      this.formInline.search = "";
      this.getData();
    },
    // 分页
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.$store.commit("miandanjiluPageSize", val);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.$store.commit("miandanjiluPage", val);
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