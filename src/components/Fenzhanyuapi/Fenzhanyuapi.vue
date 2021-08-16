<template>
  <div class="fzindex">
    <div class="aside">
      <Aside />
    </div>
    <div class="right">
      <div class="nav1">当前位置：帮助中心 > 分站与API</div>
      <div class="nav2">
        <div class="txt1">
          <img style="width: 24px;height: 24px;" src="../../assets/newImg/tubiao301.png" alt="" />
          <div class="txt1-1">分站与API</div>
        </div>
        <div class="txt2">分站加盟</div>
        <div class="txt3">
          分站加盟拥有属于自己的网站!网站完全独立控制，管理操作简单，全天24小时自动售单，无需人工干预。
        </div>
        <div class="txt4">一、加盟优势</div>
        <div class="txt5">1.分站平台技术支持。24小时候技术在线维护。</div>
        <div class="txt5">2.我们提供稳定、安全、低价的快递费、礼品货源。</div>
        <div class="txt5">3.独立域名，独立后台,自由管理。</div>
        <div class="txt5">4.前景非常可观，客源稳定，稳定收入。</div>
        <div class="txt5">5.平台提供服务器，域名，维护，升级等!</div>
        <div class="txt5">6.分站可自己设置怏递售价和礼品售价,主动性高</div>
        <div class="txt5">7.分站加盟，网站API接口免费提供,无需任何费用。</div>
        <div class="txt4">二、分站加盟</div>
        <div class="txt5">1.联系客服申请加盟分站</div>
        <div class="txt5">
          2.开通分站需要您提供一个登陆后台的账户名，一个登陆后台的密码，客服手机号码。
        </div>
        <div class="txt5">
          3.上线分站进行管理运营、设置快递费用、礼品价格、客服信息修改等。
        </div>
        <div class="txt4">三、开通分站流程</div>
        <div class="txt5">
          1.联系客服→2.申请分站一3.提交网站资料→4.开通成功一5.推广盈利
        </div>
        <div class="txt4">四、登录后台设置基本信息</div>
        <div class="txt5">
          1.登录后台:
          http://您的域名/tenant/login(域名前缀修改成自己的，输入账号密码登录)
        </div>
        <div class="txt5">2.登录后需进行网站参数设置，详情咨询客服</div>
        <div class="txt6">API接口对接</div>
        <div class="txt7">API接口对接文档：点击查看</div>
        <div class="txt2">API调用方法详解</div>
        <div class="txt8">
          开放平台(POP)的API是基http协议来调用的，开发者(isv)可以直接使用POP的协议来封装http请求进行调用。
        </div>
        <img
          class="picBottom"
          src="../../assets/newImg/bzzxbottom.png"
          alt=""
        />
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
.fzindex {
  display: flex;
  .right {
    width: 100%;
    .nav1 {
      margin-left: 16px;
      font-size: 14px;
      font-family: PingFang SC, PingFang SC-Medium;
      font-weight: 500;
      text-align: left;
      color: #868686;
    }
    .nav2 {
      // box-shadow: 0px 3px 10px 0px rgba(167, 167, 167, 0.2);
      background-image: url("../../assets/newImg/kk3.png");
      background-size: 100% 100%;
      margin-top: 16px;
      width: 100%;
      height: 1648px;
      opacity: 1;
      // background: #ffffff;
      border-radius: 10px;

      .txt1 {
        height: 77px;
        margin: 0 50px;
        display: flex;
        align-items: center;
        border-bottom: 1px solid #f4f4f4;
        .shu {
          width: 5px;
          height: 25px;
          opacity: 1;
          background: #ea8e11;
        }
        .txt1-1 {
          margin-left: 15px;
          opacity: 1;
          font-size: 18px;
          font-family: PingFang SC, PingFang SC-Bold;
          font-weight: 700;
          color: #000000;
        }
      }
      .txt2 {
        display: flex;
        justify-content: center;
        margin: 25px 0;
        opacity: 1;
        font-size: 22px;
        font-family: PingFang SC, PingFang SC-Bold;
        font-weight: 700;
        color: #000000;
      }
      .txt3 {
        margin-left: 70px;
        opacity: 1;
        font-size: 16px;
        font-family: PingFang SC, PingFang SC-Medium;
        font-weight: 500;
        color: #e50404;
      }
      .txt4 {
        margin-left: 70px;
        margin-top: 58px;
        margin-bottom: 16px;
        opacity: 1;
        font-size: 22px;
        font-family: PingFang SC, PingFang SC-Bold;
        font-weight: 700;
        text-align: left;
        color: #ea8e11;
      }
      .txt5 {
        margin-left: 70px;
        font-size: 14px;
        font-family: PingFang SC, PingFang SC-Medium;
        font-weight: 500;
        text-align: left;
        color: #000000;
        line-height: 36px;
      }
      .txt6 {
        margin-top: 58px;
        display: flex;
        justify-content: center;
        opacity: 1;
        font-size: 22px;
        font-family: PingFang SC, PingFang SC-Bold;
        font-weight: 700;
        text-align: center;
        color: #ea8e11;
      }
      .txt7 {
        margin-left: 70px;
        margin-top: 24px;
        opacity: 1;
        font-size: 18px;
        font-family: PingFang SC, PingFang SC-Bold;
        font-weight: 700;
        color: #e50404;
        margin-bottom: 46px;
      }
      .txt8 {
        margin-top: 40px;
        display: flex;
        justify-content: center;
        opacity: 1;
        font-size: 14px;
        font-family: PingFang SC, PingFang SC-Medium;
        font-weight: 500;
        text-align: center;
        color: #000000;
        line-height: 36px;
      }
      .picBottom {
        width: 97%;
        margin-left: 16px;
        height: 333px;
        opacity: 1;
      }
    }
  }
}
</style>