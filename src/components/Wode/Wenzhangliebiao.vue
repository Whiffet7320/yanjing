<template>
  <div class="index">
    <div class="nav1">
      <div class="tit1">文章列表</div>
    </div>
    <!-- <div class="myForm">
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
    </div> -->
    <div class="myTable">
      <el-table :data="tableData" style="width: 100%">
        <el-table-column
          :show-overflow-tooltip="true"
          prop="id"
          label="id"
          width="180"
        >
        </el-table-column>
        <el-table-column
          :show-overflow-tooltip="true"
          prop="title"
          label="文章标题"
        >
        </el-table-column>
        <el-table-column fixed="right" label="操作" width="100">
          <template slot-scope="scope">
            <el-button @click="edit(scope.row)" type="text" size="small"
              >编辑</el-button
            >
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
        :current-page="this.wenzhangPage"
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
    ...mapState(["wenzhangPage", "wenzhangPageSize"]),
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
    wenzhangPage: function (page) {
      this.$store.commit("wenzhangPage", page);
      this.getData();
    },
    wenzhangPageSize: function (pageSize) {
      this.$store.commit("wenzhangPageSize", pageSize);
      this.getData();
    },
  },
  methods: {
    async getData() {
      const res = await this.$api.otherArticle_list(
        'notice',
        this.wenzhangPage,
        this.wenzhangPageSize
      );
      console.log(res);
      this.tableData = res.data.data;
      this.total = res.data.total;
      console.log(this.tableData);
    },
    // 编辑
    edit(row){
      console.log(row)
      this.$store.commit('wenzhangObj',row);
      this.$router.push({name:'Tianjiawenzhang'});
    },
    // 删除
    async del(row){
      const res = await this.$api.otherDel_article(row.id)
      if (res.code == 200) {
          this.$message({
            message: res.message,
            type: "success",
          });
          this.getData()
        }
    },
    onSearch() {
      this.getData();
    },
    // 重置
    onReset() {
      this.$store.commit("wenzhangPage", 1);
      this.formInline.search = "";
      this.getData();
    },
    // 分页
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.$store.commit("wenzhangPageSize", val);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.$store.commit("wenzhangPage", val);
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
  margin-top: 30px;
  margin-right: 30px;
}
</style>