<template>
  <div class="hyindex">
    <div class="aside">
      <Aside />
    </div>
    <div class="right">
      <!-- <div class="nav1">当前位置：售后服务 > 单底申请</div> -->
      <div class="nav2">
        <div class="tit1">
          <img style="width: 24px;height: 24px;margin-right: 12px;" src="../../assets/newImg/tubiao301.png" alt="" />
          <div class="txt1">代发指南</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Aside from "../Aside";
export default {
  components: {
    Aside,
  },
};
</script>

<style lang="scss" scoped>
.hyindex {
  display: flex;
}
.right {
  width: 100%;
  .nav1 {
    font-size: 14px;
    font-family: PingFang SC, PingFang SC-Medium;
    font-weight: 500;
    text-align: left;
    color: #868686;
  }
  .nav2 {
    // margin-top: 18px;
    // box-shadow: 0px 3px 10px 0px rgba(167, 167, 167, 0.2);
    width: 100%;
    height: 910px;
    background-image: url("../../assets/newImg/kk1.png");
    background-size: 100% 100%;
    // background: #ffffff;
    border-radius: 10px;
    padding-top: 40px;
    .tit1 {
      display: flex;
      align-items: center;
      margin-left: 50px;
      padding-bottom: 20px;
      // border-bottom: 1px solid #e5e5e5;
      .shu {
        width: 5px;
        height: 25px;
        opacity: 1;
        background: #ea8e11;
        margin-right: 16px;
      }
      .txt1 {
        font-size: 18px;
        font-family: PingFang SC, PingFang SC-Bold;
        font-weight: 700;
        color: #000000;
      }
    }
  }
}
</style>