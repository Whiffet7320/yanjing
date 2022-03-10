<template>
  <div class="index">
    <div class="tit1">投诉/建议</div>

    <div class="nav1">
      <el-row style="display: flex;justify-content: center;">
        <el-col :span="18">
          <el-form
            :model="ruleForm"
            :rules="rules"
            ref="ruleForm"
            label-width="100px"
            class="ruleForm"
          >
            <el-form-item label="主题" prop="kdNumber">
              <el-input v-model="ruleForm.kdNumber"></el-input>
            </el-form-item>
            <el-form-item label="您的投诉/建议的类型" prop="region">
              <el-select v-model="ruleForm.region" placeholder="请选择活动区域">
                <el-option label="区域一" value="shanghai"></el-option>
                <el-option label="区域二" value="beijing"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="信息" prop="desc">
              <el-input :rows="5" type="textarea" v-model="ruleForm.desc"></el-input>
            </el-form-item>
            <el-form-item label="上传照片（最多6张）">
              <div
                @click="companyList(i)"
                class="myImg"
                v-for="(item, i) in ruleForm.images"
                :key="i"
              >
                <el-image :src="item" fit="fill" style="width: 70px; height: 70px">
                  <div slot="error" class="image-slot">
                    <i class="el-icon-picture-outline"></i>
                  </div>
                </el-image>
                <div @click.stop="delImg(i)" class="closeBtn">
                  <el-button circle>×</el-button>
                </div>
              </div>
            </el-form-item>
          </el-form>
          <div @click="onSubmit('ruleForm')" class="btn">提交</div>
        </el-col>
      </el-row>
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
      imgIndex: 0,
      ruleForm: {
        kdNumber: "",
        region: "",
        desc: "",
        images: [""]
      },
      rules: {
        kdNumber: [{ required: true, message: "请输入主题", trigger: "blur" }],
        region: [
          { required: true, message: "请选择活动区域", trigger: "change" }
        ],
        desc: [{ required: true, message: "请输入信息", trigger: "blur" }]
      }
    };
  },
  created() {
    // console.log(this.asideVal);
  },
  methods: {
    onSubmit(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          console.log(this.ruleForm)
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    // 上传图片
    companyList(i = 0) {
      this.imgIndex = i;
      this.$refs.fileInputList.click();
    },
    async companyLogo(event) {
      const that = this;
      var file = event.target.files[0];
      var fileSize = file.size; //文件大小
      var filetType = file.type; //文件类型
      //创建文件读取对象
      // console.log(file);
      if (fileSize <= 10240 * 1024) {
        if (
          filetType == "image/png" ||
          filetType == "image/jpeg" ||
          filetType == "image/gif"
        ) {
          this.imgFile = new FormData();
          this.imgFile.append("image[]", file);
          sessionStorage.setItem("img", 123);
          const res = await that.$api.productUpload(this.imgFile);
          console.log(res.data[0]);
          this.$set(this.ruleForm.slider_image, this.imgIndex, res.data[0]);
          that.$refs.fileInputList.value = "";
        } else {
          this.$message.error("图片格式不正确");
        }
      } else {
        this.$message.error("图片大小不正确");
      }
    },
    // 删除图片
    delImg(i = 0) {
      this.$set(this.ruleForm.images, i, "");
    },
    changeFahuo(i) {
      this.nowIndex = i;
    },
    tongjuChange(e) {
      console.log(e);
      if (e == "1") {
        this.tongjuValLeft = "";
        this.tongjuValRight = "";
      } else if (e == "2") {
        this.tongjuVal = "";
      }
    },
    wuliuhandleClose() {
      this.wuliudialogVisible = false;
    },
    // 分页
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.$store.commit("jishiShougouPage", val);
    }
  }
};
</script>

<style lang="scss" scoped>
.index {
}
.tit1 {
  font-size: 40px;
  font-family: PingFang SC, PingFang SC-Heavy;
  font-weight: 800;
  text-align: left;
  color: #1e1f33;
}

.nav1 {
  margin-bottom: 30px;
  margin-top: 40px;
  margin-right: 60px;
  background: #ffffff;
  padding: 80px 100px;
  .ruleForm {
    width: 500px;
  }
  .btn {
    cursor: pointer;
    margin: 0 auto;
    width: 348px;
    height: 60px;
    background: #000000;
    font-size: 22px;
    text-align: center;
    color: #ffffff;
    line-height: 60px;
  }
  /deep/ .el-form-item {
    display: flex;
    flex-direction: column;
  }
  /deep/ .el-form-item__label {
    width: 300px !important;
    text-align: left;
    color: #969699;
  }
  /deep/ .el-input__inner {
    background-color: #f5f5f5;
  }
  /deep/ .el-textarea__inner {
    background-color: #f5f5f5;
  }
  /deep/ .el-form-item__content {
    margin-left: 0px !important;
  }
  .myImg {
    position: relative;
    width: 70px;
    height: 70px;
    display: inline-block;
    margin-right: 12px;
    .closeBtn {
      position: absolute;
      top: -6px;
      right: -4px;
      width: 20px;
      height: 20px;
      .el-button {
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
      }
    }
    /deep/ .image-slot {
      border: 1px solid #ddd;
      border-radius: 4px;
      background-color: #fafafa;
      width: 68px;
      height: 68px;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      .el-icon-picture-outline {
        font-size: 20px;
      }
    }
  }
}
.tit2 {
  margin-top: 60px;
  font-size: 44px;
  font-family: PingFang SC, PingFang SC-Heavy;
  font-weight: 800;
  color: #1e1f33;
}
.displayN {
  display: none;
}
</style>