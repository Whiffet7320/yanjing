<template>
  <div class="index">
    <div class="nav1">
      <div class="tit1">平台用户注册表</div>
    </div>
    <div class="myForm">
      <el-form
        @submit.native.prevent
        :inline="true"
        :model="formInline"
        class="demo-form-inline"
      >
        <el-form-item label="用户名搜索">
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
        <!-- <vxe-table-column
          show-header-overflow
          show-overflow="title"
          show-footer-overflow
          field="mobile"
          title="手机号码"
        ></vxe-table-column> -->
        <vxe-table-column
          show-header-overflow
          show-overflow="title"
          show-footer-overflow
          field="myAddress"
          title="送货默认地址"
          min-width="240"
        ></vxe-table-column>
        <vxe-table-column field="create_at" title="注册时间"></vxe-table-column>
        <vxe-table-column title="团队" width="80">
          <template slot-scope="scope">
            <el-button @click="see(scope.row)" type="text" size="small"
              >查看</el-button
            >
          </template>
        </vxe-table-column>
      </vxe-table>
      <el-pagination
        class="fenye"
        @size-change="this.handleSizeChange"
        @current-change="this.handleCurrentChange"
        :current-page="this.pingtaiyonghuzhucePage"
        :page-sizes="[10, 15, 20, 50]"
        :page-size="10"
        layout="total, sizes, prev, pager, next, jumper"
        :total="this.total"
      >
      </el-pagination>
    </div>
    <!-- 查看下级列表 -->
    <el-dialog
      title="发货"
      :visible.sync="xiajiDialogVisible"
      width="70%"
      :before-close="xiajiHandleClose"
    >
      <div class="myTable1">
        <vxe-table
          resizable
          highlight-current-row
          highlight-current-column
          border="inner"
          :data="xialaTableData"
        >
          <vxe-table-column
            min-width="120"
            field="nickname"
            show-header-overflow
            show-overflow="title"
            show-footer-overflow
            title="用户名称"
          ></vxe-table-column>
          <!-- <vxe-table-column
            show-header-overflow
            show-overflow="title"
            show-footer-overflow
            field="mobile"
            title="手机号码"
          ></vxe-table-column> -->
          <vxe-table-column
            show-header-overflow
            show-overflow="title"
            show-footer-overflow
            field="money"
            title="下级返利额"
            min-width="140"
          ></vxe-table-column>
          <vxe-table-column
            field="create_at"
            title="注册时间"
          ></vxe-table-column>
        </vxe-table>
        <el-pagination
          class="fenye"
          @size-change="this.xialahandleSizeChange"
          @current-change="this.xialahandleCurrentChange"
          :current-page="this.pingtaiyonghuzhucePage"
          :page-sizes="[10, 15, 20, 50]"
          :page-size="10"
          layout="total, sizes, prev, pager, next, jumper"
          :total="this.xialaTotal"
        >
        </el-pagination>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  computed: {
    ...mapState([
      "pingtaiyonghuzhucePage",
      "pingtaiyonghuzhucePageSize",
      "xialaPage",
      "xialaPageSize",
    ]),
  },
  watch: {
    pingtaiyonghuzhucePage: function (page) {
      this.$store.commit("pingtaiyonghuzhucePage", page);
      this.getData();
    },
    pingtaiyonghuzhucePageSize: function (pageSize) {
      this.$store.commit("pingtaiyonghuzhucePageSize", pageSize);
      this.getData();
    },
    xialaPage: function (page) {
      this.$store.commit("xialaPage", page);
      this.getData();
    },
    xialaPageSize: function (pageSize) {
      this.$store.commit("xialaPageSize", pageSize);
      this.getData();
    },
  },
  data() {
    return {
      formInline: {
        search: "",
      },
      tableData: [],
      xialaTableData: [],
      xialaTotal: null,
      total: null,
      xiajiDialogVisible: false,
    };
  },
  created() {
    this.getData();
  },
  methods: {
    async getData() {
      const res = await this.$api.userIndex(
        this.formInline.search,
        this.pingtaiyonghuzhucePage,
        this.pingtaiyonghuzhucePageSize
      );
      console.log(res);
      this.tableData = res.data.data;
      this.tableData.forEach((ele) => {
        if (ele.address) {
          ele.myAddress = `${ele.address.province}${ele.address.city}${ele.address.area}${ele.address.address}`;
        }
      });
      this.total = res.data.total;
    },
    async see(row) {
      console.log(row);
      this.xiajiDialogVisible = true;
      const res = await this.$api.userUser_children({
        keyword:this.formInline.search,
        user_id: row.id,
        page: this.xialaPage,
        limit: this.xialaPageSize,
      });
      console.log(res);
      this.xialaTotal = res.data.total;
      this.xialaTableData = res.data.data;
    },
    xiajiHandleClose() {
      this.xiajiDialogVisible = false;
    },
    onSearch() {
      this.getData()
    },
    onReset() {
      this.$store.commit("pingtaiyonghuzhucePage", 1);
      this.formInline.search = "";
      this.getData();
    },
    exportSelectEvent() {},
    // 分页
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.$store.commit("pingtaiyonghuzhucePageSize", val);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.$store.commit("pingtaiyonghuzhucePage", val);
    },
    xialahandleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.$store.commit("xialaPageSize", val);
    },
    xialahandleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.$store.commit("xialaPage", val);
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