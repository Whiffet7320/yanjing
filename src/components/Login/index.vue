
<template>
  <div class="index">
    <div
      class="container"
      :style="{
        height: !iswjmm && !ismszc ? '407px' : iswjmm ? '477px' : '477px',
      }"
    >
      <img class="pic1" src="../../assets/newImg/bg.png" alt />
      <div class="top">
        <img class="pic2" src="../../assets/newImg/圆形.png" alt />
        <img class="pic3" src="../../assets/newImg/LOGO.png" alt />
      </div>
      <!-- 登录 -->
      <div class="myForm" v-if="!iswjmm && !ismszc">
        <el-form ref="loginForm" :model="loginForm" label-width="80px">
          <el-row>
            <el-col :span="19">
              <el-form-item>
                <img class="inputImg" src="../../assets/newImg/input.png" alt />
                <div class="inputshu"></div>
                <el-input
                  @keyup.enter.native="onLogin"
                  placeholder="请输入用户名"
                  v-model="loginForm.userName"
                >
                  <template slot="prepend">
                    <img
                      style="margin-top: 5px; width: 26px; height: 27px;transform: translateX(-2px);"
                      src="../../assets/newImg/图标1.png"
                      alt
                    />
                  </template>
                </el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="19">
              <el-form-item>
                <img class="inputImg" src="../../assets/newImg/input.png" alt />
                <div class="inputshu"></div>
                <el-input
                  type="password"
                  @keyup.enter.native="onLogin"
                  placeholder="请输入密码"
                  v-model="loginForm.password"
                >
                  <template slot="prepend">
                    <img
                      style="margin-top: 5px; width: 22px; height: 27px"
                      src="../../assets/newImg/图标@2x.png"
                      alt
                    />
                  </template>
                </el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="21">
              <el-form-item>
                <img style="width: 180px" class="inputImg" src="../../assets/newImg/input.png" alt />
                <div class="inputshu"></div>
                <el-input
                  @keyup.enter.native="onLogin"
                  placeholder="请输入验证码"
                  v-model="loginForm.yzm"
                >
                  <template slot="prepend">
                    <img
                      style="margin-top: 5px; width: 34px; height: 28px;transform: translateX(-6px);"
                      src="../../assets/newImg/tptb.png"
                      alt
                    />
                  </template>
                </el-input>
                <!-- <div class="yzm" v-show="show1" @click="getCode1">
                  发送验证码
                </div>-->
              </el-form-item>
              <div class="get-code" @click="refreshCode()">
                <SIdentify :identifyCode="identifyCode"></SIdentify>
              </div>
              <div class="yzm count" v-show="!show1">( 重新发送{{ count1 }}s )</div>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="19">
              <div class="login">
                <!-- <img
                  src="../../assets/newImg/登录按钮.png"
                  alt=""
                  class="pic"
                />-->
                <div class="loginBtn" @click="onLogin">LOGIN</div>
              </div>
            </el-col>
          </el-row>
        </el-form>
      </div>
      <!-- 忘记密码 -->
      <div class="myForm" v-else-if="iswjmm">
        <div class="back" @click="iswjmm = false">
          <img src="../../assets/newImg/矩形1147.png" class="pic1" alt />
          <img src="../../assets/newImg/路径493.png" class="pic2" alt />
          <div class="txt">返回</div>
        </div>
        <el-form ref="loginForm" :model="loginForm" label-width="80px">
          <el-row>
            <el-col :span="19">
              <el-form-item>
                <img class="inputImg" src="../../assets/newImg/input.png" alt />
                <div class="inputshu"></div>
                <el-input
                  @keyup.enter.native="onLogin"
                  placeholder="请输入用户名"
                  v-model="loginForm.userName"
                >
                  <template slot="prepend">
                    <img
                      style="margin-top: 5px; width: 26px; height: 27px;transform: translateX(-2px);"
                      src="../../assets/newImg/图标1.png"
                      alt
                    />
                  </template>
                </el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="19">
              <el-form-item>
                <img style="width: 180px" class="inputImg" src="../../assets/newImg/input.png" alt />
                <div class="inputshu"></div>
                <el-input
                  @keyup.enter.native="onLogin"
                  placeholder="请输入验证码"
                  v-model="loginForm.yzm"
                >
                  <template slot="prepend">
                    <img
                      style="margin-top: 5px; width: 34px; height: 28px;transform: translateX(-6px);"
                      src="../../assets/newImg/tptb.png"
                      alt
                    />
                  </template>
                </el-input>
                <!-- <div class="yzm">发送验证码</div> -->
                <div class="yzm" v-show="show" @click="getCode">获取验证码</div>
                <div class="yzm count" v-show="!show">( 重新发送{{ count }}s )</div>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="19">
              <el-form-item>
                <img class="inputImg" src="../../assets/newImg/input.png" alt />
                <div class="inputshu"></div>
                <el-input
                  type="password"
                  @keyup.enter.native="onLogin"
                  placeholder="请输入密码"
                  v-model="loginForm.password"
                >
                  <template slot="prepend">
                    <img
                      style="margin-top: 5px; width: 22px; height: 27px"
                      src="../../assets/newImg/图标@2x.png"
                      alt
                    />
                  </template>
                </el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="19">
              <el-form-item>
                <img class="inputImg" src="../../assets/newImg/input.png" alt />
                <div class="inputshu"></div>
                <el-input
                  type="password"
                  @keyup.enter.native="onLogin"
                  placeholder="请再次输入密码"
                  v-model="loginForm.password2"
                >
                  <template slot="prepend">
                    <img
                      style="margin-top: 5px; width: 22px; height: 27px"
                      src="../../assets/newImg/图标@2x.png"
                      alt
                    />
                  </template>
                </el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="19">
              <div class="login">
                <!-- <img
                  src="../../assets/newImg/登录按钮.png"
                  alt=""
                  class="pic"
                />-->
                <div v-if="!iswjmm" class="loginBtn" @click="onLogin">LOGIN</div>
                <div v-else class="loginBtn" @click="onEdit">修改密码</div>
              </div>
            </el-col>
          </el-row>
        </el-form>
      </div>
      <!-- 马上注册 -->
      <div class="myForm" v-else-if="ismszc">
        <div class="back" @click="ismszc = false">
          <img src="../../assets/newImg/矩形1147.png" class="pic1" alt />
          <img src="../../assets/newImg/路径493.png" class="pic2" alt />
          <div class="txt">返回</div>
        </div>
        <el-form ref="loginForm" :model="loginForm" label-width="80px">
          <el-row>
            <el-col :span="19">
              <el-form-item>
                <img class="inputImg" src="../../assets/newImg/input.png" alt />
                <div class="inputshu"></div>
                <el-input
                  @keyup.enter.native="onZhuce"
                  placeholder="请输入用户名"
                  v-model="loginForm.userName"
                >
                  <template slot="prepend">
                    <img
                      style="margin-top: 5px; width: 26px; height: 27px;transform: translateX(-2px);"
                      src="../../assets/newImg/图标1.png"
                      alt
                    />
                  </template>
                </el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="19">
              <el-form-item>
                <img style="width: 180px" class="inputImg" src="../../assets/newImg/input.png" alt />
                <div class="inputshu"></div>
                <el-input
                  @keyup.enter.native="onZhuce"
                  placeholder="请输入验证码"
                  v-model="loginForm.yzm"
                >
                  <template slot="prepend">
                    <img
                      style="margin-top: 5px; width: 34px; height: 28px;transform: translateX(-6px);"
                      src="../../assets/newImg/tptb.png"
                      alt
                    />
                  </template>
                </el-input>
                <!-- <div class="yzm">发送验证码</div> -->
                <div class="yzm" v-show="show2" @click="getCode2">获取验证码</div>
                <div class="yzm count" v-show="!show2">( 重新发送{{ count2 }}s )</div>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="19">
              <el-form-item>
                <img class="inputImg" src="../../assets/newImg/input.png" alt />
                <div class="inputshu"></div>
                <el-input
                  type="password"
                  @keyup.enter.native="onZhuce"
                  placeholder="请输入密码"
                  v-model="loginForm.password"
                >
                  <template slot="prepend">
                    <img
                      style="margin-top: 5px; width: 22px; height: 27px"
                      src="../../assets/newImg/图标@2x.png"
                      alt
                    />
                  </template>
                </el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="19">
              <el-form-item>
                <img class="inputImg" src="../../assets/newImg/input.png" alt />
                <div class="inputshu"></div>
                <el-input
                  type="password"
                  @keyup.enter.native="onZhuce"
                  placeholder="请再次输入密码"
                  v-model="loginForm.password2"
                >
                  <template slot="prepend">
                    <img
                      style="margin-top: 5px; width: 22px; height: 27px"
                      src="../../assets/newImg/图标@2x.png"
                      alt
                    />
                  </template>
                </el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <!-- <el-row>
            <el-col :span="19">
              <div class="zhuce">
                <el-form-item>
                  <el-checkbox v-model="checked"
                    >已仔细阅读并同意<span class="color"
                      >《用户使用协议》</span
                    ></el-checkbox
                  >
                </el-form-item>
              </div>
            </el-col>
          </el-row>-->
          <el-row>
            <el-col :span="19">
              <div class="login">
                <!-- <img
                  src="../../assets/newImg/登录按钮.png"
                  alt=""
                  class="pic"
                />-->
                <div v-if="!iswjmm" class="loginBtn" @click="onZhuce">LOGIN</div>
                <div v-else-if="iswjmm" class="loginBtn" @click="onEdit">修改密码</div>
                <div v-else-if="ismszc" class="loginBtn" @click="onZhucehuiyuan">注册会员</div>
              </div>
            </el-col>
          </el-row>
        </el-form>
      </div>
      <div class="bottom" v-if="!iswjmm">
        <div class="tit1" @click="iswjmm = true">忘记密码？</div>
        <div class="tit2" @click="ismszc = true">马上注册</div>
      </div>
    </div>
  </div>
