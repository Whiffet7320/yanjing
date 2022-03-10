<template>
  <div class="index">
    <!-- 登录/注册 -->
    <el-dialog :visible.sync="logindialogVisible" width="680px" :before-close="loginhandleClose">
      <div class="LoginDia">
        <div class="tit1">
          <div class="txt1">
            <div @click="clickLogin = true" :class="{'txtt1':true,'active':clickLogin}">登录</div>
          </div>
          <div class="shu"></div>
          <div class="txt1">
            <div @click="clickLogin = false" :class="{'txtt1':true,'active':!clickLogin}">注册一个账号</div>
          </div>
        </div>
        <div v-if="clickLogin == false" class="tit2">
          <el-row :gutter="30">
            <el-col :span="12">
              <div class="txt1">姓</div>
              <el-input v-model="xin"></el-input>
            </el-col>
            <el-col :span="12">
              <div class="txt1">名</div>
              <el-input v-model="ming"></el-input>
            </el-col>
          </el-row>
        </div>
        <div class="tit2">
          <div class="txt1">邮箱</div>
          <el-input v-model="email"></el-input>
        </div>
        <div class="tit2">
          <div class="txt1">密码</div>
          <el-input v-model="password"></el-input>
        </div>
        <div v-if="clickLogin == false" class="tit2">
          <div class="txt1">再次输入密码</div>
          <el-input v-model="repassword"></el-input>
        </div>
        <div v-if="clickLogin == false" class="tit2">
          <div class="txt1">验证码</div>
          <el-input v-model="captach"></el-input>
          <div @click="send_sms" style="transform: translateY(10px);cursor: pointer;">发送验证码</div>
        </div>
        <div class="tit3">
          <div class="left">
            <el-checkbox v-model="jizhuPassword">记住密码</el-checkbox>
          </div>
          <div class="right">忘记密码？</div>
        </div>
        <div v-if="clickLogin" @click="toLogin" class="tit4">登录</div>
        <div v-else @click="toZhuce" class="tit4">注册</div>
        <div class="tit5">
          通过创建你的账户，你同意我们的
          <span @click="yingsidialogVisible = true" class="sp">隐私政策</span>
        </div>
        <!-- <div class="tit6">
          <el-divider>
            <span class="txt1">其他登录方式</span>
          </el-divider>
        </div>
        <div class="tit7">
          <div class="box1">
            <img src="../../assets/img/lujin5.png" class="pic1" alt />
            <div class="txt1">Google</div>
          </div>
          <div class="box1 box2">
            <img src="../../assets/img/lianshu.png" class="pic1" alt />
            <div class="txt1">Facebook</div>
          </div>
        </div>-->
      </div>
    </el-dialog>
    <!-- 隐私政策 -->
    <el-dialog :visible.sync="yingsidialogVisible" width="680px" :before-close="yingsihandleClose">
      <div class="YingsiDia">
        <div class="txtt1">Privacy Policy</div>
        <div class="txtt2">
          This Zeelool Privacy Policy (the "Policy") describes how we collect and use personal information about you when you visit our website, use our mobile application, or call us on the phone.
          By "personal information," we mean information that directly identifies you, such as your name, address, or email address. In this Policy, "we", “us”, and "our" mean Zeelool Inc., and "you" means any person who visits our website, uses our mobile application, or calls us on the phone. To shop with us, you need to be at least sixteen (16) years old. By accessing and/or using our services in any manner, including but not limited to, visiting and/or browsing our website, downloading our mobile application, or contributing any material on our website or via our application, you expressly understand, acknowledge and agree all the terms and conditions in this privacy policy. If you disagree with any part of the policy then you should immediately discontinue access or use of the services. Please read our privacy policy carefully before proceeding.
        </div>
        <div @click="yingsiOnclick" class="txtt3">完成</div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      logindialogVisible: true,
      clickLogin: true,
      email: "alsdsa@163.com",
      password: "123456",
      jizhuPassword: true,
      yingsidialogVisible: false,
      captach: "",
      repassword: "",
      xin: "",
      ming: ""
    };
  },
  methods: {
    async toZhuce() {
      const res = await this.$api.register({
        account: this.email,
        password: this.password,
        repassword: this.repassword,
        captch: this.captach,
        nickname: `${this.xin}${this.ming}`
      });
      console.log(res);
      if (res.code == 200) {
        this.$message({
          message: res.message,
          type: "success"
        });
        this.clickLogin = false;
      } else {
        this.$message.error(res.message);
      }
    },
    async send_sms(){
      const res = await this.$api.send_sms({
        mobile:this.email,
        event:'register'
      })
      if (res.code == 200) {
        this.$message({
          message: res.message,
          type: "success"
        });
      } else {
        this.$message.error(res.message);
      }
    },
    async toLogin() {
      const res = await this.$api.login({
        account: this.email,
        password: this.password
      });
      console.log(res);
      if (res.code == 200) {
        sessionStorage.setItem("token", `${res.data.token}`);
        sessionStorage.setItem("isLogin", "yes");
        // sessionStorage.setItem("username", JSON.stringify(res.data.username));
        sessionStorage.setItem("username", res.data.username);
        this.$message({
          message: res.message,
          type: "success"
        });
        setTimeout(() => {
          // sessionStorage.setItem("isLogin", true);
          // this.$router.push({ name: "Huiyuanzhongxin" });
          setTimeout(() => {
            this.$router.go(0);
          }, 100);
        }, 500);
      } else {
        this.$message.error(res.message);
      }
    },
    loginhandleClose() {
      this.logindialogVisible = false;
    },
    yingsihandleClose() {
      this.yingsidialogVisible = false;
    },
    yingsiOnclick() {
      this.yingsidialogVisible = false;
    }
  }
};
</script>

