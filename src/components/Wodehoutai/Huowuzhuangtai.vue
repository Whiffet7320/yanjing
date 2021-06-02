<template>
  <div class="index">
    <div class="nav1">
      <div class="tit1">货物状态</div>
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
        <el-form-item label="只看">
          <el-checkbox-group v-model="formInline.type" @change="onCheck">
            <el-checkbox label="待付款"></el-checkbox>
            <el-checkbox label="待发货"></el-checkbox>
            <el-checkbox label="待收货"></el-checkbox>
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
          label="客户名称"
          width="180"
        >
        </el-table-column>
        <el-table-column
          :show-overflow-tooltip="true"
          prop="orders_status"
          label="货物状态"
          width="180"
        >
        </el-table-column>
        <el-table-column
          :show-overflow-tooltip="true"
          prop="paymoney"
          label="实付金额"
        >
        </el-table-column>
        <!-- <el-table-column
          :show-overflow-tooltip="true"
          prop="classify"
          label="商品分类"
        >
        </el-table-column> -->
        <el-table-column
          :show-overflow-tooltip="true"
          prop="pay_type"
          label="付款方式"
        >
        </el-table-column>
        <el-table-column
          :show-overflow-tooltip="true"
          prop="createtime"
          label="下单时间"
        >
        </el-table-column>
        <el-table-column fixed="right" label="操作" width="100">
          <template slot-scope="scope">
            <el-button @click="see(scope.row)" type="text" size="small"
              >查看</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        class="fenye"
        @size-change="this.handleSizeChange"
        @current-change="this.handleCurrentChange"
        :current-page="this.huowuzhuangtaiPage"
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
    ...mapState(["huowuzhuangtaiPage", "huowuzhuangtaiPageSize"]),
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
  watch: {
    page: function (page) {
      this.$store.commit("huowuzhuangtaiPage", page);
      this.getData();
    },
    pageSize: function (pageSize) {
      this.$store.commit("huowuzhuangtaiPageSize", pageSize);
      this.getData();
    },
  },
  created() {
    this.getData();
  },
  methods: {
    async getData() {
      const res = await this.$api.user_order(
        this.huowuzhuangtaiPage,
        this.huowuzhuangtaiPageSize,
        this.formInline.search,
        this.status
      );
      console.log(res);
      this.tableData = res.list;
      this.total = res.total;
      console.log(this.tableData);
    },
    onSearch() {
      console.log(this.formInline);
      this.getData();
    },
    // 查看详情
    see(row) {
      console.log(row)
      this.$router.push({ name: "Huowuxiangqing" ,params:{id:row.id}});
    },
    // 分页
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.$store.commit("huowuzhuangtaiPageSize", val);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.$store.commit("huowuzhuangtaiPage", val);
    },
    // 重置
    onReset() {
      this.$store.commit("huowuzhuangtaiPage", 1);
      this.formInline.search = "";
      this.formInline.type = []
      this.status = "";
      this.getData();
    },
    onCheck(val) {
      this.statusArr = [];
      val.forEach((ele) => {
        if (val.indexOf(ele) != -1) {
          if (ele == "待付款") {
            this.statusArr.push(0);
          }
          if (ele == "待发货") {
            this.statusArr.push(1);
          }
          if (ele == "待收货") {
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
/deep/ .el-form-item {
  margin-right: 20px;
}
</style>