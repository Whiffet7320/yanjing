<template>
  <div class="index">
    <!-- <img src="../../assets/newImg/sytop.png" alt="" class="bac" /> -->
    <el-carousel
      arrow="never"
      trigger="click"
      height="220px"
      @change="lbtChange"
    >
      <el-carousel-item>
        <img src="../../assets/newImg/海报1.png" alt="" class="bac" />
      </el-carousel-item>
      <el-carousel-item>
        <img src="../../assets/newImg/海报2.png" alt="" class="bac" />
      </el-carousel-item>
    </el-carousel>
    <div class="user">
      <!-- <img src="../../assets/newImg/zu277.png" class="pic" alt="" /> -->
      <img src="../../assets/newImg/dltb.png" class="pic" alt="" />
      <div
        v-if="userName == 'null'"
        :class="{ txt: true, blackTxt: this.lbtIndex == 1 }"
        @click="denglu"
      >
        登陆 | 注册
      </div>
      <div
        :class="{ txt2: true, txt: true, blackTxt: this.lbtIndex == 1 }"
        v-else
      >
        {{ userName }} <span @click="outLogin">退出登录</span>
      </div>
      <div v-if="lbtIndex == 0" class="medium">1/2</div>
      <div v-if="lbtIndex == 1" class="medium blackTxt">2/2</div>
    </div>
    <!-- <img src="../../assets/newImg/海报1.png" alt="" class="bac" />
    <img src="../../assets/newImg/海报2.png" alt="" class="bac" /> -->
    <!-- <img src="../../assets/newImg/LOGO2.png" alt="" class="pic" /> -->
    <!-- <div class="user">
      <img src="../../assets/newImg/zu277.png" class="pic" alt="" />
      <div v-if="userName == 'null'" class="txt" @click="denglu">登陆 | 注册</div>
      <div class="txt2 txt" v-else>{{ userName }} <span @click="outLogin">退出登录</span></div>
    </div> -->
  </div>
</template>

<script>
export default {
  created() {
    const userName = sessionStorage.getItem("username");
    console.log(userName);
    if (userName == null) {
      this.userName = "null";
    } else {
      this.userName = userName;
    }
  },
  data() {
    return {
      lbtIndex: 0,
      userName: "null",
    };
  },
  methods: {
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
    },
  },
};
</script>

<style lang="scss" scoped>
.index {
  width: 100%;
  height: 220px;
  opacity: 1;
  position: relative;
  .bac {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 220px;
    opacity: 1;
  }
  .pic {
    position: absolute;
    top: 47%;
    transform: translate(-50%, -50%);
    left: 50%;
    width: 418px;
    height: 166px;
    opacity: 1;
  }
  .user {
    z-index: 999;
    cursor: pointer;
    position: absolute;
    top: 35px;
    right: 200px;
    display: flex;
    align-content: center;
    .pic {
      width: 22px;
      height: 22px;
      opacity: 1;
    }
    .txt {
      margin-left: 140px;
      opacity: 1;
      font-size: 16px;
      font-family: zw;
      font-weight: 400;
      text-align: left;
      color: #ffffff;
    }
    .blackTxt {
      color: #5c5c5c;
    }
    .txt2.txt {
      margin-left: 220px;
      opacity: 1;
      font-size: 16px;
      font-family: zw;
      font-weight: 400;
      text-align: left;
      color: #ffffff;
    }
  }
}
/deep/ .el-carousel__indicators {
  display: none;
}
.medium {
  position: absolute;
  top: 150px;
  right: 40px;
  color: #fff;
}
.medium.blackTxt {
  position: absolute;
  top: 150px;
  right: 40px;
  color: #5c5c5c;
}
</style>