</template>

<script>
import SIdentify from "@/components/sIdentify.vue";
export default {
  components: {
    SIdentify
  },
  data() {
    return {
      loginForm: {
        userName: "",
        password: "",
        password2: "",
        yzm: ""
      },
      identifyCode: "",
      identifyCodes: "0123456789abcdwerwshdjeJKDHRJHKOOPLMKQ", //随便打的
      iswjmm: false,
      ismszc: false,
      // 登录
      show: true,
      count: "",
      timer: null,
      // 忘记密码
      show1: true,
      count1: "",
      timer1: null,
      // 注册会员
      show2: true,
      count2: "",
      timer2: null,
      checked: false
    };
  },
  created() {
    this.refreshCode();
  },
  methods: {
    // 图片验证码
    refreshCode() {
      this.identifyCode = "";
      this.makeCode(this.identifyCodes, 4);
    },
    randomNum(min, max) {
      max = max + 1;
      return Math.floor(Math.random() * (max - min) + min);
    },
    // 随机生成验证码字符串
    makeCode(data, len) {
      for (let i = 0; i < len; i++) {
        this.identifyCode += data[this.randomNum(0, data.length - 1)];
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
        phone: this.loginForm.userName
      });
      console.log(res);
      if (res.code == 200) {
        // this.loginForm.yzm = res.data;
        this.$message({
          message: "已发送验证码",
          type: "success"
        });
      }
      const res2 = await this.$api.verificationSession({
        method: 1,
        phone: this.loginForm.userName
      });
      console.log(res2);
    },
    async getCode1() {
      const TIME_COUNT = 60;
      if (!this.timer1) {
        this.count1 = TIME_COUNT;
        this.show1 = false;
        this.timer1 = setInterval(() => {
          if (this.count1 > 0 && this.count1 <= TIME_COUNT) {
            this.count1--;
          } else {
            this.show1 = true;
            clearInterval(this.timer1);
            this.timer1 = null;
          }
        }, 1000);
      }
      const res = await this.$api.getVerificationCode({
        method: 1,
        phone: this.loginForm.userName
      });
      console.log(res);
      if (res.code == 200) {
        // this.loginForm.yzm = res.data;
        this.$message({
          message: "已发送验证码",
          type: "success"
        });
      }
      const res2 = await this.$api.verificationSession({
        method: 1,
        phone: this.loginForm.userName
      });
      console.log(res2);
    },
    async getCode2() {
      const TIME_COUNT = 60;
      if (!this.timer2) {
        this.count2 = TIME_COUNT;
        this.show2 = false;
        this.timer2 = setInterval(() => {
          if (this.count2 > 0 && this.count2 <= TIME_COUNT) {
            this.count2--;
          } else {
            this.show2 = true;
            clearInterval(this.timer2);
            this.timer2 = null;
          }
        }, 1000);
      }
      const res = await this.$api.getVerificationCode({
        method: 2,
        phone: this.loginForm.userName
      });
      console.log(res);
      if (res.code == 200) {
        // this.loginForm.yzm = res.data;
        this.$message({
          message: "已发送验证码",
          type: "success"
        });
      } else {
        this.$message({
          message: res.msg,
          type: "warning"
        });
      }
    },
    async onZhucehuiyuan() {},
    async onEdit() {
      if (this.loginForm.password != this.loginForm.password2) {
        this.$message({
          message: "密码输入不一致",
          type: "warning"
        });
      }
      const res = await this.$api.CommentEditIndexPassword({
        username: this.loginForm.userName,
        password: this.loginForm.password,
        code: this.loginForm.yzm
      });
      console.log(res);
      if (res.code == 200) {
        this.$message({
          message: res.msg,
          type: "success"
        });
        this.ismszc = false;
        this.loginForm.userName = "";
        this.loginForm.password = "";
        this.loginForm.password2 = "";
        this.loginForm.yzm = "";
      } else {
        this.$message.error(res.msg);
      }
    },
    async onZhuce() {
      console.log(this.loginForm);
      if (this.loginForm.password != this.loginForm.password2) {
        this.$message({
          message: "密码输入不一致",
          type: "warning"
        });
      }
      const res = await this.$api.username({
        username: this.loginForm.userName,
        password: this.loginForm.password,
        sms_code: this.loginForm.yzm,
        code: sessionStorage.getItem("yqmCode")
          ? sessionStorage.getItem("yqmCode")
          : ""
      });
      console.log(res);
      if (res.code == 200) {
        this.$message({
          message: res.msg,
          type: "success"
        });
        sessionStorage.setItem("token", `${res.data.token}`);
        // sessionStorage.setItem("isLogin", "sy");
        // sessionStorage.setItem("username", JSON.stringify(res.data.username));
        sessionStorage.setItem("username", res.data.username);
        this.$message({
          message: res.msg,
          type: "success"
        });
        setTimeout(() => {
          sessionStorage.setItem("isLogin", true);
          this.$router.push({ name: "Huiyuanzhongxin" });
          setTimeout(() => {
            this.$router.go(0);
          }, 100);
        }, 500);
      } else {
        this.$message.error(res.msg);
      }
    },
    async onLogin() {
      console.log(this.loginForm);
      if (this.loginForm.yzm != this.identifyCode) this.refreshCode();
      if (this.loginForm.yzm != this.identifyCode) {
        this.$message.error("验证码不一致,请重新输入");
      } else {
        const res = await this.$api.login(
          this.loginForm.userName,
          this.loginForm.password
        );
        console.log(res);
        if (res.code == 200) {
          sessionStorage.setItem("token", `${res.data.token}`);
          // sessionStorage.setItem("isLogin", "sy");
          // sessionStorage.setItem("username", JSON.stringify(res.data.username));
          sessionStorage.setItem("username", res.data.username);
          this.$message({
            message: res.msg,
            type: "success"
          });
          setTimeout(() => {
            sessionStorage.setItem("isLogin", true);
            this.$router.push({ name: "Huiyuanzhongxin" });
            setTimeout(() => {
              this.$router.go(0);
            }, 100);
          }, 500);
        } else {
          this.$message.error(res.msg);
        }
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.index {
  width: 100%;
  height: 100vh;
  background: rgba(0, 0, 0, 0);
  position: relative;
  .container {
    width: 460px;
    height: 420px;
    opacity: 1;
    position: absolute;
    top: 20%;
    left: 50%;
    transform: translateX(-50%);
    // box-shadow: inset 0px 0 10px 10px #dddddd !important;
  }
  .inputImg {
    position: absolute;
    width: 300px;
    height: 48px;
  }
  .pic1 {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
  .top {
    position: absolute;
    top: -47px;
    left: 50%;
    transform: translateX(-50%);
    width: 160px;
    height: 160px;
    opacity: 1;
    .pic2 {
      position: absolute;
      top: 0;
      left: 0;
      width: 146px;
      height: 146px;
    }
    .pic3 {
      position: absolute;
      top: 40%;
      left: 46%;
      transform: translate(-50%, -50%);
      width: 82px;
      height: 84px;
      opacity: 1;
    }
  }
  .myForm {
    // width: 100%;
    position: absolute;
    top: 106px;
    left: 30px;
    .back {
      cursor: pointer;
      position: absolute;
      top: 62px;
      left: -86px;
      z-index: -1;
      width: 74px;
      height: 74px;
      opacity: 1;
      .pic1 {
        position: absolute;
        top: 0;
        left: 0;
        width: 74px;
        height: 74px;
        opacity: 1;
      }
      .pic2 {
        position: absolute;
        top: 18px;
        left: 50%;
        transform: translateX(-50%);
        width: 17px;
        height: 14px;
        opacity: 1;
      }
      .txt {
        position: absolute;
        top: 38px;
        width: 100%;
        opacity: 1;
        font-size: 18px;
        font-family: PingFang SC, PingFang SC-Medium;
        font-weight: 500;
        text-align: center;
        color: #ffffff;
      }
    }
    .yzm {
      transform: translateX(10px);
      width: 180px;
      opacity: 1;
      font-size: 16px;
      font-family: PingFang SC, PingFang SC-Medium;
      font-weight: 500;
      text-align: center;
      color: #ea8e11;
      cursor: pointer;
      line-height: 48px;
    }
    .yzm.count {
      color: #a7a7a7;
    }
    .line {
      margin-top: 60px;
      margin-left: 80px;
      opacity: 1;
      border: 2px solid #eceef5;
    }
    .login {
      cursor: pointer;
      position: relative;
      left: 80px;
      width: 300px;
      height: 61px;
      opacity: 1;
      .pic {
        position: absolute;
        width: 382px;
        height: 61px;
        opacity: 1;
      }
      .loginBtn {
        position: absolute;
        width: 81%;
        opacity: 1;
        font-size: 25px;
        text-shadow: 0px 0px 4px #000;
        font-family: "Microsoft YaHei";
        font-weight: 500;
        letter-spacing: 2px;
        text-align: center;
        line-height: 61px;
        color: #314759;
      }
    }
  }
  .bottom {
    position: absolute;
    bottom: -26px;
    // right: 125px;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    .tit1 {
      opacity: 1;
      font-size: 14px;
      font-family: PingFang SC, PingFang SC-Medium;
      font-weight: 500;
      text-align: left;
      color: #a7a7a7;
      cursor: pointer;
    }
    .tit2 {
      margin-left: 16px;
      opacity: 1;
      font-size: 14px;
      font-family: PingFang SC, PingFang SC-Medium;
      font-weight: 500;
      text-align: left;
      color: #ea8e11;
      cursor: pointer;
    }
  }
}
/deep/ .el-form-item__content {
  display: flex;
  margin-left: 50px !important;
  line-height: 50px;
}
.zhuce {
  position: absolute;
  .color {
    cursor: pointer;
    color: #ea8e11;
  }
}
/deep/ .el-input-group__prepend {
  background-color: transparent;
  border: 0px solid #dcdfe6;
  width: 34px !important;
}
.el-col-21 {
  /deep/ .el-input__inner {
    background-color: transparent;
    border: 0px solid #dcdfe6;
    height: 48px;
    width: 90px;
    padding: 0;
    margin-right: 32px;
  }
}
/deep/ .el-input__inner {
  background-color: transparent;
  border: 0px solid #dcdfe6;
  height: 48px;
  padding: 0;
}
// /deep/ .el-form-item__content{
//   width: 180px;
// }
.inputshu {
  top: 14px;
  left: 60px;
  position: absolute;
  z-index: 99;
  width: 1px;
  height: 22px;
  opacity: 0.5;
  background: rgba(0, 0, 0, 0.3);
}
/deep/ .el-col {
  display: flex;
}
.get-code {
  // height: 0;
  // transform: translateX(36px);
}
</style>