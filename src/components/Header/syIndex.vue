<template>
  <div class="index">
    <!-- <div class="nav1">活动特惠，9.9元起</div> -->
    <img src="../../assets/img/zu180.png" alt="" class="imgggg">
    <div class="nav2">
      <div class="b1">
        <div class="txt1">满300元免运费</div>
      </div>
      <div class="b2">
        <div @click="jump('Bangzhuzhongxin')" class="txt1">帮助中心</div>
        <div @click="jump('Zhuizongdingdan')" class="txt2">跟踪订单</div>
      </div>
    </div>
    <div class="nav3">
      <div class="left">
        <img @click="toShouye" src="../../assets/img/t1.png" class="pic1" alt />
        <el-menu
          @select="handleSelect"
          :default-active="activeIndex"
          class="el-menu-demo"
          mode="horizontal"
          router
        >
          <el-submenu index="1">
            <template slot="title">眼镜</template>
            <div class="yanjin">
              <el-row style="width:100%">
                <el-col :span="24">
                  <el-row style="width:100%">
                    <el-col :span="4">
                      <div class="n12-tit">
                        <div class="txt yard">按使用分类</div>
                        <el-menu-item class="txt" index="1-1">发现</el-menu-item>
                        <el-menu-item class="txt" index="1-2">精美眼镜</el-menu-item>
                        <el-menu-item class="txt" index="1-3">超轻</el-menu-item>
                        <el-menu-item class="txt" index="1-4">弹簧铰链</el-menu-item>
                      </div>
                    </el-col>
                    <el-col :span="4">
                      <div class="n12-tit">
                        <div class="txt yard">按类型选购</div>
                        <el-menu-item class="txt" index="1-5">发现</el-menu-item>
                        <el-menu-item class="txt" index="1-6">精美眼镜</el-menu-item>
                        <el-menu-item class="txt" index="1-7">超轻</el-menu-item>
                        <el-menu-item class="txt" index="1-8">弹簧铰链</el-menu-item>
                      </div>
                    </el-col>
                    <el-col :span="4">
                      <div class="n12-tit">
                        <div class="txt yard">按材料选购</div>
                        <el-menu-item class="txt" index="1-9">政策</el-menu-item>
                        <el-menu-item class="txt" index="1-10">退货退款</el-menu-item>
                        <el-menu-item class="txt" index="1-11">隐私和安全</el-menu-item>
                        <el-menu-item class="txt" index="1-12">条款和条件</el-menu-item>
                      </div>
                    </el-col>
                    <el-col :span="4">
                      <div class="n12-tit">
                        <div class="txt yard">按颜色选购</div>
                        <el-menu-item class="txt" index="1-9">帮助和信息</el-menu-item>
                        <el-menu-item class="txt" index="1-10">如何选择眼镜</el-menu-item>
                        <el-menu-item class="txt" index="1-11">如何测量您的瞳孔距离（PD）</el-menu-item>
                        <el-menu-item class="txt" index="1-12">如何填写处方</el-menu-item>
                        <el-menu-item class="txt" index="1-9">加入我们</el-menu-item>
                        <el-menu-item class="txt" index="1-10">为什么选择CCSpace</el-menu-item>
                      </div>
                    </el-col>
                    <el-col :span="4">
                      <div class="n12-tit">
                        <div class="txt yard">按形状选购</div>
                        <el-menu-item class="txt" index="1-9">帮助和信息</el-menu-item>
                        <el-menu-item class="txt" index="1-10">如何选择眼镜</el-menu-item>
                        <el-menu-item class="txt" index="1-11">如何测量您的瞳孔距离（PD）</el-menu-item>
                        <el-menu-item class="txt" index="1-12">如何填写处方</el-menu-item>
                        <el-menu-item class="txt" index="1-9">加入我们</el-menu-item>
                        <el-menu-item class="txt" index="1-10">为什么选择CCSpace</el-menu-item>
                      </div>
                    </el-col>
                  </el-row>
                </el-col>
              </el-row>
            </div>
          </el-submenu>
          <el-submenu index="2">
            <template slot="title">太阳眼镜</template>
            <div class="yanjin">
              <el-row style="width:100%">
                <el-col :span="24">
                  <div class="index2-item">
                    <div class="items" v-for="item in 4" :key="item">
                      <img src="../../assets/img/zu8.png" class="pic" alt />
                      <div class="i2-txt">所有太阳镜</div>
                    </div>
                  </div>
                </el-col>
              </el-row>
            </div>
          </el-submenu>
          <el-menu-item index="3" :route="{name:'Xinping'}">新品推送</el-menu-item>
          <el-menu-item index="4">配件</el-menu-item>
          <el-menu-item index="5">推送</el-menu-item>
          <el-menu-item index="6">限时抢购</el-menu-item>
          <el-menu-item index="7" @click="toShop">精选</el-menu-item>
        </el-menu>
      </div>
      <div class="right">
        <el-input size="small" placeholder="搜索" v-model="searchVal">
          <i slot="suffix" class="el-icon-search"></i>
        </el-input>
        <i @click="jump('Gerenzhongxin')" class="el-icon-user icon r"></i>
        <i @click="jump('Wodeshoucang')" class="el-icon-star-off icon"></i>
        <i @click="jump('Gouwuche')" class="el-icon-goods icon"></i>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  created() {
    const userName = sessionStorage.getItem("username");
    if (userName == null) {
      this.userName = "null";
    } else {
      this.userName = userName;
    }
  },
  data() {
    return {
      searchVal: "",
      activeIndex: "sy",
      //
      lbtIndex: 0,
      userName: "null"
    };
  },
  methods: {
    toShop(){
      this.$router.push({name:'Xinping',params:{status:'jx'}})
    },
    jump(url){
      this.$router.push({name:url})
    },
    toShouye() {
      // this.$store.commit("isShouye", true);
      this.activeIndex = "sy";
      this.$router.push({name:'Sy'})
    },
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
      // this.$store.commit("isShouye", false);
      this.activeIndex = key;
      // sessionStorage.setItem("isShouye", "no");
      // this.$router.go(0);
    },
    lbtChange(i) {
      this.lbtIndex = i;
    },
    denglu() {
      sessionStorage.setItem("isLogin", "123");
      this.$router.go(0);
    },
    outLogin() {
      sessionStorage.setItem("token", "null");
      // sessionStorage.setItem("isLogin", "123");
      sessionStorage.setItem("username", "null");
      this.$router.go(0);
    }
  }
};
</script>
<style>
.el-menu--popup-bottom-start {
  margin-top: 0 !important;
  transform: translateX(6px);
}
</style>
<style lang="scss" scoped>
/deep/ .el-menu--popup-bottom-start {
  margin-top: 0 !important;
}
// /deep/ .el-menu--popup {
// }
.yanjin {
  // padding: 0 50px;
  width: 100vw;
  padding-bottom: 20px;
  transform: translateX(80px);
  .n12-tit {
    margin-top: 10px;
    .txt.yard {
      font-size: 14px;
      color: #969699;
      margin-bottom: 18px;
    }
    .txt.el-menu-item {
      font-size: 14px;
      text-align: left;
      color: #1f1f33;
      line-height: 40px;
      padding: 0px;
    }
    .txt.el-menu-item:hover {
      color: #409eff;
    }
  }
  .index2-item {
    display: flex;
    justify-content: center;
    transform: translateX(-80px);
    .items:hover{
      color: #409EFF !important;
    }
    .items {
      cursor: pointer;
      display: flex;
      flex-direction: column;
      align-items: center;
      margin: 0 40px;
      .pic {
        margin-top: 38px;
        width: 209px;
        height: 259px;
      }
      .i2-txt {
        margin-top: 28px;
        font-size: 20px;
        color: #000000;
        line-height: 66px;
      }
      .i2-txt:hover {
        color: #409EFF;
      }
    }
  }
}
.index {
  width: 100%;
  opacity: 1;
  position: relative;
  background: #ffffff;
  .imgggg{
    width: 100%;
    height: 54px;
  }
  .nav1 {
    width: 100%;
    height: 53px;
    background: #000000;
    text-align: center;
    font-size: 21px;
    font-family: ZhenyanGB, ZhenyanGB-Regular;
    font-weight: 400;
    color: #ffffff;
    line-height: 53px;
  }
  .nav2 {
    width: 100%;
    box-sizing: border-box;
    height: 39px;
    background: #f5f5f7;
    padding: 0 38px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .b1 {
      .txt1 {
        font-size: 16px;
        color: #000000;
      }
    }
    .b2 {
      display: flex;
      align-items: center;
      .txt1 {
        cursor: pointer;
        font-size: 16px;
        color: #707070;
      }
      .txt2 {
        cursor: pointer;
        margin-left: 30px;
        font-size: 16px;
        color: #707070;
      }
    }
  }
  .nav3 {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 38px;
    height: 62px;
    .left {
      display: flex;
      align-items: center;
      height: 62px;
      /deep/ .el-menu--horizontal {
        margin-left: 24px;
      }
      /deep/ .el-menu.el-menu--horizontal {
        border-bottom: 0px;
      }
      /deep/ .el-menu-item {
        font-size: 16px !important;
      }
      /deep/ .el-submenu__title {
        font-size: 16px !important;
      }
      .pic1 {
        width: 181px;
        height: 38px;
        cursor: pointer;
      }
    }
    .right {
      display: flex;
      align-items: center;
      /deep/ .el-input__suffix {
        display: flex;
        align-items: center;
        margin-right: 8px;
      }
      .icon {
        font-size: 22px;
        margin: 0 10px;
        cursor: pointer;
      }
      .r.icon {
        margin-left: 40px;
      }
    }
  }
}
</style>