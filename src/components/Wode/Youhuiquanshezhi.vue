<template>
  <div class="index">
    <div class="nav1">
      <div class="tit1">优惠卷设置</div>
    </div>
    <div class="myForm">
      <el-form
        @submit.native.prevent
        :inline="true"
        :model="formInline"
        class="demo-form-inline"
      >
        <el-form-item label="搜索用户赠送优惠卷">
          <el-input
            v-model="formInline.search"
            placeholder="请输入关键词"
            @keyup.enter.native="onSearch"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSearch">查询</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="myTable">
      <el-table :data="tableData" style="width: 100%">
        <el-table-column
        width=500
          :show-overflow-tooltip="true"
          prop="nickname"
          label="用户名称"
        >
        </el-table-column>
        <el-table-column
          :show-overflow-tooltip="true"
          prop="avatar"
          label="头像"
        >
          <template slot-scope="scope">
            <img
              style="width: 40px; height: 40px; cursor: pointer"
              :src="scope.row.avatar"
            />
          </template>
        </el-table-column>
        <el-table-column
          :show-overflow-tooltip="true"
          prop="mobile"
          label="手机号码"
        >
        </el-table-column>
        <!-- <el-table-column :show-overflow-tooltip="true" prop="mobile" label="店铺地址">
        </el-table-column> -->
      </el-table>
      <el-pagination
        class="fenye"
        @size-change="this.handleSizeChange"
        @current-change="this.handleCurrentChange"
        :current-page="this.userPage"
        :page-sizes="[10, 15, 20, 50]"
        :page-size="10"
        layout="total, sizes, prev, pager, next, jumper"
        :total="this.total"
      >
      </el-pagination>
    </div>
    <div class="myForm">
      <el-form
        @submit.native.prevent
        :inline="true"
        :model="formInline"
        class="demo-form-inline"
      >
        <el-form-item label="优惠卷面值">
          <el-select v-model="formInlinetwo.region" placeholder="选择优惠券">
            <el-option
              v-for="item in option"
              :key="item.id"
              :label="item.tit"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">确定</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  computed: {
    ...mapState(["userPage", "userPageSize"]),
  },
  watch: {
    userPage: function (userPage) {
      this.$store.commit("userPage", userPage);
      this.getData();
    },
    userPageSize: function (userPageSize) {
      this.$store.commit("userPageSize", userPageSize);
      this.getData();
    },
  },
  data() {
    return {
      formInline: {
        search: "",
      },
      tableData: [],
      total: 0,
      formInlinetwo: {
        region: "",
      },
      option: [],
    };
  },
  created() {
    this.getOption();
  },
  methods: {
    async getOption() {
      const res = await this.$api.couponsIndex(1, 100);
      console.log(res);
      this.option = res.data.data;
      this.option.forEach((ele) => {
        ele.tit = `满${ele.face_value}减${ele.discount}`;
      });
    },
    async onSearch() {
      const res = await this.$api.userIndex(
        this.formInline.search,
        this.userPage,
        this.userPageSize
      );
      console.log(res);
      this.tableData = res.data.data;
      this.total = res.data.total;
    },
    async onSubmit() {
      var user_id = [];
      this.tableData.forEach((ele) => {
        user_id.push(ele.id);
      });
      console.log(user_id);
      const res = await this.$api.userCoupons2user(
        user_id,
        this.formInlinetwo.region
      );
      console.log(res);
      if (res.code == 200) {
        this.$message({
          message: res.message,
          type: "success",
        });
        setTimeout(()=>{
            this.$router.go(0)
        },500)
      }
    },
    // 分页
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.$store.commit("userPageSize", val);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.$store.commit("userPage", val);
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