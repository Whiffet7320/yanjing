<template>
  <div class="index">
    <div class="nav1">
      <div class="tit1">客服系统设置</div>
    </div>
    <div class="myForm">
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-row>
          <el-col :span="12">
            <el-form-item label="电话号码置放" prop="name">
              <el-input v-model="ruleForm.web_mobile"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="微信联系方式" prop="name">
              <el-input v-model="ruleForm.wechat_account"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item>
              <el-button type="primary" @click="submitForm()">保存</el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      ruleForm: {
        arr: [],
        web_mobile: "",
        wechat_account: "",
      },
      rules: {
        // name: [
        //   { required: true, message: "请输入活动名称", trigger: "blur" },
        //   { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" },
        // ],
      },
    };
  },
  created() {
    this.getData();
  },
  methods: {
    async getData() {
      const res = await this.$api.otherWeb_config_detail();
      console.log(res);
      this.ruleForm.arr = res.data;
      console.log(this.ruleForm);
      this.ruleForm.arr.forEach((ele) => {
        ele.only_tag == "web_mobile"
          ? (this.ruleForm.web_mobile = ele.value)
          : "";
        ele.only_tag == "web_mobile"
          ? (this.ruleForm.web_mobileName = ele.name)
          : "";
        ele.only_tag == "wechat_account"
          ? (this.ruleForm.wechat_account = ele.value)
          : "";
        ele.only_tag == "wechat_account"
          ? (this.ruleForm.wechat_accountName = ele.name)
          : "";
      });
    },
    async submitForm() {
      console.log(this.ruleForm);
      const res = await this.$api.otherWeb_config_edit(
        "web_mobile",
        this.ruleForm.web_mobileName,
        this.ruleForm.web_mobile
      );
      const res2 = await this.$api.otherWeb_config_edit(
        "wechat_account",
        this.ruleForm.wechat_accountName,
        this.ruleForm.wechat_account
      );
      if (res.code == 200 || res2.code == 200) {
        this.$message({
          message: res.message,
          type: "success",
        });
        this.getData();
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.index {
}
.nav1 {
  width: 100%;
  height: 80px;
  opacity: 1;
  background: #ffffff;
  .tit1 {
    opacity: 1;
    font-size: 25px;
    font-family: PingFang SC, PingFang SC-Heavy;
    font-weight: 800;
    text-align: left;
    color: #2f313d;
    line-height: 80px;
    margin-left: 44px;
  }
}
.myForm {
  margin-top: 30px;
}
/deep/ .el-form-item__content {
  display: flex;
}
/deep/ .el-form-item__label {
  width: 120px !important;
}
</style>