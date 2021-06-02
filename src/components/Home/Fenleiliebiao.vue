<template>
  <div class="index">
    <div class="nav1">
      <div class="tit1">分类列表</div>
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
        <el-table-column :show-overflow-tooltip="true" prop="sort" label="排序">
        </el-table-column>
        <el-table-column
          :show-overflow-tooltip="true"
          prop="title"
          label="分类名称"
        >
        </el-table-column>
        <el-table-column fixed="right" label="操作" width="100">
          <template slot-scope="scope">
            <el-button @click="edit(scope.row)" type="text" size="small"
              >修改</el-button
            >
            <el-button @click="del(scope.row)" type="text" size="small"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 修改 -->
    <el-dialog
      title="修改分类"
      :visible.sync="editDialogVisible"
      width="30%"
      :before-close="editHandleClose"
    >
      <el-form ref="editform" :model="editform" label-width="80px">
        <el-form-item label="分类标题">
          <el-input v-model="editform.title"></el-input>
        </el-form-item>
        <el-form-item label="排序值">
          <el-input v-model="editform.sort"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="editOnSubmit">保存</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <!-- 添加 -->
    <el-dialog
      title="添加分类"
      :visible.sync="addDialogVisible"
      width="30%"
      :before-close="addHandleClose"
    >
      <el-form ref="addform" :model="addform" label-width="80px">
        <el-form-item label="分类标题">
          <el-input v-model="addform.title"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="addOnSubmit">保存</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
// import axios from 'axios'
export default {
  data() {
    return {
      formInline: {
        idName: "",
      },
      tableData: [],
      editDialogVisible: false,
      editform: {
        title: "",
        sort: "",
      },
      editId: null,
      addDialogVisible: false,
      addform: {
        title: "",
      },
      addId: null,
    };
  },
  created() {
    this.getData();
  },
  methods: {
    // async checkLogin() {
    //   const resp = await this.$api.logincheck(
    //     sessionStorage.getItem("user_name"),
    //     sessionStorage.getItem("user_pass")
    //   );
    //   if (resp.result == 1) {
    //     sessionStorage.setItem("token", resp.sign_token);
    //     sessionStorage.setItem("isLogin", true);
    //   }
    // },
    async getData() {
      const res = await this.$api.listclassify();
      console.log(res.list);
      this.tableData = res.list;
      const resp = await this.$api.logincheck(
        sessionStorage.getItem("user_name"),
        sessionStorage.getItem("user_pass")
      );
      if (resp.result == 1) {
        sessionStorage.setItem("isLogin", true);
      } else {
        //   console.log(res)
        sessionStorage.setItem("token", null);
        sessionStorage.setItem("isLogin", null);
        this.$router.go(0);
        this.$router.push({ path: "/login" });
      }
    },
    onSearch() {
      console.log(this.formInline.idName);
    },
    onAdd() {
      this.addDialogVisible = true;
    },
    async edit(row) {
      console.log(row);
      this.editform = { ...row };
      this.editDialogVisible = true;
      this.editId = row.id;
      //   const res = await this.$api.updateclassify(
      //     this.editform.title,
      //     this.editform.sort,
      //     row.id,
      //     sessionStorage.getItem("token")
      //   );
      //   console.log(res)
    },
    async editOnSubmit() {
      const res = await this.$api.updateclassify(
        this.editform.title,
        this.editform.sort,
        this.editId,
        sessionStorage.getItem("user_name"),
        sessionStorage.getItem("user_pass")
      );
      console.log(res);
      if (res.result == 1) {
        this.$message({
          message: res.msg,
          type: "success",
        });
        this.editDialogVisible = false;
        this.getData();
      }
    },
    editHandleClose() {
      this.editDialogVisible = false;
    },
    async del(row) {
      const res = await this.$api.delclassify(
        row.id,
        sessionStorage.getItem("user_name"),
        sessionStorage.getItem("user_pass")
      );
      if (res.result == 1) {
        this.$message({
          message: res.msg,
          type: "success",
        });
        this.getData();
      }
    },
    addHandleClose() {
      this.addDialogVisible = false;
    },
    async addOnSubmit() {
      const res = await this.$api.addclassify(
        this.addform.title,
        sessionStorage.getItem("user_name"),
        sessionStorage.getItem("user_pass")
      );
      console.log(res);
      if (res.result == 1) {
        this.$message({
          message: res.msg,
          type: "success",
        });
        this.addDialogVisible = false;
        this.addform.title = ''
        this.getData();
      }
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