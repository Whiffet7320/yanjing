<template>
  <div class="index">
    <div class="nav1">
      <div class="tit1">货物详情</div>
    </div>
    <div class="container">
      <div class="top" @click="toBack">返回上一页</div>
      <div class="items">
        <div class="item">
          <div class="tit1">订单号</div>
          <div class="tit2">{{ hwxqObj.order_no }}</div>
        </div>
        <div class="item">
          <div class="tit1">创建时间</div>
          <div class="tit2">{{ hwxqObj.createtime }}</div>
        </div>
        <div class="item">
          <div class="tit1">支付金额</div>
          <div class="tit2 color">{{ hwxqObj.pay_money }}</div>
        </div>
        <div class="item">
          <div class="tit1">订单状态</div>
          <div class="tit2">{{ hwxqObj.orders_status }}</div>
        </div>
        <div class="item">
          <div class="tit1">总邮费</div>
          <div class="tit2 color">{{ hwxqObj.total_postage }}</div>
        </div>
        <div v-for="(item,i) in hwxqObj.goods" :key="i">
          <div class="item">
            <div class="tit1">商品名称</div>
            <div class="tit2">{{item.goods_title}}</div>
          </div>
          <div class="item">
            <div class="tit1">数量</div>
            <div class="tit2">{{item.goods_num}}</div>
          </div>
          <div class="item">
            <div class="tit1">类别</div>
            <div class="tit2">{{item.goods_classify}}</div>
          </div>
          <div class="item">
            <div class="tit1">图片</div>
            <img class="pic1" :src="item.goods_pic" alt="" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      hwxqObj: {},
    };
  },
  async created() {
    console.log(this.$route.params.id);
    const res = await this.$api.order_view(
      sessionStorage.getItem("user_name"),
      sessionStorage.getItem("user_pass"),
      this.$route.params.id
    );
    console.log(res);
    this.hwxqObj = res.order;
  },
  methods: {
    toBack() {
      this.$router.go(-1);
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
.container {
  .top {
    margin-top: 26px;
    margin-bottom: 24px;
    font-size: 16px;
    font-family: PingFang SC, PingFang SC-Regular;
    font-weight: 400;
    color: #707071;
    cursor: pointer;
  }
  .items {
    padding: 36px 0 0 53px;
    width: 551px;
    height: 465px;
    opacity: 1;
    background: #ffffff;
    border: 2px solid #ebbfcc;
    border-radius: 12px;
    .item {
      display: flex;
      margin-bottom: 15px;
      .tit1 {
        width: 100px;
        font-size: 18px;
        font-family: PingFang SC, PingFang SC-Heavy;
        font-weight: 800;
        text-align: left;
        color: rgba(0, 0, 0, 0.65);
        line-height: 22px;
      }
      .tit2 {
        font-size: 16px;
        font-family: PingFang SC, PingFang SC-Regular;
        font-weight: 400;
        text-align: left;
        color: rgba(0, 0, 0, 0.85);
        line-height: 22px;
      }
      .tit2.color {
        color: #ebbfcc;
      }
      .pic1 {
        width: 70px;
        height: 70px;
      }
    }
  }
}
</style>