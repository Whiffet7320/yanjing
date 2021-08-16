<template>
  <div class="index">
    <div class="nav1">
      <div class="tit1">轮播图列表</div>
    </div>
    <div class="myForm">
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="ID">
          <el-input
            v-model="formInline.idName"
            placeholder="请输入ID"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="danger" @click="onSearch">查询</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="danger" @click="onAdd">新增</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="myTable">
      <el-table :data="tableData" style="width: 100%">
        <el-table-column :show-overflow-tooltip="true" prop="id" label="id">
        </el-table-column>
        <el-table-column :show-overflow-tooltip="true" prop="id" label="轮播图">
          <template slot-scope="scope">
            <img
              style="width: 40px; height: 40px; cursor: pointer"
              :src="scope.row.img"
            />
          </template>
        </el-table-column>
        <el-table-column
          :show-overflow-tooltip="true"
          prop="title"
          label="分类名称"
        >
        </el-table-column>
        <el-table-column fixed="right" label="操作" width="100">
          <template slot-scope="scope">
            <!-- <el-button @click="edit(scope.row)" type="text" size="small"
              >修改</el-button
            > -->
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
        :current-page="this.lbtPage"
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
    ...mapState(["lbtPage", "lbtPageSize"]),
  },
  watch: {
    lbtPage: function (page) {
      this.$store.commit("lbtPage", page);
      this.getData();
    },
    lbtPageSize: function (pageSize) {
      this.$store.commit("lbtPageSize", pageSize);
      this.getData();
    },
  },
  data() {
    return {
      formInline: {
        idName: "",
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
      const res = await this.$api.bannerIndex();
      console.log(res);
      this.tableData = res.data.data;
      this.total = res.data.total;
      this.tableData.forEach((ele) => {
        if (ele.path.slice(0, 1) == ".") {
          ele.path = ele.path.substr(1);
        }
        ele.img = ele.domain + ele.path;
      });
    },
    onSearch() {},
    onAdd() {
      this.$router.push({ name: "Lunbotu" });
    },
    async del(row) {
      console.log(row)
      const res = await this.$api.bannerDel(row.id);
      if (res.code == 200) {
        this.$message({
          message: res.message,
          type: "success",
        });
        this.getData();
      }
    },
    // 分页
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.$store.commit("lbtPageSize", val);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.$store.commit("lbtPage", val);
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