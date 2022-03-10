<template>
  <div class="index">
    <div class="nav1">我们的承诺</div>
    <div class="nav2">
      <div class="tit1">我们的承诺</div>
      <div
        class="tit2"
      >在这个21世纪，无论您选择的是处方眼镜还是时尚眼镜，CCSpace始终致力于完善您的视力解决方案。凭借多年的经验，我们不断为客户在线提供所需的视觉解决方案。我们的业务是快速为您提供最佳的视觉解决方案来满足您的需求。</div>
      <div
        class="tit2"
      >CCSpace与UPS、TNT、FEDEX、USPS、DHL等世界知名快递公司合作，保证交货时间。CCSpace将向其客户提供每个订单的跟踪编号和跟踪链接，以确保您随时了解订单状态。</div>
      <div class="tit2">CCSpace保证您的满意。Zeelool的所有员工都处于服务的巅峰状态，以确保您获得100%的满意。</div>
      <div class="tit1">安全支付方式</div>
      <div class="tit2">您可以毫无后顾之忧地在CCSpace上支付账单。CCSpace与全球知名支付公司和银行合作。在CCSpace购物，您无需担心。</div>
      <div class="tit1">保证运输</div>
      <div class="tit2">在订购和选择眼镜过程后，运输部门将用坚固的盒子包装眼镜。然后快递公司会将它们发送到您在网站上填写的送货地址。同时，CCSpace会向您发送一封包含跟踪信息的电子邮件。这意味着，您可以随时跟踪您的眼镜。如果您仍然无法获取跟踪信息，您可以在网站上登录您的帐户查看您的订单状态，或者您可以联系我们的CCSpace客户服务(support@zeelool.com)以完全免费获取您的跟踪信息给你。CCSpace将尽最大努力确保您在最短的时间内拿到您的眼镜。</div>
      <div class="tit1">轻松退货和退款</div>
      <div class="tit2">不用担心如果您对在CCSpace订购的眼镜不满意，您可以选择退货换货或退款。欲知更多详情，请参阅退货及退款政策。在这里，您的每一分钱都将得到明智的使用。</div>
      <div class="tit1">及时跟踪信息</div>
      <div
        class="tit2"
      >CCSpace为其客户提供免费的跟踪信息。订单号生成后，您可以随时跟踪您的眼镜，直到它安全到达最终目的地。</div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableData: [
        {
          t1: "仅框架和配件",
          t2: "自由",
          t3: "订单金额的30%"
        },
        {
          t1: "处方眼镜",
          t2: "订单金额的10%",
          t3: "订单金额的30%"
        }
      ]
    };
  }
};
</script>

<style lang="scss" scoped>
.index {
  width: 1300px;
  padding: 60px;
  margin: 0 auto;
  background: #fafafa;
}
.nav1 {
  margin-top: 30px;
  font-size: 48px;
  font-family: PingFang SC, PingFang SC-Heavy;
  font-weight: 800;
  text-align: center;
  color: #1e1f33;
}
.nav2 {
  margin-top: 80px;
  margin-bottom: 20px;
  .tit1 {
    margin-top: 30px;
    font-size: 32px;
    font-family: Segoe UI, Segoe UI-Bold;
    font-weight: 700;
    color: #1e1f33;
    line-height: 40px;
  }
  .tit2 {
    margin-top: 10px;
    font-size: 20px;
    font-family: Segoe UI, Segoe UI-Bold;
    font-weight: 300;
    line-height: 24px;
    color: #707070;
  }
  .pic1 {
    margin: 70px 0;
    width: 100%;
    height: 1000px;
  }
}
</style>