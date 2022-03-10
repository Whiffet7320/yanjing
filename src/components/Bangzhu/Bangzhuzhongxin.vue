<template>
  <div class="index">
    <div class="nav1">
      <div class="tit1">帮助中心</div>
      <div class="tit2">
        <el-input v-model="input1" placeholder="请输入内容"></el-input>
        <i class="el-icon-search"></i>
      </div>
    </div>
    <div class="nav2">
      <div class="tit1">热门文章</div>
      <div class="items">
        <div class="item">
          <div class="txt1">清洁眼镜时的常见错误</div>
          <div @click="toWenzhang" class="txt2">查看更多</div>
        </div>
        <div class="shu"></div>
        <div class="item">
          <div class="txt1">你们的退货政策是什么</div>
          <div class="txt2">查看更多</div>
        </div>
        <div class="shu"></div>
        <div class="item">
          <div class="txt1">我们的眼镜什么时候可以到货</div>
          <div class="txt2">查看更多</div>
        </div>
      </div>
    </div>
    <div class="nav3">
      <div class="item item1">
        <div class="tit1">眼镜护理</div>
        <div class="tit2">查看更多</div>
      </div>
      <div class="item item2">
        <div class="tit1">经常问的问题</div>
        <div class="tit2">学到更多</div>
      </div>
      <div class="item item3">
        <div class="tit1">如何视频</div>
        <div class="tit2">查看更多</div>
      </div>
      <div class="item item4">
        <div class="tit1">经常问的问题</div>
        <div class="tit2">查看更多</div>
      </div>
    </div>
    <div class="nav4">
      <div class="item">
        <div class="tit1">热门视频</div>
        <div class="heng"></div>
        <div class="tit2">如何订购</div>
        <div class="tit2">如何测量您的瞳孔距离</div>
        <div class="tit2">如何更换眼镜中的镜片</div>
        <div class="btn">查看更多</div>
      </div>
      <div class="item">
        <div class="tit1">热门信息图表</div>
        <div class="heng"></div>
        <div class="tit2">最适合您脸型的眼镜</div>
        <div class="tit2">退货退款</div>
        <div class="tit2">如何测量您的框架尺寸</div>
        <div class="tit2">加工和运输</div>
        <div class="tit2">如何填写处方</div>
        <div class="btn">查看更多</div>
      </div>
      <div class="item">
        <div class="tit1">常见问题解答</div>
        <div class="heng"></div>
        <div class="tit2">如何追踪我的订单？</div>
        <div class="tit2">你运送到哪些国家？</div>
        <div class="tit2">什么是致光变色镜片？</div>
        <div class="tit2">你接受保险吗？</div>
        <div class="btn">查看更多</div>
      </div>
    </div>
    <div class="nav5">
      <div class="tit1">如果您对如何在线下订单有任何疑问，您可以通过聊天、电话或电子邮件与我们联系。</div>
      <div class="tit1">查看订单状态？您可以在我的订单中登录并查看状态。</div>
      <div class="tit1">聊天时间</div>
      <div class="tit1">在线聊天星期一白天 下午 4:30 - 次日凌晨 1:30（北京标准时间）</div>
      <div class="tit1">电话时间</div>
      <div class="tit1">星期一 白天 下午 4:30 - 次日凌晨 1:30（北京标准时间）</div>
      <div class="tit1">给我们发电子邮件</div>
      <div class="tit1">通过support@ccspace.com向我们发送电子邮件</div>
    </div>
    <div class="nav10">
      <div class="n10-txt1">在CCSpace购买眼镜</div>
      <div
        class="n10-txt2"
      >CCSpace致力于以实惠的价格提供大量优质眼镜。无论您是时尚爱好者还是日常戴眼镜，我们都提供各 种款式和颜色来表达您的个性。我们可以通过不同种类的镜片满足您的视力需求，包括标准镜片、蓝光阻隔剂、 光致变色镜片、偏光太阳镜镜片和镜面镜片的专业处方。每副眼镜均采用先进设备精细加工，出货前经过5道质 量控制。在CCSpace，我们相信每个人都可以通过无与伦比的服务以真正的价值购买最新的眼镜款式和时尚</div>
      <div class="n10-txt3">CCSPACE</div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      input1: ""
    };
  },
  methods:{
      toWenzhang(){
          this.$router.push({name:'Wenzhangxiangqin'})
      },
  }
};
</script>

