<template>
  <div class="hyindex">
    <div class="aside">
      <Aside />
    </div>
    <div class="right">
      <div class="nav1">当前位置：用户管理 > 修改密码</div>
      <div class="nav2">
        <div class="tit1">
          <img style="width: 24px;height: 24px;margin-right: 12px;" src="../../assets/newImg/tubiao301.png" alt="" />
          <div class="txt1">修改密码</div>
        </div>
        <div class="tit2">
          <div class="box1">
            <div class="txt1 active">校验身份</div>
            <div :class="{ txt1: true, active: twoActive }">设置密码</div>
            <div :class="{ txt1: true, active: threeActive }">设置成功</div>
          </div>
          <div class="box2">
            <div class="circle active">1</div>
            <div class="heng active"></div>
            <div :class="{ circle: true, active: twoActive }">2</div>
            <div :class="{ heng: true, active: twoActive }"></div>
            <div :class="{ circle: true, active: threeActive }">3</div>
          </div>
        </div>
        <div class="tit3">
          <!-- 1 -->
          <div class="one" v-if="nowIndex == 1">
            <el-form ref="form" :model="formone" label-width="80px">
              <el-row>
                <el-col :span="24"
                  ><el-form-item>
                    <el-input
                      disabled
                      placeholder="输入手机号"
                      v-model="formone.phone"
                    >
                      <template slot="prepend"
                        ><img
                          style="margin-top: 6px; width: 12px; height: 17px"
                          src="../../assets/newImg/lujin496.png"
                          alt="" /></template
                    ></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="22"
                  ><el-form-item>
                    <el-input placeholder="验证码" v-model="formone.yzm">
                      <template slot="prepend"
                        ><img
                          style="margin-top: 6px; width: 12px; height: 17px"
                          src="../../assets/newImg/lujin497.png"
                          alt=""
                      /></template>
                    </el-input>
                    <div class="yzm" v-show="show" @click="getCode">
                      （发送验证码）
                    </div>
                    <div class="yzm count" v-show="!show">
                      ( 重新发送{{ count }}s )
                    </div>
                  </el-form-item>
                </el-col>
              </el-row>

              <el-form-item>
                <div class="btn" @click="toTwo">下一步</div>
              </el-form-item>
            </el-form>
          </div>
          <div class="one" v-if="nowIndex == 2">
            <el-form ref="form" :model="formtwo" label-width="80px">
              <el-row>
                <el-col :span="24"
                  ><el-form-item>
                    <el-input
                      show-password
                      placeholder="输入密码"
                      v-model="formtwo.password"
                    >
                      <template slot="prepend"
                        ><img
                          style="margin-top: 6px; width: 12px; height: 17px"
                          src="../../assets/newImg/lujin502.png"
                          alt="" /></template
                    ></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="24"
                  ><el-form-item>
                    <el-input
                      show-password
                      placeholder="再次输入密码"
                      v-model="formtwo.password2"
                    >
                      <template slot="prepend"
                        ><img
                          style="margin-top: 6px; width: 12px; height: 17px"
                          src="../../assets/newImg/lujin502.png"
                          alt=""
                      /></template>
                    </el-input>
                  </el-form-item>
                </el-col>
              </el-row>

              <el-form-item>
                <div class="btn" @click="toThree">下一步</div>
              </el-form-item>
            </el-form>
          </div>
          <div class="one" v-if="nowIndex == 3">
            <div class="box1">
              <img class="pic1" src="../../assets/newImg/lujin504.png" alt="" />
              <div class="txt1">您已经成功修改密码，请重新登录！</div>
              <div class="txt2">
                系统将在<span class="color">3</span
                >秒后自动跳转至登录页面，您可以选择直接<span
                  style="cursor: pointer"
                  class="color"
                  >返回登录</span
                >
              </div>
            </div>
          </div>
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
  data() {
    return {
      show: true,
      count: "",
      timer: null,
      formone: {
        phone: "12345678910",
        yzm: "",
      },
      formtwo: {
        password: "",
        password2: "",
      },
      twoActive: false,
      threeActive: false,
      nowIndex: 1,
    };
  },
  created() {
    this.formone.phone = sessionStorage.getItem("username");
  },
  methods: {
    async toTwo() {
      const res = await this.$api.UserCheckYzm({
        token: sessionStorage.getItem("token"),
        code: this.formone.yzm,
      });
      console.log(res);
      if (res.code == 200) {
        this.twoActive = true;
        this.nowIndex = 2;
      } else {
        this.$message.error(res.msg);
      }
    },
    async toThree() {
      if (this.formtwo.password != this.formtwo.password2) {
        this.$message({
          message: "两次密码不一致",
          type: "warning",
        });
      } else {
        const res = await this.$api.UserEditPassword({
          token: sessionStorage.getItem("token"),
          password: this.formtwo.password,
        });
        if (res.code == 200) {
          this.threeActive = true;
          this.nowIndex = 3;
          setTimeout(() => {
            sessionStorage.setItem("username", "null");
            sessionStorage.setItem("isLogin", "123");
            this.$router.go(0);
          }, 3000);
        }
      }
    },
    async getCode() {
      const TIME_COUNT = 60;
      if (!this.timer) {
        this.count = TIME_COUNT;
        this.show = false;
        this.timer = setInterval(() => {
          if (this.count > 0 && this.count <= TIME_COUNT) {
            this.count--;
          } else {
            this.show = true;
            clearInterval(this.timer);
            this.timer = null;
          }
        }, 1000);
      }
      const res = await this.$api.getVerificationCode({
        method: 3,
        phone: this.formone.phone,
      });
      console.log(res);
      if (res.code == 200) {
        this.formone.yzm = res.data;
      }
    },
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
    margin-left: 16px;
    font-size: 14px;
    font-family: PingFang SC, PingFang SC-Medium;
    font-weight: 500;
    text-align: left;
    color: #868686;
  }
  .nav2 {
    margin-top: 18px;
    width: 100%;
    height: 460px;
    // background: #ffffff;
    background-image: url("../../assets/newImg/kk11.png");
    background-size: 100% 100%;
    border-radius: 10px;
    padding-top: 40px;
    .tit1 {
      width: 94%;
      display: flex;
      align-items: center;
      margin-left: 50px;
      padding-bottom: 20px;
      border-bottom: 1px solid #e5e5e5;
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
    .tit2 {
      width: 400px;
      margin: 34px auto 24px auto;
      .box1 {
        display: flex;
        align-items: center;
        justify-content: space-between;
        .txt1 {
          opacity: 1;
          font-size: 18px;
          font-family: PingFang SC, PingFang SC-Medium;
          font-weight: 700;
          color: #707071;
        }
        .txt1.active {
          color: #ea8e11;
        }
      }
      .box2 {
        width: 96%;
        margin: 24px auto;
        display: flex;
        align-items: center;
        // justify-content: space-between;
        .heng {
          height: 2px;
          width: 114px;
          background: #e5e5e5;
        }
        .heng.active {
          background: #ea8e11;
        }
        .circle {
          width: 48px;
          height: 48px;
          opacity: 1;
          border-radius: 50%;
          border: 2px solid #cccccc;
          line-height: 48px;
          text-align: center;
          font-size: 20px;
          font-family: PingFang SC, PingFang SC-Bold;
          font-weight: 700;
          text-align: center;
          color: #707071;
        }
        .circle.active {
          color: #ea8e11;
          border: 2px solid #ea8e11;
        }
      }
    }
    .tit3 {
      .one {
        width: 48%;
        margin: 0 auto;
        transform: translateX(-40px);
      }
      .yzm {
        cursor: pointer;
        margin-left: 20px;
        width: 160px;
        opacity: 1;
        font-size: 14px;
        font-family: PingFang SC, PingFang SC-Medium;
        font-weight: 500;
        color: #ea8e11;
      }
      .yzm.count {
        color: #a7a7a7;
      }
      .btn {
        cursor: pointer;
        height: 42px;
        width: 100%;
        line-height: 42px;
        text-align: center;
        box-shadow: inset 0px 0 16px 2px #dddddd !important;
        font-size: 14px;
        font-family: PingFang SC, PingFang SC-Medium;
        font-weight: 500;
        color: #5c5c5c;
      }
      .box1 {
        display: flex;
        flex-direction: column;
        align-items: center;
        transform: translateX(40px);
        .pic1 {
          width: 102px;
          height: 102px;
          opacity: 1;
        }
        .txt1 {
          margin-top: 40px;
          opacity: 1;
          font-size: 20px;
          font-family: PingFang SC, PingFang SC-Bold;
          font-weight: 700;
          color: #ea8e11;
        }
        .txt2 {
          margin-top: 18px;
          opacity: 1;
          font-size: 14px;
          font-family: PingFang SC, PingFang SC-Medium;
          font-weight: 500;
          color: #868686;
          .color {
            color: #ea8e11;
          }
        }
      }
    }
  }
}
/deep/ .el-form-item__content {
  display: flex;
}
</style>