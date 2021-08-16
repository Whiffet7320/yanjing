<template>
  <div class="index">
    <div class="nav1">
      <div class="tit1">我的团队</div>
    </div>
        <div class="myTable">
      <el-button
        type="info"
        style="margin-bottom: 10px"
        @click="exportSelectEvent"
        >导出</el-button
      >
      <vxe-table
        resizable
        highlight-current-row
        highlight-current-column
        border="inner"
        ref="xTree"
        :tree-config="{ children: 'goods' }"
        :data="tableData"
      >
        <vxe-table-column
          min-width="120"
          field="nickname"
          show-header-overflow
          show-overflow="title"
          show-footer-overflow
          title="用户名称"
        ></vxe-table-column>
        <vxe-table-column
          show-header-overflow
          show-overflow="title"
          show-footer-overflow
          field="mobile"
          title="手机号码"
        ></vxe-table-column>
        <vxe-table-column
          show-header-overflow
          show-overflow="title"
          show-footer-overflow
          field="goods_title"
          title="送货默认地址"
          min-width="240"
        ></vxe-table-column>
        <vxe-table-column
          field="create_at"
          title="注册时间"
        ></vxe-table-column>
        <!-- <vxe-table-column title="操作" width="120">
          <template slot-scope="scope">
            <el-button @click="see(scope.row)" type="text" size="small"
              >查看</el-button
            >
            <el-button
              v-if="scope.row.orders_status != '待付款'"
              @click="cz(scope.row)"
              type="text"
              size="small"
              >操作</el-button
            >
          </template>
        </vxe-table-column> -->
      </vxe-table>
      <el-pagination
        class="fenye"
        @size-change="this.handleSizeChange"
        @current-change="this.handleCurrentChange"
        :current-page="this.WodetuanduiPage"
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
    ...mapState(["WodetuanduiPage", "WodetuanduiPageSize"]),
  },
  watch: {
    WodetuanduiPage: function (page) {
      this.$store.commit("WodetuanduiPage", page);
      this.getData();
    },
    WodetuanduiPageSize: function (pageSize) {
      this.$store.commit("WodetuanduiPageSize", pageSize);
      this.getData();
    },
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
  methods: {
    async getData() {
      const res = await this.$api.userIndex(
        this.formInline.search,
        this.WodetuanduiPage,
        this.WodetuanduiPageSize
      );
      console.log(res)
      this.tableData = res.data.data;
      this.total = res.data.total;
    },
    onSearch() {},
    onReset() {},
    exportSelectEvent() {},
    // 分页
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.$store.commit("WodetuanduiPageSize", val);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.$store.commit("WodetuanduiPage", val);
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
</style>