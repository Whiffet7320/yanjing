<template>
  <div class="index">
    <div class="nav1">
      <div class="tit1">优惠卷管理</div>
    </div>
    <div class="myForm">
      <div class="top">
        <i class="el-icon-circle-plus-outline"></i>
        <span class="tit">增加新面额</span>
      </div>

      <el-form
        @submit.native.prevent
        :inline="true"
        :model="formInline"
        class="demo-form-inline"
      >
          <el-form-item label="满">
            <el-input
              v-model="formInline.face_value"
              placeholder="输入数值"
            ></el-input>
          </el-form-item>
          <el-form-item label="立减">
            <el-input
              v-model="formInline.discount"
              placeholder="输入数值"
            ></el-input>
          </el-form-item>
          <el-form-item label="优惠卷数量">
            <el-input
              v-model="formInline.stock"
              placeholder="输入数值"
            ></el-input>
          </el-form-item>
          <el-form-item label="是否注册时给予">
            <el-radio-group v-model="formInline.is_default">
              <el-radio :label="1">是</el-radio>
              <el-radio :label="0">否</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">新建面额</el-button>
          </el-form-item>
      </el-form>
    </div>
    <div class="myTable">
      <el-table :data="tableData" style="width: 100%">
        <el-table-column label="历史发布优惠卷">
          <template slot-scope="scope">
            <div class="flex">
              <div class="man">
                满{{ scope.row.face_value }}立减{{ scope.row.discount }}
              </div>
              <div class="num">
                优惠卷数量<span>{{ scope.row.stock }}</span>
              </div>
              <div class="user">
                用户注册时自动赠送
                <el-switch v-model="scope.row.is_default" disabled>
                </el-switch>
              </div>
            </div>
          </template>
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
        :current-page="this.yhqPage"
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
    ...mapState(["yhqPage", "yhqPageSize"]),
  },
  watch: {
    yhqPage: function (page) {
      this.$store.commit("yhqPage", page);
      this.getData();
    },
    yhqPageSize: function (pageSize) {
      this.$store.commit("yhqPageSize", pageSize);
      this.getData();
    },
  },
  data() {
    return {
      total: 0,
      tableData: [],
      formInline: {
        search: "",
        classify_id: "",
      },
    };
  },
  created() {
    this.getData();
  },
  methods: {
    async getData() {
      const res = await this.$api.couponsIndex(this.yhqPage, this.yhqPageSize);
      console.log(res);
      this.tableData = res.data.data;
      this.tableData.forEach(ele=>{
        ele.is_default = ele.is_default == 1 ? true : false
      })
    },
    async onSubmit() {
      console.log(this.formInline);
      const res = await this.$api.couponsAdd({
        face_value:this.formInline.face_value,
        discount:this.formInline.discount,
        stock:this.formInline.stock,
        is_default:this.formInline.is_default
      })
      console.log(res)
      if (res.code == 200) {
        this.$message({
          message: res.message,
          type: "success",
        });
        this.getData();
      }
    },
    // 删除
    async del(row){
      const res = await this.$api.couponsDel(row.id)
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
      this.$store.commit("yhqPageSize", val);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.$store.commit("yhqPage", val);
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
  margin-right: 30px;
  .top {
    margin: 20px 0;
    display: flex;
    align-items: center;
  }
  .el-icon-circle-plus-outline {
    font-size: 30px;
    color: #0160c4;
  }
  .tit {
    opacity: 1;
    font-size: 20px;
    font-family: zw;;
    font-weight: 400;
    color: #0160c4;
  }
  /deep/ .el-form-item__content {
    width: 140px
  }
}
.myTable {
  margin-right: 20px;
  .flex {
    display: flex;
    justify-content: space-between;
    margin-right: 100px;
    .num {
      // margin-left: 100px;
      span {
        margin-left: 15px;
        opacity: 1;
        font-family: zw;;
        font-weight: 400;
        text-align: left;
        color: #1a87ff;
      }
    }
    .user{
      // margin-left: 100px;
    }
  }
}
</style>