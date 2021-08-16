<template>
  <div class="index">
    <div class="nav1">
      <div class="tit1">分享设置</div>
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
          <el-form-item label="二维码尺寸">
            <div class="erweimaImg">
              <div class="tit">(图片尺寸:112*112)</div>
              <img
                @click="companyList"
                v-if="ruleForm.img != ''"
                :src="ruleForm.img"
                class="img_cyy"
              />
              <img
                @click="companyList"
                v-else
                class="img_cyy"
                src="https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png"
                alt=""
              />
            </div>
          </el-form-item>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item>
              <el-button type="primary" @click="submitForm">保存</el-button>
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
import axios from "axios";
export default {
  data() {
    return {
      ruleForm: {
        img: "",
        content: "",
        checked: true,
      },
      rules:{},
      imgFile: "",
    };
  },
  created() {
    this.getData();
  },
  methods: {
    async getData() {},
    // 上传
    companyList() {
      this.$refs.fileInputList.click();
    },
    companyLogo(event) {
      const that = this;
      var file = event.target.files[0];
      var fileSize = file.size; //文件大小
      var filetType = file.type; //文件类型
      //创建文件读取对象
      console.log(file);
      if (fileSize <= 10240 * 1024) {
        if (
          filetType == "image/png" ||
          filetType == "image/jpeg" ||
          filetType == "image/gif"
        ) {
          this.imgFile = new FormData();
          this.imgFile.append("image", file);
          var reader = new FileReader();
          reader.readAsDataURL(file); //通过文件流将文件转换成Base64字符串
          reader.onloadend = function () {
            that.ruleForm.img = reader.result;
          };
        } else {
          this.$message.error("图片格式不正确");
        }
      } else {
        this.$message.error("图片大小不正确");
      }
    },
    async submitForm() {
      const that = this;
      var configs = {
        headers: {
          "Content-Type": "multipart/form-data;charse=UTF-8",
          "X-Token": sessionStorage.getItem("token"),
        },
      };
      axios
        .post(
          `${this.$url}/other/upload_attach`,
          // `/admin/other/upload_attach`,
          this.imgFile,
          configs
        )
        .then(function (res) {
          console.log(res);
          if (res.data.code == 200) {
            that.$message({
              message: res.data.message,
              type: "success",
            });
            // setTimeout(() => {
            //   that.$router.push({ name: "Lunbotuliebiao" });
            // }, 500);
          } else {
            that.$message.error(res.data.message);
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
  .sp {
    display: flex;
    margin: 0 10px;
  }
  .tit2 {
    width: 60px;
    height: 21px;
    opacity: 1;
    font-size: 15px;
    font-family: zw;;
    font-weight: 400;
    text-align: left;
    color: #000000;
  }
  .erweimaImg {
    display: flex;
    flex-direction: column;
    .tit {
      opacity: 1;
      font-size: 14px;
      font-family: zw;;
      font-weight: 400;
      text-align: left;
      color: #d33a4e;
    }
    .img_cyy {
      width: 112px;
      height: 112px;
      opacity: 1;
      background: #ffffff;
    }
  }
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