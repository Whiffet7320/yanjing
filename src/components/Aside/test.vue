<template>
  <div class="aside">
    <!-- <div class="nav1">商城APP</div> -->
    <div class="nav2">
      <img src="../../assets/image/蒙版组108.png" alt="" />
    </div>
    <div class="nav3">{{ userInfo.username }}</div>
    <div class="nav4" @click="loginOut">
      <img class="pic1" src="../../assets/image/组191.png" alt="" />
      <div class="tit1">切换账号</div>
    </div>
    <div class="menu">
      <el-menu
        :default-active="menuActiveIndex"
        class="el-menu-vertical-demo"
        @select="selectopen"
        background-color="#282828"
        text-color="#FFFFFF"
        active-text-color="#DD2638"
        router
      >
        <el-submenu index="1">
          <template slot="title">
            <div :class="{ one: true, active: activeIndex == 1 }">
              <img
                class="icon1"
                v-if="activeIndex == 1"
                src="../../assets/img/路径406active.png"
                alt=""
              />
              <img
                class="icon1"
                v-else
                src="../../assets/img/路径406.png"
                alt=""
              />
              <!-- <img class="icon1" src="../../assets/image/路径406.png" alt="" /> -->
              <span :class="{ tit1: true, active: activeIndex == 1 }"
                >首页</span
              >
            </div>
          </template>
          <el-menu-item index="1-1" :route="{ name: 'Lunbotuliebiao' }"
            >轮播图列表</el-menu-item
          >
          <el-menu-item index="1-4" :route="{ name: 'Fenleiliebiao' }"
            >分类列表</el-menu-item
          >
          <el-menu-item index="1-2" :route="{ name: 'Xinjianshangping' }"
            >新建产品</el-menu-item
          >
          <el-menu-item index="1-5" :route="{ name: 'Shangpinliebiao' }"
            >产品列表</el-menu-item
          >
        </el-submenu>
        <el-submenu index="2">
          <template slot="title">
            <div :class="{ one: true, active: activeIndex == 2 }">
              <img
                class="icon1"
                v-if="activeIndex == 2"
                src="../../assets/img/lujin836active.png"
                alt=""
              />
              <img
                class="icon1"
                v-else
                src="../../assets/img/lujin836.png"
                alt=""
              />
              <span :class="{ tit1: true, active: activeIndex == 2 }"
                >用户</span
              >
            </div>
          </template>
          <el-menu-item index="2-1" :route="{ name: 'Quanbudingdan' }"
            >全部订单</el-menu-item
          >
          <el-menu-item index="2-2" :route="{ name: 'Pinglunguanli' }"
            >评论管理</el-menu-item
          >
          <!-- <el-menu-item index="2-3" :route="{ name: 'Ruzhuxingxi' }"
            >入驻信息</el-menu-item
          > -->
        </el-submenu>
        <el-submenu index="3">
          <template slot="title">
            <div :class="{ one: true, active: activeIndex == 3 }">
              <img
                class="icon1"
                v-if="activeIndex == 3"
                src="../../assets/img/zu188active.png"
                alt=""
              />
              <img
                class="icon1"
                v-else
                src="../../assets/img/zu188.png"
                alt=""
              />
              <span :class="{ tit1: true, active: activeIndex == 3 }"
                >我的</span
              >
            </div>
          </template>
          <el-menu-item index="3-1" :route="{ name: 'Quanbupingtaishuju' }"
            >全部平台数据</el-menu-item
          >
          <el-menu-item index="3-10" :route="{ name: 'Pingtaihonghuzhucebiao' }"
            >平台用户注册表</el-menu-item
          >
          <el-menu-item index="3-11" :route="{ name: 'Yonghutixianbiao' }"
            >用户提现表</el-menu-item
          >
          <el-menu-item index="3-12" :route="{ name: 'Shujutongjifenxi' }"
            >数据统计分析</el-menu-item
          >
          <el-menu-item index="3-3" :route="{ name: 'Kefuxitong' }"
            >客服系统设置</el-menu-item
          >
          <!-- <el-menu-item index="3-5" :route="{ name: 'Fenxiangshezhi' }"
            >分享设置</el-menu-item
          >
          <el-menu-item index="3-7" :route="{ name: 'Youhuiquanshezhi' }"
            >优惠卷设置</el-menu-item
          >
          <el-menu-item index="3-6" :route="{ name: 'Youhuiquanguanli' }"
            >优惠券管理</el-menu-item
          >
          <el-menu-item index="3-8" :route="{ name: 'Tianjiawenzhang' }"
            >添加文章</el-menu-item
          >
          <el-menu-item index="3-9" :route="{ name: 'Wenzhangliebiao' }"
            >文章列表</el-menu-item
          > -->
        </el-submenu>
        <el-submenu index="4">
          <template slot="title">
            <div :class="{ one: true, active: activeIndex == 4 }">
              <img
                class="icon1"
                v-if="activeIndex == 4"
                src="../../assets/img/zu347active.png"
                alt=""
              />
              <img
                class="icon1"
                v-else
                src="../../assets/img/zu347.png"
                alt=""
              />
              <span :class="{ tit1: true, active: activeIndex == 4 }"
                >分销</span
              >
            </div>
          </template>
          <el-menu-item index="4-1" :route="{ name: 'Fenxiaofenrunzidingyi' }"
            >分销分润自定义</el-menu-item
          >
          <!-- <el-menu-item index="4-2" :route="{ name: 'Wodetuandui' }"
            >我的团队</el-menu-item
          > -->
        </el-submenu>
      </el-menu>
    </div>
  </div>