<style lang="scss" scoped>
.index {
}
.LoginDia {
  .tit1 {
    margin-bottom: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    .txt1 {
      width: 48%;
      display: flex;
      justify-content: center;
      .txtt1 {
        font-size: 26px;
        text-align: center;
        color: #4b4b4b;
        height: 50px;
        cursor: pointer;
        line-height: 50px;
      }
      .txtt1.active {
        color: #000000;
        border-bottom: 2px solid #000000;
      }
    }
    .shu {
      width: 1px;
      height: 54px;
      background: #707070;
    }
  }
  .tit2 {
    padding: 0 38px;
    margin-bottom: 6px;
    .txt1 {
      font-size: 20px;
      font-family: PingFang SC, PingFang SC-Bold;
      font-weight: 700;
      color: #1e1f33;
      line-height: 40px;
      margin-bottom: 4px;
    }
  }
  .tit3 {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 20px;
    padding: 0 42px;
    .left {
      /deep/ .el-checkbox__input.is-checked {
        .el-checkbox__inner {
          background-color: #000000;
          border-color: #000000;
        }
      }
      /deep/ .el-checkbox__input.is-checked + .el-checkbox__label {
        color: #000000;
      }
    }
    .right {
      font-size: 14px;
      color: #2626ff;
      line-height: 40px;
    }
  }
  .tit4 {
    cursor: pointer;
    width: 386px;
    height: 62px;
    background: #000000;
    border-radius: 3px;
    margin: 60px auto 30px auto;
    font-size: 24px;
    font-family: PingFang SC, PingFang SC-Bold;
    font-weight: 700;
    text-align: center;
    color: #ffffff;
    line-height: 40px;
    line-height: 62px;
  }
  .tit5 {
    text-align: center;
    font-size: 16px;
    color: #969699;
    line-height: 40px;
    .sp {
      color: #1e1f33;
      cursor: pointer;
      text-decoration: underline;
    }
  }
  .tit6 {
    margin-top: 28px;
    padding: 0 100px;
    .txt1 {
      font-size: 18px;
      color: #969699;
    }
  }
  .tit7 {
    margin-top: 40px;
    margin-bottom: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    .box1 {
      cursor: pointer;
      width: 216px;
      height: 60px;
      background: #ffffff;
      border: 1px solid #707070;
      display: flex;
      align-items: center;
      justify-content: center;
      .pic1 {
        width: 30px;
        height: 30px;
      }
      .txt1 {
        margin-left: 20px;
        font-size: 20px;
        color: #1e1f33;
        line-height: 60px;
      }
    }
    .box1.box2 {
      margin-left: 50px;
      .pic1 {
        width: 18px;
        height: 40px;
      }
    }
  }
}
.YingsiDia {
  .txtt1 {
    font-size: 26px;
    text-align: center;
    color: #1e1f33;
    line-height: 40px;
  }
  .txtt2 {
    padding: 0 40px;
    margin-top: 30px;
    font-size: 20px;
    color: #969699;
    line-height: 32px;
  }
  .txtt3 {
    cursor: pointer;
    margin: 24px auto;
    width: 386px;
    height: 62px;
    background: #000000;
    border-radius: 3px;
    font-size: 24px;
    font-weight: 700;
    text-align: center;
    line-height: 62px;
    color: #ffffff;
  }
}
</style>