<template>
  <div class="index">
    <div class="nav1">
      <img
        src="https://img2.baidu.com/it/u=1208920319,2762754731&fm=253&fmt=auto&app=138&f=JPEG?w=752&h=500"
        class="pic"
        alt
      />
    </div>
    <div class="nav2">
      <el-row :gutter='100'>
        <el-col :span="12">
          <div class="n2-l">
            <div class="tit1">在CCSpace购买眼镜</div>
            <div class="tit2">这是CCSpace</div>
            <div
              class="tit3"
            >致力于帮助世界各地的人们拥有远见卓识。我们提供时尚、创新、优质的眼镜。凭借我们以实惠的价格快速交付系统，我们保证您每次都能获得卓越的网上购物体验。</div>
            <div
              class="tit3"
            >对于任何需要眼镜的人来说，佩戴一副价格合理、制作精良的眼镜应该不是一件困难的事。Zeelool只是为您这种垂死的需求提供了机会。无论您是学生、上班族、时尚达人还是家长，我们都能为您找到专属的眼镜。</div>
            <div
              class="tit3"
            >基于与UPS、FedEx、DHL等全球主要快递运营商的长期合作关系，Zeelool可以提供世界一流的运输服务。专业的仓库人员将严格按照我们的标准包装您的订单。您的产品将在发货前经过仔细检查和包装。每天，我们向全球数千名客户交付商品，这体现了我们作为全球最大在线眼镜供应商的承诺。</div>
          </div>
        </el-col>
        <el-col :span="12">
            <img src="../../assets/img/juxin178.png" alt="" class="picc">
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  }
};
</script>

<style lang="scss" scoped>
.index {
}
.nav1 {
  .pic {
    width: 100%;
    height: 555px;
  }
}
.nav2 {
  padding: 100px;
  background: #fafafa;
  .n2-l {
    .tit1 {
      margin-top: 40px;
      font-size: 20px;
      font-family: Segoe UI, Segoe UI-Regular;
      font-weight: 400;
      color: #707070;
    }
    .tit2 {
      margin-top: 40px;
      font-size: 40px;
      font-family: Segoe UI, Segoe UI-Regular;
      font-weight: 700;
      color: #1e1f33;
    }
    .tit3 {
      font-size: 20px;
      font-family: Segoe UI, Segoe UI-Regular;
      font-weight: 300;
      color: #707070;
      margin-top: 18px;
      line-height: 24px;
    }
  }
  .picc{
      width: 100%;
      height: 560px;
  }
}
</style>