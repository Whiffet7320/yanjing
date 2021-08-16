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
      <vxe-table
        border
        resizable
        ref="xTree"
        :tree-config="{
          children: 'children',
        }"
        :data="tableData"
      >
        <vxe-table-column
          field="category_id"
          title="分类id"
          tree-node
        ></vxe-table-column>
        <vxe-table-column field="label" title="分类名称"></vxe-table-column>
        <vxe-table-column field="date" title="操作">
          <template slot-scope="scope">
            <el-button @click="edit(scope.row)" type="text" size="small"
              >修改</el-button
            >
            <el-button @click="del(scope.row)" type="text" size="small"
              >删除</el-button
            >
          </template>
        </vxe-table-column>
      </vxe-table>
      <el-pagination
        class="fenye"
        @size-change="this.handleSizeChange"
        @current-change="this.handleCurrentChange"
        :current-page="this.flPage"
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
        <el-form-item label="分类名称">
          <el-input v-model="editform.title"></el-input>
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
        <el-form-item label="父级分类">
          <el-cascader
            v-model="addform.pic"
            :options="options"
            :props="{ checkStrictly: true }"
            clearable
          ></el-cascader>
        </el-form-item>
        <el-form-item label="分类名称">
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
import { mapState } from "vuex";
export default {
  computed: {
    ...mapState(["flPage", "flPageSize"]),
  },
  watch: {
    flPage: function (page) {
      this.$store.commit("flPage", page);
      this.getData();
    },
    flPageSize: function (pageSize) {
      this.$store.commit("flPageSize", pageSize);
      this.getData();
    },
  },
  data() {
    return {
      total: 0,
      formInline: {
        idName: "",
      },
      options: [
        {
          value: "djfl",
          label: "顶级分类",
          children: [],
        },
      ],
      tableData: [],
      editDialogVisible: false,
      editform: {
        title: "",
      },
      editId: null,
      addDialogVisible: false,
      addform: {
        pic: "",
        title: "",
        mypic: null,
      },
      addId: null,
    };
  },
  created() {
    this.getData();
  },
  methods: {
    async getData() {
      const res = await this.$api.categoryIndex(this.flPage, this.flPageSize);
      console.log(res);
      this.total = res.data.total;
      res.data.forEach((ele) => {
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
      this.tableData = res.data;
      this.$set(this.options[0], "children", res.data);
    },
    // 分页
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.$store.commit("flPageSize", val);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.$store.commit("flPage", val);
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
    },
    async editOnSubmit() {
      const res = await this.$api.categoryEdit(
        this.editform.category_id,
        this.editform.pid,
        this.editform.title
      );
      console.log(res);
      if (res.code == 200) {
        this.$message({
          message: res.message,
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
      const res = await this.$api.categoryDel(row.category_id);
      if (res.code == 200) {
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
      console.log(this.addform);
      if (this.addform.pic.length == 1 && this.addform.pic[0] == "djfl") {
        this.addform.mypic = 0;
      }else {
        this.addform.mypic = this.addform.pic[this.addform.pic.length - 1];
      }
      const res = await this.$api.categoryAdd(
        this.addform.mypic,
        this.addform.title
      );
      console.log(res);
      if (res.code == 200) {
        this.$message({
          message: res.msg,
          type: "success",
        });
        this.addDialogVisible = false;
        this.addform.title = "";
        this.addform.pic = [];
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