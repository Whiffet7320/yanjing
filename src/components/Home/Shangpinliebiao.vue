<template>
  <div class="index">
    <div class="nav1">
      <div class="tit1">产品列表</div>
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
            @keyup.enter.native="onSubmit"
          ></el-input>
        </el-form-item>
        <el-form-item label="分 类" prop="category_id">
          <el-cascader
            v-model="formInline.category_id"
            :options="options"
            :props="{ checkStrictly: true }"
            clearable
          ></el-cascader>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">查询</el-button>
        </el-form-item>
        <el-form-item>
          <el-button @click="onReset">重置</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="danger" @click="onAdd">新增商品</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="myTable">
      <el-table :data="tableData" style="width: 100%">
        <el-table-column type="expand">
          <template slot-scope="props">
            <el-form label-position="left" inline class="demo-table-expand">
              <div v-for="(item, i) in props.row.sku_arr" :key="i">
                <el-form-item label="规格">
                  <span>{{ item.size }}</span>
                </el-form-item>
                <el-form-item label="价格">
                  <span>{{ item.price }}</span>
                </el-form-item>
              </div>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column
          :show-overflow-tooltip="true"
          prop="title"
          label="商品标题"
        >
        </el-table-column>
        <el-table-column
          :show-overflow-tooltip="true"
          prop="category_name"
          label="商品分类"
        >
        </el-table-column>
        <el-table-column
          :show-overflow-tooltip="true"
          prop="prompt"
          label="提示语"
        >
        </el-table-column>
        <el-table-column
          :show-overflow-tooltip="true"
          prop="title"
          label="主图"
        >
          <template slot-scope="scope">
            <!-- <div class="splbImg" v-for="(item, i) in scope.row.pic" :key="i"> -->
            <template v-for="(item, i) in scope.row.pic_arr">
              <img
                v-if="item.img != ''"
                :key="i"
                style="width: 40px; height: 40px; cursor: pointer"
                :src="item.img"
              />
            </template>

            <!-- </div> -->
          </template>
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
      <el-pagination
        class="fenye"
        @size-change="this.handleSizeChange"
        @current-change="this.handleCurrentChange"
        :current-page="this.page"
        :page-sizes="[10, 15, 20, 50]"
        :page-size="10"
        layout="total, sizes, prev, pager, next, jumper"
        :total="this.total"
      >
      </el-pagination>
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
import { mapState } from "vuex";
export default {
  computed: {
    ...mapState(["page", "pageSize"]),
  },
  data() {
    return {
      options: null, //分类列表
      total: null,
      formInline: {
        search: "",
        category_id: [],
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
  watch: {
    page: function (page) {
      this.$store.commit("page", page);
      this.getData();
    },
    pageSize: function (pageSize) {
      this.$store.commit("pageSize", pageSize);
      this.getData();
    },
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
      const res2 = await this.$api.categoryIndex();
      console.log(res2);
      res2.data.forEach((ele) => {
        ele.value = ele.category_id;
        ele.label = ele.title;
        if (ele.children) {
          ele.children.forEach((item) => {
            item.value = item.category_id;
            item.label = item.title;
            if (item.children) {
              item.children.forEach((item2) => {
                item2.value = item2.category_id;
                item2.label = item2.title;
              });
            }
          });
        }
      });
      this.options = res2.data;
      const res = await this.$api.productIndex(
        this.formInline.search,
        this.formInline.category_id.length != 0
          ? this.formInline.category_id[this.formInline.category_id.length - 1]
          : "",
        this.page,
        this.pageSize
      );
      this.total = res.data.total;
      console.log(res);
      this.tableData = res.data.data;
      this.tableData.forEach((ele) => {
        ele.pic_arr.forEach((item) => {
          if (item.path.slice(0, 1) == ".") {
            item.path = item.path.substr(1);
          }
          item.img = item.domain + item.path;
        });
      });
    },
    // 分页
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.$store.commit("pageSize", val);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.$store.commit("page", val);
    },
    onSubmit() {
      this.$store.commit("page", 1);
      this.getData();
    },
    // 重置
    onReset() {
      this.$store.commit("page", 1);
      this.formInline.search = "";
      this.formInline.category_id = "";
      this.getData();
    },
    onAdd() {
      this.$store.commit("shangpinEditform", null);
      this.$router.push({ name: "Xinjianshangping" });
    },
    async edit(row) {
      console.log(row);
      this.$store.commit("shangpinEditform", row);
      this.$router.push({ name: "Xinjianshangping" });
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
      const res = await this.$api.productDelete_product(row.id);
      if (res.code == 200) {
        this.$message({
          message: res.message,
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
        this.addform.title = "";
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
.el-tooltip {
  display: flex !important;
}
.fenye {
  margin: 20px 0;
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
  width: 20%;
}
</style>