<template>
  <div class="hyindex">
    <div class="aside">
      <Aside />
    </div>
    <div class="right">
      <div class="nav1">当前位置：用户管理 > 会员资料</div>
      <div class="nav2">
        <div class="tit1">
          <img
            style="width: 24px;height: 24px;margin-right: 12px;"
            src="../../assets/newImg/tubiao301.png"
            alt
          />
          <div class="txt1">会员资料</div>
        </div>
        <div class="tit2">
          <div class="box1">
            <el-input placeholder="请输入内容" v-model="dataObj.username">
              <template slot="prepend">手机号</template>
              <el-button @click="onSubmit" slot="append">完成</el-button>
            </el-input>
          </div>
          <div class="box1">
            <el-input placeholder="请输入内容" v-model="dataObj.truename">
              <template slot="prepend">真实姓名</template>
              <el-button @click="onSubmit" slot="append">完成</el-button>
            </el-input>
          </div>
          <div class="box1">
            <el-input placeholder="请输入内容" v-model="dataObj.wx">
              <template slot="prepend">微信</template>
              <el-button @click="onSubmit" slot="append">完成</el-button>
            </el-input>
          </div>
          <div class="box1">
            <el-input placeholder="请输入内容" v-model="dataObj.qq">
              <template slot="prepend">Q Q</template>
              <el-button @click="onSubmit" slot="append">完成</el-button>
            </el-input>
          </div>
          <div class="box1">
            <el-input placeholder="请输入内容" v-model="dataObj.mail">
              <template slot="prepend">邮箱</template>
              <el-button @click="onSubmit" slot="append">完成</el-button>
            </el-input>
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
    Aside
  },
  data() {
    return {
      input1: "",
      dataObj: {}
    };
  },
  created() {
    if (sessionStorage.getItem("token") == "null") {
      setTimeout(() => {
        sessionStorage.setItem("isLogin", "123");
        this.$router.go(0);
      }, 3000);
    }
    this.getData();
  },
  methods: {
    async getData() {
      const res = await this.$api.editIndex({
        token: sessionStorage.getItem("token")
      });
      console.log(res)
      if(res.code == 200){
         this.dataObj = res.data;
      }else{
        this.$message.error(res.msg);
      }
     
    },
    async onSubmit() {
      const res = await this.$api.editData({
        token: sessionStorage.getItem("token"),
        wx: this.dataObj.wx,
        qq: this.dataObj.qq,
        mail: this.dataObj.mail,
        truename: this.dataObj.truename
      });
      console.log(res);
      if (res.code == 200) {
        this.$message({
          message: res.msg,
          type: "success"
        });
      } else {
        this.$message.error(res.msg);
      }
    }
  }
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
    height: 420px;
    // background: #ffffff;
    background-image: url("../../assets/newImg/kk12.png");
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
      padding-top: 10px;
      .box1 {
        width: 89%;
        margin: 20px auto;
        /deep/ .el-input-group__prepend {
          color: #000000;
          border-right: 0px;
          font-weight: 700;
        }
        /deep/ .el-input-group__append {
          color: #ea8e11;
        }
        /deep/ .el-input__inner {
          background-color: #f5f7fa;
          border-left: 1px solid #f5f7fa;
          border-right: 1px solid #f5f7fa;
        }
      }
    }
  }
}
</style>