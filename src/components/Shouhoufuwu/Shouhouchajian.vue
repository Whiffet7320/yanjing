<template>
  <div class="hyindex">
    <div class="aside">
      <Aside />
    </div>
    <div class="right">
      <div class="nav1">当前位置：售后服务 > 售后查件</div>
      <div class="nav2">
        <div class="tit1">
          <img style="width: 24px;height: 24px;margin-right: 12px;" src="../../assets/newImg/tubiao301.png" alt="" />
          <div class="txt1">售后查件</div>
        </div>
        <!-- <div class="tit2">
          <div class="myForm">
            <el-form ref="form" :model="form" label-width="80px">
              <el-row>
                <el-col :span="10">
                  <el-form-item label="快递单号">
                    <el-input
                      class="kddh"
                      type="textarea"
                      v-model="form.val1"
                    ></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="10">
                  <el-form-item label="问题描述">
                    <el-input
                      class="wtms"
                      type="textarea"
                      v-model="form.val2"
                    ></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="10">
                  <el-form-item label="添加照片">
                    <div class="imgBox" @click="companyList">
                      <img
                        v-if="form.img == ''"
                        class="img1"
                        src="../../assets/newImg/lujin377.png"
                        alt=""
                      />
                      <img v-else class="img2" :src="form.img" alt="" />
                    </div>
                  </el-form-item>
                </el-col>
              </el-row>
              <div @click="onSubmit" class="btn">提交</div>
            </el-form>
          </div>
        </div> -->
      </div>
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
import Aside from "../Aside";
export default {
  components: {
    Aside,
  },
  data() {
    return {
      form: {
        val1: "",
        val2: "",
        img: "",
      },
    };
  },
  methods: {
      onSubmit(){
          console.log(this.form)
      },
    // 图片上传
    companyList() {
      this.$refs.fileInputList.click();
    },
    companyLogo(event) {
      const that = this;
      var file = event.target.files[0];
      var fileSize = file.size; //文件大小
      var filetType = file.type; //文件类型
      //创建文件读取对象
      //   console.log(file);
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
            that.form.img = reader.result;
          };
        } else {
          this.$message.error("图片格式不正确");
        }
      } else {
        this.$message.error("图片大小不正确");
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
    height: 960px;
    // background: #ffffff;
    background-image: url("../../assets/newImg/kk9.png");
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
      margin: 30px auto;
      width: 90%;
      .myForm {
        /deep/ .el-form-item {
          display: flex;
          flex-direction: column;
        }
        /deep/ .el-form-item__label {
          font-weight: 700;
        }
        /deep/ .el-form-item__content {
          margin-left: 10px !important;
        }
        .kddh {
          /deep/ .el-textarea__inner {
            height: 260px;
            box-shadow: inset 0px 0 16px 2px #dddddd !important;
          }
        }
        .wtms {
          /deep/ .el-textarea__inner {
            height: 100px;
            box-shadow: inset 0px 0 16px 2px #dddddd !important;
          }
        }
        .imgBox {
          border-radius: 10px;
          cursor: pointer;
          width: 189px;
          height: 188px;
          box-shadow: inset 0px 0 16px 2px #dddddd !important;
          display: flex;
          justify-content: center;
          align-items: center;
          .img1 {
            width: 26px;
            height: 21px;
            opacity: 1;
          }
          .img2 {
            width: 189px;
            height: 188px;
          }
        }
        .btn {
          margin-top: 10px;
          cursor: pointer;
          margin-left: 10px;
          width: 189px;
          height: 49px;
          opacity: 1;
          box-shadow: inset 0px 0 16px 2px #dddddd !important;
          border-radius: 4px;
          font-size: 16px;
          font-family: zw;;
          font-weight: 400;
          line-height: 49px;
          text-align: center;
          color: #5c5c5c;
        }
      }
    }
  }
}
.displayN{
    display: none;
}
</style>