<template>
  <div class="index">
    <div class="nav1">
      <div class="tit1">后台支付配置</div>
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
            <el-form-item label="微信小程序appid" prop="name">
              <el-input v-model="ruleForm.appid"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="微信小程序appsecret" prop="name">
              <el-input v-model="ruleForm.appsecret"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="微信支付商户号" prop="name">
              <el-input v-model="ruleForm.merchant_no"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="微信支付密钥" prop="name">
              <el-input v-model="ruleForm.merchant_key"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="微信支付商户证书" prop="name">
              <el-button type="danger" @click="companyList(1)"
                >上传文件</el-button
              >
              {{ pay_certName }}
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="微信支付商户证书" prop="name">
              <el-button type="danger" @click="companyList(2)"
                >上传文件</el-button
              >
              {{ pay_keyName }}
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="24">
            <el-form-item>
              <el-button @click="submitForm('ruleForm')"
                >保存</el-button
              >
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <input
      type="file"
      name="companyLogo"
      id="file0"
      class="displayN"
      multiple="multiple"
      @change="companyLogo($event)"
      ref="fileInputList"
    />
  </div>
</template>

<script>
export default {
  data() {
    return {
      file: null,
      fileIndex: null,
      ruleForm: {
        appid: "",
        appsecret: "",
        merchant_no: "",
        merchant_key: "",
        pay_cert: "",
        pay_key: "",
      },
      pay_certName: "",
      pay_keyName: "",
      rules: {
        // name: [
        //   { required: true, message: "请输入活动名称", trigger: "blur" },
        //   { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" },
        // ],
      },
    };
  },
  created(){
    this.getData()
  },
  methods: {
    async getData(){
      const res = await this.$api.payment_view()
      console.log(res)
      this.ruleForm = {...res}
      this.pay_certName = res.pay_cert;
      this.pay_keyName = res.pay_key
    },
    // 上传
    companyList(i) {
      this.fileIndex = i;
      this.$refs.fileInputList.click();
    },
    companyLogo(event) {
      const that = this;
      var file = event.target.files[0];
      this.file = file;
      console.log(file);
      var reader = new FileReader();
      reader.readAsDataURL(this.file); //通过文件流将文件转换成Base64字符串
      reader.onloadend = function () {
        if (that.fileIndex == 1) {
          that.ruleForm.pay_cert = reader.result;
          that.pay_certName = that.file.name;
        } else if (that.fileIndex == 2) {
          that.ruleForm.pay_key = reader.result;
          that.pay_keyName = that.file.name;
        }
      };
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          console.log(this.ruleForm);
          this.$api.payment_set({ ...this.ruleForm }).then((res) => {
            if (res.result == 1) {
              this.$message({
                message: res.msg,
                type: "success",
              });
            }
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
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
    font-size: 30px;
    font-family: YouSheBiaoTiHei, YouSheBiaoTiHei-Regular;
    font-weight: 400;
    text-align: left;
    line-height: 80px;
    margin-left: 40px;
    color: #ebbfcc;
  }
}
.myForm {
  margin-top: 30px;
}
/deep/ .el-form-item__content {
  display: flex;
}
/deep/ .el-form-item__label {
  width: 180px !important;
}
.displayN {
  display: none;
}
</style>