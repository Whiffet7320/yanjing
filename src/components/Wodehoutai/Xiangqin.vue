<template>
  <div class="index">
    <div class="nav1">
      <div class="tit1">我的后台</div>
    </div>
    <div class="nav2" @click="toBack">
      <i class="el-icon-arrow-left"></i>
      返回上一页
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
          prop="source"
          label="佣金来源"
          width="180"
        >
        </el-table-column>
        <el-table-column
          :show-overflow-tooltip="true"
          prop="user_commission"
          label="佣金"
        >
        </el-table-column>
        <el-table-column
          :show-overflow-tooltip="true"
          prop="user_balance"
          label="余额"
        >
        </el-table-column>
        <el-table-column
          :show-overflow-tooltip="true"
          prop="withdrawal_money"
          label="可提现额度"
        >
        </el-table-column>
        <el-table-column
          :show-overflow-tooltip="true"
          prop="userwithdrawal_type"
          label="提现方式"
        >
        </el-table-column>
        <el-table-column
          :show-overflow-tooltip="true"
          prop="userwithdrawal_money"
          label="提现金额"
        >
        </el-table-column>
        <el-table-column
          :show-overflow-tooltip="true"
          prop="userwithdrawal_time"
          label="提现时间"
        >
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableData: [],
    };
  },
  created() {
    this.getData();
  },
  methods: {
    async getData() {
      console.log(this.$route.params.userId);
      const res = await this.$api.quota_view(this.$route.params.userId);
      console.log(res);
      this.tableData = res.list;
    },
    toBack() {
      this.$router.push({ name: "Edu" });
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
.nav2 {
  cursor: pointer;
  margin-top: 20px;
  opacity: 1;
  font-size: 18px;
  font-family: SourceHanSansCN-Normal;
  text-align: left;
  color: #333333;
  line-height: 22px;
}
.myTable {
  margin-top: 20px;
  margin-right: 30px;
}
</style>