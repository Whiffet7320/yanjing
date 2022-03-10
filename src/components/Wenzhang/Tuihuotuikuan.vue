<template>
  <div class="index">
    <div class="nav1">退货退款政策</div>
    <div class="nav2">
      <div class="tit1">CCSpace退货和退款政策</div>
      <div
        class="tit2"
      >CCSpace提供365天保修（在收到产品后），涵盖材料和工艺方面的明显缺陷，并且只有在材料和工艺方面存在明显缺陷时才会进行一次性更换。如果有任何问题，例如不喜欢，尺寸问题，不舒服的处方，请在收到产品后30天内联系CCSpace客户服务团队，否则，问题将不被接受。</div>
      <div class="tit2">注意：我们的保修不包括因事故、疏忽或护理不当造成的损坏和/或退货请求。</div>
      <div class="tit2">如果您在订购过程中出现错误，您可以联系CCSpace客户服务团队以获得未来购买的特别折扣或部分退款至原始付款帐户（借记卡/信用卡或PayPal）。</div>
      <div class="tit2">如果有任何制造错误，请联系我们，我们将为您重新制作新眼镜，不收取额外费用或在问题确认后全额退款。</div>
      <div class="tit1">订单修改/取消</div>
      <div
        class="tit2"
      >如果您想修改/取消订单，请在下单后24小时内联系Zeelool客户服务团队。如果存在价格差异，将产生额外费用。对于超过24小时的任何修改/取消请求，请参阅下表以查看额外费用。</div>
    </div>
    <div class="nav3">
      <vxe-table border align="center" :data="tableData">
        <vxe-column field="t1" title></vxe-column>
        <vxe-column field="t2" title="发货前（单超过24小时）"></vxe-column>
        <vxe-column field="t3" title="发货后"></vxe-column>
      </vxe-table>
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
}
</style>