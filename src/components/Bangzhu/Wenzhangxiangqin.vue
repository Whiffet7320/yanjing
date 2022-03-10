<template>
  <div class="index">
    <div class="nav1">
      <div class="n1-l">
        <div @click="toBangzhu" class="n1l-txt">帮助中心</div>
        <i class="el-icon-arrow-right"></i>
        <div class="n1l-txt">如何订购</div>
      </div>
    </div>
    <div class="nav2">
      <div class="tit1">如何订购</div>
      <div class="tit2">
        <div class="n2t2-l">
          <img
            class="pic1"
            src="https://img1.baidu.com/it/u=1410082512,1043177061&fm=253&fmt=auto&app=138&f=JPEG?w=400&h=400"
            alt
          />
        </div>
        <div class="n2t2-r">
          <div class="top">阿米拉</div>
          <div class="down">2年前·更新</div>
        </div>
      </div>
      <div class="tit3">在 CCSpace 上，订购简单易行！只需按照以下步骤操作即可。现在好了，让我们去做吧！</div>
      <div class="tit4">sda</div>
      <div class="heng"></div>
      <div class="box1">
        <div class="txt1">本文是否有帮助？</div>
        <div class="txt2">
          <div class="boxt2-l" style="margin-right:58px">
            <i class="el-icon-check"></i>是
          </div>
          <div class="boxt2-l">
            <i class="el-icon-close"></i>否
          </div>
        </div>
        <div class="txt3">335人中有203人认为这有帮助</div>
      </div>
      <div class="heng"></div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    toBangzhu() {
      this.$router.go(-1);
    }
  }
};
</script>

<style lang="scss" scoped>
.index {
}
.nav1 {
  height: 90px;
  display: flex;
  align-items: center;
  padding: 0 50px;
  background: #fafafa;
  .n1-l {
    display: flex;
    align-items: center;
    .n1l-txt {
      cursor: pointer;
      font-size: 18px;
    }
    .el-icon-arrow-right {
      margin: 0 20px;
      font-size: 16px;
      color: #969699;
      font-weight: 700;
    }
  }
}
.nav2 {
  width: 1000px;
  margin: 30px auto;
  .tit1 {
    font-size: 36px;
    color: #1e1f33;
  }
  .tit2 {
    display: flex;
    align-items: center;
    margin-top: 20px;
    .n2t2-l {
      margin-right: 18px;
      .pic1 {
        width: 70px;
        height: 70px;
        border-radius: 50%;
      }
    }
    .n2t2-r {
      .top {
        font-size: 24px;
        color: #000000;
      }
      .down {
        margin-top: 14px;
        font-size: 16px;
        color: #969699;
      }
    }
  }
  .tit3 {
    margin-top: 50px;
    font-size: 16px;
    color: #969699;
  }
  .tit4 {
    margin-top: 20px;
    background: #fafafa;
    padding: 20px 50px;
  }
  .heng {
    margin-top: 30px;
    height: 2px;
    background: #e1e1e6;
  }
  .box1 {
    margin-top: 40px;
    display: flex;
    flex-direction: column;
    align-items: center;
    .txt1 {
      font-size: 20px;
      color: #1e1f33;
      font-weight: 300;
    }
    .txt2 {
      display: flex;
      align-items: center;
      margin-top: 28px;
      .boxt2-l {
        cursor: pointer;
        width: 108px;
        height: 44px;
        background: #ffffff;
        border: 1px solid #000000;
        border-radius: 3px;
        font-size: 16px;
        text-align: center;
        color: #000000;
        line-height: 44px;
        i {
          margin-right: 10px;
          font-size: 16px;
          font-weight: 800;
        }
      }
    }
    .txt3 {
        margin-top: 12px;
        font-weight: 300;
      font-size: 16px;
      color: #1e1f33;
    }
  }
}
</style>