<template>
  <div class="index">
    <div class="nav1">
      <div class="tit1">邀请好友/佣金</div>
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
          <el-col :span="10">
            <el-form-item label="一级 (抽成百分之)" prop="ratio_first">
              <el-input v-model="ruleForm.ratio_first"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label="二级 (抽成百分之)" prop="ratio_second">
              <el-input v-model="ruleForm.ratio_second"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <!-- 开关 -->
        <el-row>
          <el-col :span="5">
            <el-form-item label="二维码邀请开关" prop="qrpic_status">
              <el-switch v-model="ruleForm.qrpic_status"></el-switch>
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item label="链接邀请开关" prop="link_status">
              <el-switch v-model="ruleForm.link_status"></el-switch>
            </el-form-item>
          </el-col>
        </el-row>
        <!-- 邀请二维码背景图 -->
        <el-row>
          <el-col :span="10">
            <el-form-item label="邀请二维码背景图" prop="invitation_qrbg">
              <div class="myImg" @click="companyList">
                <!-- <viewer> -->
                <img
                  v-if="ruleForm.invitation_qrbg != ''"
                  :src="ruleForm.invitation_qrbg"
                  class="img_cyy"
                />
                <img
                  v-else
                  class="img_cyy"
                  src="https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png"
                  alt=""
                />
                <!-- </viewer> -->
              </div>
            </el-form-item>
          </el-col>
        </el-row>
        <!-- 保存 -->
        <el-form-item>
          <el-button type="primary" @click="onSubmit">保存</el-button>
        </el-form-item>
      </el-form>
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
  </div>
</template>

<script>
export default {
  data() {
    return {
      // img1: "",
      ruleForm: {
        ratio_first: "",
        ratio_second: "",
        qrpic_status: "",
        link_status: "",
        invitation_qrbg: "",
      },
      rules: {
        ratio_first: [
          { required: true, message: "请输入活动名称", trigger: "blur" },
          { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" },
        ],
        ratio_second: [
          { required: true, message: "请选择活动区域", trigger: "change" },
        ],
      },
    };
  },
  created(){
    this.getData()
  },
  methods: {
    async getData(){
      const res = await this.$api.invitation_view()
      console.log(res)
      this.ruleForm = {...res}
      delete this.ruleForm.result;
      this.ruleForm.qrpic_status = this.ruleForm.qrpic_status == 1 ? true : false;
      this.ruleForm.link_status = this.ruleForm.link_status == 1 ? true : false;
      console.log(this.ruleForm)
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    // 轮播图上传
    companyList() {
      this.$refs.fileInputList.click();
    },
    companyLogo(event) {
      // console.log(this.myImgList.length);
      // this.imgIndex = this.myImgList.length + 1;
      const that = this;
      var file = event.target.files[0];
      var fileSize = file.size; //文件大小
      var filetType = file.type; //文件类型
      // console.log(event)
      //创建文件读取对象
      if (fileSize <= 10240 * 1024) {
        if (
          filetType == "image/png" ||
          filetType == "image/jpeg" ||
          filetType == "image/gif"
        ) {
          this.imgFile = file;
          var reader = new FileReader();
          reader.readAsDataURL(this.imgFile); //通过文件流将文件转换成Base64字符串
          reader.onloadend = function () {
            that.img1 = reader.result;
            that.ruleForm.invitation_qrbg = reader.result;
          };
        } else {
          this.$message.error("图片格式不正确");
        }
      } else {
        this.$message.error("图片大小不正确");
      }
    },
    // 保存
    onSubmit() {
      this.ruleForm.qrpic_status = this.ruleForm.qrpic_status == false ? 0 : 1;
      this.ruleForm.link_status = this.ruleForm.link_status == false ? 0 : 1;
      console.log(this.ruleForm);
      this.$api
        .updateinvitation(
          sessionStorage.getItem("user_name"),
          sessionStorage.getItem("user_pass"),
          {...this.ruleForm}
        )
        .then((res) => {
          console.log(res);
          if (res.result == 1) {
            this.getData()
            this.$message({
              message: res.msg,
              type: "success",
            });
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
  display: flex !important;
  align-items: center !important;
  .el-switch {
    margin-top: 10px;
  }
}
/deep/ .el-form-item__label {
  width: 150px !important;
}
/deep/ .el-upload-list__item.is-success {
  width: 414px;
  height: 736px;
  opacity: 1;
}
.img_cyy {
  width: 414px;
  height: 736px;
}
.displayN {
  display: none;
}
</style>
