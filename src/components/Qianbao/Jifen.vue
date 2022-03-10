<template>
  <div class="index">
    <div class="tit1">我的积分</div>

    <div class="nav1">
      <div class="txtt">
        您的奖励积分：
        <span class="sp">{{obj.integral}}</span>积分
      </div>
    </div>
    <div class="nav2">
      <div class="txt1">你怎么能赚积分？</div>
      <div class="txt2">您可以通过三种方式赚取积分：购物、网站上的积极互动和推荐朋友。详情如下：</div>
      <div class="txt2">1. 每消费1美元，您将获得1分，四舍五入到最接近的整数。</div>
      <div class="txt2">2. 审核产品4分，添加处方20分。</div>
      <div class="txt1" style="margin-top:40px">你怎么能用你的积分？</div>
      <div class="txt2">1美元兑换10积分，最高兑换积分为订单总金额的20%。积分以1美元为单位使用，小数部分不计算在内。</div>
      <div class="txt2">当订单状态完成时，奖励的积分将发送给用户。</div>
      <div class="txt2">积分将在一年后过期。您将在积分到期前一个月通过电子邮件收到提醒。</div>
      <div class="txt2">退货包裹将无法退回积分。（如果您用积分付款。）</div>
    </div>
    <div class="n3-txt1">交易记录</div>
    <div class="nav3">
      <div class="myTable">
        <vxe-table :data="tableData">
          <vxe-table-column field="id" title="ID"></vxe-table-column>
          <vxe-table-column field="mydate" title="日期"></vxe-table-column>
          <vxe-table-column field="jifen" title="积分"></vxe-table-column>
          <vxe-table-column field="xq" title="交易详情"></vxe-table-column>
          <!-- <vxe-table-column field="mark" width="250" title="备注"></vxe-table-column> -->
          <!-- <vxe-table-column field="pay_way" width="120" title="支付方式"></vxe-table-column> -->
        </vxe-table>
        <el-pagination
          background
          class="fenye"
          @current-change="this.handleCurrentChange"
          :current-page="this.jishiShougouPage"
          :page-size="10"
          layout="total, prev, pager, next"
          :total="this.total"
        ></el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  computed: {
    ...mapState(["jishiShougouPage"])
  },
  watch: {
    jishiShougouPage: function(page) {
      this.$store.commit("jishiShougouPage", page);
      this.getData();
    }
  },
  data() {
    return {
      status: "1",
      total: 0,
      tableData: [],
      obj:{},
    };
  },
  created() {
    this.$store.commit("jishiShougouPage", 1);
    this.getData()
  },
  methods: {
    async getData() {
      const res = await this.$api.user_info();
      console.log(res.data);
      this.obj = res.data;
    },
    changeStatus(val) {
      this.status = val;
    },
    // 分页
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.$store.commit("jishiShougouPage", val);
    }
  }
};
</script>

<style lang="scss" scoped>
.fenye {
  margin-top: 20px;
  margin-bottom: 20px;
}
.index {
}
.tit1 {
  font-size: 40px;
  font-family: PingFang SC, PingFang SC-Heavy;
  font-weight: 800;
  text-align: left;
  color: #1e1f33;
}

.nav1 {
  margin-top: 20px;
  margin-right: 60px;
  height: 100px;
  background: #ffffff;
  .txtt {
    margin-left: 42px;
    font-size: 30px;
    color: #1e1f33;
    line-height: 100px;
    .sp {
      color: #2626ff;
    }
  }
}
.nav2 {
  margin-top: 20px;
  background: #ffffff;
  padding: 54px 42px;
  .txt1 {
    margin-bottom: 20px;
    font-size: 26px;
    font-family: PingFang SC, PingFang SC-Bold;
    font-weight: 700;
    color: #1e1f33;
  }
  .txt2 {
    font-size: 20px;
    font-weight: 300;
    color: #1e1f33;
    line-height: 50px;
  }
}
.n3-txt1 {
  margin-top: 38px;
  margin-bottom: 28px;
  font-size: 40px;
  font-family: PingFang SC, PingFang SC-Heavy;
  font-weight: 800;
  color: #1e1f33;
}
.nav3 {
  margin-right: 60px;
  margin-top: 20px;
  padding: 20px 30px;
  background: #ffffff;
  margin-bottom: 40px;
}
</style>