<style lang="scss" scoped>
.index {
}
.nav1 {
  display: flex;
  flex-direction: column;
  align-items: center;
  background-image: url("../../assets/img/mcz5.png");
  background-size: 100% 100%;
  height: 680px;
  .tit1 {
    margin-top: 60px;
    font-size: 102px;
    font-family: PingFang SC, PingFang SC-Regular;
    font-weight: 400;
    text-align: center;
    color: #000000;
  }
  .tit2 {
    margin-top: 60px;
    width: 947px;
    height: 120px;
    background: #ffffff;
    border-radius: 70px;
    padding: 0 40px;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    /deep/ .el-input {
      height: 100%;
    }
    /deep/ .el-input__inner {
      height: 100%;
      border-radius: 50%;
      font-size: 40px;
      border: 0;
    }
    .el-icon-search {
      cursor: pointer;
      font-size: 40px;
      color: #969699;
    }
  }
}
.nav2 {
  margin: 0 50px;
  height: 398px;
  opacity: 0.8;
  background: rgba(0, 0, 0, 0.8);
  margin-top: -160px;
  .tit1 {
    font-size: 36px;
    font-family: PingFang SC, PingFang SC-Regular;
    font-weight: 400;
    color: #ffffff;
    padding-top: 58px;
    margin-left: 80px;
  }
  .items {
    display: flex;
    //   align-items: center;
    .item {
      width: 33%;
      display: flex;
      flex-direction: column;
      align-items: center;
      .txt1 {
        width: 80%;
        margin-top: 80px;
        font-size: 24px;
        font-family: PingFang SC, PingFang SC-Light;
        font-weight: 300;
        color: #ffffff;
      }
      .txt2 {
        cursor: pointer;
        margin-top: 24px;
        width: 80%;
        height: 92px;
        border: 1px solid #ffffff;
        font-size: 36px;
        font-family: PingFang SC, PingFang SC-Semibold;
        font-weight: 600;
        text-align: center;
        color: #ffffff;
        line-height: 92px;
      }
    }
    .shu {
      width: 2px;
      height: 244px;
      background: #ffffff;
    }
  }
}
.nav3 {
  margin: 40px 50px;
  display: flex;
  flex-wrap: wrap;
  .item.item1 {
    background-image: url("../../assets/img/zu193.png");
    background-size: 100% 100%;
  }
  .item.item2 {
    background-image: url("../../assets/img/zu194.png");
    background-size: 100% 100%;
  }
  .item.item3 {
    background-image: url("../../assets/img/zu196.png");
    background-size: 100% 100%;
  }
  .item.item4 {
    background-image: url("../../assets/img/zu195.png");
    background-size: 100% 100%;
  }
  .item {
    width: 50%;
    // background: #000000;
    height: 324px;
    display: flex;
    flex-direction: column;
    align-items: center;
    .tit1 {
      font-size: 36px;
      font-family: PingFang SC, PingFang SC-Light;
      font-weight: 300;
      color: #ffffff;
      margin-top: 80px;
    }
    .tit2 {
      cursor: pointer;
      width: 405px;
      height: 92px;
      border: 1px solid #ffffff;
      font-size: 20px;
      text-align: center;
      color: #ffffff;
      margin-top: 24px;
      line-height: 92px;
    }
  }
}
.nav4 {
  margin-top: 100px;
  margin-bottom: 100px;
  display: flex;
  .item {
    width: 33%;
    display: flex;
    flex-direction: column;
    align-items: center;
    .tit1 {
      font-size: 36px;
      font-family: PingFang SC, PingFang SC-Bold;
      font-weight: 700;
      color: #000000;
    }
    .heng {
      margin-top: 32px;
      width: 226px;
      height: 6px;
      background: #000000;
      border-radius: 4px;
    }
    .tit2 {
      cursor: pointer;
      margin-top: 30px;
      font-size: 20px;
      color: #1e1f33;
    }
    .btn {
      cursor: pointer;
      margin-top: 70px;
      width: 405px;
      height: 92px;
      border: 1px solid #1e1f33;
      font-size: 18px;
      text-align: center;
      color: #1e1f33;
      line-height: 92px;
    }
  }
}
.nav5{
    display: flex;
    flex-direction: column;
    align-items: center;
    .tit1{
        font-size: 18px;
        font-weight: 300;
        margin-top: 10px;
    }
}
.nav10 {
  position: relative;
  margin-top: 80px;
  width: 100%;
  height: 343px;
  background: linear-gradient(180deg, #292929, #1c1c1c);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  .n10-txt1 {
    position: absolute;
    top: 80px;
    font-size: 24px;
    font-family: PingFang SC, PingFang SC-Heavy;
    font-weight: 800;
    text-align: center;
    color: #ffffff;
    line-height: 2px;
  }
  .n10-txt2 {
    position: absolute;
    z-index: 1;
    top: 134px;
    width: 882px;
    height: 145px;
    font-size: 18px;
    color: #ffffff;
    line-height: 40px;
  }
  .n10-txt3 {
    position: absolute;
    z-index: 0;
    bottom: 70px;
    font-size: 151px;
    font-family: PingFang SC, PingFang SC-Bold;
    font-weight: 700;
    text-align: center;
    color: #333334;
    line-height: 12px;
  }
}
</style>