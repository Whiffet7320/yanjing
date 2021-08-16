<template>
  <div class="fzindex">
    <div class="aside">
      <Aside />
    </div>
    <div class="right">
      <div class="nav1">当前位置：首页-帮助中心</div>
      <div class="nav2">
        <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
          <el-tab-pane label="系统公告" name="1">
            <div class="xtgg">
              <div class="nav1" @click="toBack">
                <img class="pic1" src="../../assets/newImg/zu119.png" alt="" />
                <div class="txt1">返回上一层</div>
              </div>
              <div class="nav2" v-for="item in 5" :key="item">
                <div class="tit1">
                  <div class="txt1">通知：广州荔湾区暂时无法发货</div>
                  <div class="txt2">2021-06-21 03:31</div>
                </div>
                <div class="tit2">
                  <div class="txt1">
                    广州荔湾区暂时无法发货，请注意下单地址！
                  </div>
                  <div class="txt2">查看详情</div>
                </div>
              </div>
            </div>
          </el-tab-pane>
          <el-tab-pane label="新闻资讯" name="2">新闻资讯</el-tab-pane>
          <el-tab-pane label="行业资讯" name="3">行业资讯</el-tab-pane>
          <el-tab-pane label="常见问题" name="4">常见问题</el-tab-pane>
          <el-tab-pane label="关于我们" name="5">关于我们</el-tab-pane>
        </el-tabs>
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
  data() {
    return {
      activeName: "1",
      fabu: 1,
      morenpaixu: 0,
    };
  },
  methods: {
    handleClick(tab) {
      console.log(tab);
    },
    toBack() {
      // this.
    },
  },
};
</script>

<style lang="scss" scoped>
.fzindex {
  display: flex;
}
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
    margin-top: 26px;
    /deep/ .el-tabs__header {
      border: 0;
    }
    /deep/ .el-tabs__nav {
      border: 0;
    }
    /deep/ .el-tabs__item:first-child {
      border-left: 0;
    }
    /deep/ .el-tabs__item {
      //   margin:0 20px !important;
      width: 182px;
      height: 50px;
      line-height: 50px;
      text-align: center;
      border-left: 1px solid #c3c3c3;
      border-bottom: 0;
      // border-radius: 10px;
    }
    /deep/ .el-tabs__item.is-active {
      background: #ffffff;
      box-shadow: inset 0px 0 16px 2px #dddddd !important;
      color: #000000;
    }
  }
  .xtgg {
    margin-top: 10px;
    .nav1 {
      cursor: pointer;
      display: flex;
      align-items: center;
      .pic1 {
        width: 18px;
        height: 18px;
        opacity: 1;
      }
      .txt1 {
        margin-left: 12px;
        opacity: 1;
        font-size: 16px;
        font-family: PingFang SC, PingFang SC-Medium;
        font-weight: 500;
        color: #b9b9b9;
      }
    }
    .nav2 {
      width: 100%;
      height: 208px;
      opacity: 1;
      background: #ffffff;
      border-radius: 8px;
      box-shadow: inset 0px 0 20px 2px #dddddd !important;
      .tit1 {
        height: 75px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin: 0 60px;
        border-bottom: 1px solid #e5e5e5;
        .txt1 {
          opacity: 1;
          font-size: 20px;
          font-family: PingFang SC, PingFang SC-Bold;
          font-weight: 700;
          color: #ea8e11;
        }
        .txt2 {
          opacity: 1;
          font-size: 16px;
          font-family: zw;;
          font-weight: 400;
          color: #868686;
        }
      }
      .tit2 {
        margin: 0 60px;
        position: relative;
        .txt1 {
          margin-top: 16px;
          opacity: 1;
          font-size: 14px;
          font-family: zw;;
          font-weight: 400;
          color: #000000;
        }
        .txt2 {
          position: absolute;
          right: 0;
          bottom: -70px;
          cursor: pointer;
          margin-top: 25px;
        }
        .txt2:hover {
          color: #ea8e11;
        }
      }
    }
  }
}
</style>