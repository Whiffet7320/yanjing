<template>
  <div class="index">
    <div class="nav1">为什么选择 CCspace</div>
    <div class="nav2">
      <div class="tit1">精确的处方、准确性和质量保证是我们的首要任务</div>
      <div
        class="tit2"
      >CCspace使用最先进的镜片制造设备，我们的镜片实验室配备训练有素的眼科技术人员。产品组装线包括一些当今设计的最精美、最精美的镜头。如果您敢于需要我们的定制眼镜，这些数字镜片可提供最简单的适应，并为您提供平面视图中的良好视野。</div>
      <div class="tit2">当您在我们的平台上订购我们的任何产品时，请仔细检查以下指标：</div>
      <div class="tit2">型号和颜色根据其库存及其在线提供的信息。</div>
      <div class="tit2">这些在实验室中对框架进行质量控制检查，并在订购过程中进行选择。</div>
      <div class="tit2">所有镜头均由经验丰富的光学技术人员安装，并在整个组装过程中进行多次镜头精度检查。</div>
      <div class="tit2">请记住，我们所有的产品在发货前都经过六步质量检查。</div>
      <img
        class="pic1"
        src="https://img1.baidu.com/it/u=1410082512,1043177061&fm=253&fmt=auto&app=138&f=JPEG?w=400&h=400"
        alt
      />
      <div
        class="tit2"
      >此外，作为包装和运输过程的一部分，眼镜将再次重新检查，仅用于质量保证。所有实际操作的质量控制过程旨在让您每次都能收到最优质的眼镜！CCspace 以其多年来所拥有的工艺和每一副眼镜都满足其尊贵客户的极高标准而自豪。</div>
      <div
        class="tit2"
      >CCspace 等开创性的购物网站正积极尝试开创一个时尚眼镜既便宜又耐用的新时代。实际上，由于其高效的流程和较低的管理成本，Zeelool 确实以具有竞争力的价格销售超时尚、专业的处方质量眼镜。</div>
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