</template>

<script>
export default {
  created() {
    // this.userInfo = JSON.parse(sessionStorage.getItem("userInfo"));
    console.log(this.userInfo);
  },
  watch: {
    $route(to) {
      console.log(to.path); //到哪去
      if (to.path == "/Lunbotuliebiao") {
        this.menuActiveIndex = "1-1";
      } else if (to.path == "/Xinjianshangping") {
        this.menuActiveIndex = "1-2";
      } else if (to.path == "/Xinjianluzhishangping") {
        this.menuActiveIndex = "1-3";
      } else if (to.path == "/Fenleiliebiao") {
        this.menuActiveIndex = "1-4";
      } else if (to.path == "/Shangpinliebiao") {
        this.menuActiveIndex = "1-5";
      } else if (to.path == "/Luzhichanpinliebiao") {
        this.menuActiveIndex = "1-6";
      } else if (to.path == "/Yonghu/Quanbudingdan") {
        this.menuActiveIndex = "2-1";
      } else if (to.path == "/Yonghu/Pinglunguanli") {
        this.menuActiveIndex = "2-2";
      } else if (to.path == "/Yonghu/Ruzhuxingxi") {
        this.menuActiveIndex = "2-3";
      } else if (to.path == "/Wode/Quanbupingtaishuju") {
        this.menuActiveIndex = "3-1";
      } else if (to.path == "/Wode/Kefuxitong") {
        this.menuActiveIndex = "3-3";
      } else if (to.path == "/Wode/Fenxiangshezhi") {
        this.menuActiveIndex = "3-5";
      } else if (to.path == "/Wode/Youhuiquanguanli") {
        this.menuActiveIndex = "3-6";
      } else if (to.path == "/Wode/Youhuiquanshezhi") {
        this.menuActiveIndex = "3-7";
      } else if (to.path == "/Wode/Tianjiawenzhang") {
        this.menuActiveIndex = "3-8";
      } else if (to.path == "/Wode/Wenzhangliebiao") {
        this.menuActiveIndex = "3-9";
      } else if (to.path == "/Wode/Pingtaihonghuzhucebiao") {
        this.menuActiveIndex = "3-10";
      } else if (to.path == "/Wode/Yonghutixianbiao") {
        this.menuActiveIndex = "3-11";
      } else if (to.path == "/Wode/Shujutongjifenxi") {
        this.menuActiveIndex = "3-12";
      }else if (to.path == "/Fenxiao/Fenxiaofenrunzidingyi") {
        this.menuActiveIndex = "4-1";
      }else if (to.path == "/Fenxiao/Wodetuandui") {
        this.menuActiveIndex = "4-2";
      }
    },
  },
  data() {
    return {
      activeIndex: 0,
      menuActiveIndex: "",
      userInfo: null,
    };
  },
  methods: {
    loginOut() {
      sessionStorage.setItem("token", null);
      sessionStorage.setItem("isLogin", null);
      this.$router.go(0);
      this.$router.push({ path: "/login" });
    },
    // handleOpen(key, keyPath) {
    //     console.log(key, keyPath);
    //   },
    selectopen(i, indexpath) {
      if (indexpath[0] == "1") {
        this.activeIndex = 1;
      } else if (indexpath[0] == "2") {
        this.activeIndex = 2;
      } else if (indexpath[0] == "3") {
        this.activeIndex = 3;
      }else if (indexpath[0] == "4") {
        this.activeIndex = 4;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.aside {
  .nav1 {
    width: 284px;
    height: 81px;
    opacity: 1;
    background: #ebbfcc;
    font-size: 30px;
    font-family: YouSheBiaoTiHei, YouSheBiaoTiHei-Regular;
    font-weight: 400;
    text-align: center;
    color: #ffffff;
    line-height: 81px;
  }
  .nav2 {
    margin: 36px auto 15px auto;
    width: 70px;
    height: 70px;
    opacity: 1;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .nav3 {
    opacity: 1;
    font-size: 20px;
    font-family: zw;;
    font-weight: 400;
    text-align: center;
    color: #ffffff;
  }
  .nav4 {
    cursor: pointer;
    margin-top: 5px;
    margin-bottom: 36px;
    display: flex;
    align-items: center;
    justify-content: center;
    .pic1 {
      width: 14px;
      height: 14px;
      opacity: 1;
    }
    .tit1 {
      margin-left: 10px;
      opacity: 1;
      font-size: 12px;
      font-family: zw;;
      font-weight: 400;
      text-align: center;
      color: #ffffff;
    }
  }
  .menu {
    // /deep/ .el-submenu__title.active{
    //   background: red !important;
    // }
    .one.active {
      background: #ffffff;
    }
    .one {
      .icon1 {
        margin-left: 50px;
        width: 18px;
        height: 19px;
        opacity: 1;
      }
      .el-icon-house {
        margin-left: 48px;
        font-size: 24px;
        margin-right: -4px !important;
      }
      .el-icon-house.active {
        color: #ebbfcc;
      }
      .tit1 {
        margin-left: 15px;
        opacity: 1;
        font-size: 20px;
        font-family: zw;;
        font-weight: 400;
        text-align: center;
        color: #ffffff;
      }
      .tit1.active {
        color: #000000;
      }
    }
    // .one:hover{
    //   background: chocolate;
    // }
    .el-menu-item {
      padding-left: 83px !important;
      opacity: 1;
      font-size: 18px;
      font-family: zw;;
      font-weight: 400;
      color: #9b9b9b;
    }
    /deep/ .el-submenu__title{
      padding: 0 !important;
    }
  }
}
</style>